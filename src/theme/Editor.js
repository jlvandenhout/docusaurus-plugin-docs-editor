import React, { useEffect, useState } from 'react'

import clsx from 'clsx'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'

import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Octokit } from '@octokit/core'
import  { restEndpointMethods } from '@octokit/plugin-rest-endpoint-methods'

import htmlStringify from 'rehype-stringify'
import htmlParse from 'rehype-parse'
import htmlToMarkdown from 'rehype-remark'
import markdownStringify from 'remark-stringify'
import markdownParse from 'remark-parse'
import markdownParseFrontmatter from 'remark-frontmatter'
import markdownExtractFrontmatter from 'remark-extract-frontmatter'
import markdownToHtml from 'remark-rehype'
import unified from 'unified'
import yaml from 'yaml'

import EditorMenu from '@theme/EditorMenu'
import EditorPage from '@theme/EditorPage'
import EditorLogin from '@theme/EditorLogin'

import './Editor.css'


export default function Editor({ options, className }) {
  const [contentFrontmatter, setContentFrontmatter] = useState()
  const [contentPath, setContentPath] = useState()
  const [contentBranch, setContentBranch] = useState()

  const [github, setGithub] = useState()

  const editorBasePath = useBaseUrl('/edit')

  const authorizationCodeUrl = 'https://github.com/login/oauth/authorize'
  const authorizationScope = 'public_repo'

  const {
    docsPath,
    github: {
      clientId: authorizationClientId,
      tokenUri: authorizationTokenUrl,
    },
  } = options

  const {
    siteConfig: {
      organizationName: contentOwner,
      projectName: contentRepo,
    },
  } = useDocusaurusContext()

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    autofocus: 'start',
  })

  const requestAuthorizationCode = (redirectUrl) => {
    const url = new URL(authorizationCodeUrl)

    const parameters = url.searchParams
    parameters.append('client_id', authorizationClientId)
    parameters.append('scope', authorizationScope)
    parameters.append('redirect_uri', redirectUrl)

    window.location.replace(url)
  }

  const requestAuthorizationToken = async (code) => {
    const url = new URL(code, authorizationTokenUrl)

    const token = await fetch(url)
      .then(response => response.json())
      .then(data => data.token)

    return token
  }

  const requestAuthorization = async () => {
    const url = new URL(window.location.pathname, window.location.origin)
    const parameters = new URLSearchParams(window.location.search)

    const code = parameters.get('code')

    if (code) {
      window.history.replaceState(window.history.state, '', url)
      const token = await requestAuthorizationToken(code, url)

      // TODO: Add hook to authorize again on 403 response
      const OctokitRest = Octokit.plugin(restEndpointMethods)
      const {
        rest: api
      } = new OctokitRest({ auth: token })

      const {
        data: {
          login: user
        }
      } = await api.users.getAuthenticated()

      return {api, user}
    } else {
      requestAuthorizationCode(url)
    }
  }

  const createRepo = async () => {
    const {
      data: {
        name: originRepo,
        owner: {
          login: originOwner,
        }
      }
    } = await github.api.repos.createFork({
      owner: contentOwner,
      repo: contentRepo,
    })

    return await new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        github.api.repos.get({
          owner: originOwner,
          repo: originRepo
        })
        .then(repo => {
          clearInterval(interval)
          resolve(repo)
        })
        .catch(error => {
          if (error.status !== 404) {
            reject(error)
          }
        })
      }, 1000)
    })
  }

  const requestRepo = async (owner, repo) => {
    let response

    try {
      response = await github.api.repos.get({
        owner,
        repo,
      })
    } catch (error) {
      // TODO: Follow 301 response in case repo was renamed
      if ((error.status === 404) && (owner !== contentOwner)) {
        response = await createRepo()
      } else {
        throw error
      }
    }

    const {
      data: {
        name: originRepo,
        owner: {
          login: originOwner,
        },
        parent: upstream,
      }
    } = response

    // Sanity check to verify the repo is indeed a fork
    if (originOwner !== contentOwner) {
      if (upstream) {
        const {
          name: upstreamRepo,
          owner: {
            login: upstreamOwner
          }
        } = upstream
        if ((upstreamOwner !== contentOwner) && (upstreamRepo !== contentRepo)) {
          throw `Repo is not a fork of ${contentOwner}/${contentRepo}`
        }
      } else {
        throw `Repo is not a fork of ${contentOwner}/${contentRepo}`
      }
    }

    return {owner: originOwner, repo: originRepo}
  }

  const createBranch = async (owner, repo, branch) => {
    const {
      data: {
        default_branch: contentDefaultBranch
      }
    } = await github.api.repos.get({
      owner: contentOwner,
      repo: contentRepo,
    })

    const {
      data: {
        commit: {
          sha
        }
      }
    } = await github.api.repos.getBranch({
      owner: contentOwner,
      repo: contentRepo,
      branch: contentDefaultBranch,
    })

    await github.api.git.createRef({
      owner,
      repo,
      sha,
      ref: `refs/heads/${branch}`,
    })
  }

  const requestBranch = async (owner, repo, branch) => {
    try {
      await github.api.repos.getBranch({
        owner,
        repo,
        branch,
      })
    } catch (error) {
      // TODO: Follow 301 response in case branch was renamed
      if (error.status === 404) {
        await createBranch(owner, repo, branch)
      } else {
        throw error
      }
    }

    return branch
  }

  const requestContent = async (owner, repo, branch, path) => {
    // TODO: Allow user to create content on 404 response
    const {
      data: {
        content: contentData
      }
    } = await github.api.repos.getContent({
      owner,
      repo,
      path,
      ref: `refs/heads/${branch}`
    })

    const content = atob(contentData)
    return content
  }

  const requestCommit = async (owner, repo, branch, path, content) => {
    const {
      data: {
        sha,
        content: remoteContentData,
      }
    } = await github.api.repos.getContent({
      owner,
      repo,
      path,
      ref: `refs/heads/${branch}`
    })

    const contentData = btoa(content)

    if (contentData.trim() !== remoteContentData.trim()) {
      await github.api.repos.createOrUpdateFileContents({
        owner,
        repo,
        branch,
        path,
        sha,
        content: contentData,
        message: `Edit ${contentPath}`,
      })
    }
  }

  const requestPull = async (owner, branch) => {
    const head = `${owner}:${branch}`

    const {
      data: pulls
    } = await github.api.pulls.list({
      owner: contentOwner,
      repo: contentRepo,
      state: 'open',
      head,
    })

    // TODO: Allow user to update existing pull requests
    if (!pulls.length) {
      const {
        data: {
          default_branch: contentDefaultBranch,
        }
      } = await github.api.repos.get({
        owner: contentOwner,
        repo: contentRepo,
      })

      // TODO: Allow user to write a pull request title and description
      await github.api.pulls.create({
        owner: contentOwner,
        repo: contentRepo,
        base: contentDefaultBranch,
        head,
        title: `Edit ${contentPath}`
      })
    }
  }

  const htmlToMarkdownProcessor = unified()
    .use(htmlParse)
    .use(htmlToMarkdown)
    .use(markdownStringify)

  const markdownToHtmlProcessor = unified()
    .use(markdownParse)
    .use(markdownParseFrontmatter, ['yaml'])
    .use(markdownExtractFrontmatter, { yaml: yaml.parse })
    .use(markdownToHtml)
    .use(htmlStringify)

  const getContent = async () => {
    const html = editor.getHTML()

    let {
      contents: markdown
    } = await htmlToMarkdownProcessor.process(html)

    if (contentFrontmatter) {
      const frontmatter = yaml.stringify(contentFrontmatter)
      markdown = `---\n${frontmatter}---\n\n${markdown}`
    }

    return markdown
  }

  const setContent = async (content) => {
    const {
      data: frontmatter,
      contents: html,
    } = await markdownToHtmlProcessor.process(content)

    setContentFrontmatter(frontmatter)
    editor.chain().setContent(html).focus('start').run()
  }

  const init = async () => {
    const github = await requestAuthorization()

    const filePath = window.location.pathname.slice(editorBasePath.length)
    const contentPath = `${docsPath}${filePath}.md`
    const contentBranch = `edit/${contentPath.replaceAll(/[\/\.]/g, '-')}`

    setGithub(github)
    setContentBranch(contentBranch)
    setContentPath(contentPath)
  }

  const open = async () => {
    const {owner, repo} = await requestRepo(github.user, contentRepo)
    const branch = await requestBranch(owner, repo, contentBranch)
    const content = await requestContent(owner, repo, branch, contentPath)
    await setContent(content)
  }

  const save = async () => {
    const content = await getContent()
    const {owner, repo} = await requestRepo(github.user, contentRepo)
    const branch = await requestBranch(owner, repo, contentBranch)
    await requestCommit(owner, repo, branch, contentPath, content)
  }

  const submit = async () => {
    const content = await getContent()
    const {owner, repo} = await requestRepo(github.user, contentRepo)
    const branch = await requestBranch(owner, repo, contentBranch)
    await requestCommit(owner, repo, branch, contentPath, content)
    await requestPull(owner, branch)
  }

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    if (github && contentBranch && contentPath) {
      open()
    }
  }, [github, contentBranch, contentPath])

  return (
    <>
      {github ?
        <div className={clsx('editor', className)}>
          <EditorMenu editor={editor} save={save} submit={submit} />
          <EditorPage editor={editor} />
        </div>
      :
        <EditorLogin />
      }
    </>
  )
}
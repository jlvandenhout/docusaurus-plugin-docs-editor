import React, { useEffect, useState } from 'react'

import clsx from 'clsx'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'

import { useEditor } from '@tiptap/react'
import Blockquote from '@tiptap/extension-blockquote'
import Bold from '@tiptap/extension-bold'
import BulletList from '@tiptap/extension-bullet-list'
import Code from '@tiptap/extension-code'
import CodeBlock from '@tiptap/extension-code-block'
import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import HardBreak from '@tiptap/extension-hard-break'
import Heading from '@tiptap/extension-heading'
import History from '@tiptap/extension-history'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Image from '@tiptap/extension-image'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

import { Octokit } from '@octokit/core'
import  { restEndpointMethods } from '@octokit/plugin-rest-endpoint-methods'

import htmlStringify from 'rehype-stringify'
import htmlParse from 'rehype-parse'
import htmlParseUrl from 'rehype-urls'
import htmlToMarkdown from 'rehype-remark'
import markdownStringify from 'remark-stringify'
import markdownParse from 'remark-parse'
import markdownParseFrontmatter from 'remark-frontmatter'
import markdownUnwrapImages from 'remark-unwrap-images'
import markdownAbsoluteImages from '@pondorasti/remark-img-links'
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
  const [contentBranch, setContentBranch] = useState()
  const [contentPath, setContentPath] = useState()

  const [github, setGithub] = useState()
  const [syncing, setSyncing] = useState(false)

  const context = useDocusaurusContext()
  const editorBasePath = useBaseUrl(options.route || 'edit')

  let docsOwner = context.siteConfig.organizationName
  let docsRepo = context.siteConfig.projectName
  let docsPath = 'docs'

  if (options.docs) {
    docsOwner = options.docs.owner || docsOwner
    docsRepo = options.docs.repo || docsRepo
    docsPath = options.docs.path || docsPath
  }

  let staticPath = 'static'

  if (options.static) {
    staticPath = options.static.path || staticPath
  }

  const authorizationCodeUrl = 'https://github.com/login/oauth/authorize'
  const authorizationScope = 'public_repo'
  const authorizationClientId = options.github.clientId
  const authorizationTokenUrl = options.github.tokenUrl

  const editor = useEditor({
    extensions: [
      Blockquote,
      Bold,
      BulletList,
      Code,
      CodeBlock,
      Document,
      Dropcursor,
      HardBreak,
      Heading,
      History,
      HorizontalRule,
      Italic,
      Image,
      Link.configure({openOnClick: false}),
      ListItem,
      OrderedList,
      Paragraph,
      Text,
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

      const OctokitRest = Octokit.plugin(restEndpointMethods)
      const {
        hook,
        rest: api,
      } = new OctokitRest({ auth: token })

      hook.error('request', async (error) => {
        if (error.status === 403) {
          await requestAuthorization()
        } else {
          throw error
        }
      })

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
      owner: docsOwner,
      repo: docsRepo,
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
      if ((error.status === 404) && (owner !== docsOwner)) {
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
    if (originOwner !== docsOwner) {
      if (upstream) {
        const {
          name: upstreamRepo,
          owner: {
            login: upstreamOwner
          }
        } = upstream
        if ((upstreamOwner !== docsOwner) && (upstreamRepo !== docsRepo)) {
          throw `Repo is not a fork of ${docsOwner}/${docsRepo}`
        }
      } else {
        throw `Repo is not a fork of ${docsOwner}/${docsRepo}`
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
      owner: docsOwner,
      repo: docsRepo,
    })

    const {
      data: {
        commit: {
          sha
        }
      }
    } = await github.api.repos.getBranch({
      owner: docsOwner,
      repo: docsRepo,
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
      setSyncing(true)
      await github.api.repos.createOrUpdateFileContents({
        owner,
        repo,
        branch,
        path,
        sha,
        content: contentData,
        message: `Edit ${contentPath}`,
      })

      await new Promise((resolve, reject) => {
        const interval = setInterval(() => {
          github.api.repos.getContent({
            owner,
            repo,
            path,
            ref: `refs/heads/${branch}`
          })
          .then(data => {
            const {
              data: {
                sha: remoteSha,
              }
            } = data

            if (remoteSha != sha) {
              // Remote file is updated
              clearInterval(interval)
              setSyncing(false)
              resolve()
            }
          })
          .catch(error => {
            if (error.status !== 404) {
              setSyncing(false)
              reject(error)
            }
          })
        }, 1000)
      })
    }
  }

  const requestPull = async (owner, branch) => {
    const head = `${owner}:${branch}`

    const {
      data: pulls
    } = await github.api.pulls.list({
      owner: docsOwner,
      repo: docsRepo,
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
        owner: docsOwner,
        repo: docsRepo,
      })

      // TODO: Allow user to write a pull request title and description
      await github.api.pulls.create({
        owner: docsOwner,
        repo: docsRepo,
        base: contentDefaultBranch,
        head,
        title: `Edit ${contentPath}`
      })
    }
  }

  const getContent = async (owner, repo, branch) => {
    const staticContentBaseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${staticPath}/`
    const removeImageBaseUrl = (url) => {
      if (url.href.startsWith(staticContentBaseUrl)) {
        const relativePath = url.href.slice(staticContentBaseUrl.length)
        return `/${relativePath}`
      }
    }

    const html = editor.getHTML()

    const htmlToMarkdownProcessor = unified()
      .use(htmlParse)
      .use(htmlParseUrl, removeImageBaseUrl)
      .use(htmlToMarkdown)
      .use(markdownStringify)

    let {
      contents: markdown
    } = await htmlToMarkdownProcessor.process(html)

    if (contentFrontmatter) {
      const frontmatter = yaml.stringify(contentFrontmatter)
      markdown = `---\n${frontmatter}---\n\n${markdown}`
    }

    return markdown
  }

  const setContent = async (owner, repo, branch, content) => {
    const staticContentBaseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${staticPath}/`

    const markdownToHtmlProcessor = unified()
      .use(markdownParse)
      .use(markdownParseFrontmatter, ['yaml'])
      .use(markdownExtractFrontmatter, { yaml: yaml.parse })
      .use(markdownUnwrapImages)
      .use(markdownAbsoluteImages, { absolutePath: staticContentBaseUrl })
      .use(markdownToHtml)
      .use(htmlStringify)

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
    const contentPath = `${docsPath}${filePath}`
    const contentBranch = `edit/${contentPath.replaceAll(/[\/\.]/g, '-')}`

    setGithub(github)
    setContentBranch(contentBranch)
    setContentPath(contentPath)
  }

  const open = async () => {
    const {owner, repo} = await requestRepo(github.user, docsRepo)
    const branch = await requestBranch(owner, repo, contentBranch)
    const content = await requestContent(owner, repo, branch, contentPath)
    await setContent(owner, repo, branch, content)
  }

  const save = async () => {
    const {owner, repo} = await requestRepo(github.user, docsRepo)
    const branch = await requestBranch(owner, repo, contentBranch)
    const content = await getContent(owner, repo, branch)
    await requestCommit(owner, repo, branch, contentPath, content)
  }

  const submit = async () => {
    const content = await getContent()
    const {owner, repo} = await requestRepo(github.user, docsRepo)
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
          <EditorMenu editor={editor} save={save} submit={submit} syncing={syncing} />
          <EditorPage editor={editor} />
        </div>
      :
        <EditorLogin />
      }
    </>
  )
}
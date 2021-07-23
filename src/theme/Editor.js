import React, { useEffect, useState } from 'react'

import clsx from 'clsx'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'

import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Octokit } from '@octokit/core'
import  { restEndpointMethods } from '@octokit/plugin-rest-endpoint-methods'

import unified from 'unified'
import markdown from 'remark-parse'
import frontmatter from 'remark-frontmatter'
import remark2rehype from 'remark-rehype'
import stringify from 'rehype-stringify'

import EditorMenu from '@theme/EditorMenu'
import EditorPage from '@theme/EditorPage'
import EditorLogin from '@theme/EditorLogin'

import './Editor.css'

export default function Editor({ options, className }) {
  const {
    siteConfig: {
      organizationName,
      projectName,
    }
  } = useDocusaurusContext()

  const {
    docsPath,
    github: {
      clientId,
      tokenUri
    }
  } = options

  const [github, setGithub] = useState()

  const editBaseUrl = useBaseUrl('/edit')

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    autofocus: 'start',
  })

  const getCode = () => {
    const codeUri = new URL('https://github.com/login/oauth/authorize')
    const redirectUri = window.location.origin + window.location.pathname

    const parameters = codeUri.searchParams
    parameters.append('client_id', clientId)
    parameters.append('redirect_uri', redirectUri)
    parameters.append('scope', 'public_repo')

    window.location.replace(codeUri.href)
  }

  const getToken = (code) => {
    const redirectUri = window.location.origin + window.location.pathname

    fetch(tokenUri + code)
      .then(response => response.json())
      .then(data => sessionStorage.setItem('token', data.token))
      .then(() => window.location.replace(redirectUri))
  }

  const getContent = async (contentPath) => {
    const {
      data: {
        login
      }
    } = await github.users.getAuthenticated()

    const {
      data: {
        download_url
      }
    } = await github.repos.getContent({
      owner: login,
      repo: projectName,
      path: contentPath
    })

    const response = await fetch(download_url)
    const text = await response.text()

    unified()
      .use(markdown)
      .use(frontmatter, ['yaml'])
      .use(remark2rehype)
      .use(stringify)
      .process(text, function (err, file) {
        if (err) throw err
        editor.chain().setContent(String(file)).focus('start').run()
      })
  }

  const forkRepository = (options) => {
    return new Promise((resolve, reject) => {
      github.repos.createFork(options)
        .then(fork => {
          const {
            data: {
              owner: {
                login
              }
            }
          } = fork

          const interval = setInterval(() => {
            try {
              github.repos.get({
                owner: login,
                repo
              })
            } catch (error) {
              if (error.status !== 404) reject(error)
            }

            clearInterval(interval)
            resolve(fork)
          }, 2000)
        })
        .catch(error => reject(error))
    })
  }

  const getOrForkRepository = async () => {
    let repository

    const {
      data: {
        login
      }
    } = await github.users.getAuthenticated()

    try {
      repository = await github.repos.get({
        owner: login,
        repo: projectName,
      });
    } catch (error) {
      if (error.status === 404) {
        repository = await forkRepository({
          owner: organizationName,
          repo: projectName
        })
      } else {
        throw error
      }
    }

    // Sanity check as the user might have a
    // similarly named repository that is not a fork
    if ((login !== organizationName)) {
      const {
        data: {
          parent
        }
      } = repository

      if (parent) {
        const {
          name: parentName,
          owner: {
            login: parentLogin
          }
        } = parent
        if ((parentLogin !== organizationName) && (parentName !== projectName)) {
          throw `Repository is not a fork of ${organizationName}/${projectName}`
        }
      } else {
        throw `Repository is not a fork of ${organizationName}/${projectName}`
      }
    }

    return repository
  }

  const updateFork = async (repository) => {
    // Create and merge pull request from upstream latest commit to default branch
  }

  const createBranch = async (repository, branchName) => {
    const {
      data: {
        default_branch,
        name,
        owner: {
          login
        }
      }
    } = repository

    const {
      data: {
        object: {
          sha
        }
      }
    } = await github.git.getRef({
      owner: login,
      repo: name,
      ref: 'heads/' + default_branch,
    })

    console.log(sha)
    const branch = await github.git.createRef({
      owner: login,
      repo: name,
      ref: 'refs/heads/' + branchName,
      sha,
    });

    return branch
  }

  const getOrCreateBranch = async (repository, branchName) => {
    let branch

    const {
      data: {
        name,
        owner: {
          login
        }
      }
    } = repository
    const ref = 'heads/' + branchName

    try {
      branch = await github.git.getRef({
        owner: login,
        repo: name,
        ref
      })
    } catch (error) {
      if (error.status === 404) {
        if (login !== organizationName) await updateFork(repository)

        branch = await createBranch(repository, branchName)
      } else {
        throw error
      }
    }

    return branch
  }

  useEffect(() => {
    /*
      1. Check if repo exists for user
        No: create and wait for fork
      2. Check if branch exists for this file
        No:
          1. create and merge PR from upstream
          2. check if file exists
            Yes: create branch
            No: fail
      3. Fetch file contents from branch
    */
    if (github) {
      const filePath = window.location.pathname.slice(editBaseUrl.length)
      if (filePath) {
        const contentPath = docsPath + filePath + '.md'
        const branchName = 'edit/' + contentPath.replaceAll(/[\/\.]/g, '-')

        getOrForkRepository()
          .then(repository => getOrCreateBranch(repository, branchName))
      }
    }
  }, [github])

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (token) {
      const OctokitRest = Octokit.plugin(restEndpointMethods);
      const octokitRest = new OctokitRest({ auth: token });
      setGithub(octokitRest.rest)
    } else {
      const parameters = new URLSearchParams(window.location.search)
      if (parameters.has('code')) {
        getToken(parameters.get('code'))
      } else {
        getCode()
      }
    }
  }, [])

  return (
    <>
      {github ?
        <div className={clsx('editor', className)}>
          <EditorMenu editor={editor} />
          <EditorPage editor={editor} />
        </div>
      :
        <EditorLogin />
      }
    </>
  )
}
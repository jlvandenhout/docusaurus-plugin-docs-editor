import React, { useEffect, useState } from 'react'
import { useEditor } from '@tiptap/react'
import clsx from 'clsx'
import StarterKit from '@tiptap/starter-kit'
import EditorMenu from '@theme/EditorMenu'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import unified from 'unified'
import markdown from 'remark-parse'
import frontmatter from 'remark-frontmatter'
import remark2rehype from 'remark-rehype'
import stringify from 'rehype-stringify'
import EditorPage from '@theme/EditorPage'
import styles from './styles.module.css'

export default function Editor({options}) {
  const {
    siteConfig: {
      organizationName,
      projectName,
    }
  } = useDocusaurusContext()
  const [token, setToken] = useState(null)
  const baseUrl = useBaseUrl('/edit')

  const getCode = () => {
    const url = new URL('https://github.com/login/oauth/authorize')
    const parameters = url.searchParams
    parameters.append('client_id', options.github.clientId)
    parameters.append('redirect_uri', window.location.href)
    window.location.replace(url.href)
  }

  const getToken = (code) => {
    localStorage.setItem('token', `[TOKEN_FROM_CODE: ${code}]`)

    window.location.replace(window.location.origin + window.location.pathname)
  }

  const updateToken = (event) => {
    if (!event.key || event.key === 'token') {
      setToken(event.newValue)
    }
  }

  const logOut = () => {
    setToken(null)
    localStorage.removeItem('token')
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    autofocus: 'start',
    onBeforeCreate: async ({ editor }) => {
      const url = new URL(window.location.href)
      const path = url.pathname.slice(baseUrl.length)

      if (path) {
        let response = await fetch(`https://raw.githubusercontent.com/${organizationName}/${projectName}/master${options.path}${path}.md`)
        if (response.ok) {
          let text = await response.text()

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
      }
    },
  })

  useEffect(() => {
    window.addEventListener('storage', updateToken)

    const token = localStorage.getItem('token')
    if (localStorage.getItem('token')) {
      setToken(token)
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
      {token ?
        <div className={clsx(styles.editor)}>
          <EditorMenu editor={editor} logOut={logOut} />
          <EditorPage editor={editor} />
        </div>
      :
        <button onClick={getCode}>Log in</button>
      }
    </>
  )
}
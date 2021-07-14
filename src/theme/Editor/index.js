import React from 'react'
import { useEditor } from '@tiptap/react'
import clsx from 'clsx'
import StarterKit from '@tiptap/starter-kit'
import EditorMenu from '@theme/EditorMenu'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import unified from 'unified'
import markdown from 'remark-parse'
import frontmatter from 'remark-frontmatter'
import remark2rehype from 'remark-rehype'
import stringify from 'rehype-stringify'
import EditorPage from '@theme/EditorPage'
import './index.css'

export default function Editor() {
  const {
    siteConfig: {
      organizationName,
      projectName,
    }
  } = useDocusaurusContext()

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    autofocus: 'start',
    onBeforeCreate: async ({ editor }) => {
      let parameters = new URLSearchParams(window.location.search)
      let path = parameters.get("path")

      if (path) {
        let response = await fetch(`https://raw.githubusercontent.com/${organizationName}/${projectName}/develop${path}`)
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

  return (
    <div className='editor'>
      <EditorMenu editor={editor} />
      <EditorPage editor={editor} />
    </div>
  )
}
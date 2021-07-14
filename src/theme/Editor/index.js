import React from 'react'
import useBaseUrl from '@docusaurus/useBaseUrl'
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
import styles from './styles.module.css'

export default function Editor({options}) {
  const {
    siteConfig: {
      organizationName,
      projectName,
    }
  } = useDocusaurusContext()

  const url = useBaseUrl('edit')

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    autofocus: 'start',
    onBeforeCreate: async ({ editor }) => {
      const params = new URLSearchParams(window.location.search)
      const filePath = params.get('path')

      if (filePath) {
        let response = await fetch(`https://raw.githubusercontent.com/${organizationName}/${projectName}/master${options.path}${filePath}.md`)
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
    <div className={clsx(styles.editor)}>
      <EditorMenu editor={editor} />
      <EditorPage editor={editor} />
    </div>
  )
}
import React from 'react'
import { EditorContent } from '@tiptap/react'
import clsx from 'clsx'
import styles from './styles.module.css'

export default function EditorPage({ editor, className }) {
  const focus = (event) => {
    event.preventDefault()

    editor.chain().focus().run()
  }

  return (
    <div className={clsx(styles.page, className)} onClick={focus}>
      <EditorContent
        editor={editor}
        className={clsx(
          styles.content
        )}
      />
    </div>
  )
}
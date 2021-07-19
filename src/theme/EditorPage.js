import React from 'react'
import { EditorContent } from '@tiptap/react'
import clsx from 'clsx'

export default function EditorPage({ editor, className }) {
  return (
    <div
      className={clsx('editor__page', className)}
      onClick={() => editor.chain().focus().run()}
    >
      <EditorContent editor={editor} className='editor__content' />
    </div>
  )
}
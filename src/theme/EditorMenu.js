import React from 'react'
import clsx from 'clsx'
import Head from '@docusaurus/Head'


const headingLevels = [1, 2, 3, 4, 5, 6]


const EditorGroup = ({children}) => {
  return (
    <div className={clsx('editor__group', 'padding-horiz--xs')}>
      {children}
    </div>
  )
}


const EditorIcon = ({ editor, name, action, children }) => {
  return (
    <button
      className={clsx(
        'editor__icon',
        'margin-horiz--xs',
        name && editor.isActive(name) && 'editor__icon--active',
      )}
      onClick={action}
    >
      <span className='material-icons'>{children}</span>
    </button>
  )
}


export default function EditorMenu({ editor, commit, className }) {
  const changeFontStyle = (event) => {
    event.preventDefault()

    const value = event.target.value
    if (value == 'paragraph') {
      editor.chain().focus().setParagraph().run()
    } else {
      const level = parseInt(value)
      if (headingLevels.includes(level)) {
        editor.chain().focus().toggleHeading({ level }).run()
      }
    }
  }

  const checkFontStyle = () => {
    const active = []

    if (editor.isActive('paragraph')) {
      active.push('paragraph')
    }

    for (const level of headingLevels) {
      if (editor.isActive('heading', { level })) {
        active.push(level.toString())
      }
    }

    return active.length == 1 ? active[0] : ''
  }

  if (!editor) {
    return null
  }

  return (
    <>
      <Head>
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'></link>
      </Head>
      <div className={clsx('editor__menu', 'padding-vert--sm', className)}>
        <EditorGroup>
          <EditorIcon editor={editor} action={() => editor.chain().focus().undo().run()}>
            undo
          </EditorIcon>
          <EditorIcon editor={editor} action={() => editor.chain().focus().redo().run()}>
            redo
          </EditorIcon>
        </EditorGroup>
        <EditorGroup>
          <select
            className={clsx('editor__select', 'margin-horiz--xs')}
            value={checkFontStyle()}
            onChange={changeFontStyle}
          >
            <option hidden disabled value=''></option>
            <option value='paragraph'>Normal text</option>
            {headingLevels.map((level) => {
              return <option key={level} value={level}>{`Heading ${level}`}</option>
            })}
          </select>
        </EditorGroup>
        <EditorGroup>
          <EditorIcon editor={editor} action={() => editor.chain().focus().toggleBold().run()} name='bold'>
            format_bold
          </EditorIcon>
          <EditorIcon editor={editor} action={() => editor.chain().focus().toggleItalic().run()} name='italic'>
            format_italic
          </EditorIcon>
          <EditorIcon editor={editor} action={() => editor.chain().focus().toggleCode().run()} name='code'>
            code
          </EditorIcon>
        </EditorGroup>
        <EditorGroup>
          <EditorIcon editor={editor} action={() => editor.chain().focus().toggleBulletList().run()} name='bulletList'>
            format_list_bulleted
          </EditorIcon>
          <EditorIcon editor={editor} action={() => editor.chain().focus().toggleOrderedList().run()} name='orderedList'>
            format_list_numbered
          </EditorIcon>
          <EditorIcon editor={editor} action={() => editor.chain().focus().toggleCodeBlock().run()} name='codeBlock'>
            code
          </EditorIcon>
          <EditorIcon editor={editor} action={() => editor.chain().focus().toggleBlockquote().run()} name='blockquote'>
            format_quote
          </EditorIcon>
        </EditorGroup>
        <EditorGroup>
          <EditorIcon editor={editor} action={() => editor.chain().focus().setHorizontalRule().run()}>
            horizontal_rule
          </EditorIcon>
          <EditorIcon editor={editor} action={() => editor.chain().focus().setHardBreak().run()}>
            keyboard_return
          </EditorIcon>
        </EditorGroup>
        <EditorGroup>
          <EditorIcon editor={editor} action={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
            format_clear
          </EditorIcon>
        </EditorGroup>
        <EditorGroup>
          <EditorIcon editor={editor} action={commit}>
            save
          </EditorIcon>
        </EditorGroup>
      </div>
    </>
  )
}

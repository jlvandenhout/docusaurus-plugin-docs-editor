import React from 'react'
import Head from '@docusaurus/Head'
import EditorIcon from '@theme/EditorIcon'
import clsx from 'clsx'
import styles from './styles.module.css'


const headingLevels = [1, 2, 3, 4, 5, 6]


const Group = ({className, children}) => {
  return (
    <div className={clsx(styles.group, className, 'padding-horiz--xs')}>
      {children}
    </div>
  )
}


export default function EditorMenu({ editor, logOut, className }) {
  const changeFontStyle = (event) => {
    event.preventDefault()

    const value = event.target.value
    if (value == 'paragraph') {
      editor.chain().focus().setParagraph().run()
    } else {
      let level = parseInt(value)
      if (headingLevels.includes(level)) {
        editor.chain().focus().toggleHeading({ level: level }).run()
      }
    }
  }

  const checkFontStyle = () => {
    let active = []

    if (editor.isActive('paragraph')) {
      active.push('paragraph')
    }

    for (const level of headingLevels) {
      if (editor.isActive('heading', { level: level })) {
        active.push(level.toString())
      }
    }

    return active.length == 1 ? active[0] : ''
  }

  if (!editor) {
    return null
  }

  return (
    <div className={clsx(className, styles.menu, 'padding-vert--sm padding-horiz--md')}>
      <Head>
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'></link>
      </Head>
      <Group>
        <EditorIcon editor={editor} action={() => editor.chain().focus().undo().run()}>
          undo
        </EditorIcon>
        <EditorIcon editor={editor} action={() => editor.chain().focus().redo().run()}>
          redo
        </EditorIcon>
      </Group>
      <Group>
        <select className={clsx(styles.select, 'margin-horiz--xs')} value={checkFontStyle()} onChange={changeFontStyle}>
          <option hidden disabled value=''></option>
          <option value='paragraph'>Normal text</option>
          {headingLevels.map((level) => {
            return <option key={level} value={level}>{`Heading ${level}`}</option>
          })}
        </select>
      </Group>
      <Group>
        <EditorIcon editor={editor} action={() => editor.chain().focus().toggleBold().run()} name='bold'>
          format_bold
        </EditorIcon>
        <EditorIcon editor={editor} action={() => editor.chain().focus().toggleItalic().run()} name='italic'>
          format_italic
        </EditorIcon>
        <EditorIcon editor={editor} action={() => editor.chain().focus().toggleCode().run()} name='code'>
          code
        </EditorIcon>
      </Group>
      <Group>
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
      </Group>
      <Group>
        <EditorIcon editor={editor} action={() => editor.chain().focus().setHorizontalRule().run()}>
          horizontal_rule
        </EditorIcon>
        <EditorIcon editor={editor} action={() => editor.chain().focus().setHardBreak().run()}>
          keyboard_return
        </EditorIcon>
      </Group>
      <Group>
        <EditorIcon editor={editor} action={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
          format_clear
        </EditorIcon>
      </Group>
      <Group>
        <EditorIcon editor={editor} action={logOut}>
          logout
        </EditorIcon>
      </Group>
    </div>
  )
}

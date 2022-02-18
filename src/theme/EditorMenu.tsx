import React, { ReactNode } from 'react';
import clsx from 'clsx';
import Head from '@docusaurus/Head';
import { Editor as EditorType } from '@tiptap/react';

const headingLevels = [1, 2, 3, 4, 5, 6];

interface EditorGroupProps {
  children?: ReactNode;
}

const EditorGroup = ({ children }: EditorGroupProps) => {
  return (
    <div
      className={clsx('editor__group', 'margin-vert--sm', 'padding-horiz--xs')}
    >
      {children}
    </div>
  );
};

interface EditorControlProps {
  editor: EditorType;
  name?: string;
  action: () => void;
  children?: ReactNode;
}

const EditorControl = ({
  editor,
  name,
  action,
  children,
}: EditorControlProps) => {
  return (
    <button
      className={clsx(
        'editor__control',
        'margin-horiz--xs',
        name && editor.isActive(name) && 'editor__control--active',
      )}
      onClick={action}
    >
      <span className='editor__icon'>{children}</span>
    </button>
  );
};

interface EditorMenuProps {
  editor: EditorType;
  save: () => void;
  submit: () => void;
  dirty: boolean;
  syncing: boolean;
  pullrequest: string;
  className?: string;
}

export default function EditorMenu({
  editor,
  save,
  submit,
  dirty,
  syncing,
  pullrequest,
  className,
}: EditorMenuProps) {
  const changeFontStyle = (event) => {
    event.preventDefault();

    const value = event.target.value;
    if (value === 'code') {
      editor.chain().focus().clearNodes().setCode().run();
    } else if (value === 'paragraph') {
      editor.chain().focus().unsetCode().setParagraph().run();
    } else {
      if (headingLevels.includes(value)) {
        editor
          .chain()
          .focus()
          .clearNodes()
          .unsetCode()
          .setHeading({ level: value })
          .selectParentNode()
          .unsetCode()
          .run();
      }
    }
  };

  const checkFontStyle = () => {
    const active = [];
    if (editor.isActive('code')) {
      active.push('code');
    }

    if (editor.isActive('paragraph')) {
      active.push('paragraph');
    }

    for (const level of headingLevels) {
      if (editor.isActive('heading', { level })) {
        active.push(level.toString());
      }
    }

    return active.length == 1 ? active[0] : '';
  };

  const onSave = () => {
    editor.chain().focus().run();
    save();
  };

  const onSubmit = () => {
    editor.chain().focus().run();
    submit();
  };

  const toggleLink = () => {
    if (editor.isActive('link')) {
      const state = editor.state;

      const { from, to } = state.selection;
      let marks = [];
      state.doc.nodesBetween(from, to, (node) => {
        marks = [...marks, ...node.marks];
      });

      const mark = marks.find((markItem) => markItem.type.name === 'link');

      let url = mark && mark.attrs.href ? mark.attrs.href : '';
      url = window.prompt('Update or remove the URL', url);

      if (url) {
        editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: url })
          .run();
      } else {
        editor.chain().focus().unsetLink().run();
      }
    } else {
      const url = window.prompt('Add a URL');

      if (url) {
        editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: url })
          .run();
      }
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <>
      <Head>
        <link
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
          rel='stylesheet'
        ></link>
      </Head>
      <div className={clsx('editor__menu', className)}>
        <div className={clsx('editor__submenu')}>
          <EditorGroup>
            <EditorControl
              editor={editor}
              action={() => editor.chain().focus().undo().run()}
            >
              undo
            </EditorControl>
            <EditorControl
              editor={editor}
              action={() => editor.chain().focus().redo().run()}
            >
              redo
            </EditorControl>
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
                return (
                  <option
                    key={level}
                    value={level}
                  >{`Heading ${level}`}</option>
                );
              })}
              <option value='code'>Inline code</option>
            </select>
          </EditorGroup>
          <EditorGroup>
            <EditorControl
              editor={editor}
              action={() => editor.chain().focus().toggleBold().run()}
              name='bold'
            >
              format_bold
            </EditorControl>
            <EditorControl
              editor={editor}
              action={() => editor.chain().focus().toggleItalic().run()}
              name='italic'
            >
              format_italic
            </EditorControl>
            <EditorControl editor={editor} action={toggleLink} name='link'>
              link
            </EditorControl>
          </EditorGroup>
          <EditorGroup>
            <EditorControl
              editor={editor}
              action={() => editor.chain().focus().toggleBulletList().run()}
              name='bulletList'
            >
              format_list_bulleted
            </EditorControl>
            <EditorControl
              editor={editor}
              action={() => editor.chain().focus().toggleOrderedList().run()}
              name='orderedList'
            >
              format_list_numbered
            </EditorControl>
            <EditorControl
              editor={editor}
              action={() => editor.chain().focus().toggleCodeBlock().run()}
              name='codeBlock'
            >
              code
            </EditorControl>
            <EditorControl
              editor={editor}
              action={() => editor.chain().focus().toggleBlockquote().run()}
              name='blockquote'
            >
              format_quote
            </EditorControl>
          </EditorGroup>
          <EditorGroup>
            <EditorControl
              editor={editor}
              action={() => editor.chain().focus().setHorizontalRule().run()}
            >
              horizontal_rule
            </EditorControl>
            <EditorControl
              editor={editor}
              action={() => editor.chain().focus().setHardBreak().run()}
            >
              keyboard_return
            </EditorControl>
          </EditorGroup>
          <EditorGroup>
            <EditorControl
              editor={editor}
              action={() =>
                editor.chain().focus().unsetAllMarks().clearNodes().run()
              }
            >
              format_clear
            </EditorControl>
          </EditorGroup>
        </div>
        <div className={clsx('editor__submenu')}>
          <EditorGroup>
            <button
              className='button button--sm button--primary margin-horiz--xs'
              disabled={syncing || !dirty}
              onClick={onSave}
            >
              Save
            </button>
            {pullrequest ? (
              <a
                className='button button--sm button--outline button--primary margin-horiz--xs'
                href={pullrequest}
                target='_blank'
                rel='noreferrer'
              >
                Review
              </a>
            ) : (
              <button
                className='button button--sm button--primary margin-horiz--xs'
                disabled={syncing}
                onClick={onSubmit}
              >
                Submit
              </button>
            )}
          </EditorGroup>
        </div>
      </div>
    </>
  );
}

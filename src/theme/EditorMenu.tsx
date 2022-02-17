import React from 'react';
import clsx from 'clsx';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@docusaurus/Head' or its corre... Remove this comment to see the full error message
import Head from '@docusaurus/Head';

const headingLevels = [1, 2, 3, 4, 5, 6];

const EditorGroup = ({
  children
}: any) => {
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div
      className={clsx('editor__group', 'margin-vert--sm', 'padding-horiz--xs')}
    >
      {children}
    </div>
  );
};

const EditorControl = ({
  editor,
  name,
  action,
  children
}: any) => {
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <button
      className={clsx(
        'editor__control',
        'margin-horiz--xs',
        name && editor.isActive(name) && 'editor__control--active',
      )}
      onClick={action}
    >
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <span className='editor__icon'>{children}</span>
    </button>
  );
};

export default function EditorMenu({
  editor,
  save,
  submit,
  dirty,
  syncing,
  pullrequest,
  className
}: any) {
  const changeFontStyle = (event: any) => {
    event.preventDefault();

    const value = event.target.value;
    if (value === 'code') {
      editor.chain().focus().clearNodes().setCode().run();
    } else if (value === 'paragraph') {
      editor.chain().focus().unsetCode().setParagraph().run();
    } else {
      const level = parseInt(value);
      if (headingLevels.includes(level)) {
        editor
          .chain()
          .focus()
          .clearNodes()
          .unsetCode()
          .setHeading({ level })
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
      let marks: any = [];
      state.doc.nodesBetween(from, to, (node: any) => {
        marks = [...marks, ...node.marks];
      });

      // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'markItem' implicitly has an 'any' type.
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
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Head>
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <link
          href='https://fonts.googleapis.com/icon?family=Material+Icons'
          rel='stylesheet'
        ></link>
      </Head>
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={clsx('editor__menu', className)}>
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={clsx('editor__submenu')}>
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <EditorGroup>
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <EditorControl
              editor={editor}
              action={() => editor.chain().focus().undo().run()}
            >
              undo
            </EditorControl>
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <EditorControl
              editor={editor}
              action={() => editor.chain().focus().redo().run()}
            >
              redo
            </EditorControl>
          </EditorGroup>
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <EditorGroup>
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <select
              className={clsx('editor__select', 'margin-horiz--xs')}
              value={checkFontStyle()}
              onChange={changeFontStyle}
            >
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <option hidden disabled value=''></option>
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <option value='paragraph'>Normal text</option>
              {headingLevels.map((level) => {
                return (
                  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <option
                    key={level}
                    value={level}
                  >{`Heading ${level}`}</option>
                );
              })}
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <option value='code'>Inline code</option>
            </select>
          </EditorGroup>
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <EditorGroup>
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <EditorControl
              editor={editor}
              action={() => editor.chain().focus().toggleBold().run()}
              name='bold'
            >
              format_bold
            </EditorControl>
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <EditorControl
              editor={editor}
              action={() => editor.chain().focus().toggleItalic().run()}
              name='italic'
            >
              format_italic
            </EditorControl>
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <EditorControl editor={editor} action={toggleLink} name='link'>
              link
            </EditorControl>
          </EditorGroup>
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <EditorGroup>
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <EditorControl
              editor={editor}
              action={() => editor.chain().focus().toggleBulletList().run()}
              name='bulletList'
            >
              format_list_bulleted
            </EditorControl>
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <EditorControl
              editor={editor}
              action={() => editor.chain().focus().toggleOrderedList().run()}
              name='orderedList'
            >
              format_list_numbered
            </EditorControl>
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <EditorControl
              editor={editor}
              action={() => editor.chain().focus().toggleCodeBlock().run()}
              name='codeBlock'
            >
              code
            </EditorControl>
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <EditorControl
              editor={editor}
              action={() => editor.chain().focus().toggleBlockquote().run()}
              name='blockquote'
            >
              format_quote
            </EditorControl>
          </EditorGroup>
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <EditorGroup>
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <EditorControl
              editor={editor}
              action={() => editor.chain().focus().setHorizontalRule().run()}
            >
              horizontal_rule
            </EditorControl>
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <EditorControl
              editor={editor}
              action={() => editor.chain().focus().setHardBreak().run()}
            >
              keyboard_return
            </EditorControl>
          </EditorGroup>
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <EditorGroup>
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className={clsx('editor__submenu')}>
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <EditorGroup>
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <button
              className='button button--sm button--primary margin-horiz--xs'
              disabled={syncing || !dirty}
              onClick={onSave}
            >
              Save
            </button>
            {pullrequest ? (
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <a
                className='button button--sm button--outline button--primary margin-horiz--xs'
                href={pullrequest}
                target='_blank'
                rel='noreferrer'
              >
                Review
              </a>
            ) : (
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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

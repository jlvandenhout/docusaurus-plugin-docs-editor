import React from 'react';
import { EditorContent } from '@tiptap/react';
import clsx from 'clsx';

export default function EditorPage({
  editor,
  className
}: any) {
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className={clsx('editor__page', className)}>
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <EditorContent editor={editor} className='editor__content' />
    </div>
  );
}

import React from 'react';
import { EditorContent, Editor as EditorType } from '@tiptap/react';
import clsx from 'clsx';

interface EditorPageProps {
  editor: EditorType;
  className?: string;
}

export default function EditorPage({ editor, className }: EditorPageProps) {
  return (
    <div className={clsx('editor__page', className)}>
      <EditorContent editor={editor} className='editor__content' />
    </div>
  );
}

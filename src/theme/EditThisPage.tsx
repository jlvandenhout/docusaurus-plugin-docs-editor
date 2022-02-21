import React from 'react';
import { useLocation } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { usePluginData } from '@docusaurus/useGlobalData';
import Translate from '@docusaurus/Translate';
import { useActivePlugin } from '@docusaurus/plugin-content-docs/client';
import { EditorOptions } from '@theme/Editor';

interface EditThisPageProps {
  editUrl: string;
}

export default function EditThisPage({ editUrl }: EditThisPageProps) {
  const { pathname } = useLocation();
  console.log(pathname);
  const activePlugin = useActivePlugin();
  console.log(activePlugin);
  const { route } = usePluginData(
    'docusaurus-plugin-docs-editor',
  ) as EditorOptions;

  const getPath = () => {
    if (activePlugin) {
      let relativePath = pathname.replace(/^\/*|\/*$/g, '');
      return `/${route}/${relativePath}`;
    }
  };

  const docPath = getPath();
  console.log(docPath);
  const editPath = useBaseUrl(docPath);
  console.log(editPath);

  return (
    <>
      {docPath && (
        <>
          <a href={editPath} target='_blank' rel='noreferrer noopener'>
            Open in editor
          </a>
          <span className='margin-horiz--sm'>|</span>
        </>
      )}
      <a href={editUrl} target='_blank' rel='noreferrer noopener'>
        <Translate
          id='theme.common.editThisPage'
          description='The link label to edit the current page'
        >
          Open on GitHub
        </Translate>
      </a>
    </>
  );
}

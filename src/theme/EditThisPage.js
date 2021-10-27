import React from 'react';
import { useLocation } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { usePluginData } from '@docusaurus/useGlobalData';
import Translate from '@docusaurus/Translate';
import { useActivePlugin } from '@theme/hooks/useDocs';

export default function EditThisPage({ editUrl }) {
  const { pathname } = useLocation();
  const activePlugin = useActivePlugin();
  const editorOptions = usePluginData('docusaurus-plugin-docs-editor');

  const getPath = () => {
    if (activePlugin) {
      let relativePath = pathname;
      if (pathname.startsWith('/')) {
        relativePath = relativePath.slice(1);
      }
      return `/${editorOptions.route}/${relativePath}`;
    }
  };

  const docPath = getPath();

  return (
    <>
      {docPath && (
        <>
          <a
            href={useBaseUrl(docPath)}
            target="_blank"
            rel="noreferrer noopener">
            Open in editor
          </a>
          <span className="margin-horiz--sm">|</span>
        </>
      )}
      <a href={editUrl} target="_blank" rel="noreferrer noopener">
        <Translate
          id="theme.common.editThisPage"
          description="The link label to edit the current page">
          Open on GitHub
        </Translate>
      </a>
    </>
  );
}

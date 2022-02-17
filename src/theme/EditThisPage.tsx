import React from 'react';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@docusaurus/router' or its cor... Remove this comment to see the full error message
import { useLocation } from '@docusaurus/router';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@docusaurus/useBaseUrl' or its... Remove this comment to see the full error message
import useBaseUrl from '@docusaurus/useBaseUrl';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@docusaurus/useGlobalData' or ... Remove this comment to see the full error message
import { usePluginData } from '@docusaurus/useGlobalData';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@docusaurus/Translate' or its ... Remove this comment to see the full error message
import Translate from '@docusaurus/Translate';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '@docusaurus/plugin-content-doc... Remove this comment to see the full error message
import { useActivePlugin } from '@docusaurus/plugin-content-docs/client';

export default function EditThisPage({
  editUrl
}: any) {
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
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      {docPath && (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <>
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <a
            href={useBaseUrl(docPath)}
            target='_blank'
            rel='noreferrer noopener'
          >
            Open in editor
          </a>
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <span className='margin-horiz--sm'>|</span>
        </>
      )}
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <a href={editUrl} target='_blank' rel='noreferrer noopener'>
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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

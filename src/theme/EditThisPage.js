import React from 'react';
import { useLocation } from '@docusaurus/router'
import useBaseUrl from '@docusaurus/useBaseUrl'
import { usePluginData } from '@docusaurus/useGlobalData';
import Head from '@docusaurus/Head'
import { useActivePlugin } from '@theme/hooks/useDocs'


export default function EditThisPage() {
  const { pathname } = useLocation()
  const activePlugin = useActivePlugin()
  const editorOptions = usePluginData('docusaurus-plugin-docs-editor')

  const getPath = () => {
    if (activePlugin) {
      const pathnameBase = activePlugin.pluginData.path
      const relativePath = pathname.slice(pathnameBase.length)
      return `/${editorOptions.route}${relativePath}.md`
    }
  }

  const docPath = getPath()

  return (
    <>
      <Head>
        <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'></link>
      </Head>
      { docPath &&
        <a href={useBaseUrl(docPath)} target="_blank" rel="noreferrer noopener">
          <span className='material-icons'>edit</span>
        </a>
      }
    </>
  );
}

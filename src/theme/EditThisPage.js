import React from 'react';
import { useLocation } from '@docusaurus/router'
import useBaseUrl from '@docusaurus/useBaseUrl'
import { useActivePlugin } from '@theme/hooks/useDocs'


export default function EditThisPage() {
  const { pathname } = useLocation()
  const activePlugin = useActivePlugin()

  const getPath = () => {
    if (activePlugin) {
      const pathnameBase = activePlugin.pluginData.path
      return pathname.slice(pathnameBase.length)
    }
  }

  const docPath = getPath()

  return (
    <>
      { docPath &&
        <a href={useBaseUrl('/edit' + docPath)} target="_blank" rel="noreferrer noopener">
          <span className='material-icons'>edit</span>
        </a>
      }
    </>
  );
}

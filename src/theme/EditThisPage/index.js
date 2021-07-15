/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { useLocation } from '@docusaurus/router'
import useBaseUrl from '@docusaurus/useBaseUrl'
import { useActivePlugin } from '@theme/hooks/useDocs'
import IconEdit from '@theme/IconEdit';
import IconGithub from '@theme/IconGithub';

export default function EditThisPage({editUrl}) {
  const { pathname } = useLocation()
  const activePlugin = useActivePlugin()

  const getPath = () => {
    if (activePlugin) {
      const pathnameBase = activePlugin.pluginData.path
      if (pathname.startsWith(pathnameBase)) {
        return pathname.slice(pathnameBase.length)
      }
    }
  }

  const docPath = getPath()

  return (
    <>
      { docPath &&
        <a href={useBaseUrl('/edit' + docPath)} target="_blank" rel="noreferrer noopener">
          <IconEdit />
        </a>
      }
      <a href={editUrl} target="_blank" rel="noreferrer noopener">
        <IconGithub />
      </a>
    </>
  );
}

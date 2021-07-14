/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import IconEdit from '@theme/IconEdit';
import IconGithub from '@theme/IconGithub';

export default function EditThisPage({editUrl}) {
  const localEditUrl = () => {
    const url = new URL(window.location.href)
    return '/edit' + url.pathname
  }
  return (
    <>
      <a href={localEditUrl()} target="_blank" rel="noreferrer noopener">
        <IconEdit />
      </a>
      <a href={editUrl} target="_blank" rel="noreferrer noopener">
        <IconGithub />
      </a>
    </>
  );
}

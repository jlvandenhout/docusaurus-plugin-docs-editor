import React, { useState } from 'react';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';

import clsx from 'clsx';

export default ({
  node: {
    attrs: { language: defaultLanguage },
  },

  updateAttributes,
  extension
}: any) => {
  const [language, setLanguage] = useState(defaultLanguage);

  const updateLanguage = (language: any) => {
    setLanguage(language);
    updateAttributes({ language });
  };

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <NodeViewWrapper className='codeblock'>
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <select
        className='codeblock__language'
        contentEditable={false}
        defaultValue={defaultLanguage}
        onChange={(event) => updateLanguage(event.target.value)}
      >
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <option value>auto</option>
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <option disabled>---</option>
        {extension.options.lowlight.listLanguages().map((lang: any, index: any) => (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <option key={index} value={lang}>
            {lang}
          </option>
        ))}
      </select>
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <pre className='codeblock__code'>
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <NodeViewContent
          as='code'
          className={clsx(language ? `language-${language}` : '')}
        />
      </pre>
    </NodeViewWrapper>
  );
};

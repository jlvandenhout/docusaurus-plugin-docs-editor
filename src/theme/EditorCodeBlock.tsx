import React, { useState } from 'react';
import { NodeViewProps, NodeViewWrapper, NodeViewContent } from '@tiptap/react';

import clsx from 'clsx';

export default function EditorCodeBlock({
  node: {
    attrs: { language: defaultLanguage },
  },

  updateAttributes,
  extension,
}: NodeViewProps) {
  const [language, setLanguage] = useState(defaultLanguage);

  const updateLanguage = (language) => {
    setLanguage(language);
    updateAttributes({ language });
  };

  return (
    <NodeViewWrapper className='codeblock'>
      <select
        className='codeblock__language'
        contentEditable={false}
        defaultValue={defaultLanguage}
        onChange={(event) => updateLanguage(event.target.value)}
      >
        <option value=''>auto</option>
        <option disabled>---</option>
        {extension.options.lowlight.listLanguages().map((lang, index) => (
          <option key={index} value={lang}>
            {lang}
          </option>
        ))}
      </select>
      <pre className='codeblock__code'>
        <NodeViewContent
          as='code'
          className={clsx(language ? `language-${language}` : '')}
        />
      </pre>
    </NodeViewWrapper>
  );
}

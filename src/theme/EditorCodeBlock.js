import React, { useState } from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'

import clsx from 'clsx'

export default ({ node: { attrs: { language: defaultLanguage } }, updateAttributes, extension }) => {
  const [language, setLanguage] = useState(defaultLanguage)

  const updateLanguage = (language) => {
    setLanguage(language)
    updateAttributes({ language })
  }

  return (
    <NodeViewWrapper className='codeblock'>
      <select
        className='codeblock__language'
        contentEditable={false}
        defaultValue={defaultLanguage}
        onChange={event => updateLanguage(event.target.value)}
      >
        <option value>auto</option>
        <option disabled>---</option>
        {extension.options.lowlight.listLanguages().map((lang, index) => (
          <option key={index} value={lang}>{lang}</option>
        ))}
      </select>
      <pre>
        <NodeViewContent as='code' className={clsx(
          'codeblock__code',
          language ? `language-${language}` : ''
        )} />
      </pre>
    </NodeViewWrapper>
  )
}
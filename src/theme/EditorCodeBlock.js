import React from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import 'highlight.js/styles/github.css'


export default ({ node: { attrs: { language } }, updateAttributes, extension }) => (
  <NodeViewWrapper className='editor__codeblock'>
    <select
      className='editor__language-selector'
      contentEditable={false}
      value={language}
      onChange={event => updateAttributes({ language: event.target.value })}
    >
      <option value='null'>
        auto
      </option>
      <option disabled>
        —
      </option>
      {extension.options.lowlight.listLanguages().map((lang, index) => (
        <option key={index} value={lang}>
          {lang}
        </option>
      ))}
    </select>
    <pre>
      <NodeViewContent as='code' className={
        language ? `language-${language}` : ''
      } />
    </pre>
  </NodeViewWrapper>
)
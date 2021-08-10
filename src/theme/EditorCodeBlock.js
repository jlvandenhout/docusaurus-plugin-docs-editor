import React from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'

export default ({ node: { attrs: { language } }, updateAttributes, extension }) => (
  <NodeViewWrapper className="editor__codeblock">
    <select contentEditable={false} defaultValue={language} onChange={event => updateAttributes({ language: event.target.value })}>
      <option value></option>
      {extension.options.lowlight.listLanguages().map((lang, index) => (
        <option key={index} value={lang}>{lang}</option>
      ))}
    </select>
    <pre>
      <NodeViewContent as="code" className={language ? `language-${language}` : ''} />
    </pre>
  </NodeViewWrapper>
)
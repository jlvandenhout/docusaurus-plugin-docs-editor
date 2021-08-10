import React from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'


export default ({ node: { attrs: { language } }, updateAttributes, extension }) => {
  const languages = extension.options.lowlight.listLanguages()

  const updateLanguage = (event) => {
    const language = event.target.value
    if (languages.includes(language)) {
      updateAttributes({ language })
    }
  }

  return (
    <NodeViewWrapper className='editor__codeblock'>
      <input type='text' value={language || ''} onChange={updateLanguage} />
      <pre>
        <NodeViewContent as='code' className={language ? `language-${language}` : ''}/>
      </pre>
    </NodeViewWrapper>
  )
}
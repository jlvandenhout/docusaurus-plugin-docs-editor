import React from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'


export default ({ node: { attrs: { language } }, updateAttributes, extension }) => {
  console.log(language)

  return (
    <NodeViewWrapper className='editor__codeblock'>
      <pre>
        <NodeViewContent as='code' className={language ? `language-${language}` : ''}/>
      </pre>
    </NodeViewWrapper>
  )
}
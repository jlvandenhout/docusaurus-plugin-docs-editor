import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'


const EditorIcon = ({ editor, name, action, children }) => {
  return (
    <button
      className={clsx(
        styles.icon,
        'margin-horiz--xs',
        name && editor.isActive(name) && 'active',
      )}
      onClick={action}
    >
      <span className='material-icons'>{children}</span>
    </button>
  )
}


export default EditorIcon
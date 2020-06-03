import React from 'react'

export const makeLink = ({ tag = 'button', toPropName = 'to', handler } = {}) => {
  const markup = { tag }
  return props => (
    <markup.tag {...props} onClick={e => handler(props[toPropName], e, props.onClick)}>
      {props.children}
    </markup.tag>
  )
}

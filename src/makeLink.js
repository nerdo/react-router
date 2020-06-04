import React, { useState } from 'react'

export const makeLink = ({ tag = 'button', toPropName = 'to', makeHandler } = {}) => {
  const markup = { tag }
  return props => {
    const [handler] = useState(makeHandler)
    return (
      <markup.tag {...props} onClick={e => handler(props[toPropName], e, props.onClick)}>
        {props.children}
      </markup.tag>
    )
  }
}

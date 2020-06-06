import React, { useState } from 'react'

export const makeLink = ({ tag = 'button', toPropName = 'to', makeHandler } = {}) => {
  const markup = { tag }
  return props => {
    const [handler] = useState(makeHandler)
    const {to = props[toPropName], onClick = props.onClick, ...elementProps} = props
    elementProps[`data-${toPropName}`] = to
    elementProps[toPropName] = void 0
    return (
      <markup.tag {...elementProps} onClick={e => handler(to, onClick, e)}>
        {props.children}
      </markup.tag>
    )
  }
}

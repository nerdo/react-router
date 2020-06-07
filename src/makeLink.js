import React, { useState } from 'react'

export const makeLink = ({ tag = 'button', toPropName = 'to', makeHandler, baseProps = {} } = {}) => props => {
  const {
    [toPropName]: to,
    onClick = props.onClick,
    tag: overrideTag,
    ...elementProps
  } = props
  const [handler] = useState(makeHandler)
  elementProps[`data-${toPropName}`] = to
  const expandedBaseProps = Object.keys(baseProps)
    .map(key => ({ [key]: typeof baseProps[key] === 'function' ? baseProps[key]() : baseProps[key] }))
    .reduce((obj, current) => ({ ...obj, ...current }), {})
  const markup = { tag: overrideTag || tag }
  return (
    <markup.tag {...expandedBaseProps} {...elementProps} onClick={e => handler(to, onClick, e)}>
      {props.children}
    </markup.tag>
  )
}

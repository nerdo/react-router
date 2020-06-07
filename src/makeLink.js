import React, { useState } from 'react'

export const makeLink = ({ tag = 'button', toPropName = 'to', makeHandler, baseProps = {} } = {}) => {
  const markup = { tag }
  return props => {
    console.log(`LINK RENDER FUNC CALLED ${props[toPropName]}`)
    const [handler] = useState(makeHandler)
    const { [toPropName]: to, onClick = props.onClick, ...elementProps } = props
    elementProps[`data-${toPropName}`] = to
    const expandedBaseProps = Object.keys(baseProps)
      .map(key => ({ [key]: typeof baseProps[key] === 'function' ? baseProps[key]() : baseProps[key] }))
      .reduce((obj, current) => ({ ...obj, ...current }), {})
    return (
      <markup.tag {...expandedBaseProps} {...elementProps} onClick={e => handler(to, onClick, e)}>
        {props.children}
      </markup.tag>
    )
  }
}

import React from 'react'

export const ProductPage = ({ productId, options = {} }) => (
  <>
    <h3>{productId}</h3>
    <ul>
      {Object.keys(options).map(name => (
        <li key={name}>{name}={options[name]}</li>
      ))}
    </ul>
  </>
)

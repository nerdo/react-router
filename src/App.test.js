import React from 'react'
import { render } from '@testing-library/react'
import { App } from './App'

describe('App', () => {
  it('should render a wrapping <div />', () => {
    const { container } = render(<App />)
    expect(container.firstChild.nodeName).toBe('DIV')
  })
})

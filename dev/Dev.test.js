import React from 'react'
import { render } from '@testing-library/react'
import { Dev } from './Dev'
import { App } from '../src/App'

describe('Dev', () => {
  it('should render an App component', () => {
    const { container } = render(<Dev />)
    expect(container).toBeDefined()
  })
})

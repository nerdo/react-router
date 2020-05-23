import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { App } from './App'

describe('App', () => {
  it('should render', () => {
    expect(() => render(<App />)).not.toThrow()
  })

  it('should render the home page', () => {
    render(<App />)
    expect(screen.getByRole('heading')).toHaveTextContent('Home')
  })
})

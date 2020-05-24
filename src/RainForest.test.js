import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { RainForest } from './RainForest'

describe('RainForest', () => {
  it('should render', () => {
    expect(() => render(<RainForest />)).not.toThrow()
  })

  describe('simple navigation', () => {
    it('should render the correct pages', () => {
      render(<RainForest />)

      expect(screen.getByRole('heading', { name: 'Home'})).toBeInTheDocument()

      userEvent.click(screen.getByRole('button', { name: 'Cart' }))
      expect(screen.getByRole('heading', { name: 'Cart' })).toBeInTheDocument()

      userEvent.click(screen.getByRole('button', { name: 'Home' }))
      expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument()
    })
  })
})
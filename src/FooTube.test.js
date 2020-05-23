import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { FooTube } from './FooTube'

describe('FooTube', () => {
  it('should render', () => {
    expect(() => render(<FooTube />)).not.toThrow()
  })

  describe('default page', () => {
    it('should be HomePage', () => {
      render(<FooTube />)
      expect(screen.getByRole('heading')).toHaveTextContent('Home')
    })
  })

  describe('navigation buttons', () => {
    it('should navigate to the correct pages', () => {
      render(<FooTube />)

      const homePageLink = screen.getByRole('button', { name: 'Home' })
      userEvent.click(homePageLink)
      expect(screen.getByRole('heading')).toHaveTextContent('Home')

      const trendingPageLink = screen.getByRole('button', { name: 'Trending' })
      userEvent.click(trendingPageLink)
      expect(screen.getByRole('heading')).toHaveTextContent('Trending')
    })
  })
})

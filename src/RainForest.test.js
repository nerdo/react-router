import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { RainForest } from './RainForest'
import { makeReactUrlRouter } from './makeReactUrlRouter'

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

  describe('navigation to routes with parameters', () => {
    it('should render correctly', async () => {
      const router = makeReactUrlRouter()
      render(<RainForest router={router} />)
      userEvent.click(screen.getByRole('button', { name: 'Computers'}))

      expect(screen.getByRole('heading', {name: 'Computers'})).toBeInTheDocument()
      userEvent.click(screen.getByRole('button', { name: 'PearBook Amateur' }))

      expect(await screen.findByText('PBP-2020-01')).toBeInTheDocument()

      router.navigate(`${router.history.current.id}?color=black&size=15`)
      expect(await screen.findByText('color=black')).toBeInTheDocument()
      expect(await screen.findByText('size=15')).toBeInTheDocument()
    })
  })
})

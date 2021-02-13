import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { RainForest } from './RainForest'
import { makeReactUrlRouter } from '../makeReactUrlRouter'

describe('RainForest', () => {
  it('should render', () => {
    expect(() => render(<RainForest />)).not.toThrow()
  })

  describe('simple navigation', () => {
    it('should render the correct pages', () => {
      render(<RainForest />)

      expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument()

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
      userEvent.click(screen.getByRole('button', { name: 'Computers' }))

      expect(screen.getByRole('heading', { name: 'Computers' })).toBeInTheDocument()
      userEvent.click(screen.getByRole('button', { name: 'PearBook Amateur' }))

      expect(await screen.findByText('PBP-2020-01')).toBeInTheDocument()

      router.navigate(`${router.history.current.id}?color=black&size=15`)

      expect(await screen.findByText('color=black')).toBeInTheDocument()
      expect(await screen.findByText('size=15')).toBeInTheDocument()
    })
  })

  describe('nested navigation', () => {
    it('should render correctly', async () => {
      render(<RainForest />)

      userEvent.click(screen.getByRole('button', { name: 'Live Streams' }))
      expect(screen.getByRole('heading', { name: 'Live Streams' })).toBeInTheDocument()

      userEvent.click(screen.getByRole('button', { name: 'Rain Forest Live Fitness' }))
      expect(screen.getByRole('heading', { name: 'Rain Forest Live Fitness' })).toBeInTheDocument()
      expect(screen.getByText('ba9ec13d-0327-461e-9aff-9d7c024bcb74')).toBeInTheDocument()

      // Make sure that clicking on a nest multiple times doesn't result in any weird behavior (this covers a bug)
      userEvent.click(screen.getByRole('button', { name: 'Rain Forest Live Fitness' }))
      const link = screen.getByRole('button', { name: 'Rain Forest Live Fitness' })
      const attributes = Array.from(link.attributes)
        .map((attribute) => ({ [attribute.name]: attribute.value }))
        .reduce((obj, current) => ({ ...obj, ...current }), {})
      expect(attributes['data-relative-to']).not.toBe('/live/broadcast/ba9ec13d-0327-461e-9aff-9d7c024bcb74')
      expect(attributes['data-relative-to']).toBe('/live')

      userEvent.click(screen.getByRole('button', { name: 'Technical Stream Details' }))
      expect(await screen.findByText('technical: 1080p')).toBeInTheDocument()

      // Navigating to a non-nest after navigating to a nest should work with no side-effects...
      userEvent.click(screen.getByRole('button', { name: 'Home' }))
      expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument()
    })
  })

  describe('history navigation', () => {
    it('should navigate through history properly', async () => {
      render(<RainForest />)

      expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument()

      userEvent.click(screen.getByRole('button', { name: 'Live Streams' }))
      expect(screen.getByRole('heading', { name: 'Live Streams' })).toBeInTheDocument()

      userEvent.click(screen.getByRole('button', { name: 'Rain Forest Live Fitness' }))
      expect(screen.getByRole('heading', { name: 'Rain Forest Live Fitness' })).toBeInTheDocument()
      expect(screen.getByText('ba9ec13d-0327-461e-9aff-9d7c024bcb74')).toBeInTheDocument()

      userEvent.click(screen.getByRole('button', { name: 'Technical Stream Details' }))
      expect(await screen.findByText('technical: 1080p')).toBeInTheDocument()

      userEvent.click(screen.getByRole('button', { name: 'Home' }))
      expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument()

      await waitFor(() => expect(window.location.pathname).toBe('/'))

      act(() => window.history.back())
      await waitFor(() => expect(window.location.pathname).toBe('/live/broadcast/ba9ec13d-0327-461e-9aff-9d7c024bcb74/details/technical'))
      expect(screen.queryByText('technical: 1080p')).toBeInTheDocument()
      expect(screen.queryByRole('heading', { name: 'Home' })).not.toBeInTheDocument()

      act(() => window.history.back())
      await waitFor(() => expect(window.location.pathname).toBe('/live/broadcast/ba9ec13d-0327-461e-9aff-9d7c024bcb74'))
      expect(screen.getByRole('heading', { name: 'Rain Forest Live Fitness' })).toBeInTheDocument()
      expect(screen.getByText('ba9ec13d-0327-461e-9aff-9d7c024bcb74')).toBeInTheDocument()
      expect(screen.queryByText('technical: 1080p')).not.toBeInTheDocument()

      act(() => window.history.forward())
      await waitFor(() => expect(window.location.pathname).toBe('/live/broadcast/ba9ec13d-0327-461e-9aff-9d7c024bcb74/details/technical'))
      expect(screen.getByRole('heading', { name: 'Rain Forest Live Fitness' })).toBeInTheDocument()
      expect(screen.getByText('ba9ec13d-0327-461e-9aff-9d7c024bcb74')).toBeInTheDocument()
      expect(screen.getByText('technical: 1080p')).toBeInTheDocument()

      act(() => window.history.forward())
      await waitFor(() => expect(window.location.pathname).toBe('/'))
      expect(screen.queryByRole('heading', { name: 'Home' })).toBeInTheDocument()

      act(() => window.history.back())
      await waitFor(() => expect(window.location.pathname).toBe('/live/broadcast/ba9ec13d-0327-461e-9aff-9d7c024bcb74/details/technical'))
      expect(await screen.findByText('technical: 1080p')).toBeInTheDocument()

      act(() => window.history.back())
      await waitFor(() => expect(window.location.pathname).toBe('/live/broadcast/ba9ec13d-0327-461e-9aff-9d7c024bcb74'))
      expect(screen.getByRole('heading', { name: 'Rain Forest Live Fitness' })).toBeInTheDocument()
      expect(screen.getByText('ba9ec13d-0327-461e-9aff-9d7c024bcb74')).toBeInTheDocument()

      act(() => window.history.back())
      await waitFor(() => expect(window.location.pathname).toBe('/live'))
      expect(screen.getByRole('heading', { name: 'Live Streams' })).toBeInTheDocument()
    })
  })
})

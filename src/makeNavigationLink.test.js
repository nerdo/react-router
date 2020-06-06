import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { makeNavigationLink } from './makeNavigationLink'

describe('makeNavigationLink()', () => {
  it('should return a function component', () => {
    const router = {
      makeNavigationFunction: () => () => { },
      getInitialBaseId: () => '',
      getCurrentBaseId: () => ''
    }
    const Link = makeNavigationLink({ router })
    expect(Link).toBeInstanceOf(Function)
  })

  describe('rendering the link', () => {
    describe('not nested (default)', () => {
      it('should render with data-relative-to attribute from the initial base id', () => {
        const router = {
          makeNavigationFunction: () => () => {},
          getInitialBaseId: () => '/alpha/beta',
          getCurrentBaseId: () => '/foo/bar'
        }
        const NavigationLink = makeNavigationLink({ router })

        render(<NavigationLink to='/a/b/c' />)

        const link = screen.getByRole('button')
        const attributes = Array.from(link.attributes)
          .map(attribute => ({ [attribute.name]: attribute.value }))
          .reduce((obj, current) => ({ ...obj, ...current }), {})
        expect(attributes['data-relative-to']).toBe('/alpha/beta')
      })
    })

    describe('not nested (explicit)', () => {
      it('should render with data-relative-to attribute from the initial base id', () => {
        const router = {
          makeNavigationFunction: () => () => {},
          getInitialBaseId: () => '/alpha/beta',
          getCurrentBaseId: () => '/foo/bar'
        }
        const NavigationLink = makeNavigationLink({ router, isNested: false })

        render(<NavigationLink to='/a/b/c' />)

        const link = screen.getByRole('button')
        const attributes = Array.from(link.attributes)
          .map(attribute => ({ [attribute.name]: attribute.value }))
          .reduce((obj, current) => ({ ...obj, ...current }), {})
        expect(attributes['data-relative-to']).toBe('/alpha/beta')
      })
    })

    describe('nested', () => {
      it('should render with data-relative-to attribute from the initial base id', () => {
        const router = {
          makeNavigationFunction: () => () => {},
          getInitialBaseId: () => '/alpha/beta',
          getCurrentBaseId: () => '/foo/bar'
        }
        const NavigationLink = makeNavigationLink({ router, isNested: true })

        render(<NavigationLink to='/a/b/c' />)

        const link = screen.getByRole('button')
        const attributes = Array.from(link.attributes)
          .map(attribute => ({ [attribute.name]: attribute.value }))
          .reduce((obj, current) => ({ ...obj, ...current }), {})
        expect(attributes['data-relative-to']).toBe('/foo/bar')
      })
    })
  })

  describe('clicking the link', () => {
    it('should call the navigation function', () => {
      const navigate = jest.fn()
      const router = {
        makeNavigationFunction: () => navigate,
        getInitialBaseId: () => '',
        getCurrentBaseId: () => '/foo/bar'
      }
      const NavigationLink = makeNavigationLink({ router })
      render(<NavigationLink to='/a/b/c' />)

      userEvent.click(screen.getByRole('button'))

      expect(navigate).toHaveBeenCalledTimes(1)
    })
  })
})

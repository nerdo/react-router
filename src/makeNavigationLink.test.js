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

  describe('rendering the link within context', () => {
    describe('current', () => {
      describe('(default)', () => {
        it('should render with data-relative-to attribute from the current base id', () => {
          const router = {
            makeNavigationFunction: () => () => { },
            getInitialBaseId: () => '/initial',
            getCurrentBaseId: () => '/current',
            getNestedBaseId: () => '/nested'
          }
          const NavigationLink = makeNavigationLink({ router })

          render(<NavigationLink to='/a/b/c' />)

          const link = screen.getByRole('button')
          const attributes = Array.from(link.attributes)
            .map(attribute => ({ [attribute.name]: attribute.value }))
            .reduce((obj, current) => ({ ...obj, ...current }), {})
          expect(attributes['data-relative-to']).toBe('/current')
        })
      })

      describe('(explicit)', () => {
        it('should render with data-relative-to attribute from the current base id', () => {
          const router = {
            makeNavigationFunction: () => () => { },
            getInitialBaseId: () => '/initial',
            getCurrentBaseId: () => '/current',
            getNestedBaseId: () => '/nested'
          }
          const NavigationLink = makeNavigationLink({ router, context: 'current' })

          render(<NavigationLink to='/a/b/c' />)

          const link = screen.getByRole('button')
          const attributes = Array.from(link.attributes)
            .map(attribute => ({ [attribute.name]: attribute.value }))
            .reduce((obj, current) => ({ ...obj, ...current }), {})
          expect(attributes['data-relative-to']).toBe('/current')
        })
      })
    })

    describe('base', () => {
      it('should render with data-relative-to attribute from the initial base id', () => {
        const router = {
          makeNavigationFunction: () => () => { },
          getInitialBaseId: () => '/initial',
          getCurrentBaseId: () => '/current',
          getNestedBaseId: () => '/nested'
        }
        const NavigationLink = makeNavigationLink({ router, context: 'base' })

        render(<NavigationLink to='/a/b/c' />)

        const link = screen.getByRole('button')
        const attributes = Array.from(link.attributes)
          .map(attribute => ({ [attribute.name]: attribute.value }))
          .reduce((obj, current) => ({ ...obj, ...current }), {})
        expect(attributes['data-relative-to']).toBe('/initial')
      })
    })

    describe('nest', () => {
      it('should render with data-relative-to attribute from the nested base id', () => {
        const router = {
          makeNavigationFunction: () => () => { },
          getInitialBaseId: () => '/initial',
          getCurrentBaseId: () => '/current',
          getNestedBaseId: () => '/nested'
        }
        const NavigationLink = makeNavigationLink({ router, context: 'nest' })

        render(<NavigationLink to='/a/b/c' />)

        const link = screen.getByRole('button')
        const attributes = Array.from(link.attributes)
          .map(attribute => ({ [attribute.name]: attribute.value }))
          .reduce((obj, current) => ({ ...obj, ...current }), {})
        expect(attributes['data-relative-to']).toBe('/nested')
      })
    })

    describe('absolute', () => {
      it('should render with data-relative-to attribute set to /', () => {
        const router = {
          makeNavigationFunction: () => () => { },
          getInitialBaseId: () => '/initial',
          getCurrentBaseId: () => '/current',
          getNestedBaseId: () => '/nested'
        }
        const NavigationLink = makeNavigationLink({ router, context: 'absolute' })

        render(<NavigationLink to='/a/b/c' />)

        const link = screen.getByRole('button')
        const attributes = Array.from(link.attributes)
          .map(attribute => ({ [attribute.name]: attribute.value }))
          .reduce((obj, current) => ({ ...obj, ...current }), {})
        expect(attributes['data-relative-to']).toBe('/')
      })
    })
  })

  describe('clicking the link', () => {
    it('should call the navigation function', () => {
      const navigate = jest.fn()
      const router = {
        makeNavigationFunction: () => navigate,
        getInitialBaseId: () => '',
        getCurrentBaseId: () => '/nested',
        getNestedBaseId: () => '/nested'
      }
      const NavigationLink = makeNavigationLink({ router })
      render(<NavigationLink to='/a/b/c' />)

      userEvent.click(screen.getByRole('button'))

      expect(navigate).toHaveBeenCalledTimes(1)
    })
  })
})

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { makeNavigationLink } from './makeNavigationLink'

describe('makeNavigationLink()', () => {
  it('should return a function component', () => {
    const router = {
      makeNavigationFunction: () => () => { },
      getCurrentBaseId: () => ''
    }
    const Link = makeNavigationLink({ router })
    expect(Link).toBeInstanceOf(Function)
  })

  describe('rendering the link', () => {
    it('should render a button by default', () => {
      const navigate = jest.fn()
      const router = {
        makeNavigationFunction: () => navigate,
        getCurrentBaseId: () => '/foo/bar'
      }
      const NavigationLink = makeNavigationLink({ router })
      render(<NavigationLink to='/a/b/c' />)

      const link = screen.getByRole('button')
      const attributes = Array.from(link.attributes)
        .map(attribute => ({ [attribute.name]: attribute.value }))
        .reduce((obj, current) => ({ ...obj, ...current }), {})
      userEvent.click(link)

      expect(navigate).toHaveBeenCalledTimes(1)
      expect(attributes['data-relative-to']).toBe('/foo/bar')
    })
  })
})

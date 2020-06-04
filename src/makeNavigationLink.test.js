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
        getCurrentBaseId: () => ''
      }
      const NavigationLink = makeNavigationLink({ router })
      render(<NavigationLink to='/a/b/c' />)

      userEvent.click(screen.getByRole('button'))

      expect(navigate).toHaveBeenCalledTimes(1)
    })
  })
})

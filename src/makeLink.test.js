import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { makeLink } from './makeLink'

describe('makeLink()', () => {
  it('should return a function component', () => {
    const Link = makeLink
    expect(Link).toBeInstanceOf(Function)
  })

  describe('rendering the link', () => {
    it('should render a button by default', () => {
      const Link = makeLink()
      render(<Link />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render whatever tag is passed in', () => {
      const Link = makeLink({ tag: 'ul' })
      render(<Link />)
      expect(screen.getByRole('list'))
    })

    it('should render whatever component is passed in as a tag', () => {
      const Link = makeLink({ tag: props => <ul {...props}>{props.children}</ul> })
      render(<Link />)
      expect(screen.getByRole('list'))
    })

    it('should pass children through', () => {
      const Link = makeLink()
      render(<Link>Hello, World</Link>)
      expect(screen.getByText('Hello, World')).toBeInTheDocument()
    })

    it('should pass props through', () => {
      const Link = makeLink()
      render(<Link data-testid='the-link' />)
      expect(screen.getByTestId('the-link')).toBeInTheDocument()
    })

    it('should call the function with the default to prop, and onClick event as input when clicked', () => {
      const handler = jest.fn()
      const onClick = void 0
      const Link = makeLink({ handler })
      render(<Link to='/to/somewhere' />)

      userEvent.click(screen.getByRole('button'))

      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler).toHaveBeenLastCalledWith('/to/somewhere', expect.objectContaining({}), onClick)
    })

    it('should call the function with the ([toPropName], event, onClick) as input when clicked', () => {
      const handler = jest.fn()
      const onClick = jest.fn()
      const Link = makeLink({ handler, toPropName: 'target' })
      render(<Link target='/to/somewhere' onClick={onClick} />)

      userEvent.click(screen.getByRole('button'))

      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler).toHaveBeenLastCalledWith('/to/somewhere', expect.objectContaining({}), onClick)
      expect(onClick).not.toHaveBeenCalled()
    })
  })
})

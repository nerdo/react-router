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
      expect(screen.getByRole('list')).toBeInTheDocument()

      // allow the tag to be overridden at render-time
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
      render(<Link tag='button' />)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should render whatever component is passed in as a tag', () => {
      const Link = makeLink({ tag: props => <ul {...props}>{props.children}</ul> })
      render(<Link />)
      expect(screen.getByRole('list')).toBeInTheDocument()
    })

    it('should pass children through', () => {
      const Link = makeLink()
      render(<Link>Hello, World</Link>)
      expect(screen.getByText('Hello, World')).toBeInTheDocument()
    })

    it('should pass props through', () => {
      const Link = makeLink()
      render(<Link data-testid='the-link' to='/some/where' />)

      const link = screen.getByTestId('the-link')
      const attributes = Array.from(link.attributes)
        .map(attribute => ({ [attribute.name]: attribute.value }))
        .reduce((obj, current) => ({ ...obj, ...current }), {})

      expect(link).toBeInTheDocument()
      expect(attributes['to']).toBeUndefined()
      expect(attributes['data-to']).toBe('/some/where')
    })

    it('should call makeHandler once for each link', () => {
      const makeHandler = jest.fn()
      const onClick = void 0
      const Link = makeLink({ makeHandler })
      render(
        <>
          <Link to='/to/somewhere'>Somewhere</Link>
          <Link to='/home'>Home</Link>
        </>
      )

      expect(makeHandler).toHaveBeenCalledTimes(2)
    })

    it('should call the function with the default to prop, and onClick event as input when clicked', () => {
      const handler = jest.fn()
      const makeHandler = () => handler
      const onClick = void 0
      const Link = makeLink({ makeHandler })

      render(<Link to='/to/somewhere' />)
      userEvent.click(screen.getByRole('button'))

      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler).toHaveBeenLastCalledWith('/to/somewhere', onClick, expect.objectContaining({}))
    })

    it('should call the function with the ([toPropName], event, onClick) as input when clicked', () => {
      const handler = jest.fn()
      const makeHandler = () => handler
      const onClick = jest.fn()
      const Link = makeLink({ makeHandler, toPropName: 'target' })

      render(<Link target='/to/somewhere' onClick={onClick} />)
      const link = screen.getByRole('button')
      const attributes = Array.from(link.attributes)
        .map(attribute => ({ [attribute.name]: attribute.value }))
        .reduce((obj, current) => ({ ...obj, ...current }), {})

      userEvent.click(link)

      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler).toHaveBeenLastCalledWith('/to/somewhere', onClick, expect.objectContaining({}))
      expect(onClick).not.toHaveBeenCalled()
      expect(attributes['target']).toBeUndefined()
      expect(attributes['data-target']).toBe('/to/somewhere')
    })
  })
})

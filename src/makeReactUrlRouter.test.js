import { makeReactUrlRouter } from './makeReactUrlRouter'
import { waitFor } from '@testing-library/dom'

describe('makeReactUrlRouter()', () => {
  describe('default arguments', () => {
    it('should return the correct values', () => {
      const router = makeReactUrlRouter()
      expect(typeof router.useUrlRouting).toBe('function')
    })

    describe('window', () => {
      let windowSpy

      beforeEach(() => {
        windowSpy = jest.spyOn(window, 'window', 'get')
      })

      afterEach(() => {
        windowSpy.mockRestore()
      })

      const defaultWindowMock = {
        location: {
          pathname: ''
        }
      }

      it('should have an onpopstate handler set', () => {
        const originalPopState = window.onpopstate
        // windowSpy.mockImplementation(() => {
        //   return {
        //     ...defaultWindowMock,
        //     onpopstate: originalPopState
        //   }
        // })

        const router = makeReactUrlRouter()

        expect(window.onpopstate).not.toBe(originalPopState)
      })

      it('should work', async () => {
        const popStateHandler = jest.fn()
        window.addEventListener('popstate', popStateHandler)

        const state = { id: 'hello' }
        window.history.pushState(state, null, state.id)

        expect(popStateHandler).not.toHaveBeenCalled()

        window.history.pushState(void 0, void 0, '/some/url')
        window.history.back()

        await waitFor(() => expect(popStateHandler).toHaveBeenCalledWith(expect.objectContaining({ state })))
      })
    })
  })
})

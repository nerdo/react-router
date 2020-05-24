import { makeReactUrlRouter } from './makeReactUrlRouter'

describe('makeReactUrlRouter()', () => {
  describe('default arguments', () => {
    it('should return the correct values', () => {
      const router = makeReactUrlRouter()
      expect(typeof router.useRouting).toBe('function')
    })
  })
})

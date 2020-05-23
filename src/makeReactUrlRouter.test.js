import { makeReactUrlRouter } from './makeReactUrlRouter'

describe('makeReactUrlRouter()', () => {
  describe('default arguments', () => {
    it('should return the correct values', () => {
      const router = makeReactUrlRouter()
      expect(typeof router.useRouting).toBe('function')
      expect(typeof router.jsRouter).not.toBeNull()
      expect(typeof router.jsRouter).toBe('object')
    })
  })
})

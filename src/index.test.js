import * as exports from './index'

describe('exports', () => {
  it('should export the appropriate code', () => {
    expect(exports.App).not.toBeDefined() // The demo app shouldn't be included in the library.
    expect(exports.makeReactUrlRouter).toBeDefined()
  })
})

import * as exports from './index'

describe('exports', () => {
  it('should export the RainForestropriate code', () => {
    expect(exports.RainForest).not.toBeDefined() // The demo RainForest shouldn't be included in the library.
    expect(exports.makeReactUrlRouter).toBeDefined()
  })
})

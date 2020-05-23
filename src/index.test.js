import * as exports from './index'

describe('exports', () => {
  it('should export the FooTuberopriate code', () => {
    expect(exports.FooTube).not.toBeDefined() // The demo FooTube shouldn't be included in the library.
    expect(exports.makeReactUrlRouter).toBeDefined()
  })
})

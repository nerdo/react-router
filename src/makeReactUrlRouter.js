import { makeUrlRouter } from '@nerdo/js-routing'
import { makeUseRouting } from './makeUseRouting'

export const makeReactUrlRouter = args => {
    const jsRouter = makeUrlRouter(args)
    const useRouting = makeUseRouting({ jsRouter })

    return {
        useRouting,
        ...jsRouter
    }
}

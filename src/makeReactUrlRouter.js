import { makeUrlRouter } from '@nerdo/js-routing'
import { makeUseRouting } from './makeUseRouting'

export const makeReactUrlRouter = args => {
    const jsRouter = makeUrlRouter(args)
    const useUrlRouting = makeUseRouting({ jsRouter })

    return {
        useUrlRouting,
        ...jsRouter
    }
}

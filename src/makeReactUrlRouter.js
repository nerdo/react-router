import { makeUrlRouter } from '@nerdo/js-routing'
import { makeUseUrlRouting } from './makeUseUrlRouting'

export const makeReactUrlRouter = args => {
    const jsRouter = makeUrlRouter(args)
    const useUrlRouting = makeUseUrlRouting({ jsRouter })

    return {
        useUrlRouting,
        ...jsRouter
    }
}

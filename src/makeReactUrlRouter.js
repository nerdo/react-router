import { makeUrlRouter } from '@nerdo/js-routing'
import { makeUseUrlRouting } from './makeUseUrlRouting'
import { makeNavigationLink } from './makeNavigationLink'

export const makeReactUrlRouter = args => {
    const jsRouter = makeUrlRouter(args)
    const useUrlRouting = makeUseUrlRouting({ jsRouter })
    const reactUrlRouter = {
        useUrlRouting,
        makeNavigationFunction: () => jsRouter.makeRouterNavigationFunction(jsRouter),
        makeNavigationLink: ({ ...args } = {}) => makeNavigationLink({ router: reactUrlRouter, ...args }),
        ...jsRouter
    }

    return reactUrlRouter
}

import { makeUrlRouter } from '@nerdo/js-routing'

export const makeReactUrlRouter = args => {
    const jsRouter = makeUrlRouter(args)

    const useRouting = () => {
    }

    return {
        useRouting,
        jsRouter
    }
}

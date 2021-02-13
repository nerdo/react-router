import { useState, useEffect } from 'react'

export const makeUseUrlRouting = ({ jsRouter }) => (routes) => {
  const [, setNavigationTarget] = useState(void 0)
  useEffect(() => {
    jsRouter.history.events.on('navigation', setNavigationTarget)
    return () => jsRouter.history.events.off('navigation', setNavigationTarget)
  })

  useEffect(jsRouter.commitRouting)

  // Apply routing, but do not auto-commit. Commit will happen after each render (useEffect)
  // ensuring that nested routes will have the proper base id for navigation.
  return jsRouter.applyRouting(routes, false)
}

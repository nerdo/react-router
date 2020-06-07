import { useState, useEffect } from 'react'

export const makeUseUrlRouting = ({ jsRouter }) => (routes) => {
  const [, setNavigationTarget] = useState(void 0)

  jsRouter.history.events.once('navigation', setNavigationTarget)

  // Apply routing, but do not auto-commit. Commit will happen after each render (useEffect)
  // ensuring that nested routes will have the proper base id for navigation.
  useEffect(jsRouter.commitRouting)
  return jsRouter.applyRouting(routes, false)
}

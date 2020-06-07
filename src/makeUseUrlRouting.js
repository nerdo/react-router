import { useState, useEffect } from 'react'

export const makeUseUrlRouting = ({ jsRouter }) => (routes) => {
  const [, setNavigationTarget] = useState(void 0)

  jsRouter.history.events.once('navigation', setNavigationTarget)

  // Apply routing, but do not auto-commit. Commit will happen after each render (useEffect)
  // ensuring that nested routes will have the proper base id for navigation.
  const result = jsRouter.applyRouting(routes, false)
  const lastSelectedRoute = jsRouter.lastSelectedRoute

  console.log(`TRANSACTION for selected route ${JSON.stringify(lastSelectedRoute)}`)
  useEffect(() => {
    console.log(`COMMITTING for selected route ${JSON.stringify(lastSelectedRoute)}`)
    jsRouter.commitRouting()
  })

  return result
}

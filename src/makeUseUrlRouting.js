import { useState, useEffect } from 'react'
import { getJoinedPath } from '@nerdo/js-routing'

export const makeUseUrlRouting = ({ jsRouter }) => (routes) => {
  const [navigationTarget, setNavigationTarget] = useState(void 0)

  jsRouter.history.events.once('navigation', setNavigationTarget)

  // Apply routing, but do not auto-commit. Commit will happen after each render (useEffect)
  // ensuring that nested routes will have the proper base id for navigation.
  useEffect(jsRouter.commitRouting)
  const result = jsRouter.applyRouting(routes, false)

  // The current base id must be preserved in state.
  const [currentBaseId] = useState(jsRouter.getCurrentBaseId())
  const navigate = async input => jsRouter.navigate(getJoinedPath(currentBaseId, input))

  return [result, navigate]
}

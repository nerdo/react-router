import { useState, useEffect } from 'react'
import { getPathRelativeTo } from '@nerdo/js-routing'

export const makeUseRouting = ({ jsRouter }) => (routes) => {
  const [navigationtarget, setNavigationTarget] = useState(void 0)

  useEffect(
    () => {
      jsRouter.history.events.on('navigation', setNavigationTarget)
      return () => jsRouter.history.events.off('navigation', setNavigationTarget)
    },
    []
  )

  useEffect(jsRouter.commitRouting)
  const result = jsRouter.applyRouting(routes, false)

  const currentBaseId = jsRouter.getCurrentBaseId()

  const navigate = async input => jsRouter.navigate(getPathRelativeTo(currentBaseId, input))

  return [result, navigate]
}

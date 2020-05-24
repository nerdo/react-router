import { useState } from 'react'
// import { getPathRelativeTo } from '@nerdo/js-routing'

export const makeUseRouting = ({ jsRouter }) => (routes) => {
  const [navigationtarget, setNavigationTarget] = useState(void 0)

  jsRouter.history.events.once('navigation', setNavigationTarget)

  const result = jsRouter.applyRouting(routes)
  const navigate = async input => jsRouter.navigate(input)

  return [result, navigate]
}

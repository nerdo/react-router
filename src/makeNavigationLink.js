import { makeLink } from './makeLink'
import { getJoinedPath } from '@nerdo/js-routing'

export const makeNavigationLink = ({ router, context = 'current', ...args }) => {
  let getContextualBaseId
  switch (context) {
    case 'nest':
      getContextualBaseId = () => router.getNestedBaseId()
      break
    case 'base':
      getContextualBaseId = () => router.getInitialBaseId()
      break
    case 'absolute':
      getContextualBaseId = () => '/'
      break
    case 'current':
    default:
      getContextualBaseId = () => router.getCurrentBaseId()
      break
  }
  const makeHandler = () => {
    const navigate = router.makeNavigationFunction()
    const contextualBaseId = getContextualBaseId()
    console.log(`setting contextualBaseId in makeHandler to ${contextualBaseId}`)
    return (to, onClick, e) => {
      navigate(getJoinedPath(contextualBaseId, to))
      if (onClick) {
        onClick(e)
      }
    }
  }
  const { baseProps = {}, ...passThroughArgs } = args
  baseProps['data-relative-to'] = () => {
    const c = getContextualBaseId()
    console.log(`setting data-relative-to to ${c}`)
    return c
  }
  return makeLink({ makeHandler, baseProps, ...passThroughArgs })
}

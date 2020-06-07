import { makeLink } from './makeLink'
import { getJoinedPath } from '@nerdo/js-routing'

export const makeNavigationLink = ({ router, context = 'current', ...args }) => {
  let contextualBaseId
  switch (context) {
    case 'nest':
      contextualBaseId = router.getNestedBaseId()
      break
    case 'base':
      contextualBaseId = router.getInitialBaseId()
      break
    case 'absolute':
      contextualBaseId = '/'
      break
    case 'current':
    default:
      contextualBaseId = router.getCurrentBaseId()
      break
  }
  const navigate = router.makeNavigationFunction()
  const makeHandler = () => (to, onClick, e) => {
    navigate(getJoinedPath(contextualBaseId, to))
    if (onClick) {
      onClick(e)
    }
  }

  const { baseProps = {}, ...passThroughArgs } = args
  baseProps['data-relative-to'] = () => contextualBaseId
  return makeLink({ makeHandler, baseProps, ...passThroughArgs })
}

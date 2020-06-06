import { makeLink } from './makeLink'
import { getJoinedPath } from '@nerdo/js-routing'

export const makeNavigationLink = ({ router, isNested = false, ...args }) => {
  const getLinkBaseId = isNested ? () => router.getCurrentBaseId() : () => router.getInitialBaseId()
  const makeHandler = () => {
    const navigate = router.makeNavigationFunction()
    const currentBaseId = getLinkBaseId()
    return (to, onClick, e) => {
      navigate(getJoinedPath(currentBaseId, to))
      if (onClick) {
        onClick(e)
      }
    }
  }
  const { baseProps = {}, ...passThroughArgs } = args
  baseProps['data-relative-to'] = () => getLinkBaseId()
  return makeLink({ makeHandler, baseProps, ...passThroughArgs })
}

import { makeLink } from './makeLink'
import { getJoinedPath } from '@nerdo/js-routing'

export const makeNavigationLink = ({ router, ...args }) => {
  const makeHandler = () => {
    const navigate = router.makeNavigationFunction()
    const currentBaseId = router.getCurrentBaseId()
    return (to, onClick, e) => {
      navigate(getJoinedPath(currentBaseId, to))
      if (onClick) {
        onClick(e)
      }
    }
  }
  const { baseProps = {}, ...passThroughArgs } = args
  baseProps['data-relative-to'] = () => router.getCurrentBaseId()
  return makeLink({ makeHandler, baseProps, ...passThroughArgs })
}

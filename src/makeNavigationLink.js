import { makeLink } from './makeLink'
import { getJoinedPath } from '@nerdo/js-routing'

export const makeNavigationLink = ({ router, ...args }) => {
  const makeHandler = () => {
    const navigate = router.makeNavigationFunction()
    const currentBaseId = router.getCurrentBaseId()
    return (to, e, onClick) => {
      navigate(getJoinedPath(currentBaseId, to))
      if (onClick) {
        onClick(e)
      }
    }
  }

  return makeLink({ makeHandler, ...args })
}

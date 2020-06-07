import React, { useContext } from 'react'
import { RainForestRouterContext } from './RainForestRouterContext'

const routes = [
  {
    id: '/details/:tab',
    action: ({ tab }) => `${tab}: 1080p`
  }
]

export const LiveStream = ({ streamId, router = useContext(RainForestRouterContext) }) => {
  const { useUrlRouting, makeNavigationLink } = router
  const child = useUrlRouting(routes)
  const Link = makeNavigationLink()
  return (
    <>
      <h1>Rain Forest Live Fitness</h1>
      <Link to='/details/technical'>Technical Stream Details</Link>
      <div>{streamId}</div>
      <div>{child}</div>
    </>
  )
}

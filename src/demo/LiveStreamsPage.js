import React, { useContext } from 'react'
import { LiveStream } from './LiveStream'
import { RainForestRouterContext } from './RainForestRouterContext'

const routes = [
  {
    id: '/broadcast/:streamId',
    isNest: true,
    action: ({ streamId }) => <LiveStream streamId={streamId} />
  }
]

export const LiveStreamsPage = ({ router = useContext(RainForestRouterContext) }) => {
  const { useUrlRouting, makeNavigationLink } = router
  const currentLiveStream = useUrlRouting(routes)
  const Link = makeNavigationLink()
  const liveStreamHeader = currentLiveStream
    ? <h2>More Live Streams...</h2>
    : <h1>Live Streams</h1>

  return (
    <>
      {currentLiveStream}
      {liveStreamHeader}
      <ol>
        <li>
          <Link to='/broadcast/ba9ec13d-0327-461e-9aff-9d7c024bcb74'>Rain Forest Live Fitness</Link>
        </li>
      </ol>
    </>
  )
}

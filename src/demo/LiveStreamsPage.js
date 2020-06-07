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
  console.log('RENDERING LiveStreamsPage')
  const { useUrlRouting, Link } = router
  // This had no effect
  // const c = <Link to='/broadcast/ba9ec13d-0327-461e-9aff-9d7c024bcb74'>Rain Forest Live Fitness</Link>
  const currentLiveStream = useUrlRouting(routes)
  const liveStreamHeader = currentLiveStream
    ? <h2>More Live Streams...</h2>
    : <h1>Live Streams</h1>

  return (
    <>
      {/* moving the Link here "fixed" the problem, because it changed the order in which the rendering occurs */}
      {currentLiveStream}
      {liveStreamHeader}
      <ol>
        <li>
          <Link to='/broadcast/ba9ec13d-0327-461e-9aff-9d7c024bcb74'>Rain Forest Live Fitness</Link>
          {/* {c} */}
        </li>
      </ol>
    </>
  )
}

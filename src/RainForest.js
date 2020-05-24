import React from 'react'
import { HomePage } from './HomePage'
import { TrendingPage } from './TrendingPage'
import { makeReactUrlRouter } from './makeReactUrlRouter'

const routes = [
  {
    id: '/',
    action: () => <HomePage />
  },
  {
    id: '/feed/trending',
    action: () => <TrendingPage />
  }
]

export const RainForest = ({ router = makeReactUrlRouter() }) => {
  const [page, navigate] = router.useRouting(routes)

  return (
    <>
      <nav aria-label='main'>
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/feed/trending')}>Trending</button>
      </nav>

      <div role="main">
        {page}
      </div>
    </>
  )
}

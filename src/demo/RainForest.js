import React, { useContext } from 'react'
import { HomePage } from './HomePage'
import { CartPage } from './CartPage'
import { Loading } from './Loading'
import { makeReactUrlRouter } from '../makeReactUrlRouter'
import { ComputersPage } from './ComputersPage'
import { RainForestRouterContext } from './RainForestRouterContext'
import { ProductPage } from './ProductPage'
import { NotFoundPage } from './NotFoundPage'
import { LiveStreamsPage } from './LiveStreamsPage'

const routes = [
  {
    id: '/',
    action: () => <HomePage />
  },
  {
    id: '/cart',
    action: () => <CartPage />
  },
  {
    id: '/categories/computers',
    action: () => <ComputersPage />
  },
  {
    id: '/product/:productId',
    action: ({ productId }, options) => <ProductPage productId={productId} options={options} />
  },
  {
    id: '/live',
    isNest: true,
    action: () => <LiveStreamsPage />
  }
]

export const RainForest = ({ router = makeReactUrlRouter() }) => {
  if (!router) {
    return <Loading />
  }

  const { useUrlRouting, makeNavigationLink } = router
  const page = useUrlRouting(routes)
  const Link = makeNavigationLink()
  return (
    <RainForestRouterContext.Provider value={router}>
      <h1>Rain Forest - The Online Shoppping Mega-Marketplace!</h1>

      <nav aria-label='main'>
        <Link to='/'>Home</Link>
        <Link to='/categories/computers'>Computers</Link>
        <Link to='/live'>Live Streams</Link>
        <Link to='/cart'>Cart</Link>
      </nav>

      <div role="main">
        {page || <NotFoundPage />}
      </div>
    </RainForestRouterContext.Provider>
  )
}

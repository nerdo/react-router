import React, { useContext } from 'react'
import { HomePage } from './HomePage'
import { CartPage } from './CartPage'
import { Loading } from './Loading'
import { makeReactUrlRouter } from './makeReactUrlRouter'
import { ComputersPage } from './ComputersPage'
import { RainForestRouterContext } from './RainForestRouterContext'
import { ProductPage } from './ProductPage'
import { NotFoundPage } from './NotFoundPage'

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
  }
]

export const RainForest = ({ router = makeReactUrlRouter() }) => {
  if (!router) {
    return <Loading />
  }

  const [page, navigate] = router.useRouting(routes)

  return (
    <RainForestRouterContext.Provider value={router}>
      <h1>Rain Forest - The Online Shoppping Mega-Marketplace!</h1>

      <nav aria-label='main'>
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/categories/computers')}>Computers</button>
        <button onClick={() => navigate('/cart')}>Cart</button>
      </nav>

      <div role="main">
        {page || <NotFoundPage />}
      </div>
    </RainForestRouterContext.Provider>
  )
}

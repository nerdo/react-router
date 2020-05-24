import React from 'react'
import { HomePage } from './HomePage'
import { CartPage } from './CartPage'
import { makeReactUrlRouter } from './makeReactUrlRouter'

const routes = [
  {
    id: '/',
    action: () => <HomePage />
  },
  {
    id: '/cart',
    action: () => <CartPage />
  }
]

export const RainForest = ({ router = makeReactUrlRouter() }) => {
  const [page, navigate] = router.useRouting(routes)

  return (
    <>
      <h1>Rain Forest - The Online Shoppping Mega-Marketplace!</h1>

      <nav aria-label='main'>
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/cart')}>Cart</button>
      </nav>

      <div role="main">
        {page}
      </div>
    </>
  )
}

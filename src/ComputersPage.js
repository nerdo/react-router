import React, { useContext } from 'react'
import { RainForestRouterContext } from './RainForestRouterContext'

export const ComputersPage = () => {
  const router = useContext(RainForestRouterContext)

  return (
    <>
      <h2>Computers</h2>
      <div>
        <button onClick={() => router.navigate('/product/PBP-2020-01')}>PearBook Amateur</button>
      </div>
    </>
  )
}

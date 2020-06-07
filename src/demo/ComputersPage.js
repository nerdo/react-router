import React, { useContext } from 'react'
import { RainForestRouterContext } from './RainForestRouterContext'

export const ComputersPage = ({ router = useContext(RainForestRouterContext) }) => {
  const Link = router.makeNavigationLink()
  return (
    <>
      <h2>Computers</h2>
      <div>
        <Link to='/product/PBP-2020-01'>PearBook Amateur</Link>
      </div>
    </>
  )
}

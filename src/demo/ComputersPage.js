import React, { useContext } from 'react'
import { RainForestRouterContext } from './RainForestRouterContext'

export const ComputersPage = ({ Link = useContext(RainForestRouterContext).Link }) => (
  <>
    <h2>Computers</h2>
    <div>
      <Link to='/product/PBP-2020-01'>PearBook Amateur</Link>
    </div>
  </>
)

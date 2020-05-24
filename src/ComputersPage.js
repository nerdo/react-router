import React, { useContext } from 'react'
import { RainForestRouterContext } from './RainForestRouterContext'

export const ComputersPage = ({ navigate = useContext(RainForestRouterContext).navigate }) => (
  <>
    <h2>Computers</h2>
    <div>
      <button onClick={() => navigate('/product/PBP-2020-01')}>PearBook Amateur</button>
    </div>
  </>
)

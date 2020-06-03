import React, { useState, useEffect } from 'react'
import { RainForest } from '../src/RainForest'
import { makeReactUrlRouter } from '../src/makeReactUrlRouter'

export const Dev = () => {
  const [router, setRouter] = useState(null)

  // Simulating loading router settings from some async call...
  useEffect(
    () => {
      setTimeout(() => setRouter(makeReactUrlRouter()), 500)
    },
    []
  )

  return <RainForest router={router} />
}

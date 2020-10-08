import React, { createContext, useState } from "react"

export const CountContext = createContext({})

export const CountContextProvider = ({ children }) => {
  const [count, setCount] = useState(0)
  const [score, setScore] = useState(0)

  const updateCount = count => {
    setCount(count + 1)
  }
  const resetCount = () => {
    setCount(0)
  }
  const updateScore = (score) => {
      setScore(score+1)
  }

  return (
    <CountContext.Provider value={{ count, updateCount, resetCount, score, updateScore }}>
      {children}
    </CountContext.Provider>
  )
}


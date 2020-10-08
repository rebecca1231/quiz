import React, { useState, useContext } from "react"
import styled from "styled-components"

import { CountContext } from "../context/countContext"

const Card = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 8rem;
  font-size: 1.5rem;
  border: 3px solid #eee;
  width: 100%;
`

const Flashcard = ({
  eng,
  jpn,
  color,
  answer,
  setScore,
  score,
  setQuestionNumber,
  questionNumber,
  respondToCorrect,
  respondToIncorrect
}) => {
  const [showAnswer, setShowAnswer] = useState(false)
  const [wrongAnswer, setWrongAnswer] = useState(false)
  const [correct, setCorrect] = useState(false)
  const { count, updateCount, resetCount } = useContext(CountContext)

  const handleCorrect = () => {
    if (count === 0) {
      return (
        setCorrect(true),
        respondToCorrect({jpn, eng}),
        setTimeout(() => {
          return (
            setScore(score + 1),
            setCorrect(false),
            setQuestionNumber(questionNumber + 1),
            resetCount()
          )
        }, 1000)
      )
    } else {
      return (
        setCorrect(true),
        respondToIncorrect({jpn, eng}),
        resetCount(),
        setTimeout(() => {
          return (setCorrect(false), setQuestionNumber(questionNumber + 1))
        }, 1000)
      )
    }
  }

  const handleIncorrect = () => {
    return (
      updateCount(count),
      setWrongAnswer(true),
      setTimeout(() => {
        setWrongAnswer(false)
      }, 500)
    )
  }
  return (

    <Card
      style={{ backgroundColor: `${color}` }}
      onClick={() => {
        return (
          setShowAnswer(true),
          setTimeout(() => {
            setShowAnswer(false)
          }, 1000),
          answer.jpn === jpn ? handleCorrect() : handleIncorrect()
        )
      }}
    >
      {showAnswer && correct ? (
        <h1>GOOD!</h1>
      ) : showAnswer && wrongAnswer ? (
        <>
          {jpn}
          <h1>X</h1>
        </>
      ) : (
        eng
      )}
    </Card>

  )
}

export default Flashcard

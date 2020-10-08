import React, { useState, useCallback } from "react";
import {useHistory} from 'react-router-dom'
import Head from "./components/head";
import styled from "styled-components";
import Flashcard from "./components/Flashcard";
import useHasMounted from "./components/useHasMounted";

const Choices = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 2rem;
`;

const vocab = [
  { jpn: "mushi", eng: "bug, insect" },
  { jpn: "neko", eng: "cat" },
  { jpn: "inu", eng: "dog" },
  { jpn: "ushi", eng: "cow" },
  { jpn: "uma", eng: "horse" },
  { jpn: "sakana", eng: "fish" },
  { jpn: "tori", eng: "bird" },
];
const correctVocab = [];
const currentSet = [...vocab];

const Review = () => {
  const history = useHistory()
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [, setUpdate] = useState();
  const forceUpdate = useCallback(() => setUpdate({}), []);
  const [finished, setFinished] = useState(false);
  let items = [];
  let answer = "";
  const vocabLength = vocab.length;

  function getRandomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const chooseChoices = (numberOfChoices = 4) => {
    let counter = 0;
    while (counter < numberOfChoices) {
      let item = currentSet[getRandomNumber(currentSet.length)];
      if (items.includes(item)) {
        item = currentSet[getRandomNumber(currentSet.length)];
      } else {
        item.index = counter;
        items.push(item);
        counter++;
      }
    }
    return items;
  };

  const respondToCorrect = (item) => {
    if (correctVocab.some((obj) => obj.eng === item.eng)) {
      return;
    } else {
      correctVocab.push(item);
      if (correctVocab.length === vocabLength) setFinished(true);
      return correctVocab;
    }
  };

  const respondToIncorrect = (item) => {
    currentSet.push(item);
    return currentSet;
  };

  const renderChoices = () => {
    chooseChoices();
    answer = items[getRandomNumber(3)];
    const colors = ["#cffffe", "#f9f7d9", "#a3d2ca", "#ffe0f7"];
    return items.map((v) => {
      return (
        <Flashcard
          eng={v.eng}
          jpn={v.jpn}
          color={colors[v.index]}
          answer={answer}
          setScore={setScore}
          score={score}
          setQuestionNumber={setQuestionNumber}
          questionNumber={questionNumber}
          respondToCorrect={respondToCorrect}
          respondToIncorrect={respondToIncorrect}
        />
      );
    });
  };

  return (
    <div>
      <Head title="Home" />
      {finished ? (
        <div style={{ textAlign: "center" }}>
          <h1>You have reviewed all the words in this set!</h1>
          <h3>Well Done!</h3>{" "}
          <div className="item">
            <div
              onClick={() => history.push("/scores")}
              className="ui basic big button blue"
            >
              Show my scores!
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1>Review </h1>
          <h4>Your score: {score}</h4>
          <h3>Question: {questionNumber}</h3>
          <Choices>{renderChoices()}</Choices>
          <div>
            <h3> Please find the correct answer: </h3>
            <h2 style={{ textAlign: "center" }}>{answer.jpn} </h2>
            <p>Words in this Set: {vocabLength}</p>
          </div>
          <div className="ui secondary menu">
            <div className="menu right">
              <button
                onClick={() => forceUpdate()}
                className="ui basic button item"
              >
                Skip!<i className="arrow right icon right floated"></i>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Review;

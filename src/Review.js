import React, { useState, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import Head from "./components/head";
import styled from "styled-components";
import Flashcard from "./components/Flashcard";
import { DataContext } from "./context/dataContext";
import { getRandomNumber } from "./utils/getRandomNumber";
const Choices = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 2rem;
`;

const Review = () => {
  const { movies, choice1, choice2 } = useContext(DataContext);
  const currentSet = [...movies];
  const dataLength = movies.length; //chane if info changes
  const correctAnswers = [];
  const history = useHistory();

  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [, setUpdate] = useState();
  const forceUpdate = useCallback(() => setUpdate({}), []);
  const [finished, setFinished] = useState(false);

  let items = [];
  let answer = "";

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
    if (correctAnswers.some((obj) => obj[choice1] === item[choice1])) {
      return;
    } else {
      correctAnswers.push(item);
      if (correctAnswers.length === dataLength) setFinished(true);
      return correctAnswers;
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
    return items.map((item) => {
      console.log("renderChoices ", item[choice1]);
      return (
        <Flashcard
          choice1={item[choice1]}
          choice2={item[choice2]}
          color={colors[item.index]}
          answer={answer[choice2]}
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
      <Head title="Quiz" />
      {movies.length < 1 ? (<>
        <h1>Sorry, you have no quiz data</h1>
        <p>Please head to data to select your quiz details</p>
        </>
      ) : (
        <>
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
                <h2 style={{ textAlign: "center" }}>{answer[choice1]} </h2>
                <p>Words in this Set: {dataLength}</p>
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
          )
        </>
      )}
    </div>
  );
};

export default Review;

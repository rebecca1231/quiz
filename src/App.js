import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";

import Footer from "./components/footer";
import About from "./About";
import Landing from "./Landing";
import Quiz from "./Quiz";
import Scores from "./Score";
import Data from "./Data";

const LayoutBase = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 750px;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const App = () => {
  return (
    <Router>
      <div>
        <div className="ui secondary pointing menu">
          <div className="item">
            <Link to="/">Home</Link>
          </div>
          <div className="item">
            <Link to="/data">Get Your Data</Link>
          </div>
          <div className="item">
            <Link to="/quiz">Quiz</Link>
          </div>
          <div className="item">
            <Link to="/score">Score</Link>
          </div>
          <div className="item">
            <Link to="/about">About</Link>
          </div>
        </div>
        <Switch>
          <LayoutBase>
            <Route path="/about" component={About} />
            <Route path="/quiz" component={Quiz} />
            <Route exact path="/" component={Landing} />
            <Route path="/score" component={Scores} />
            <Route path="/data" component={Data} />
          </LayoutBase>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

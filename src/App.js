import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";

import About from "./About";
import Landing from "./Landing";
import Review from "./Review";
import Scores from "./Scores";

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
            <Link to="/about">About</Link>
          </div>
          <div className="item">
            <Link to="/review">Review</Link>
          </div>
        </div>
        <Switch>
          <LayoutBase>
            <Route path="/about" component={About} />
            <Route path="/review" component={Review} />
            <Route exact path="/" component={Landing} />
            <Route path="/scores" component={Scores} />
          </LayoutBase>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

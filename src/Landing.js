import React from "react";
import { useHistory } from "react-router-dom";

const Landing = (props) => {
  const history = useHistory();
  return (
    <div>
      <h1>Welcome to the Movie Quiz!</h1>
      <div style={{ lineHeight: 1.5 }}>
        <p>
          <strong>Step 1.</strong> Head Over to{" "}
          <button
            style={{ marginLeft: "3px" }}
            className="ui small basic button"
            onClick={() => history.push("/data")}
          >
            Get Your Data
          </button>
        </p>
        <p>
          <strong>Step 2.</strong> Search by keyword in the movie title.
        </p>
        <p>
          <strong>Step 3.</strong> Take a quiz!
        </p>
        <p>
          <strong>Step 4.</strong> See and share your results!
        </p>
        <div
          style={{ margin: "10px" }}
          className="ui basic teal button"
          onClick={() => history.push("/data")}
        >
          Get Started
        </div>
      </div>
    </div>
  );
};

export default Landing;

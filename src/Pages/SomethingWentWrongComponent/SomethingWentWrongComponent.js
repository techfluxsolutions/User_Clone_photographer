import React from "react";
import "./SomethingWentWrongComponent.css";

const SomethingWentWrongComponent = ({ onRetry }) => {
  return (
    <div className="fullpage-error">
      <div className="error-box">
        <h1>Something went wrong</h1>

        <p>
          We're having trouble loading this page.
          Please try again.
        </p>

        <button onClick={onRetry}>
          Retry
        </button>
      </div>
    </div>
  );
};

export default SomethingWentWrongComponent;
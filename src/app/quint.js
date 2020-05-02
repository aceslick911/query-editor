import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.less";

const QuintInstance = ({ quintState }) => {
  const Quint = () => {
    return (
      <div className="quint-main">
        <div className="flashCard">
          <div>
            <h1>Quint</h1>
            <div></div>
          </div>
        </div>
      </div>
    );
  };

  return {
    component: Quint(),
  };
};

export const create = ({ element, state }) => {
  const instance = QuintInstance({
    quintState: state,
  });
  const quintComponent = instance.component;
  ReactDOM.render(quintComponent, element);
  return instance;
};

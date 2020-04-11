import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.less";

import { QueryWindow } from "./queryWindow";

const QueryInstance = ({ queryState }) => {
  let activeState = queryState;

  let stateUpdater = null;
  let clickHandler = null;

  const QueryEditor = ({ queryState }) => {
    const [state, doSetState] = useState({ queryState });

    const setState = (newState) => {
      activeState = newState;
      doSetState(newState);
    };

    stateUpdater = setState;

    return (
      <div className="query-editor">
        <QueryWindow state={{ state: activeState }}></QueryWindow>
      </div>
    );
  };
  return {
    component: <QueryEditor queryState={queryState}></QueryEditor>,
    getState: () => activeState,
    on: (action, handler) => {
      if (action === "click") {
        clickHandler = handler;
      }
    },
    updateState: (newState) => {
      if (stateUpdater) {
        stateUpdater(newState);
      }
    },
  };
};
export const create = ({ element, state }) => {
  const instance = QueryInstance({
    queryState: state,
  });
  const QueryEditor = instance.component;
  ReactDOM.render(QueryEditor, element);
  return instance;
};

import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.less";

import { QueryWindow } from "./queryWindow";

const QueryInstance = ({ liked }) => {
  let activeState = liked;

  let stateUpdater = null;
  let clickHandler = null;

  const QueryEditor = ({ liked }) => {
    const [state, doSetState] = useState({ liked });

    const setState = (newState) => {
      activeState = newState;
      doSetState(newState);
    };

    stateUpdater = setState;

    return (
      <div className="query-editor">
        {/* <button
          onClick={() => {
            setState({ liked: !state.liked });
            !clickHandler || clickHandler();
          }}
        >
          {state.liked ? "You liked this" : "Like"}
        </button> */}
        <QueryWindow state={{ state: activeState }}></QueryWindow>
      </div>
    );
  };
  return {
    component: <QueryEditor liked={liked}></QueryEditor>,
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
    liked: state,
  });
  const QueryEditor = instance.component;
  ReactDOM.render(QueryEditor, element);
  return instance;
};

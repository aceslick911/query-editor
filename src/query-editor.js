import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.less";

const QueryInstance = ({ liked }) => {
  let activeState = { liked };

  let clickHandler = null;

  const QueryEditor = ({ liked }) => {
    const [state, doSetState] = useState({ liked });

    const setState = (newState) => {
      activeState = newState;
      doSetState(newState);
    };

    return (
      <div className="query-editor">
        <button
          onClick={() => {
            setState({ liked: !state.liked });
            !clickHandler || clickHandler();
          }}
        >
          {state.liked ? "You liked this" : "Like"}
        </button>
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
  };
};
export const create = ({ element, liked }) => {
  const instance = QueryInstance({
    liked,
  });
  const QueryEditor = instance.component;
  ReactDOM.render(QueryEditor, element);
  return instance;
};

import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.less";

const QueryInstance = () => {
  const QueryEditor = ({ liked }) => {
    const [state, setState] = useState({ liked });

    return (
      <div className="query-editor">
        <button onClick={() => setState({ liked: !state.liked })}>
          {state.liked ? "You liked this" : "Like"}
        </button>
      </div>
    );
  };

  return {
    component: QueryEditor,
  };
};
export const create = ({ element, liked }) => {
  const instance = QueryInstance();
  const QueryEditor = instance.component;
  ReactDOM.render(<QueryEditor liked={liked}></QueryEditor>, element);
  return {
    on: ({ click }) => {
      // Implement click handler
    },
    getState: () => {
      // Implement return of state
    },
  };
};

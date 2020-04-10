import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.less";

const QueryEditor = ({ liked }) => {
  const [state, setState] = useState({ liked });

  return (
    <div class="query-editor">
      <button onClick={() => setState({ liked: !state.liked })}>
        {state.liked ? "You liked this" : "Like"}
      </button>
    </div>
  );
};

export const create = ({ element, liked }) => {
  ReactDOM.render(<QueryEditor liked={liked} />, element);
};

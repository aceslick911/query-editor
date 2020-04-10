import React, { useState } from "react";
import ReactDOM from "react-dom";

const LikeButton = ({ liked }) => {
  const [state, setState] = useState({ liked });

  return (
    <button onClick={() => setState({ liked: !state.liked })}>
      {state.liked ? "You liked this" : "Like"}
    </button>
  );
};

export const create = ({ element, liked }) => {
  ReactDOM.render(<LikeButton liked={liked} />, element);
};

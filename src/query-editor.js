import React, { useState } from "react";
import ReactDOM from "react-dom";

const LikeButton = () => {
  const [state, setState] = useState({ liked: false });

  return (
    <button onClick={() => setState({ liked: true })}>
      {state.liked ? "You liked this" : "Like"}
    </button>
  );
};

document.addEventListener("DOMContentLoaded", function (event) {
  const rootElement = document.getElementById("class-editor");
  ReactDOM.render(<LikeButton />, rootElement);
});

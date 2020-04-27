import React, { useState } from "react";
import ReactDOM from "react-dom";

import { VSBox } from "./vs-box"

import { generateData } from './data.js';
import "./styles.less"
const dataSource = generateData(100);

const VSInstance = ({ state }) => {
  let activeState = state;
  const handlers = {
    click: null,
    update: null,
    readQuery: null,
    scroll: null,
    requestData: null
  }

  const VirtualScroll = ({ vsState }) => {
    return (
      <VSBox
        dataSource={activeState.dataSource}
        onScroll={() => handlers.scroll}
        handlers={handlers}
      ></VSBox>
    )
  }

  return {
    component: <VirtualScroll></VirtualScroll>,
    getState: () => activeState,
    on: (action, handler) => {
      switch (action) {
        case "click": {
          handlers.click = handler;
          return;
        }
        case "update": {
          handlers.update = handler;
          return;
        }
        case "scroll": {
          handlers.scroll = handler;
          return;
        }
        case "requestData": {
          handlers.requestData = handler;
          return;
        }
      }
    },
    updateState: (newState) => {
      if (handlers.update) {
        handlers.update(newState);
      }
    },
    readQueryData: (queryData) => {
      if (readQueryHandler) {
        readQueryHandler(queryData)
      } else {
        throw new Error("readQueryHandler not assigned")
      }
    }
  };
}

export const create = ({ element, state }) => {
  const instance = VSInstance({
    state: {
      dataSource: dataSource,
    }
  });
  const VSEditor = instance.component;
  ReactDOM.render(VSEditor, element);
  return instance;

}
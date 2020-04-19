import React, { useState } from "react";
import ReactDOM from "react-dom";

import {VSBox} from "./vs-box"

const VSInstance = ({state}) =>{
    let activeState = state;
    const handlers = {
        click:null,
        update:null,
        readQuery:null
    }

    const VirtualScroll = ({vsState})=>{
        return(
            <VSBox state={vsState}></VSBox>
        )
    }

    return {
        component: <VirtualScroll vsState={state}></VirtualScroll>,
        getState: () => activeState,
        on: (action, handler) => {
          if (action === "click") {
            handlers.click = handler;
          }
          if (action === "update") {
            handlers.update = handler;
          }
        },
        updateState: (newState) => {
          if (handlers.update) {
            handlers.update(newState);
          } 
        },
        readQueryData:(queryData)=>{
          if(readQueryHandler){
            readQueryHandler(queryData)
          } else{
            throw new Error("readQueryHandler not assigned")
          }
        }
      };
}

export const create = ({element, state})=>{    
    const instance = VSInstance({
        state: state,
      });
      const VSEditor = instance.component;
      ReactDOM.render(VSEditor, element);
      return instance;

}
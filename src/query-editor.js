import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.less";

import { QueryWindow } from "./queryWindow";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const QueryInstance = ({ queryState }) => {
  let activeState = queryState;

  let stateUpdater = null;

  let clickHandler = null; // eslint-disable-line no-unused-vars
  let updateHandler = null; // eslint-disable-line no-unused-vars

  // eslint-disable-next-line react/prop-types
  const QueryEditor = ({ queryState }) => {
    const [state, doSetState] = useState({ ...queryState }); // eslint-disable-line no-unused-vars

    const setState = (newState) => {
      activeState = newState;
      doSetState(newState);
      if (updateHandler) {
        updateHandler(newState);
      }
    };

    stateUpdater = setState;

    const reorderQuery = ({ startIndex, newIndex }) => {
      setState({
        ...activeState,
        queryConfig: {
          ...activeState.queryConfig,
          columns: reorder(
            activeState.queryConfig.columns,
            startIndex,
            newIndex
          ),
        },
      });
    };

    const addToQuery = ({startIndex, newIndex, dataSource})=>{

      console.log("Add to query",startIndex,newIndex,dataSource);
      
      const pluckedColumn = dataSource.columns[startIndex]//dataSource.columns.splice(startIndex,1)[0];
      activeState.queryConfig.columns.splice(newIndex,0,{
        type:"datasource",
        dataSourceId:dataSource.id,
        columnId:pluckedColumn.id,
        data:new Array(20).fill("?")
      });

      setState({
        ...activeState,
        dataSources:[...activeState.dataSources],
        queryConfig:{
          ...activeState.queryConfig,
          columns:[
            ...activeState.queryConfig.columns
          ]
        }
      })
    }

    return (
      <div className="query-editor">
        <QueryWindow state={state} reorderQuery={reorderQuery} addToQuery={addToQuery}></QueryWindow>
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
      if (action === "update") {
        updateHandler = handler;
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

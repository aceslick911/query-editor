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

  let readQueryHandler = null;// eslint-disable-line no-unused-vars

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

    readQueryHandler =(queryData)=>{
      const rows = queryData.results.rows;
      
      // Map for fast access
      const colMap = {}
      for(let col of activeState.queryConfig.columns){
        col.data=[];
        colMap[col.dataSourceId]=col;
      }
  
      for(let rowIndex = 0;rowIndex<rows.length;rowIndex++){
        let inRow = rows[rowIndex];      
        for(let inData in inRow){        
          colMap[inData].data.push(inData)
        }
      }
  
      setState({
        ...activeState,
      })
        
    }

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

      // set the inQuery property
      const existingDataSourceIndex = activeState.dataSources.indexOf(
        activeState.dataSources.find(source=>dataSource.id==source.id)
        ); 
      
      activeState.dataSources[existingDataSourceIndex].columns[startIndex]={
        ...activeState.dataSources[existingDataSourceIndex].columns[startIndex],
        inQuery:true,
      }

      setState({
        ...activeState,
        dataSources:[
          ...activeState.dataSources
        ],
        queryConfig:{
          ...activeState.queryConfig,
          columns:[
            ...activeState.queryConfig.columns
          ]
        }
      })
    }

    const removeFromQuery = ({removeIndex})=>{
      const targetCol = activeState.queryConfig.columns[removeIndex];

      //Find the column in data sources
      const colDataSource = activeState.dataSources.find(source=>source.id===targetCol.dataSourceId);
      const colDataSourceColIndex = colDataSource.columns.indexOf(
        colDataSource.columns.find(col=>col.id === targetCol.columnId)
        );
      colDataSource.columns[colDataSourceColIndex] = {
        ...colDataSource.columns[colDataSourceColIndex],
        inQuery:false
      }

      

      activeState.queryConfig.columns.splice(removeIndex,1);
      setState({
        ...activeState,
        queryConfig:{
          ...activeState.queryConfig,
          columns:[...activeState.queryConfig.columns]
        }
      })
    
    
    }
   
    return (
      <div className="query-editor">
        <QueryWindow state={state} reorderQuery={reorderQuery} addToQuery={addToQuery} removeFromQuery={removeFromQuery}></QueryWindow>
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
    readQueryData:(queryData)=>{
      if(readQueryHandler){
        readQueryHandler(queryData)
      } else{
        throw new Error("readQueryHandler not assigned")
      }
    }
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

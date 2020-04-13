import React, { useState } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DraggableDataSource = ({ source, col, index }) => {
  // const getListStyle = (isDraggingOver) => ({
  //   background: isDraggingOver ? "lightblue" : "lightgrey",
  // });
  return (
    <Draggable
      key={source.id + ":" + col.id}
      draggableId={source.id + ":" + col.id}
      index={index}
      // type={"datasources-" + source.id}
    >
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          // style={getListStyle(snapshot.isDraggingOver)}
          key={col.id}
          ref={provided.innerRef}
        >
          <label key={col.id} {...provided.dragHandleProps}>
            {col.name}
          </label>
        </div>
      )}
    </Draggable>
  );
};

const DroppableDataSources = ({ source }) => {
  return (
    <Droppable
      droppableId={"datasources-" + source.id}
      // type={"datasources-" + source.id}
      key={source.id}
    >
      {(provided) => (
        <div className="drop-area" ref={provided.innerRef}>
          {source.columns.map((col, index) => (
            <div className="column" key={col.id}>
              <DraggableDataSource
                col={col}
                source={source}
                index={index}
              ></DraggableDataSource>
              {provided.placeholder}
            </div>
          ))}
        </div>
      )}
    </Droppable>
  );
};

// eslint-disable-next-line
const DataView = ({ dataSources }) => {
  return (
    <div className="data-sources">
      <div className="data-wrap">
        <header>Data</header>
        <footer>
          <button>Add</button>
          <button>Remove</button>
        </footer>
        <div className="files">
          {dataSources.map((source) => (
            <div key={source.id} className="datasource">
              <header>{source.name}</header>
              <DroppableDataSources
                // {...provided.droppableProps}
                source={source}
                // col={col}
                // index={index}
              ></DroppableDataSources>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DraggableQueryItem = ({ colDataSource, colDataSourceCol, index }) => {
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
  });
  return (
    <div>
      {
        <Draggable
          key={colDataSource.name + "." + colDataSourceCol.name}
          draggableId={colDataSource.name + "." + colDataSourceCol.name}
          index={index}
          // type={"datasources-" + source.id}
        >
          {(provided, snapshot) => (
            <div
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              ref={provided.innerRef}
              // style={getListStyle(snapshot.isDraggingOver)}
              key={colDataSourceCol.name}
            >
              <label>{colDataSource.name + "." + colDataSourceCol.name}</label>
            </div>
          )}
        </Draggable>
      }
    </div>
  );
};

const DroppableQueryView = ({ queryConfig, dataSources }) => {
  const getColumn = (dataSourceId, columnId) => {
    return dataSources
      .find((item) => item.id === dataSourceId)
      .columns.find((col) => col.id === columnId);
  };

  const rowData = () => {
    let rowData = [];
    if (queryConfig.columns.length > 0) {
      rowData = queryConfig.columns[0].data.map(() => []);

      for (let col of queryConfig.columns) {
        for (let rowIndex = 0; rowIndex < col.data.length; rowIndex++) {
          rowData[rowIndex].push(col.data[rowIndex]);
        }
      }
    }
    return rowData;
  };

  return (
    <Droppable
      droppableId={"query"}
      // type={"datasources-" + source.id}
      key={"query"}
      direction="horizontal"
    >
      {(provided) => (
        <div className="hors-scroller" ref={provided.innerRef}>
          <div className="fields">
            {queryConfig.columns.map((column, index) => {
              const colDataSource = dataSources.find(
                (datasource) => datasource.id == column.dataSourceId
              );
              const colDataSourceCol = colDataSource.columns.find(
                (col) => col.id == column.columnId
              );
              return (
                <DraggableQueryItem
                  key={column.columnId}
                  colDataSource={colDataSource}
                  colDataSourceCol={colDataSourceCol}
                  index={index}
                ></DraggableQueryItem>
              );
            })}

            {provided.placeholder}
          </div>
          <div className="table">
            <div className="columns">
              {queryConfig.columns.map((column) => {
                return (
                  <div key={column.columnId}>
                    {getColumn(column.dataSourceId, column.columnId).name}
                  </div>
                );
              })}
            </div>
            {rowData().map((row) => (
              <div key={row} className="row">
                {row.map((col) => (
                  <div key={col}>{col}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export const QueryView = ({ queryConfig, dataSources }) => {
  return (
    <div className="query-view">
      <div className="wrap">
        <header>Query</header>
        <div className="scroll-wrap">
          <DroppableQueryView
            queryConfig={queryConfig}
            dataSources={dataSources}
          ></DroppableQueryView>
        </div>
      </div>
    </div>
  );
};

export const QueryWindow = ({ state }) => {
  // eslint-disable-next-line no-unused-vars
  const [activeState, setState] = useState(state);
  const { dataSources, queryConfig } = activeState.state;

  const onDragEnd = (result) => {
    console.log("Drag end", result);
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    // const items = reorder(
    //   this.state.items,
    //   result.source.index,
    //   result.destination.index
    // );

    // this.setState({
    //   items,
    // });
  };
  return (
    <div className="window">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="window-wrap">
          <DataView dataSources={dataSources}></DataView>
          <QueryView
            queryConfig={queryConfig}
            dataSources={dataSources}
          ></QueryView>
        </div>
      </DragDropContext>
    </div>
  );
};

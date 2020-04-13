import React, { useState } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DraggableDataSource = ({ provided, col }) => {
  return (
    <div
      {...provided.dragHandleProps}
      {...provided.draggableProps}
      ref={provided.innerRef}
      // style={getListStyle(snapshot.isDraggingOver)}
      key={col.id}
    >
      <label key={col.id}>{col.name}</label>
    </div>
  );
};

const DroppableDataSources = ({ source }) => {
  // const getListStyle = (isDraggingOver) => ({
  //   background: isDraggingOver ? "lightblue" : "lightgrey",
  //   padding: grid,
  // });
  return (
    <Droppable
      droppableId={"datasources-" + source.id}
      // type={"datasources-" + source.id}
      key={source.id}
    >
      {(provided) => (
        <div key={source.id} className="datasource">
          <header>{source.name}</header>
          {source.columns.map((col, index) => (
            <div className="column" key={col.id} ref={provided.innerRef}>
              <Draggable
                key={source.id + ":" + col.id}
                draggableId={source.id + ":" + col.id}
                index={index}
                // type={"datasources-" + source.id}
              >
                {(provided, snapshot) => (
                  <DraggableDataSource
                    provided={provided}
                    col={col}
                  ></DraggableDataSource>
                )}
              </Draggable>
              {provided.placeholder}
              {/* <DroppableDataSources
              {...provided.droppableProps}
              source={source}
              col={col}
              index={index}
            ></DroppableDataSources> */}
            </div>
          ))}
        </div>
      )}
    </Droppable>
  );
};

// eslint-disable-next-line
const DataView = ({ dataSources }) => {
  const grid = 8;
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
  });

  // const getListStyle = (isDraggingOver) => ({
  //   background: isDraggingOver ? "lightblue" : "lightgrey",
  //   padding: grid,
  // });

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
            <DroppableDataSources
              // {...provided.droppableProps}
              source={source}
              key={source.id}
              // col={col}
              // index={index}
            ></DroppableDataSources>
          ))}
        </div>
      </div>
    </div>
  );
};

export const QueryView = ({ queryConfig, dataSources }) => {
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

  const getColumn = (dataSourceId, columnId) => {
    return dataSources
      .find((item) => item.id === dataSourceId)
      .columns.find((col) => col.id === columnId);
  };

  return (
    <div className="query-view">
      <div className="wrap">
        <header>Query</header>
        <div className="scroll-wrap">
          <Droppable
            droppableId={"query"}
            // type={"datasources-" + source.id}
            key={"query"}
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
                      <div key={column.columnId}>
                        {
                          // <Draggable
                          //   key={column.columnId}
                          //   draggableId={column.columnId}
                          //   index={index}
                          // >
                          <div>
                            <label>
                              {colDataSource.name + "." + colDataSourceCol.name}
                            </label>
                          </div>
                          // </Draggable>
                        }
                      </div>
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
        )}
      </DragDropContext>
    </div>
  );
};

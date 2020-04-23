import React, { useRef } from "react";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { VSBox } from "../virtual-scroll/vs-box"

const DraggableDataSource = ({ source, col, index }) => {
  // const getListStyle = (snapshot) => {
  //   const style = {
  //     background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
  //   };

  //   return style;
  // };
  return (
    <Draggable
      isDragDisabled={col.inQuery === true}
      key={source.id + ":" + col.id}
      draggableId={source.id + ":" + col.id}
      index={index}
    // type={"datasources-" + source.id}
    >
      {(provided/*, snapshot*/) => (
        <div
          {...provided.draggableProps}
          // style={getListStyle(snapshot)}
          key={col.id}
          ref={provided.innerRef}
          className={col.inQuery ? "inQuery" : ""}
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
const DataView = ({ dataSources, setActions }) => {
  setActions({})
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
  // const getListStyle = (isDraggingOver) => ({
  //   background: isDraggingOver ? "lightblue" : "lightgrey",
  // });
  return (
    <div>
      {
        <Draggable
          key={colDataSource.name + "." + colDataSourceCol.name}
          draggableId={colDataSource.name + "." + colDataSourceCol.name}
          index={index}
        // type={"datasources-" + source.id}
        >
          {(provided/*, snapshot*/) => (
            <div
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              ref={provided.innerRef}
              // style={getListStyle(snapshot.isDraggingOver)}
              key={colDataSourceCol.name}
              className="draggableQueryField"
              title={colDataSource.name + "." + colDataSourceCol.name}
            >
              <label>{colDataSource.name + "." + colDataSourceCol.name}</label>
            </div>
          )}
        </Draggable>
      }
    </div>
  );
};

const DroppableQueryView = ({ queryConfig, dataSources, setActions }) => {

  setActions({
    scrollColumns: (e) => {
      if (fieldsRef.current != null) {
        fieldsRef.current.scrollLeft = e.scrollOffset.left;
      }

    }
  })

  const fieldsRef = useRef()

  const getColumn = (dataSourceId, columnId) => {
    const result = dataSources
      .find((item) => item.id === dataSourceId)
      .columns.find((col) => col.id === columnId);
    if (result == null) {
      throw new Error("Cannot find item" + dataSourceId + ":" + columnId)
    }
    return result;
  };

  const rowData = () => {
    let rowData = [];
    if (queryConfig.columns.length > 0) {
      rowData = []//queryConfig.columns[0].data.map(() => []);
      let colIndex = 0;
      for (let col of queryConfig.columns) {
        for (let rowIndex = 0; rowIndex < col.data.length; rowIndex++) {
          if (rowData.length <= rowIndex) {
            rowData.push([]);
          }
          while (rowData[rowIndex].length <= colIndex) {
            rowData[rowIndex].push("-")
          }
          rowData[rowIndex][colIndex] = col.data[rowIndex];
        }
        colIndex++;
      }
    }
    return rowData;
  };

  const dataSourceGenerator = () => {
    const rows = [];
    for (let col of queryConfig.columns) {
      let rowIndex = 0;
      for (let rowdata of col.data) {
        rows[rowIndex] = rows[rowIndex] || {};
        rows[rowIndex][col.columnId] = rowdata;
        rowIndex++;
      }
    }

    return rows;
  }

  return (
    <Droppable
      droppableId={"query"}
      // type={"datasources-" + source.id}
      key={"query"}
      direction="horizontal"
    >
      {(provided) => (

        <div className="wrap" ref={provided.innerRef}>
          <header>Query</header>
          <div className="fields" ref={(ref) => {
            fieldsRef.current = ref;
          }
          }>
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
          <VSBox dataSource={dataSourceGenerator()}></VSBox>
          {/* <div className="scroll-wrap">
          <div className="hors-scroller" onScroll={onTableScroll}>         
            <div className="table">
              <div className="columns">
                {queryConfig.columns.map((column,index) => {
                  return (
                    <div key={column.columnId}>
                      {getColumn(column.dataSourceId, column.columnId).name}
                    </div>
                  );
                })}
              </div>
              {rowData().map((row,rowIndex) => (
                <div key={rowIndex} className="row">
                  {row.map((col,colIndex) => (
                    <div key={colIndex}>{col}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div> */}
        </div>
      )}
    </Droppable>
  );
};

export const QueryView = ({ queryConfig,
  dataSources,
  setActions
}) => {
  return (
    <div className="query-view">
      <DroppableQueryView
        queryConfig={queryConfig}
        dataSources={dataSources}
        setActions={setActions}
      ></DroppableQueryView>

    </div>
  );
};

export const QueryWindow = ({
  state,
  reorderQuery,
  addToQuery,
  removeFromQuery,
  setActions }) => {
  // eslint-disable-next-line no-unused-vars
  const { dataSources, queryConfig } = state;

  const onDragEnd = (result) => {
    console.log(result);
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.source.droppableId === "query" && result.destination.droppableId === "query") {
      //Re-ordered query
      reorderQuery({
        startIndex: result.source.index,
        newIndex: result.destination.index,
      });
    } else
      if (result.destination.droppableId === "query") {
        const sourceDataSource = dataSources.find(source => result.source.droppableId === `datasources-${source.id}`);
        //Moved from datasource to query
        addToQuery({
          dataSource: sourceDataSource,
          startIndex: result.source.index,
          newIndex: result.destination.index,
        });
      } else
        if (result.source.droppableId === "query") {
          //Remove from query
          removeFromQuery({ removeIndex: result.source.index })
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

  //actions
  let actions = {
    queryViewActions: null,
    dataViewActions: null,

  }
  setActions(actions)

  return (
    <div className="window">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="window-wrap">
          <DataView
            dataSources={dataSources}
            setActions={(newActions => actions.dataViewActions = newActions)}
          ></DataView>
          <QueryView
            queryConfig={queryConfig}
            dataSources={dataSources}
            setActions={(newActions => actions.queryViewActions = newActions)}
          ></QueryView>
        </div>
      </DragDropContext>
    </div>
  );
};

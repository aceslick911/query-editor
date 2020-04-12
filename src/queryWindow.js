import React, { useState } from "react";
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
          {dataSources.map((source) => {
            return (
              <div key={source.id} className="datasource">
                <header>{source.name}</header>
                {source.columns.map((col) => (
                  <div className="column" key={col.id}>
                    <label>{col.name}</label>
                  </div>
                ))}
              </div>
            );
          })}
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
          <div className="hors-scroller">
            <div className="fields">
              {queryConfig.columns.map((column) => {
                const colDataSource = dataSources.find(
                  (datasource) => datasource.id == column.dataSourceId
                );
                const colDataSourceCol = colDataSource.columns.find(
                  (col) => col.id == column.columnId
                );
                return (
                  <div key={column.columnId}>
                    <label>
                      {colDataSource.name + "." + colDataSourceCol.name}
                    </label>
                  </div>
                );
              })}
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
        </div>
      </div>
    </div>
  );
};

export const QueryWindow = ({ state }) => {
  // eslint-disable-next-line no-unused-vars
  const [activeState, setState] = useState(state);
  const { dataSources, queryConfig } = activeState.state;

  return (
    <div className="window">
      <div className="window-wrap">
        <DataView dataSources={dataSources}></DataView>
        <QueryView
          queryConfig={queryConfig}
          dataSources={dataSources}
        ></QueryView>
      </div>
    </div>
  );
};

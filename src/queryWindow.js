import React, { useState } from "react";

export const QueryWindow = ({ state }) => {
  const [activeState, setState] = useState(state);
  const { dataSources, queryConfig } = activeState.state;
  console.log(activeState, queryConfig);
  return (
    <div className="window">
      <div className="window-wrap">
        <div className="data-sources">
          <div className="data-wrap">
            <header>Data</header>
            <footer>
              <button>Add</button>
              <button>Remove</button>
            </footer>
            <div className="files">
              <div className="datasource">
                <header>File 1</header>
                <div className="column">Firstname</div>
                <div className="column">Lastname</div>
              </div>
              <div className="datasource">
                <header>File 2</header>
                <div className="column">Firstname</div>
                <div className="column">Salary</div>
              </div>
              <div className="datasource">
                <header>File 2</header>
                <div className="column">Firstname</div>
                <div className="column">Salary</div>
              </div>
              <div className="datasource">
                <header>File 2</header>
                <div className="column">Firstname</div>
                <div className="column">Salary</div>
              </div>
              <div className="datasource">
                <header>File 2</header>
                <div className="column">Firstname</div>
                <div className="column">Salary</div>
              </div>
              <div className="datasource">
                <header>File 2</header>
                <div className="column">Firstname</div>
                <div className="column">Salary</div>
              </div>
              <div className="datasource">
                <header>File 2</header>
                <div className="column">Firstname</div>
                <div className="column">Salary</div>
              </div>
              <div className="datasource">
                <header>File 2</header>
                <div className="column">Firstname</div>
                <div className="column">Salary</div>
              </div>
              <div className="datasource">
                <header>File 2</header>
                <div className="column">Firstname</div>
                <div className="column">Salary</div>
              </div>
              <div className="datasource">
                <header>File 2</header>
                <div className="column">Firstname</div>
                <div className="column">Salary</div>
              </div>
            </div>
          </div>
        </div>

        <div className="query-view">
          <div className="wrap">
            <header>Query</header>
            <div className="fields">
              {queryConfig.columns.map((column) => {
                return <div>{column.columnId}</div>;
              })}
              <div>File1.Firstname</div>
              <div>File2.Salary</div>
            </div>
            <div className="table">
              <div className="columns">
                <div>Firstname</div>
                <div>Salary</div>
              </div>
              <div className="row">
                <div>Rick</div>
                <div>200000</div>
              </div>
              <div className="row">
                <div>Eddie</div>
                <div>250000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";

export const QueryWindow = () => {
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
          <header>Query</header>
        </div>
      </div>
    </div>
  );
};

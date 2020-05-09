import React, { useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";

import Dropzone from "react-dropzone";

import { API } from "../helpers/qds-api";

import "./styles.less";

// Quint instance wrapper
const QuintInstance = ({ quintState }) => {
  // Quint React Component
  const Quint = ({ state }) => {
    const [internalState, setState] = useState({
      tables: [],
      joins: [],
    });

    const uploadFiles = (files) => {
      API.upload.uploadFiles(files).then(updateTables);
    };

    const updateTables = () =>
      new Promise((resolve, reject) => {
        API.schema.getTables().then(({ tables, joins }) => {
          setState({
            ...internalState,
            tables,
            joins,
          });
        });
      });

    useEffect(() => {
      // Initialization
      updateTables();
    }, []);

    return (
      <Dropzone onDrop={uploadFiles}>
        {({ getRootProps, getInputProps }) => (
          <div className="quint-main" {...getRootProps()}>
            <div className="flashCard">
              <div>
                <h1>Quint</h1>
              </div>
            </div>
            <div>Tables</div>
            {internalState.tables.map((table) => (
              <ul>
                {table.name} - {table.count.value} ({table.count.text})
              </ul>
            ))}
            <div>Joins</div>
            {internalState.joins.map((join) => (
              <ul>
                {join.a} -- {join.b}
              </ul>
            ))}
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>
    );
  };

  return {
    component: <Quint state={quintState} />,
  };
};

export const create = ({ element, state }) => {
  const instance = QuintInstance({
    quintState: state,
  });
  const quintComponent = instance.component;
  ReactDOM.render(quintComponent, element);
  return instance;
};

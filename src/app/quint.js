import React, { useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";

import Dropzone from "react-dropzone";

import { API } from "../helpers/qds-api";

import "./styles.less";

import { CreateJoin } from "../components/quint/createJoin";

// Quint instance wrapper
const QuintInstance = ({ quintState }) => {
  // Quint React Component
  const Quint = ({ state }) => {
    const [internalState, setState] = useState({
      tables: [],
      joins: [],
      logoVisible: true,
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
            logoVisible: false,
          });
        });
      });

    useEffect(() => {
      // Initialization
      updateTables();
    }, []);

    return (
      <Dropzone onDrop={uploadFiles} noClick={true}>
        {({ getRootProps, getInputProps }) => (
          <div className="quint-main" {...getRootProps()}>
            {internalState.logoVisible ? (
              <div className="flashCard">
                <div>
                  <h1>Quint</h1>
                </div>
              </div>
            ) : (
              ""
            )}
            <h1>Tables</h1>
            {internalState.tables.map((table) => (
              <ul>
                {table.name} - {table.count.value} ({table.count.text})
              </ul>
            ))}
            <h1>Joins</h1>
            {internalState.joins.map((join) => (
              <ul>
                {join.type.split(".").pop()}
                <br /> {join.a} ({join.fieldA}) -- {join.b} ({join.fieldB})
              </ul>
            ))}
            <h2>Create Join</h2>
            <CreateJoin
              tables={internalState.tables}
              joinTypes={[]}
            ></CreateJoin>
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

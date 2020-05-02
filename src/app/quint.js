import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";

import Dropzone from "react-dropzone";

import { API } from "../helpers/qds-api";

import "./styles.less";

const QuintInstance = ({ quintState }) => {
  const Quint = ({ state }) => {
    return (
      <div className="quint-main">
        <Dropzone onDrop={API.upload.uploadFiles}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div className="flashCard">
                <div>
                  <h1>Quint</h1>
                  <div></div>
                </div>
              </div>

              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    );
  };

  return {
    component: Quint({ state: quintState }),
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

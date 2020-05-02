import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";

import { useDropzone } from "react-dropzone";

import { API } from "../helpers/qds-api";

import "./styles.less";

const QuintInstance = ({ quintState }) => {
  const Quint = ({ state }) => {
    const onDrop = useCallback(API.upload.uploadFiles, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });
    return (
      <div className="quint-main" {...getRootProps()}>
        <div className="flashCard">
          <div>
            <h1>Quint</h1>
            <div></div>
          </div>
        </div>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
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

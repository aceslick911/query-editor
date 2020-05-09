import React, { useState, useCallback, useEffect } from "react";

import "./createJoin.less";

export const CreateJoin = ({ tables, joinTypes }) => {
  const [state, setState] = useState({
    tableA: null,
    tableB: null,
    fieldA: null,
    fieldB: null,
    joinType: null,
  });
  return (
    <div className="create-join-component">
      <p>Join Type:</p>
      <select
        value={state.joinType}
        onChange={(event) => {
          setState({
            ...state,
            joinType: event.target.value,
          });
        }}
      >
        {joinTypes.map((join) => (
          <option>{join.name}</option>
        ))}
      </select>

      <p>Side A:</p>
      <select
        value={state.tableA}
        onChange={(event) => {
          setState({
            ...state,
            tableA: event.target.value,
          });
        }}
      >
        {tables.map((table) => (
          <option>{table.name}</option>
        ))}
      </select>
      {state.tableA != null && (
        <select
          value={state.fieldA}
          onChange={(event) => {
            setState({
              ...state,
              fieldA: event.target.value,
            });
          }}
        >
          {tables
            .find((table) => table.name == state.tableA.name)
            .fields.map((field) => (
              <option>{field}</option>
            ))}
        </select>
      )}

      <p>Side B:</p>
      <select
        value={state.tableB}
        onChange={(event) => {
          setState({
            ...state,
            tableA: event.target.value,
          });
        }}
      >
        {tables.map((table) => (
          <option>{table.name}</option>
        ))}
      </select>
      {state.tableB != null && (
        <select
          value={state.fieldB}
          onChange={(event) => {
            setState({
              ...state,
              fieldA: event.target.value,
            });
          }}
        >
          {tables
            .find((table) => table.name == state.tableB.name)
            .fields.map((field) => (
              <option>{field}</option>
            ))}
        </select>
      )}
    </div>
  );
};

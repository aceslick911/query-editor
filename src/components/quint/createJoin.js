import React, { useState, useCallback, useEffect } from "react";

import "./createJoin.less";

export const CreateJoin = ({ tables, joinTypes, createJoin }) => {
  const [state, setState] = useState({
    tableA: "",
    tableB: "",
    fieldA: "",
    fieldB: "",
    joinType: "fuzzy",
  });

  const tableAFields = () => {
    const table = tables.find((table) => table.name == state.tableA);
    if (table) {
      return table.fields;
    } else {
      return [];
    }
  };
  const tableBFields = () => {
    const table = tables.find((table) => table.name == state.tableB);
    if (table) {
      return table.fields;
    } else {
      return [];
    }
  };

  const joinReady = () =>
    state.tableA != "" &&
    state.tableB != "" &&
    state.fieldA != "" &&
    state.fieldB != "";

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
          <option key={join.id}>{join.name}</option>
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
        <option disabled selected value value="">
          -- select a table --
        </option>
        {tables.map((table) => (
          <option key={table.name}>{table.name}</option>
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
          <option disabled selected value value="">
            -- select a field --
          </option>
          {tableAFields().map((field) => (
            <option key={field}>{field}</option>
          ))}
        </select>
      )}

      <p>Side B:</p>
      <select
        value={state.tableB}
        onChange={(event) => {
          setState({
            ...state,
            tableB: event.target.value,
          });
        }}
      >
        <option disabled selected value value="">
          -- select a table --
        </option>
        {tables.map((table) => (
          <option key={table.name}>{table.name}</option>
        ))}
      </select>
      {state.tableB != null && (
        <select
          value={state.fieldB}
          onChange={(event) => {
            setState({
              ...state,
              fieldB: event.target.value,
            });
          }}
        >
          <option disabled selected value value="">
            -- select a field --
          </option>
          {tableBFields().map((field) => (
            <option key={field}>{field}</option>
          ))}
        </select>
      )}
      <button disabled={!joinReady()} onClick={() => createJoin(state)}>
        Create Join
      </button>
    </div>
  );
};

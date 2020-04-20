import React, { useState } from "react";

// import 'react-virtualized/styles.css';

export const VSBox = ({state})=>{

    return (<div>
        <h1>Hello</h1>
        {JSON.stringify(state,null,4)}
    </div>)
}
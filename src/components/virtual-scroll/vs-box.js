import React, { useState } from "react";

export const VSBox = ({state})=>{

    return (<div>
        <h1>Hello</h1>
        {JSON.stringify(state,null,4)}
    </div>)
}
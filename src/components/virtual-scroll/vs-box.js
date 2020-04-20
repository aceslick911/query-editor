import React, { useState } from "react";

import DataGrid, { Scrolling, Sorting, LoadPanel } from 'devextreme-react/data-grid';
import { generateData } from './data.js';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import "./styles.less"
const dataSource = generateData(100);


export const VSBox = ({state})=>{

    const [internalState, setState] = useState({
        loadPanelEnabled:true
    })

    const customizeColumns=(columns) =>{
        columns[0].width = 70;
      }

    const onContentReady=() =>{
    setState({
        loadPanelEnabled: false
    });
    }

    return (<div>
        <h1>Hello</h1>
        <DataGrid
        elementAttr={{
          id: 'gridContainer'
        }}
        rowAlternationEnabled={true}
        dataSource={dataSource}
        showBorders={true}
        customizeColumns={customizeColumns}
        onContentReady={onContentReady}
      >
        <Sorting mode="none" />
        <Scrolling mode="virtual" />
        <LoadPanel enabled={internalState.loadPanelEnabled} />
      </DataGrid>
    </div>)
}
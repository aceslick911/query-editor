import React, { useState } from "react";

import DataGrid, { Scrolling, Sorting, LoadPanel } from 'devextreme-react/data-grid';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';




export const VSBox = ({dataSource})=>{

    const [internalState, setState] = useState({
        loadPanelEnabled:true,
        dataSource:dataSource
    })

    const customizeColumns=(columns) =>{
      // if(columns.length>0){
      //   columns[0].width = 70;
      // }
      }

    const onContentReady=() =>{
    setState({
        loadPanelEnabled: false
    });
    }

    return (
      <div className="fill-wrap">
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
    </div>
)
}
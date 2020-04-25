import React, { useState, useRef, useEffect } from "react";

import DataGrid, { Scrolling, Sorting, LoadPanel } from 'devextreme-react/data-grid';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';




export const VSBox = ({ dataSource, onScroll }) => {

  const dataGridWidget = useRef()

  const [internalState, setState] = useState({
    loadPanelEnabled: true,
    dataSource: dataSource
  })

  const customizeColumns = (columns) => {
    // if(columns.length>0){
    //   columns[0].width = 70;
    // }
  }

  const onContentReady = () => {
    setState({
      loadPanelEnabled: false
    });
  }

  useEffect(() => {
    if (dataGridWidget.current != null) {
      const instance = dataGridWidget.current.instance;
      const scrollable = instance.getScrollable();
      if (scrollable != null) {
        scrollable.on("scroll", (e) => {
          if (onScroll() != null) {
            onScroll()(e)
          }
        })
      }
    }
  }, [dataGridWidget.current]);

  return (
    <div className="fill-wrap">
      <DataGrid
        ref={dataGridWidget}

        elementAttr={{
          id: 'gridContainer'
        }}
        dataSource={dataSource}

        showBorders={true}
        // allowColumnResizing={true}
        columnWidth={150}
        // columnAutoWidth={true}
        showBorders={true}
        rowAlternationEnabled={true}
        columnResizingMode={"widget"}

        customizeColumns={customizeColumns}
        onContentReady={onContentReady}
      >
        <Scrolling
          useNative={true}
        />

        <Sorting mode="none" />
        <Scrolling mode="virtual" />
        <LoadPanel enabled={internalState.loadPanelEnabled} />
      </DataGrid>
    </div>
  )
}
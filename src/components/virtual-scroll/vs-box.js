import React, { useState, useRef, useEffect } from "react";

import DataGrid, {
  Scrolling,
  Sorting,
  LoadPanel,
  Pager,
  Paging,
} from "devextreme-react/data-grid";

import CustomStore from "devextreme/data/custom_store";

import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";

export const VSBox = ({ dataSource, onScroll, handlers, actions }) => {
  const dataGridWidget = useRef();

  const [internalState, setState] = useState({
    loadPanelEnabled: true,
    dataSource: dataSource,
  });

  const customizeColumns = (columns) => {
    // if(columns.length>0){
    //   columns[0].width = 70;
    // }
  };

  // const onContentReady = () => {
  //   setState({
  //     loadPanelEnabled: false
  //   });
  // }

  const store = new CustomStore({
    key: "0",
    load: (loadOptions) => {
      console.log("REQUEST DATA", loadOptions);

      return new Promise((resolve, reject) => {
        if (handlers.requestData != null) {
          resolve(handlers.requestData(loadOptions));
        } else {
          reject("No request data handler set");
        }
      });
    },
  });

  actions.setDataReady = (readyStatus) => {
    setState({
      ...internalState,
      loadPanelEnabled: readyStatus,
    });
  };

  useEffect(() => {
    if (dataGridWidget.current != null) {
      const instance = dataGridWidget.current.instance;
      const scrollable = instance.getScrollable();
      if (scrollable != null) {
        scrollable.on("scroll", (e) => {
          if (onScroll() != null) {
            onScroll()(e);
          }
        });
      }
    }
  }, [dataGridWidget.current]);

  return (
    <div className="fill-wrap">
      <DataGrid
        ref={dataGridWidget}
        elementAttr={{
          id: "gridContainer",
        }}
        // dataSource={dataSource}
        dataSource={store}
        remoteOperations={true}
        showBorders={true}
        // allowColumnResizing={true}
        columnWidth={150}
        // columnAutoWidth={true}
        showBorders={true}
        rowAlternationEnabled={true}
        columnResizingMode={"widget"}
        // customizeColumns={customizeColumns}
        // onContentReady={onContentReady}
        remoteOperations={true}
      >
        <Scrolling useNative={true} mode="virtual" />

        <Sorting mode="none" />
        <Paging pageSize="100" />
        <LoadPanel enabled={internalState.loadPanelEnabled} />
      </DataGrid>
    </div>
  );
};

import React, { useState, useRef, useEffect } from "react";

import DataGrid, { Scrolling, Sorting, LoadPanel, Pager, Paging } from 'devextreme-react/data-grid';

import CustomStore from 'devextreme/data/custom_store';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';




export const VSBox = ({ dataSource, onScroll, handlers }) => {

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

  // const onContentReady = () => {
  //   setState({
  //     loadPanelEnabled: false
  //   });
  // }

  const store = new CustomStore({
    key: '0',
    load: (loadOptions) => {
      console.log("REQUEST DATA", loadOptions);

      return new Promise((resolve, reject) => {
        if (handlers.requestData != null) {
          resolve(handlers.requestData(loadOptions));

        } else {
          reject("No request data handler set");
        }
      })
    }
  }
    //   let params = '?';

    //   [
    //     'skip',
    //     'take',
    //     'requireTotalCount',
    //     'requireGroupCount',
    //     'sort',
    //     'filter',
    //     'totalSummary',
    //     'group',
    //     'groupSummary'
    //   ].forEach(function(i) {
    //     if (i in loadOptions && isNotEmpty(loadOptions[i]))
    //     { params += `${i}=${JSON.stringify(loadOptions[i])}&`; }
    //   });

    //   params = params.slice(0, -1);
    //   return fetch(`https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders${params}`)
    //     .then(response => response.json())
    //     .then((data) => {
    //       return {
    //         data: data.data,
    //         totalCount: data.totalCount,
    //         summary: data.summary,
    //         groupCount: data.groupCount
    //       };
    //     })
    //     .catch(() => { throw 'Data Loading Error'; });
    // }
  );

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

        <Scrolling
          useNative={true}
          mode="virtual"
        />

        <Sorting mode="none" />
        <Paging pageSize="100" />
        <LoadPanel enabled={internalState.loadPanelEnabled} />
      </DataGrid>
    </div>
  )
}
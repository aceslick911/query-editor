const objectToQueryString = (obj) =>
  Object.keys(obj)
    .map((key) => key + "=" + obj[key])
    .join("&");

export const API = {
  query: {
    // https://localhost:5001/api/Query/?query=
    newRequest: (columns) =>
      new Promise((resolve, reject) => {
        fetch(
          "/api/Query?" +
            objectToQueryString({
              query: columns,
            }),
          {
            method: "GET",
            headers: new Headers(),
          }
        ).then((resp) => {
          if (resp.status >= 200 && resp.status < 300) {
            resp.json().then((queryId) => {
              resolve(queryId);
            });
          } else {
            reject(resp);
          }
        });
      }),
    // https://localhost:5001/api/Query/get?id=b3bddd09-d81a-4841-9bd9-bea458639053
    getQuery: (queryId) =>
      new Promise((resolve, reject) => {
        console.log("Querying " + queryId);
        fetch(
          "/api/Query/get?" +
            objectToQueryString({
              id: queryId,
            }),
          {
            method: "GET",
            headers: new Headers(),
          }
        ).then((resp) => {
          if (resp.status >= 200 && resp.status < 300) {
            resp.json().then((query) => {
              resolve(query);
            });
          } else {
            reject(resp);
          }
        });
      }),
    // https://localhost:5001/api/Query/get?id=b3bddd09-d81a-4841-9bd9-bea458639053
    getQueryResult: (
      queryId,
      progressUpdate,
      queryStartTime = Number(new Date())
    ) =>
      new Promise((resolve, reject) => {
        console.log("Querying " + queryId);
        API.query
          .getQuery(queryId)
          .then((query) => {
            const timeTaken = (Number(new Date()) - queryStartTime) / 1000;
            console.log("Query time taken - " + timeTaken);
            console.log("QUERY PROGRESS", query.plan);
            if (
              !query.plan.completed
              //||
              //Need to fix this as rows may be less than 100
              //query.plan.readyRows < 100
            ) {
              console.log(
                "Plan not ready.. waiting 1 second..",
                query.plan.phases,
                query.plan.progress
              );
              if (progressUpdate != null) {
                progressUpdate(query.plan);
              }
              setTimeout(() => {
                resolve(
                  API.query.getQueryResult(
                    queryId,
                    progressUpdate,
                    queryStartTime
                  )
                );
              }, 1000);
            } else {
              console.log("Query ready", query);
              progressUpdate({
                phases: ["Complete"],
                timeRemaining: 0,
                progress: [1],
              });
              resolve(
                API.query.getResultsFromQuery(
                  queryId,
                  0,
                  100,
                  query.plan.readyRows
                )
              );
            }
          })
          .catch((reason) => reject(reason));
      }),

    // waitForQueryToHaveRows:(queryId, progressUpdate)=>{

    // },
    // https://localhost:5001/api/Resultset/836558a0-0259-48fd-b968-121eacbe4d25?page=0&pagesize=20
    getResultsFromQuery: (queryId, page, pagesize, totalRows = 1000) =>
      new Promise((resolve, reject) => {
        console.log("Querying " + queryId);
        fetch(
          "/api/Resultset/" +
            queryId +
            "?" +
            objectToQueryString({
              page,
              pagesize,
            }),
          {
            method: "GET",
            headers: new Headers(),
          }
        ).then((resp) => {
          if (resp.status >= 200 && resp.status < 300) {
            resp.json().then((query) => {
              resolve({
                ...query,
                totalRows,
              });
            });
          } else {
            reject(resp);
          }
        });
      }),

    // https://localhost:5001/api/Query/All
    getAllQueries: () =>
      new Promise((resolve, reject) => {
        fetch("/api/Query/All", {
          method: "GET",
          headers: new Headers(),
        }).then((resp) => {
          if (resp.status >= 200 && resp.status < 300) {
            resp.json().then((queries) => {
              resolve(queries);
            });
          } else {
            reject(resp);
          }
        });
      }),
  },
  upload: {
    uploadFile: (file) => {
      return new Promise((resolve, reject) => {
        let url = "/Mvc/Upload/";
        let formData = new FormData();

        formData.append("file", file);

        return fetch(url, {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            resolve(true);
            console.log("File uploaded", file, response);
          })
          .catch((reason) => {
            reject(reason);
          });
      });
    },

    uploadFiles: (files) => {
      console.log("uploading files", files);
      files.forEach((file) => API.upload.uploadFile(file));
    },
  },
  schema: {
    getTables: () => {
      return new Promise((resolve, reject) => {
        let url = "/api/Schema/Tables";

        return fetch(url, {
          method: "GET",
        })
          .then((response) => {
            resolve(true);
            console.log("File uploaded", file, response);
          })
          .catch((reason) => {
            reject(reason);
          });
      });
    },
  },
};

# Query Editor Component

Angelo Perera

## How to use

See demo/index.html for an example

```html
...
<head>
  <script src="../lib/query-editor.js"></script>
  <script lang="javascript">
        document.addEventListener("DOMContentLoaded", ()=> {

        // Initialize some mock data
        const dataSources = [
            {
            id: "1",
            name: "File 1",
            columns: [
                { id: "firstname", name: "First Name" },
                { id: "lastname", name: "Last Name" },
            ],
            },
            {
            id: "2",
            name: "File 2",
            columns: [
                { id: "firstname", name: "First Name" },
                { id: "salary", name: "Salary" },
            ],
            },
        ];

        // This is an example of a query configuration
        const queryConfig = {
            columns: [
            {
                type: "datasource",
                dataSourceId: "1",
                columnId: "firstname",
                data: ["Rick", "Eddie"],
            },
            {
                type: "datasource",
                dataSourceId: "2",
                columnId: "salary",
                data: ["200000", "250000"],
            },
            ],
            join: {
            joinType: "fuzzy",
            left: {
                datasourceId: "1",
                columnId: "1",
            },
            left: {
                datasourceId: "2",
                columnId: "1",
            },
            },
        };

        // Create the component
        const editor = queryEditor.create({
            element: document.getElementById("query-editor"),
            state: {
            dataSources,
            queryConfig,
            },
        });

        // Trigger on specific events
        editor.on("click",()=>{
            console.log("Handled click event");
            // Get back the active state
            const outputState = editor.getState();
            console.log(outputState);
        })

        // This is how you update the state externally
        editor.updateState({
            dataSources,
            queryConfig,
        })

    })
  </script>
</head>

...

<body>
  <div id="query-editor"></div>
</body>
```

## Build

```shell
npm run dev
```

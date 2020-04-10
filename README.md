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
        queryEditor.create({
            element:document.getElementById("query-editor"),
            liked:false
        })
    })
  </script>
</head>

...

<body>
  <div id="query-editor" class="query-editor"></div>
</body>
```

## Build

```shell
npm run dev
```

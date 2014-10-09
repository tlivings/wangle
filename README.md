# Usage

```javascript
var wangle = require('wangle');

var router = wangle();

router.insert('/foo/{id}');

router.search('/foo/1'); // => {"path":"/foo/{id}","match":"/foo/1","params":{"id":"1"}}
```

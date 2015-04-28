# Usage

```javascript
var Router = require('wangle');

var router = Router();

router.add('/foo/{id}');

router.match('/foo/1'); // => {"path":"/foo/{id}","match":"/foo/1","params":{"id":"1"}}
```

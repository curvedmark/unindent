# unindent

Remove indentations in a block of code

## Installation

	npm install unindent

## Example

```javascript
var assert = require('assert');
var unindent = require('unindent');
var code = '\ta\t\tb';

assert.equal(unindent(code), 'a\tb');
```

## API

```javascript
unindent(code, [opts]);
```

* `code` - A string of code.
* `opts` - An optional object literal support these options:
  * `tabSize` - A number. If specified, the starting tabs of each line will be convert to spaces.
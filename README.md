# cls-domains-promise

Certain asynchronous operations in continuation-local-storage and node.js domain breaks with few promise libraries.
It utilizes **then** function in promise libraries and makes it safe to work with them by binding callbacks passed to active context (cls or domains)

### How to use it ?
*Case 1: To patch mongoose internal promise library (mpromise) for cls*

> var cls = require('continuation-local-storage');
> var mongoose = require('mongoose');
> var proto = mongoose.Mongoose.prototype.Promise.prototype;

> var patchIt = require('cls-domains-promise');

> // or cls.getNamespace if exists
> var appSpace = cls.createNamespace('app');

> patchIt(appSpace, proto);

*Case 2: To patch promise.js for node.js domains*

> var mongoose = require('promise');
> var patchIt = require('cls-domains-promise');

> var appSpace = process.domain;
> var proto = promise.prototype.then;

> patchIt(appSpace, proto);

Voila! now use it as usual. After library is patched, use it as usual.

### Bugs and Issues
Have a bug or an issue with this? [Open a new Issue](https://github.com/mkeshavgarg/cls-domains-promise/issues)

### 

### Creator
It was created by and is maintained by Keshav Garg
* https://twitter.com/@_keshavgarg
* https://github.com/mkeshavgarg
* stackoverflow.com/users/4813207/keshav



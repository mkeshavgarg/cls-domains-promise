'use strict';

/*
    namespace eg: process.domain, cls
    proto eg: Promise.prototype, Bluebird.prototype
 */
module.exports = function patchIt(namespace, proto) {

    if (!namespace || typeof namespace.bind !== 'function') {
        throw new TypeError("must include namespace to patch library against");
    }

    if (!proto || !proto.then || typeof proto.then!== 'function') {
        throw new TypeError("proto specified does not match promise library");
    }

    var original = proto.then;
    proto.then = function(cb, eb) {
        if(namespace) {
            if (typeof cb === 'function') {
                cb = namespace.bind(cb);    // bind cb to the current namespace
            }
            if (typeof eb === 'function') {
                eb = namespace.bind(eb);    // bind eb to the current namespace
            }
        }
        return original.call(this, cb, eb);
    };
};

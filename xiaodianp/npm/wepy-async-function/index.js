(function() {
    var a = require("./global.js");
    a.Promise = require("./../promise-polyfill/promise.js"), a.regeneratorRuntime = require("./../regenerator-runtime/runtime.js");
})();
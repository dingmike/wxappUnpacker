Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    var e = this;
    this.mixins && Object.keys(this.mixins || {}).forEach(function(t) {
        e[t] = (0, i.bind)(e.mixins[t], e);
    });
};

var i = require("../utils/index");
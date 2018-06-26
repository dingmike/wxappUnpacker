Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    var r = this;
    Object.keys(t).forEach(function(o) {
        var d = r[o] || e.noop;
        r[t[o]] = function() {
            d.call(r);
        };
    });
};

var e = require("../utils/index"), t = {
    beforeCreate: "beforeCreate",
    created: "created",
    beforeMount: "beforeMount",
    mounted: "mounted",
    beforeUpdate: "beforeUpdate",
    updated: "updated",
    beforeDestroy: "beforeDestroy",
    destroyed: "destroyed"
};
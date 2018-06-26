Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.mixin = exports.components = void 0;

var e = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t];
        for (var r in o) Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r]);
    }
    return e;
}, t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../imnotice/index")), o = exports.components = {
    imNotice: t.default
}, r = exports.mixin = {};

exports.default = e({
    components: o
}, r);
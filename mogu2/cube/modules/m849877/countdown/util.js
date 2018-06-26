function o(o) {
    return o < 10 ? "0" + o : o;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.formatTime = void 0;

!function(o) {
    o && o.__esModule;
}(require("../../../../common/m.js"));

exports.formatTime = function(e) {
    var r = Math.floor(e / 60), t = o(Math.floor(e - 60 * r)), n = o(Math.floor(r / 60));
    return n + "时" + o(r - 60 * n) + "分" + t + "秒";
};
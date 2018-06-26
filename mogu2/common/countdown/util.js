function e(e) {
    return e < 10 ? "0" + e : e;
}

function r(r) {
    var t = Math.floor(r / 60), o = Math.floor(t / 60), s = e(Math.floor(o / 24));
    return {
        dd: s,
        hh: e(o - 24 * s),
        mm: e(t - 60 * o),
        ss: e(Math.floor(r - 60 * t))
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.formatTime = function(e, t) {
    var o = r(e);
    return t ? t.replace("dd", o.dd).replace("hh", o.hh).replace("mm", o.mm).replace("ss", o.ss) : o.hh + "时" + o.mm + "分" + o.ss + "秒";
};
Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function(r) {
    var e = "" + r;
    return 1 == e.length ? "0" + e : e;
};

exports.transformRemainTime = function(e) {
    if (!e || e < 0) return "00小时00分00秒";
    var t = r(Math.floor(e / 86400)), o = r(Math.floor(e % 86400 / 3600)), n = r(Math.floor(e % 3600 / 60)), a = r(e % 60);
    return t = "00" !== t ? t + "天" : "", o = o ? o + "小时" : "00小时", n = n ? n + "分" : "00分", 
    a = a ? a + "秒" : "00秒", "" + t + o + n + a;
};
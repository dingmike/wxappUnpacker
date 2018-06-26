function t() {
    var t = n.System.getSync("systemInfo");
    return t ? "小程序=>型号:" + t.model + ",微信版本:" + t.version + ",操作系统:" + t.system + ",客户端平台:" + t.platform + ",基础库版本:" + t.SDKVersion + ",像素比:" + t.pixelRatio : "小程序=>未知版本";
}

function e(e, r) {
    if (!e) return null;
    var n = {};
    if ("object" === (void 0 === e ? "undefined" : o(e))) n.msg = e.message || "", n.stack = e.stack || "", 
    "string" != typeof n.stack && (n.stack = "" + n.stack); else if ("string" == typeof e) {
        var s = e.split("\n");
        n.msg = s[1], n.stack = e;
    }
    return n.ua = t(), n.type = 1, r && r._author ? n : void 0;
}

function r() {
    var t = getCurrentPages();
    if (t.length) {
        var e = t[t.length - 1];
        return Object.assign({}, e.$getPtpData());
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

exports.setReporter = function(t) {
    a._author = t;
}, exports.report = function(t, o) {
    var n = {
        url: "wxa://error",
        refer: "",
        ptp_cnt: "",
        ptp_url: "",
        ptp_ref: ""
    };
    Object.assign(n, r());
    var i = e(t, o = Object.assign({}, a, o));
    i && (i.formatUrl = n.url.split("?")[0], i.extra = JSON.stringify(o), (0, s.event)(n, "016000011", i));
};

var n = require("../../common/m"), s = require("./pe"), a = {
    threshold: 10,
    _type: "wxa",
    _author: "nanzhu,qiyun"
};
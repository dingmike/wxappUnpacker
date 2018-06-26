function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t) {
    for (var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], r = "", o = void 0, p = 0, n = 0; n < t; n++) o = Math.floor(Math.random() * v), 
    r += d.charAt(o), p += d.charCodeAt(o);
    return e && (r += d.charAt(p % v)), r;
}

function r(t) {
    var e = s.default.get("TABS");
    if (!e) throw new Error("请在setup.js中设置小程序的Tab配置@奇云");
    return t.split("?")[0].replace("wxa:/", "") in e;
}

function o(t, e, o) {
    if (r(t) && o) {
        if (m) return !0;
        if (r(e)) return !0;
    }
    return !1;
}

function p(t, e) {
    var r = t.split("."), o = e.split(".");
    if (r[1] === o[1] && r[4] === o[4]) return !0;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.Logger = void 0, exports.stopLogger = function(t) {
    (0, a.setCfg)({
        pause: t
    });
}, exports.updateCPS = function(t) {
    if (t) {
        var e = t.__cpsinfo || "";
        (0, a.setCfg)({
            cpsinfo: e.replace("-", ","),
            cpsparam: t.__cps || ""
        });
    }
}, exports.nextPeventOnShow = function(t) {
    m = t;
}, exports.setScene = function(t) {
    t && (0, a.setCfg)({
        scene: t
    });
}, exports.getScene = function() {
    return (0, a.getCfg)("scene");
}, exports.setFromId = function(t) {
    (0, a.setFid)(t);
}, exports.getFromId = function() {
    return (0, a.getFid)();
}, exports.initializeLogger = function(t) {
    t && (t.v = i.default.v, t.lt = n.performance.st, (0, a.setCfg)(t));
}, exports.setDefaultReporter = function(t) {
    (0, c.setReporter)(t);
}, exports.reportMsg = function(t, e) {
    (0, c.report)(t, e);
}, exports.initQueue = function() {
    (0, g.iQueue)();
};

var n = require("../../common/m"), i = t(n), s = t(require("../../common/utils/cache")), a = require("./config"), u = require("./pe"), f = require("./device"), c = require("./report"), l = require("./expose"), g = require("./queue"), h = require("./acm"), _ = i.default.qs.stringify, d = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", v = d.length, m = !1, x = "", D = "", $ = "", w = !0;

exports.Logger = {
    onLoad: function(t) {
        var r = !1;
        this.$root.ptpData = this.ptpData = {
            pid: Date.now() + e(3, !1),
            ptp_cnt: "",
            ptp_url: "",
            ptp_ref: "",
            url: "",
            refer: ""
        };
        var o = this.$root.route || this.$root.__route__, p = o.replace(/^pages\/(.+)\/index$/, "$1").replace(/\//g, "_"), n = [ (0, 
        a.getCfg)("platform"), p, 0, 0, e(7) ].join("."), i = this.ptpData;
        i.ptp_cnt = n, t.ptp ? (i.ptp_url = decodeURIComponent(t.ptp), i.ptp_ref = D, t.ptp.split(".")[0] !== (0, 
        a.getCfg)("platform") && (r = !0, i.ptp_ref = "")) : (i.ptp_url = x, i.ptp_ref = D);
        var s = _(t, !1);
        s.length > 0 && (s = "?" + s), i.url = "wxa://" + o + s, r || (i.refer = $), x = n, 
        D = i.ptp_url, $ = i.url, (0, u.page)(this.ptpData);
    },
    onShow: function() {
        var t = this;
        this.ptpData.st = Date.now(), (0, a.setCfg)({
            pause: !1
        });
        var n = this.ptpData;
        if (o(n.url, $, this.$notFirstShow)) {
            var i = n.ptp_cnt.split(".");
            if (5 === i.length && (i[4] = e(7)), n.ptp_cnt = i.join("."), n.ptp_url = x, n.ptp_ref = D, 
            n.refer = $, n.ptp_lst = "", n.pid = Date.now() + e(3, !1), n.url = n.url.split("?")[0], 
            !r($)) {
                var c = _(s.default.get("global.params") || "", !1);
                n.url = n.url + "?" + c;
            }
            (0, u.page)(n);
        } else p(n.ptp_cnt, D) ? n.ptp_lst = x : n.ptp_lst = "";
        if (x = n.ptp_cnt, D = n.ptp_url, $ = n.url, this.$notFirstShow = !0, m = !1, w) {
            var l = Date.now() - (0, a.getCfg)("lt");
            w = !1, setTimeout(function() {
                (0, f.device)(l);
            }, 0);
        }
        setTimeout(function() {
            t.$root && t.$root.$expose();
        }, 200);
    },
    onHide: function() {
        this.$logE("013000002", {
            _pagelogid: this.ptpData.pid,
            sys_page_time: Date.now() - this.ptpData.st
        });
    },
    onUnload: function() {
        this.$logE("013000002", {
            _pagelogid: this.ptpData.pid,
            sys_page_time: Date.now() - this.ptpData.st
        });
    },
    methods: {
        $getPtpData: function(t) {
            return t ? Object.assign(this.ptpData, {
                acm: (0, h.acmExt)(t)
            }) : this.ptpData;
        },
        $logForm: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, r = arguments[2];
            t || console.error("formId打点无效，请排查！"), this.$logE("000000244", Object.assign({
                formId: t,
                scene: e
            }, r), {
                force: !0
            });
        },
        $logE: function(t, e, r) {
            if (!t || "0" === t) throw new Error("event ID is invalid");
            (0, u.event)(this.ptpData, t, e, r);
        },
        $expose: function(t) {
            l.expose.call(this, t);
        },
        $logExpose: function(t) {
            l.logExpose.call(this, t);
        }
    }
};
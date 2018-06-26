function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    var n = e.split("?"), a = {};
    2 === n.length && (a = o(n[1])), Object.assign(a, t);
    var r = Object.keys(a).reduce(function(e, t) {
        return void 0 !== a[t] && "" !== a[t] && (e[t] = a[t]), e;
    }, {});
    return r.f ? r.f2 = "1002" : r.f = "1002", e = n[0] + "?" + c(r);
}

function n() {
    return {
        ptp: this.ptpData.ptp_cnt,
        share_channel: u,
        _fu: r.default.uid,
        _mgjuuid: s.System.getSync("deviceId")
    };
}

function a(e, a) {
    return function(r) {
        var s = this, i = e.call(a, r), c = this.ptpData.url, o = i.listPath, u = i.path || c;
        u = u.replace(/^wxa:\/+/, "/");
        var l = n.call(a);
        return o && (o = o.replace(/^wxa:\/+/, "/"), l._surl = 0 === u.indexOf("/") ? u : "/" + u, 
        u = o), u = t(u, l), this.$logE("91041", Object.assign({}, i.eventParams), {
            force: !0
        }), {
            title: i.title,
            path: u,
            imageUrl: i.imageUrl,
            success: function(e) {
                s.$logE("700700", Object.assign({
                    title: i.title
                }, i.eventParams), {
                    force: !0
                }), i.success && i.success.call(a, e);
            },
            fail: function(e) {
                i.fail && i.fail.call(a, e);
            },
            complete: function(e) {
                i.complete && i.complete.call(a, e);
            }
        };
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.initShareScene = function(e) {
    1036 !== e && 1007 !== e && 1008 !== e || (l = !0);
};

var r = e(require("../common/service/user")), s = require("../common/m"), i = e(s).default.qs, c = i.stringify, o = i.parse, u = 1, l = !1;

exports.default = {
    onLoad: function(e) {
        if ("share_channel" in e) {
            var t = e.share_channel;
            if (!/^\d+$/.test(t)) return;
            u = parseInt(t, 10) + 1;
        }
        this.onShareAppMessage && (this.onShareAppMessage = a(this.onShareAppMessage, this), 
        Object.defineProperty(this.$root, "onShareAppMessage", {
            value: this.onShareAppMessage
        }));
    },
    onShow: function() {
        if (this.query._surl && l) {
            var e = decodeURIComponent(this.query._surl);
            this.$navigate(e, {}, !0);
        }
        l = !1;
    },
    methods: {
        $getShareParams: function(e) {
            return t(e, n.call(this));
        }
    }
};
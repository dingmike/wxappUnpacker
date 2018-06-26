function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = Object.assign || function(t) {
    for (var a = 1; a < arguments.length; a++) {
        var e = arguments[a];
        for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    }
    return t;
}, e = t(require("../../common/base/createPage")), n = t(require("../../common/service/user"));

(0, e.default)({
    components: {},
    data: {
        params: null,
        auth: null
    },
    onLoad: function(t) {
        var a = this;
        t && this.setData({
            params: t
        }), this.auth().then(function() {
            console.log(a.data.auth), a.data.auth && a.back();
        });
    },
    methods: {
        auth: function() {
            var t = this;
            return n.default.ensure().then(function() {
                t.setData({
                    auth: !0
                });
            }).catch(function() {
                t.setData({
                    auth: !1
                });
            });
        },
        back: function() {
            var t = this.data, e = t.params, n = t.auth;
            wx.navigateBackMiniProgram({
                extraData: a({}, e, {
                    auth_result: n ? "success" : "fail"
                }),
                complete: function() {
                    console.warn("complete");
                },
                success: function(t) {
                    console.warn("success", t);
                },
                fail: function(t) {
                    console.error(t);
                }
            });
        }
    }
});
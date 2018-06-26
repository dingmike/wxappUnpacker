function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../../common/m")), s = t(require("../../common/im/notice")), n = t(require("../../common/im/index")), i = t(require("../../common/im/util")), o = t(require("../../common/service/user")), a = t(require("./getBusinessId")), r = t(require("./onlineStatus")), u = [ "orderDetail", "orderRefund" ];

exports.default = {
    data: function() {
        return {
            class: "",
            text: "",
            style: "opacity: 0;position: absolute; width: 100%; height: 100%;line-height: 100%;top: 0;left: 0;display: block;text-align: center;z-index: 99;",
            isLogin: !0,
            useBusinessId: !0,
            type: 1,
            shopIds: null,
            useIM: null,
            shopId: null,
            businessIds: {},
            allStatus: {},
            showCard: !1,
            img: "",
            path: "",
            title: "",
            userId: null,
            convId: null,
            session: "",
            allocateType: 1,
            goodsId: null,
            fromPage: null,
            fromType: null,
            activityId: null,
            channelId: null
        };
    },
    onLoad: function() {
        var t = this;
        this.showIM(), wx.getSetting && wx.getSetting({
            success: function(e) {
                var s = e.authSetting;
                s && !1 === s["scope.userInfo"] && (console.log("login true"), t.setData({
                    isLogin: !1
                }));
            }
        });
    },
    showIM: function() {
        var t = this.data.useIM;
        return null !== t ? t : (t = s.default.useIM(), this.setData({
            useIM: t
        }), t);
    },
    verDiff: function(t, e) {
        for (var s = t.split("."), n = e.split("."), i = 0; i <= s.length; i++) {
            if (parseInt(s[i]) > parseInt(n[i])) return 1;
            if (parseInt(s[i]) < parseInt(n[i])) return -1;
        }
        return 0;
    },
    methods: {
        setImOpts: function() {
            var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            e && e.img && e.path && e.title && (e.showCard = !0), this.setData(e, function() {
                t.setBusinessInfo();
            });
        },
        setBusinessInfo: function() {
            var t = this, e = this.data;
            if (!this.showIM()) {
                var s = [];
                e.shopIds && e.shopIds.length > 0 ? s = e.shopIds : e.shopId && (s = s.concat(e.shopId));
                var i = this.data.type;
                [ 0, 1, 2, 3 ].indexOf(e.type) > -1 && (i = e.type), 1 !== i && 3 !== i || n.default.getisMin().then(function(e) {
                    e ? t.setData({
                        useBusinessId: !1
                    }) : (0, a.default)(s).then(function(e) {
                        console.log("getBusiness:", t.data, e);
                        var s = t.data.businessIds;
                        s = Object.assign({}, s, e), t.setData({
                            businessIds: s,
                            useBusinessId: !0
                        });
                    }).catch(function() {
                        console.error("get BusinessId error twice");
                    });
                }), 2 !== i && 3 !== i || (0, r.default)(s).then(function(e) {
                    var s = t.data.allStatus;
                    s = Object.assign({}, s, e), t.setData({
                        allStatus: s
                    });
                }).catch(function(t) {
                    console.error("get online status error twice");
                });
            }
        },
        bindContact: function(t) {
            var e = t.detail, s = e.path, n = e.query;
            s && "/" !== s && (s = s.replace(/^\/\//i, "/"), this.$root.$navigate(s + "?" + i.default.queryString(n)));
        },
        doLogin: function() {
            o.default.init().catch(function() {
                console.log("IM need User login");
            });
        },
        noBusiness: function() {
            this.setBusinessInfo(), wx.showModal({
                content: "客服连接失败，请重试",
                showCancel: !1,
                confirmColor: "#ff4422"
            });
        },
        callContact: function(t) {
            s.default.readMsg(), this.$root.$logE("000100028"), this.$root.$navigate("/pages/im/contact/index");
        },
        preventDefault: function() {
            this.$root.$logE("000100027");
        },
        toggleTap: function(t) {
            var s = t.currentTarget.dataset, n = s.shopid, i = s.userid, o = s.convid, a = s.allocatetype, r = s.goodsid, l = s.frompage, d = s.fromtype, c = s.activityid, f = s.channelid;
            if (a && (a = u.indexOf(l) > 0 ? 2 : 1), n || i || o) {
                var h = {};
                n && (h.shopId = n), i && (h.userId = i), o && (h.convId = o), a && (h.allocateType = a), 
                r && (h.goodsId = r), d && (h.fromType = d), c && (h.activityId = c), f && (h.channelId = f);
                var g = "/pages/im/chat/index?" + e.default.qs.stringify(h);
                console.log(g), this.$root.$navigate(g);
            } else this.$root.$navigate("/pages/im/index");
        }
    }
};
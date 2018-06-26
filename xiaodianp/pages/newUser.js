function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function b(a) {
    return function() {
        var b = a.apply(this, arguments);
        return new Promise(function(c, a) {
            function d(e, f) {
                try {
                    var g = b[e](f), h = g.value;
                } catch (b) {
                    return void a(b);
                }
                return g.done ? void c(h) : Promise.resolve(h).then(function(a) {
                    d("next", a);
                }, function(a) {
                    d("throw", a);
                });
            }
            return d("next");
        });
    };
}

function c(a, b) {
    if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
}

function d(a, b) {
    if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return b && ("object" == typeof b || "function" == typeof b) ? b : a;
}

function f(a, b) {
    if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
    a.prototype = Object.create(b && b.prototype, {
        constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var g = function() {
    function a(a, b) {
        for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, 
        c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c);
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b;
    };
}(), e = require("./../npm/wepy/lib/wepy.js"), h = a(e), i = require("./../common/api.js"), j = require("./../common/global.js"), k = a(j), l = require("./../common/da.js"), m = a(l), n = require("./../components/coupon-list.js"), p = a(n), o = require("./../components/group-list.js"), q = a(o), r = function(a) {
    function j() {
        var b, e, f, g;
        c(this, j);
        for (var l = arguments.length, a = Array(l), i = 0; i < l; i++) a[i] = arguments[i];
        return e = f = d(this, (b = j.__proto__ || Object.getPrototypeOf(j)).call.apply(b, [ this ].concat(a))), 
        f.config = {
            backgroundColor: "#ffffff",
            enablePullDownRefresh: !1
        }, f.data = {
            global: {},
            couponList: [],
            groupList: [],
            bannerURL: "",
            isShowArrow: !0,
            isShow: !1
        }, f.$repeat = {}, f.$props = {
            couponList: {
                "xmlns:v-bind": "",
                "v-bind:couponList.sync": "couponList"
            },
            newUserGroup: {
                "v-bind:groupData.sync": "groupList"
            }
        }, f.$events = {}, f.components = {
            couponList: p.default,
            newUserGroup: q.default
        }, f.methods = {
            bigBannerClick: function(a) {
                k.default.advoiceTapTwice(a) && h.default.navigateTo({
                    url: a.currentTarget.dataset.url
                });
            }
        }, g = e, d(f, g);
    }
    return f(j, a), g(j, [ {
        key: "onShareAppMessage",
        value: function() {
            return {
                title: "新人专享福利",
                path: "/pages/newUser?f_id=" + k.default.getFid() + "&is_share=" + k.default.config.is_share
            };
        }
    }, {
        key: "onUnload",
        value: function() {}
    }, {
        key: "onLoad",
        value: function() {
            function a() {
                return c.apply(this, arguments);
            }
            var c = b(regeneratorRuntime.mark(function a(b) {
                var c, d, f;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        if (this.global = k.default, k.default.initAppOpenInfo(), !(c = wx.getStorageSync("Xcx-Token"))) {
                            a.next = 7;
                            break;
                        }
                        (0, i.init)(), a.next = 9;
                        break;

                      case 7:
                        return a.next = 9, (0, i.init)();

                      case 9:
                        d = this, f = b.f_id || k.default.getFid(), f && k.default.setShareFid(f, k.default.config.is_share || 0), 
                        this.getData();

                      case 13:
                      case "end":
                        return a.stop();
                    }
                }, a, this);
            }));
            return a;
        }()
    }, {
        key: "getData",
        value: function() {
            var a = b(regeneratorRuntime.mark(function a() {
                var b, c, d;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        return b = this, c = {
                            deviceType: k.default.config.device_type
                        }, a.next = 4, (0, i.seePost)("ng/mall/new", c);

                      case 4:
                        d = a.sent, d && (b.couponList = d.data.couponList || [], b.bannerURL = d.data.bannerURL || [], 
                        b.groupList = d.data.grouponList || [], b.isShow = !0, b.$apply()), m.default.report(525, 101, "-1", "", "", k.default.getFid());

                      case 7:
                      case "end":
                        return a.stop();
                    }
                }, a, this);
            }));
            return function() {
                return a.apply(this, arguments);
            };
        }()
    } ]), j;
}(h.default.page);

Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(r, "pages/newUser"));
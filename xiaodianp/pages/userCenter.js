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
}(), e = require("./../npm/wepy/lib/wepy.js"), h = a(e), j = require("./../common/api.js"), i = require("./../common/global.js"), k = a(i), l = require("./../common/da.js"), m = a(l), n = function(a) {
    function l() {
        var b, e, f, g;
        c(this, l);
        for (var a = arguments.length, i = Array(a), j = 0; j < a; j++) i[j] = arguments[j];
        return e = f = d(this, (b = l.__proto__ || Object.getPrototypeOf(l)).call.apply(b, [ this ].concat(i))), 
        f.config = {
            navigationBarTitleText: " ",
            backgroundColor: "#f4f4f4"
        }, f.data = {
            addressList: [],
            is_weixin_addr: 0,
            user_info: {},
            isLoaded: !1,
            clickNum: 0,
            xiaochengxuInfo: {},
            serviceData: {
                is_zhuiyi: 1
            }
        }, f.methods = {
            clickAddress: function() {
                h.default.navigateTo({
                    url: "addressManager?type=1"
                });
            },
            handleApply: function() {
                wx.previewImage({
                    urls: [ this.xiaochengxuInfo.url_apply_png ]
                });
            },
            handleShare: function() {
                wx.previewImage({
                    urls: [ this.xiaochengxuInfo.url_share_png ]
                });
            },
            gotoContact: function() {
                if (!this.serviceData.is_zhuiyi) {
                    var a = this.serviceData.qrc_img ? JSON.stringify(this.serviceData) : "";
                    h.default.navigateTo({
                        url: "service?str_service_config=" + a
                    });
                }
            },
            bindDebug: function() {
                this.clickNum++, console.log(this.clickNum);
            }
        }, g = e, d(f, g);
    }
    return f(l, a), g(l, [ {
        key: "onUnload",
        value: function() {
            this.user_info = {}, this.addressList = [], this.is_weixin_addr = 0, this.clickNum = 0, 
            this.user_info = {}, this.isLoaded = !1, this.xiaochengxuInfo = {}, this.serviceData = {};
        }
    }, {
        key: "onShow",
        value: function() {
            this.clickNum = 0;
        }
    }, {
        key: "onLoad",
        value: function() {
            function a() {
                return c.apply(this, arguments);
            }
            var c = b(regeneratorRuntime.mark(function a() {
                var b;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        b = this, b.refresh(), b.$apply(), m.default.report(166, 101, "-1", "", "", k.default.getFid());

                      case 4:
                      case "end":
                        return a.stop();
                    }
                }, a, this);
            }));
            return a;
        }()
    }, {
        key: "onPullDownRefresh",
        value: function() {
            var a = b(regeneratorRuntime.mark(function a() {
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        try {
                            this.refresh(), 3 === this.clickNum && wx.setEnableDebug({
                                enableDebug: !0
                            });
                        } catch (a) {
                            console.error(a.stack);
                        }
                        wx.stopPullDownRefresh();

                      case 2:
                      case "end":
                        return a.stop();
                    }
                }, a, this);
            }));
            return function() {
                return a.apply(this, arguments);
            };
        }()
    }, {
        key: "refresh",
        value: function() {
            var a = b(regeneratorRuntime.mark(function b() {
                var c, d, f, g, a;
                return regeneratorRuntime.wrap(function(b) {
                    for (;;) switch (b.prev = b.next) {
                      case 0:
                        return c = this, b.next = 3, (0, j.seeGet)("pay/getAddrList");

                      case 3:
                        return d = b.sent, c.is_weixin_addr = 0, (0 == d.data.length || 1 == d.data.length && 1 == +d.data[0].is_weixin_addr) && (c.is_weixin_addr = 1), 
                        c.addressList = d, c.$apply(), console.log("登录用户ID:", k.default.config.user_id), 
                        f = "", wx.getSystemInfo({
                            success: function(a) {
                                f = a.system.toLowerCase();
                            }
                        }), b.next = 13, (0, j.seeGet)("info/userCount?u_id=" + k.default.config.user_id, {
                            authorizer_appid: k.default.open_info.authorizer_appid,
                            device_name: f
                        });

                      case 13:
                        g = b.sent, g && (c.isLoaded && h.default.showToast({
                            title: "刷新成功",
                            icon: "success",
                            duration: 800
                        }), a = !1, c.user_info = g.data.info, c.xiaochengxuInfo = g.data.xiaochengxu, c.serviceData = g.data.service_config, 
                        c.user_info && "See" === c.user_info.u_username && (c.user_info.u_username = "匿名", 
                        a = !0), c.isLoaded = !0, c.$apply(), a && (console.log("重新授权s"), h.default.getUserInfo().then(function(a) {
                            if (a.userInfo) {
                                c.user_info.u_username = a.userInfo.nickName, c.user_info.u_headimg = a.userInfo.avatarUrl, 
                                c.$apply();
                                var b = {
                                    u_username: a.userInfo.nickName,
                                    u_headimg: a.userInfo.avatarUrl
                                };
                                (0, j.seePost)("user/xcxUpdateInfo", b);
                            }
                        })));

                      case 15:
                      case "end":
                        return b.stop();
                    }
                }, b, this);
            }));
            return function() {
                return a.apply(this, arguments);
            };
        }()
    }, {
        key: "onShareAppMessage",
        value: function() {
            return k.default.getShareDefault();
        }
    } ]), l;
}(h.default.page);

Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(n, "pages/userCenter"));
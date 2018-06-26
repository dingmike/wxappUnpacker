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
}(), e = require("./../npm/wepy/lib/wepy.js"), h = a(e), i = require("./../common/api.js"), j = require("./../common/global.js"), k = a(j), l = function(a) {
    function j() {
        var f, e, g, l;
        c(this, j);
        for (var a = arguments.length, m = Array(a), n = 0; n < a; n++) m[n] = arguments[n];
        return e = g = d(this, (f = j.__proto__ || Object.getPrototypeOf(j)).call.apply(f, [ this ].concat(m))), 
        g.config = {
            enablePullDownRefresh: !1
        }, g.data = {
            choice_info_id: 0,
            type: 0,
            pageTitle: [ "选择地址", "地址管理" ],
            listAddress: [],
            isIpx: k.default.isIPhoneX
        }, g.methods = {
            clickChoice: function(a) {
                if (1 != this.type) {
                    var b = a.currentTarget.dataset.id;
                    k.default.config.user_info_id = b, h.default.navigateBack();
                }
            },
            clickAdd: function() {
                h.default.navigateTo({
                    url: "addressAdd?user_info_id=0"
                });
            },
            clickEdit: function(a) {
                var b = a.currentTarget.dataset.id;
                h.default.navigateTo({
                    url: "addressAdd?user_info_id=" + b
                });
            },
            clickCancel: function() {
                function a() {
                    return c.apply(this, arguments);
                }
                var c = b(regeneratorRuntime.mark(function a(c) {
                    var d;
                    return regeneratorRuntime.wrap(function(a) {
                        for (;;) switch (a.prev = a.next) {
                          case 0:
                            d = this, h.default.showModal({
                                title: "提示",
                                confirmColor: "#FE3B2E",
                                content: "确认要删除这个收货地址？"
                            }).then(function() {
                                var a = b(regeneratorRuntime.mark(function b(f) {
                                    var g, j;
                                    return regeneratorRuntime.wrap(function(b) {
                                        for (;;) switch (b.prev = b.next) {
                                          case 0:
                                            if (!f.confirm) {
                                                b.next = 6;
                                                break;
                                            }
                                            return g = c.currentTarget.dataset.id, b.next = 4, (0, i.seePost)("pay/deleteAddrInfo", {
                                                user_info_id: g
                                            });

                                          case 4:
                                            j = b.sent, j && (d.listAddress.forEach(function(a, b) {
                                                a.user_info_id == g && d.listAddress.splice(b, 1);
                                            }), d.$apply(), h.default.showToast({
                                                title: "删除成功",
                                                icon: "success",
                                                duration: 1500
                                            }));

                                          case 6:
                                          case "end":
                                            return b.stop();
                                        }
                                    }, b, this);
                                }));
                                return function() {
                                    return a.apply(this, arguments);
                                };
                            }());

                          case 2:
                          case "end":
                            return a.stop();
                        }
                    }, a, this);
                }));
                return a;
            }(),
            radioChange: function() {
                function a() {
                    return c.apply(this, arguments);
                }
                var c = b(regeneratorRuntime.mark(function b(c) {
                    var d, f, g;
                    return regeneratorRuntime.wrap(function(a) {
                        for (;;) switch (a.prev = a.next) {
                          case 0:
                            if (d = c.currentTarget.dataset.info, f = this, "1" !== d.is_defaut_addr) {
                                a.next = 4;
                                break;
                            }
                            return a.abrupt("return");

                          case 4:
                            return d.is_defaut_addr = "1", f.listAddress.forEach(function(a) {
                                a.is_defaut_addr = a.user_info_id == d.user_info_id ? d.is_defaut_addr : "0";
                            }), a.next = 8, (0, i.seePost)("pay/setDefaultAddr?user_info_id=" + d.user_info_id, {
                                user_info_id: d.user_info_id
                            });

                          case 8:
                            g = a.sent, g && h.default.showToast({
                                title: "设置成功",
                                icon: "success",
                                duration: 1500
                            }), f.$apply();

                          case 11:
                          case "end":
                            return a.stop();
                        }
                    }, b, this);
                }));
                return a;
            }()
        }, l = e, d(g, l);
    }
    return f(j, a), g(j, [ {
        key: "onShow",
        value: function() {
            var a = b(regeneratorRuntime.mark(function a() {
                var b, c;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        return b = this, a.next = 3, (0, i.seePost)("pay/getAddrList");

                      case 3:
                        c = a.sent, c && (b.listAddress = c.data, b.$apply());

                      case 5:
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
        key: "onUnload",
        value: function() {
            this.type = 0;
        }
    }, {
        key: "onPullDownRefresh",
        value: function() {
            var a = b(regeneratorRuntime.mark(function a() {
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        h.default.stopPullDownRefresh();

                      case 1:
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
        key: "onLoad",
        value: function() {
            function a() {
                return c.apply(this, arguments);
            }
            var c = b(regeneratorRuntime.mark(function a(b) {
                var c, d;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        this.choice_info_id = k.default.config.user_info_id, c = this, b && (this.type = b.type ? b.type : 0), 
                        d = c.pageTitle[c.type], h.default.setNavigationBarTitle({
                            title: d
                        }), c.$apply();

                      case 6:
                      case "end":
                        return a.stop();
                    }
                }, a, this);
            }));
            return a;
        }()
    }, {
        key: "onShareAppMessage",
        value: function() {
            return k.default.getShareDefault();
        }
    } ]), j;
}(h.default.page);

Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(l, "pages/addressManager"));
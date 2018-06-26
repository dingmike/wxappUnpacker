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
}(), e = require("./../npm/wepy/lib/wepy.js"), h = a(e), i = require("./../common/api.js"), j = require("./../common/global.js"), k = a(j), l = require("./../components/group-wechat-cover.js"), m = a(l), n = require("./../components/more-group.js"), p = a(n), o = function(a) {
    function j() {
        var f, e, g, k;
        c(this, j);
        for (var a = arguments.length, l = Array(a), n = 0; n < a; n++) l[n] = arguments[n];
        return e = g = d(this, (f = j.__proto__ || Object.getPrototypeOf(j)).call.apply(f, [ this ].concat(l))), 
        g.config = {
            backgroundColor: "#ffffff",
            enablePullDownRefresh: !1
        }, g.data = {
            isShow: !1,
            moreGroupData: [],
            wxData: {},
            deviceType: 0,
            groupId: 0,
            rewardDetailData: {}
        }, g.$repeat = {}, g.$props = {
            groupWeChatCover: {
                "xmlns:v-bind": "",
                "v-bind:wxData.sync": "wxData"
            },
            moreGroup: {
                "v-bind:moreGroupData.sync": "moreGroupData"
            }
        }, g.$events = {}, g.components = {
            groupWeChatCover: m.default,
            moreGroup: p.default
        }, g.methods = {
            getCoupon: function() {
                function a() {
                    return c.apply(this, arguments);
                }
                var c = b(regeneratorRuntime.mark(function b() {
                    var c, d, f;
                    return regeneratorRuntime.wrap(function(a) {
                        for (;;) switch (a.prev = a.next) {
                          case 0:
                            if (c = this, 1 != c.rewardDetailData.coupon.receiveFlag) {
                                a.next = 3;
                                break;
                            }
                            return a.abrupt("return");

                          case 3:
                            return d = c.rewardDetailData.coupon.id, f = {
                                couponId: d,
                                groupId: c.groupId
                            }, a.prev = 5, a.next = 8, (0, i.seeGet)("/ng/couponv3/get", f, function(a) {
                                a.data.result ? (wx.showToast({
                                    title: "领取成功",
                                    icon: "success",
                                    duration: 800
                                }), c.rewardDetailData.coupon.receiveFlag = 1) : h.default.showModal({
                                    title: "提示",
                                    confirmColor: "#FE3B2E",
                                    content: a.data.msg,
                                    showCancel: !1
                                });
                            });

                          case 8:
                            c.$apply(), a.next = 13;
                            break;

                          case 11:
                            a.prev = 11, a.t0 = a.catch(5);

                          case 13:
                          case "end":
                            return a.stop();
                        }
                    }, b, this, [ [ 5, 11 ] ]);
                }));
                return a;
            }()
        }, k = e, d(g, k);
    }
    return f(j, a), g(j, [ {
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
                        return c = this, c.deviceType = b.deviceType, c.groupId = b.groupId, d = {
                            deviceType: c.deviceType,
                            groupId: c.groupId
                        }, a.prev = 4, a.next = 7, (0, i.seeGet)("ng/mall/lotteryDetailV2", d, function(a) {
                            var b = a.data;
                            b.result && (c.rewardDetailData = b.data, c.moreGroupData = b.data.activityList, 
                            c.wxData = b.data.weixinVO, c.isShow = !0, c.$apply());
                        });

                      case 7:
                        a.next = 11;
                        break;

                      case 9:
                        a.prev = 9, a.t0 = a.catch(4);

                      case 11:
                      case "end":
                        return a.stop();
                    }
                }, a, this, [ [ 4, 9 ] ]);
            }));
            return a;
        }()
    }, {
        key: "onUnload",
        value: function() {
            this.isShow = !1, this.moreGroupData = [], this.deviceType = 0, this.groupId = 0, 
            this.rewardDetailData = {}, this.wxData = {};
        }
    } ]), j;
}(h.default.page);

Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(o, "pages/rewardGroupDetail"));
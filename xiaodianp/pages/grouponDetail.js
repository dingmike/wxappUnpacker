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
}(), e = require("./../npm/wepy/lib/wepy.js"), h = a(e), j = require("./../common/api.js"), i = require("./../common/global.js"), k = a(i), l = require("./../common/da.js"), m = a(l), n = require("./../components/sku-select.js"), p = a(n), o = require("./../components/counter-down.js"), q = a(o), r = require("./../components/group-state.js"), s = a(r), t = require("./../components/group-wechat-cover.js"), v = a(t), u = require("./../components/more-group.js"), w = a(u), x = function(a) {
    function l() {
        var b, e, f, g;
        c(this, l);
        for (var h = arguments.length, i = Array(h), a = 0; a < h; a++) i[a] = arguments[a];
        return e = f = d(this, (b = l.__proto__ || Object.getPrototypeOf(l)).call.apply(b, [ this ].concat(i))), 
        f.config = {
            navigationBarTitleText: "拼团详情",
            backgroundColor: "#ffffff"
        }, f.$repeat = {}, f.$props = {
            skuSelect: {
                "xmlns:v-bind": "",
                "v-bind:itemId.sync": "item.productId",
                "v-bind:groupId.sync": "oGroupId",
                "v-bind:groupActivityId.sync": "grouponActivityId",
                "v-bind:type.sync": "type"
            },
            counterDown: {
                "xmlns:v-bind": "",
                "v-bind:time.sync": "time"
            },
            groupState: {
                "v-bind:groupStateData.sync": "groupStateData"
            },
            groupWeChatCover: {
                "v-bind:wxData.sync": "wxData"
            },
            moreGroup: {
                "v-bind:moreGroupData.sync": "moreGroupData"
            }
        }, f.$events = {}, f.components = {
            skuSelect: p.default,
            counterDown: q.default,
            groupState: s.default,
            groupWeChatCover: v.default,
            moreGroup: w.default
        }, f.data = {
            groupId: 0,
            oGroupId: 0,
            grouponActivityId: 0,
            grouponSuccessNumber: 0,
            joinedNumber: 0,
            unJoinedNumber: 0,
            pay_disabled: !1,
            pay_status_str: "立即购买",
            userInfo: {},
            item: {},
            wxData: {},
            props: [],
            type: 1,
            groupStateData: {},
            is_getting: !0,
            is_destory: !0,
            isSelectedSKU: !1,
            isScroll: !0,
            windowHeight: wx.getSystemInfoSync().screenHeight,
            time: 0,
            imgArray: [],
            moreGroupData: [],
            animationShadow: {},
            animationData: {}
        }, f.methods = {
            goToBuyIt: function(a) {
                switch (a.currentTarget.dataset.id) {
                  case 1:
                    break;

                  case 2:
                    wx.redirectTo({
                        url: "orderDetail?order_id=" + this.item.orderId
                    });
                    break;

                  case 3:
                  case 5:
                    this.oGroupId = 0, this.openSku();
                    break;

                  case 4:
                    this.openSku();
                    break;

                  case 6:
                  case 8:
                    wx.switchTab({
                        url: "mall"
                    });
                    break;

                  case 9:
                    wx.navigateTo({
                        url: "rewardGroupDetail?deviceType=" + k.default.config.device_type + "&groupId=" + this.item.groupId
                    });
                }
            },
            goToDetail: function() {
                var a = this;
                if (3 != this.type || this.item.activityStatus) {
                    var b = this.item.activityStatus ? "groupon?id=" + this.grouponActivityId : "commodity?item_id=" + this.item.productId, c = !1, d = 0;
                    getCurrentPages().map(function(b, e) {
                        b.route == (a.item.activityStatus ? "pages/groupon" : "pages/commodity") && (c = !0, 
                        d = getCurrentPages().length - (e + 1));
                    }), c ? wx.navigateBack({
                        delta: d
                    }) : wx.navigateTo({
                        url: b
                    });
                }
            },
            closeSku: function() {
                k.default.addEndAnimation(this), setTimeout(function() {
                    this.isSelectedSKU = !1, this.isScroll = !0, this.$apply();
                }.bind(this), 400);
            }
        }, f.events = {
            "cart-emit": function(a) {
                f.isScroll = !a, f.isSelectedSKU = a;
            },
            "closeCounterDown-emit": function() {
                f.item = {}, f.imgArray = [], f.refresh();
            }
        }, g = e, d(f, g);
    }
    return f(l, a), g(l, [ {
        key: "onUnload",
        value: function() {
            this.props.length = 0, this.pay_disabled = !1, this.pay_status_str = "立即购买", this.is_getting = !0, 
            this.is_destory = !0, this.isSelectedSKU = !1, this.userInfo = {}, this.grouponSuccessNumber = 0, 
            this.joinedNumber = 0, this.unJoinedNumber = 0, this.isScroll = !0, this.isSelectedSKU = !1, 
            this.time = 0, this.wxData = {}, this.imgArray = [], this.type = 1, this.groupStateData = {}, 
            this.moreGroupData = [], this.$apply(), this.$broadcast("closeCounterDown-broadcast");
        }
    }, {
        key: "onRoute",
        value: function() {
            var a = b(regeneratorRuntime.mark(function a() {
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        k.default.config.groupId && (this.groupId = k.default.config.groupId, this.oGroupId = k.default.config.groupId, 
                        this.$broadcast("closeCounterDown-broadcast"), this.refresh(), k.default.config.groupId = 0);

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
                var c, d, f, e = this;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        if (this.global = k.default, k.default.initAppOpenInfo(), c = wx.getStorageSync("Xcx-Token"), 
                        d = b.pid || 527, !c) {
                            a.next = 8;
                            break;
                        }
                        (0, j.init)(), a.next = 10;
                        break;

                      case 8:
                        return a.next = 10, (0, j.init)();

                      case 10:
                        this.isSelectedSKU = !1, f = b.f_id || k.default.getFid(), f && k.default.setShareFid(f, k.default.config.is_share || 0), 
                        this.groupId = +b.id, this.oGroupId = +b.id, this.$broadcast("closeCounterDown-broadcast"), 
                        this.groupId && this.refresh(!0).then(function() {
                            return m.default.report(d, 101, e.item.productId, e.item.type, e.item.grouponActivityId, k.default.getFid());
                        });

                      case 17:
                      case "end":
                        return a.stop();
                    }
                }, a, this);
            }));
            return a;
        }()
    }, {
        key: "refresh",
        value: function() {
            function a() {
                return c.apply(this, arguments);
            }
            var c = b(regeneratorRuntime.mark(function b(c) {
                var d, f, g, e, i;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        return d = this, d.is_destory = !1, a.prev = 2, f = {
                            groupId: d.groupId,
                            deviceType: k.default.config.device_type
                        }, a.next = 6, (0, j.seePost)("ng/groupon/activity/detailV2", f);

                      case 6:
                        if (g = a.sent, !d.is_destory) {
                            a.next = 9;
                            break;
                        }
                        return a.abrupt("return");

                      case 9:
                        for (d.item = g.data, d.grouponActivityId = d.item.grouponActivityId, d.time = d.item.termOfValidity, 
                        d.wxData = g.data.weixinVO, d.moreGroupData = d.item.activityList, d.grouponSuccessNumber = d.formatNumber(d.item.grouponSuccessNumber), 
                        d.joinedNumber = d.formatNumber(d.item.joinedNumber), d.unJoinedNumber = d.formatNumber(d.item.unJoinedNumber), 
                        d.type = d.item.type, d.groupStateData = {
                            type: d.item.type,
                            activityStartTime: d.item.startTime || "",
                            activityEndTime: d.item.endTime || "",
                            wxNumber: d.item.weixinVO && d.item.weixinVO.groupName,
                            isShowTips: d.item.weixinVO && d.item.weixinVO.assistantFlag
                        }, d.imgArray = [], e = 16 < d.item.grouponSuccessNumber ? 16 - (4 == d.type ? d.item.joinedNumber + 1 : d.item.joinedNumber) : 4 == d.type ? d.item.superGrouponNumber - d.item.joinedNumber : d.item.unJoinedNumber, 
                        i = 0; i < e; i++) d.imgArray[i] = i;
                        d.is_getting = !1, d.$apply(), a.next = 29;
                        break;

                      case 26:
                        a.prev = 26, a.t0 = a.catch(2), console.error(a.t0.stack);

                      case 29:
                        h.default.setNavigationBarTitle({
                            title: d.item.appTitle
                        }), h.default.hideNavigationBarLoading(), h.default.stopPullDownRefresh(), c && d.$broadcast("startCounterDown-broadcast");

                      case 33:
                      case "end":
                        return a.stop();
                    }
                }, b, this, [ [ 2, 26 ] ]);
            }));
            return a;
        }()
    }, {
        key: "formatNumber",
        value: function(a) {
            return 999 < a ? (+(a / 1e3)).toFixed(1) + "k" : a;
        }
    }, {
        key: "openSku",
        value: function() {
            var a = b(regeneratorRuntime.mark(function a() {
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        this.item.grouponActivityId ? (k.default.addStartAnimation(this), this.isScroll = !1, 
                        this.$apply(), this.$broadcast("sku-broadcast", this.item.grouponActivityId, 0, 0, !1, 1)) : console.log("没有获取ID");

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
        key: "onPullDownRefresh",
        value: function() {
            try {
                this.refresh(!0), h.default.showToast({
                    title: "刷新成功",
                    icon: "success",
                    duration: 800
                });
            } catch (a) {
                console.error(a.stack);
            }
        }
    }, {
        key: "onShareAppMessage",
        value: function() {
            return {
                title: this.item.shareTitle,
                path: "/pages/grouponDetail?f_id=" + k.default.getFid() + "&id=" + this.item.groupId + "&is_share=" + k.default.config.is_share,
                imageUrl: this.item.grouponShareImgUrl || ""
            };
        }
    } ]), l;
}(h.default.page);

Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(x, "pages/grouponDetail"));
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
}(), e = require("./../npm/wepy/lib/wepy.js"), h = a(e), j = require("./../common/api.js"), i = require("./../common/global.js"), k = a(i), l = require("./../common/wxParse/wxParse.js"), m = a(l), n = require("./../common/da.js"), p = a(n), o = require("./../components/sku-select.js"), q = a(o), r = require("./../components/counter-down.js"), u = a(r), s = require("./../components/group-state.js"), v = a(s), t = require("./../components/group-active.js"), w = a(t), x = function(a) {
    function l() {
        var b, e, f, g;
        c(this, l);
        for (var a = arguments.length, i = Array(a), j = 0; j < a; j++) i[j] = arguments[j];
        return e = f = d(this, (b = l.__proto__ || Object.getPrototypeOf(l)).call.apply(b, [ this ].concat(i))), 
        f.config = {
            navigationBarTitleText: "商品详情",
            backgroundColor: "#ffffff"
        }, f.$repeat = {}, f.$props = {
            skuSelect: {
                "xmlns:v-bind": "",
                "v-bind:itemId.sync": "item_id",
                "v-bind:groupId.sync": "groupId",
                "v-bind:groupActivityId.sync": "groupActivityId",
                "v-bind:type.sync": "type"
            },
            counterDown: {
                "xmlns:v-bind": "",
                "v-bind:time.sync": "time"
            },
            groupState: {
                "v-bind:groupStateData.sync": "groupStateData"
            },
            groupActive: {
                "v-bind:activelist.sync": "activelist",
                "v-bind:type.sync": "type",
                "v-bind:goodsId.sync": "goodsId"
            }
        }, f.$events = {}, f.components = {
            skuSelect: q.default,
            counterDown: u.default,
            groupState: v.default,
            groupActive: w.default
        }, f.data = {
            item_id: 0,
            groupId: 0,
            status: 0,
            type: 1,
            groupStateData: {},
            activityEndTime: "",
            activityStartTime: "",
            wxNumber: "",
            groupActivityId: 0,
            pay_disabled: !1,
            item: {
                grouponSuccessNumber: 0
            },
            toView: "",
            props: [],
            activelist: [],
            is_getting: !0,
            is_destory: !0,
            isSelectedSKU: !1,
            isScroll: !0,
            windowHeight: wx.getSystemInfoSync().windowHeight,
            time: 0,
            indicatorDots: !0,
            serviceData: {
                is_zhuiyi: 1
            },
            animationShadow: {},
            animationData: {},
            tabbarChoose: !0,
            goodsId: 0,
            isIpx: k.default.isIPhoneX
        }, f.events = {
            "cart-emit": function(a) {
                f.isScroll = !a, f.isSelectedSKU = a;
            },
            "closeCounterDown-emit": function() {
                1 == f.status ? (f.status = 2, f.refresh()) : 2 == f.status && (f.status = 3, f.refresh()), 
                f.$apply();
            }
        }, f.methods = {
            wxParseImgLoad: function() {
                m.default.wxParseImgLoad.bind(this);
            },
            wxParseImgTap: function() {
                m.default.wxParseImgTap.bind(this);
            },
            tabbarChoose: function() {
                this.tabbarChoose = !this.tabbarChoose, this.$apply();
            },
            goToBuyIt: function() {
                this.is_getting || 0 == this.status || (this.item.itemId ? (k.default.addStartAnimation(this), 
                this.isScroll = !1, this.type = 1, this.$broadcast("sku-broadcast", this.item.itemId, 0, 0, !1, 0)) : console.log("没有获取itemID"));
            },
            goToAddCart: function() {
                this.item.itemId ? (k.default.addStartAnimation(this), this.isScroll = !1, this.type = 1, 
                this.$broadcast("sku-broadcast", this.item.itemId, 0, 0, !0, 0)) : console.log("没有获取itemID");
            },
            goToJoinIt: function() {
                if (3 != this.status && !this.is_getting && 1 != this.item.insale) {
                    if (1 == this.status) return void wx.showModal({
                        title: "提示",
                        confirmColor: "#FE3B2E",
                        content: "活动还没开始噢~",
                        showCancel: !1
                    });
                    if (this.item.grouponId && (3 == this.item.type || 4 == this.item.type)) {
                        var a = "grouponDetail?id=" + this.item.grouponId;
                        return void (3 == this.item.type ? wx.redirectTo({
                            url: a
                        }) : wx.navigateTo({
                            url: a
                        }));
                    }
                    this.groupActivityId ? (k.default.addStartAnimation(this), this.isScroll = !1, this.type = this.item.type, 
                    this.$broadcast("sku-broadcast", this.groupActivityId, 0, 0, !1, 1)) : console.log("没有获取itemID");
                }
            },
            gotoContact: function() {
                if (!this.serviceData.is_zhuiyi) {
                    var a = this.serviceData.qrc_img ? JSON.stringify(this.serviceData) : "";
                    h.default.navigateTo({
                        url: "service?str_service_config=" + a
                    });
                }
            },
            closeSku: function() {
                var a = this;
                k.default.addEndAnimation(this), setTimeout(function() {
                    a.isSelectedSKU = !1, a.isScroll = !0, a.$apply();
                }, 400);
            }
        }, g = e, d(f, g);
    }
    return f(l, a), g(l, [ {
        key: "onUnload",
        value: function() {
            this.props = [], this.item = {}, this.pay_disabled = !1, this.is_getting = !0, this.is_destory = !0, 
            this.isSelectedSKU = !1, this.item_id = 0, this.groupId = 0, this.type = 1, this.groupStateData = {}, 
            this.activityEndTime = "", this.activityStartTime = "", this.wxNumber = "", this.groupActivityId = 0, 
            this.isScroll = !0, this.isSelectedSKU = !1, this.time = 0, this.indicatorDots = !0, 
            this.status = 0, this.serviceData = {}, this.$broadcast("closeCounterDown-broadcast"), 
            this.$broadcast("activeCloseCounterDown-broadcast"), this.toView = "", this.tabbarChoose = !0;
        }
    }, {
        key: "onRoute",
        value: function() {
            this.toView = "head", k.default.config.activityId && (this.groupActivityId = k.default.config.activityId, 
            this.$broadcast("closeCounterDown-broadcast"), this.$broadcast("activeCloseCounterDown-broadcast"), 
            this.refresh(), k.default.config.activityId = 0), this.$apply();
        }
    }, {
        key: "onHide",
        value: function() {
            this.toView = "", this.$apply();
        }
    }, {
        key: "onLoad",
        value: function() {
            function a() {
                return c.apply(this, arguments);
            }
            var c = b(regeneratorRuntime.mark(function b(c) {
                var d, e, f, a = this;
                return regeneratorRuntime.wrap(function(b) {
                    for (;;) switch (b.prev = b.next) {
                      case 0:
                        if (this.global = k.default, k.default.initAppOpenInfo(), this.$broadcast("closeCounterDown-broadcast"), 
                        this.$broadcast("activeCloseCounterDown-broadcast"), !(d = wx.getStorageSync("Xcx-Token"))) {
                            b.next = 9;
                            break;
                        }
                        (0, j.init)(), b.next = 11;
                        break;

                      case 9:
                        return b.next = 11, (0, j.init)();

                      case 11:
                        e = this, this.isSelectedSKU = !1, f = c.f_id || k.default.getFid(), f && k.default.setShareFid(f, k.default.config.is_share || 0), 
                        e.groupActivityId = c.id, e.groupActivityId && e.refresh().then(function() {
                            p.default.report(131, 101, e.item.itemId, e.item.type, e.groupActivityId, a.global.getFid());
                        });

                      case 17:
                      case "end":
                        return b.stop();
                    }
                }, b, this);
            }));
            return a;
        }()
    }, {
        key: "refresh",
        value: function() {
            var a = b(regeneratorRuntime.mark(function b() {
                var c, d, e, f, a, g;
                return regeneratorRuntime.wrap(function(b) {
                    for (;;) switch (b.prev = b.next) {
                      case 0:
                        return c = this, this.is_getting = !0, this.is_destory = !1, b.prev = 3, d = {
                            deviceType: k.default.getDeviceType(),
                            activityId: this.groupActivityId,
                            is_from_kol: 1,
                            f_id: k.default.getFid()
                        }, b.next = 7, (0, j.seePost)("ng/groupon/product/detail", d);

                      case 7:
                        if (e = b.sent, !this.is_destory) {
                            b.next = 10;
                            break;
                        }
                        return b.abrupt("return");

                      case 10:
                        for (f in this.item = e.data, e.data.itemMainImgList && 1 == e.data.itemMainImgList.length && (this.indicatorDots = !1), 
                        this.time = this.item.countDown, this.item.grouponSuccessNumber = 999 < this.item.grouponSuccessNumber ? (this.item.grouponSuccessNumber / 1e3).toFixed(1) + "k" : this.item.grouponSuccessNumber, 
                        this.status = this.item.status, this.goodsId = this.item.itemId, this.activelist = this.item.member, 
                        this.type = this.item.type, this.groupStateData = {
                            type: this.item.type,
                            activityStartTime: this.item.activityStartTime,
                            activityEndTime: this.item.activityEndTime,
                            wxNumber: this.item.wxAccount,
                            isShowTips: this.item.assistantFlag
                        }, this.props = [ {
                            name: "品牌",
                            value: this.item.brand.brandName || ""
                        }, {
                            name: "物流公司",
                            value: this.item.transportName || ""
                        }, {
                            name: "预计发货时长",
                            value: this.item.shipSendTime && this.item.shipSendTime.length && "0" !== this.item.shipSendTime[0] ? this.item.shipSendTime[0] + "~" + this.item.shipSendTime[1] + "个工作日" : ""
                        }, {
                            name: "预计到货时长",
                            value: this.item.shipRecvTime && this.item.shipRecvTime.length && "0" !== this.item.shipRecvTime[0] ? this.item.shipRecvTime[0] + "~" + this.item.shipRecvTime[1] + "个工作日" : ""
                        } ], c.item.attributes) a = {
                            name: f,
                            value: c.item.attributes[f].toString()
                        }, c.props.push(a);
                        m.default.wxParse("article", "html", this.item.itemDesc, this, 5), b.next = 27;
                        break;

                      case 24:
                        b.prev = 24, b.t0 = b.catch(3), console.error(b.t0.stack);

                      case 27:
                        return h.default.setNavigationBarTitle({
                            title: this.item.share.title
                        }), this.is_getting = !1, this.$apply(), this.$broadcast("startCounterDown-broadcast"), 
                        this.$broadcast("activeStartCounterDown-broadcast"), b.next = 34, (0, j.seeGet)("info/getXcxConfig");

                      case 34:
                        g = b.sent, g.result ? this.serviceData = g.data : this.serviceData.is_zhuiyi = 1, 
                        this.$apply();

                      case 37:
                      case "end":
                        return b.stop();
                    }
                }, b, this, [ [ 3, 24 ] ]);
            }));
            return function() {
                return a.apply(this, arguments);
            };
        }()
    }, {
        key: "onShareAppMessage",
        value: function() {
            return {
                title: this.item.share.shareTitle,
                path: "/pages/groupon?f_id=" + k.default.getFid() + "&id=" + this.groupActivityId + "&is_share=" + k.default.config.is_share,
                imageUrl: this.item.share.shareImgUrl || ""
            };
        }
    } ]), l;
}(h.default.page);

Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(x, "pages/groupon"));
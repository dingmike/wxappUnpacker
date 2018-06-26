function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function b(a) {
    return function() {
        var b = a.apply(this, arguments);
        return new Promise(function(c, d) {
            function e(a, f) {
                try {
                    var g = b[a](f), h = g.value;
                } catch (a) {
                    return void d(a);
                }
                return g.done ? void c(h) : Promise.resolve(h).then(function(a) {
                    e("next", a);
                }, function(a) {
                    e("throw", a);
                });
            }
            return e("next");
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

var g = Object.assign || function(b) {
    for (var c, d = 1; d < arguments.length; d++) for (var e in c = arguments[d], c) Object.prototype.hasOwnProperty.call(c, e) && (b[e] = c[e]);
    return b;
}, h = function() {
    function b(b, c) {
        for (var d, a = 0; a < c.length; a++) d = c[a], d.enumerable = d.enumerable || !1, 
        d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(b, d.key, d);
    }
    return function(c, d, e) {
        return d && b(c.prototype, d), e && b(c, e), c;
    };
}(), e = require("./../npm/wepy/lib/wepy.js"), i = a(e), j = require("./../common/api.js"), k = require("./../common/global.js"), l = a(k), m = require("./../common/da.js"), n = a(m), o = function(a) {
    function k() {
        var b, e, f, a;
        c(this, k);
        for (var g = arguments.length, h = Array(g), j = 0; j < g; j++) h[j] = arguments[j];
        return e = f = d(this, (b = k.__proto__ || Object.getPrototypeOf(k)).call.apply(b, [ this ].concat(h))), 
        f.config = {
            navigationBarTitleText: "搜索",
            enablePullDownRefresh: !1,
            onReachBottomDistance: 20
        }, f.data = {
            historyList: [],
            historyHide: !1,
            postData: {},
            searchWord: "",
            searchKey: "",
            goodsList: [],
            sortType: [ "default", "latest", "hottest", "price_asc", "price_desc" ],
            tabIndex: 0,
            animationData: {},
            startPoint: [ 0, 0 ],
            isFixed: !1,
            isTop: !1,
            isShowLoading: !1,
            loadingWord: "加载中……",
            page: 1,
            pageSize: 6,
            count: 0
        }, f.methods = {
            bindKeyInput: function(a) {
                this.searchWord = a.detail.value, this.searchKey = a.detail.value;
            },
            deleteSearchWord: function() {
                this.goodsList = [], this.historyHide = !1, this.searchWord = "", this.tabIndex = 0, 
                this.getSearchHistory();
            },
            searchGoods: function(b) {
                var c = this, d = this, e = b.detail.value;
                return "" != e && void (this.page = 1, wx.showLoading({
                    title: "加载中"
                }), setTimeout(function() {
                    c.getSearchResult(e, "default", 1).then(function() {
                        n.default.report(167, 501, 0, "", "", l.default.getFid(), {
                            search_type: 1,
                            scene_id: 4,
                            search_str: e,
                            result_num: d.count
                        }), wx.hideLoading();
                    });
                }, 1e3));
            },
            clickTags: function(a) {
                var b = this, c = this;
                this.page = 1, wx.showLoading({
                    title: "加载中"
                }), setTimeout(function() {
                    b.getSearchResult(a, "default", 1).then(function() {
                        n.default.report(167, 501, 0, "", "", l.default.getFid(), {
                            search_type: 1,
                            scene_id: 3,
                            search_str: a,
                            result_num: c.count
                        }), wx.hideLoading(), c.searchWord = c.searchKey = a, c.$apply();
                    });
                }, 500);
            },
            clearSearchResult: function() {
                wx.switchTab({
                    url: "mall"
                });
            },
            clickProduct: function(b, c, d) {
                if (l.default.advoiceTapTwice(d)) {
                    var e = 2 === c ? "groupon?id=" + b : "commodity?item_id=" + b;
                    i.default.navigateTo({
                        url: e
                    });
                }
            },
            itemSortResult: function(b) {
                var c = this, d = this.searchKey, e = b;
                3 == e && (e = this.tabIndex == e ? 4 : 3);
                var a = this.sortType[e];
                this.tabIndex = e, this.page = 1, wx.showLoading({
                    title: "加载中"
                }), setTimeout(function() {
                    c.getSearchResult(d, a, 1).then(function() {
                        wx.hideLoading();
                    });
                }, 1e3), this.$apply();
            },
            touchstart: function(a) {
                this.startPoint = [ a.touches[0].pageX, a.touches[0].pageY ];
            },
            touchmove: function(a) {
                a.touches[0].pageY >= this.startPoint[1] || (this.isTop = !1);
            }
        }, a = e, d(f, a);
    }
    var m = Math.ceil;
    return f(k, a), h(k, [ {
        key: "onLoad",
        value: function() {
            this.postData = {
                deviceType: l.default.config.device_type,
                mock: 0
            }, this.getSearchHistory(), n.default.report(167, 501, 0, "", "", l.default.getFid());
        }
    }, {
        key: "onShow",
        value: function() {
            var a = wx.createAnimation({
                delay: 100,
                duration: 1e3,
                timingFunction: "ease"
            });
            this.animation = a, this.animation.rotateX(180).scale(2).step(), this.animation.rotateX(0).scale(1).step(), 
            this.animationData = this.animation.export(), this.$apply();
        }
    }, {
        key: "onReachBottom",
        value: function() {
            var b = this;
            if (this.count) {
                this.isShowLoading = !0;
                var c = m(this.count / this.pageSize);
                if (console.log("bottom", "123"), c == this.page) this.loadingWord = "没有更多了"; else {
                    this.loadingWord = "加载中……", ++this.page;
                    var d = this.searchKey, e = this.sortType[this.tabIndex];
                    this.getSearchResult(d, e, this.page);
                }
                setTimeout(function() {
                    b.isShowLoading = !1, b.$apply();
                }, 1e3);
            }
        }
    }, {
        key: "onPageScroll",
        value: function(a) {
            this.isFixed = 50 <= a.scrollTop;
        }
    }, {
        key: "getSearchHistory",
        value: function() {
            var a = b(regeneratorRuntime.mark(function a() {
                var b;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        return a.next = 2, (0, j.seeGet)("ng/search/history", this.postData);

                      case 2:
                        b = a.sent, b && b.data.length && (this.historyList = b.data, this.$apply());

                      case 4:
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
        key: "clearSearchHistory",
        value: function() {
            var a = b(regeneratorRuntime.mark(function a() {
                var b;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        return a.next = 2, (0, j.seeGet)("ng/search/history/clear", this.postData);

                      case 2:
                        b = a.sent, b && (this.historyList = [], this.$apply());

                      case 4:
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
        key: "getSearchResult",
        value: function() {
            function a() {
                return c.apply(this, arguments);
            }
            var c = b(regeneratorRuntime.mark(function b(c, d, f) {
                var h, k, l, o;
                return regeneratorRuntime.wrap(function(b) {
                    for (;;) switch (b.prev = b.next) {
                      case 0:
                        return h = +f, k = g({}, this.postData, {
                            searchWord: c,
                            sortType: d,
                            page: h,
                            pageSize: this.pageSize
                        }), b.next = 4, (0, j.seeGet)("ng/search/items", k);

                      case 4:
                        l = b.sent, l && l.data && (1 === h && (this.goodsList = []), this.goodsList = this.goodsList.concat(l.data.list), 
                        o = {}, this.goodsList = this.goodsList.reduce(function(a, b) {
                            return o[b.id] || (o[b.id] = a.push(b)), a;
                        }, []), this.count = l.data.count, this.historyHide = !0, this.$apply()), 6 <= l.data.count && 6 > this.goodsList.length && h <= m(this.count / this.pageSize) && (this.getSearchResult(c, d, ++h), 
                        this.page = h);

                      case 7:
                      case "end":
                        return b.stop();
                    }
                }, b, this);
            }));
            return a;
        }()
    } ]), k;
}(i.default.page);

Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(o, "pages/search"));
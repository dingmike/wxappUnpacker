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
}(), e = require("./../npm/wepy/lib/wepy.js"), h = a(e), i = require("./../common/api.js"), j = require("./../common/global.js"), k = a(j), l = require("./../components/loop-wording.js"), m = a(l), n = function(a) {
    function j() {
        var b, e, f, g;
        c(this, j);
        for (var n = arguments.length, a = Array(n), i = 0; i < n; i++) a[i] = arguments[i];
        return e = f = d(this, (b = j.__proto__ || Object.getPrototypeOf(j)).call.apply(b, [ this ].concat(a))), 
        f.config = {
            navigationBarTitleText: "活动商品",
            backgroundColor: "#ffffff",
            enablePullDownRefresh: !1
        }, f.data = {
            activityData: [],
            loopText: ""
        }, f.$repeat = {}, f.$props = {
            loopWording: {
                "xmlns:v-bind": "",
                "v-bind:loopText.sync": "loopText"
            }
        }, f.$events = {}, f.components = {
            loopWording: m.default
        }, f.methods = {
            clickProduct: function(a) {
                if (k.default.advoiceTapTwice(a)) {
                    this.$broadcast("loopWording-broadcast");
                    var b = a.currentTarget.dataset.id;
                    h.default.redirectTo({
                        url: "commodity?item_id=" + b
                    });
                }
            }
        }, g = e, d(f, g);
    }
    return f(j, a), g(j, [ {
        key: "onRoute",
        value: function() {
            "" != this.loopText && this.$broadcast("loopWordingLoad-broadcast");
        }
    }, {
        key: "onUnload",
        value: function() {
            this.activityData = [], this.loopText = "", this.$broadcast("loopWording-broadcast");
        }
    }, {
        key: "onLoad",
        value: function(a) {
            this.loadData(a.ex_id, a.seller_id);
        }
    }, {
        key: "loadData",
        value: function() {
            function a() {
                return c.apply(this, arguments);
            }
            var c = b(regeneratorRuntime.mark(function b(c, d) {
                var f, g, h;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        return f = this, g = {
                            ex_id: c,
                            seller_id: d,
                            page: 1,
                            page_size: 20,
                            is_from_kol: 1
                        }, a.next = 4, (0, i.seeGet)("ng/product/conditionFreeMail", g);

                      case 4:
                        h = a.sent, h && (f.loopText = h.data.activity_desc, f.activityData = h.data.product_list), 
                        f.$apply(), f.$broadcast("loopWordingLoad-broadcast");

                      case 8:
                      case "end":
                        return a.stop();
                    }
                }, b, this);
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

Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(n, "pages/activity"));
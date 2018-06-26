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
}(), e = require("./../npm/wepy/lib/wepy.js"), h = a(e), i = require("./../common/api.js"), j = require("./../common/global.js"), k = a(j), l = require("./../components/group-list.js"), m = a(l), n = require("./../common/da.js"), p = a(n), o = function(a) {
    function h() {
        var b, e, f, g;
        c(this, h);
        for (var j = arguments.length, a = Array(j), i = 0; i < j; i++) a[i] = arguments[i];
        return e = f = d(this, (b = h.__proto__ || Object.getPrototypeOf(h)).call.apply(b, [ this ].concat(a))), 
        f.config = {
            backgroundColor: "#ffffff",
            enablePullDownRefresh: !1
        }, f.data = {
            isShow: !1,
            groupData: [],
            bannerURL: "",
            fromListPage: !0
        }, f.$repeat = {}, f.$props = {
            group: {
                "xmlns:v-bind": "",
                "v-bind:groupData.sync": "groupData",
                "v-bind:fromListPage.sync": "fromListPage"
            }
        }, f.$events = {}, f.components = {
            group: m.default
        }, f.methods = {}, g = e, d(f, g);
    }
    return f(h, a), g(h, [ {
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
                        return this.fromListPage = !0, a.prev = 1, a.next = 4, (0, i.seeGet)("ng/module/get", {
                            deviceType: k.default.config.device_type,
                            type: 34,
                            moduleId: b.moduleId || 0,
                            fId: k.default.getFid()
                        });

                      case 4:
                        c = a.sent, d = c.result, f = c.data, 1 === d && (this.bannerURL = f[0].icon, this.groupData = f[0], 
                        this.groupData.data.map(function(a) {
                            return a.hasOwnProperty("widthHeight") && "" != a.widthHeight ? (a.widthHeight = a.widthHeight.split(",") || [], 
                            a.width = parseInt(416 * a.widthHeight[0] / a.widthHeight[1])) : a.width = 706, 
                            a;
                        }), this.isShow = !0, this.$apply()), p.default.report(524, 101, "-1", "", "", k.default.getFid()), 
                        a.next = 13;
                        break;

                      case 11:
                        a.prev = 11, a.t0 = a.catch(1);

                      case 13:
                      case "end":
                        return a.stop();
                    }
                }, a, this, [ [ 1, 11 ] ]);
            }));
            return a;
        }()
    }, {
        key: "onUnload",
        value: function() {
            this.isShow = !1, this.groupData = [];
        }
    }, {
        key: "onShareAppMessage",
        value: function() {
            return k.default.getShareDefault();
        }
    } ]), h;
}(h.default.page);

Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(o, "pages/moreRewardGroup"));
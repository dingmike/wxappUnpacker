function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function b(a) {
    return function() {
        var b = a.apply(this, arguments);
        return new Promise(function(d, a) {
            function c(e, f) {
                try {
                    var g = b[e](f), h = g.value;
                } catch (b) {
                    return void a(b);
                }
                return g.done ? void d(h) : Promise.resolve(h).then(function(a) {
                    c("next", a);
                }, function(a) {
                    c("throw", a);
                });
            }
            return c("next");
        });
    };
}

function d(a, b) {
    if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
}

function f(a, b) {
    if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return b && ("object" == typeof b || "function" == typeof b) ? b : a;
}

function c(a, b) {
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
    function h() {
        var b, e, g, j;
        d(this, h);
        for (var k = arguments.length, i = Array(k), a = 0; a < k; a++) i[a] = arguments[a];
        return e = g = f(this, (b = h.__proto__ || Object.getPrototypeOf(h)).call.apply(b, [ this ].concat(i))), 
        g.config = {
            navigationBarTitleText: "",
            backgroundColor: "f1f1f1",
            enablePullDownRefresh: !1
        }, g.data = {
            service_config: {},
            str_time_1: "",
            str_time_2: ""
        }, g.methods = {
            click: function() {
                wx.previewImage({
                    urls: [ this.service_config.qrc_img ]
                });
            }
        }, j = e, f(g, j);
    }
    return c(h, a), g(h, [ {
        key: "onUnload",
        value: function() {}
    }, {
        key: "onLoad",
        value: function() {
            function a() {
                return c.apply(this, arguments);
            }
            var c = b(regeneratorRuntime.mark(function a(b) {
                var c;
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        c = this, this.service_config = b.str_service_config ? JSON.parse(b.str_service_config) : {
                            mobile: "4008510508",
                            qrc_img: "",
                            wechat: "SeegoA/SeegoB",
                            worktime: [ "周一至周五 9:30 - 23:30 ", "周六、日及法定节假日 11:00 - 23:30" ]
                        }, 1 <= this.service_config.worktime.length && (this.str_time_1 = this.service_config.worktime[0]), 
                        2 <= this.service_config.worktime.length && (this.str_time_2 = this.service_config.worktime[1]), 
                        c.$apply();

                      case 5:
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
    } ]), h;
}(h.default.page);

Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(l, "pages/service"));
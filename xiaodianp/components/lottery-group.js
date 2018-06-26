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
}), exports.default = void 0;

var e = require("./../npm/wepy/lib/wepy.js"), g = a(e), h = require("./../common/global.js"), j = a(h), i = require("./../common/da.js"), k = a(i), l = require("./../common/api.js"), m = function(a) {
    function h() {
        var f, e, m, o;
        c(this, h);
        for (var n = arguments.length, a = Array(n), p = 0; p < n; p++) a[p] = arguments[p];
        return e = m = d(this, (f = h.__proto__ || Object.getPrototypeOf(h)).call.apply(f, [ this ].concat(a))), 
        m.props = {
            groupData: {},
            moduleId: {}
        }, m.data = {
            global: j.default,
            color: "#FE3B2E",
            position: "relative"
        }, m.methods = {
            clickProduct: function(a) {
                if (j.default.advoiceTapTwice(a)) {
                    var b = a.currentTarget.dataset.id;
                    k.default.report(164, 6, "-1", b, "", j.default.getFid()), g.default.navigateTo({
                        url: "groupon?id=" + b
                    });
                }
            },
            gotoMore: function() {
                function a() {
                    return c.apply(this, arguments);
                }
                var c = b(regeneratorRuntime.mark(function b(c, d) {
                    var f, h, i;
                    return regeneratorRuntime.wrap(function(a) {
                        for (;;) switch (a.prev = a.next) {
                          case 0:
                            if (!j.default.advoiceTapTwice(c, d)) {
                                a.next = 12;
                                break;
                            }
                            return a.prev = 1, a.next = 4, (0, l.seeGet)("ng/module/get", {
                                deviceType: j.default.config.device_type,
                                type: 34,
                                moduleId: c || 0,
                                fId: j.default.getFid()
                            });

                          case 4:
                            f = a.sent, h = f.result, i = f.data, 1 === h ? g.default.navigateTo({
                                url: "moreRewardGroup?moduleId=" + c
                            }) : this.$emit("lotteryGroup-emit"), a.next = 12;
                            break;

                          case 10:
                            a.prev = 10, a.t0 = a.catch(1);

                          case 12:
                          case "end":
                            return a.stop();
                        }
                    }, b, this, [ [ 1, 10 ] ]);
                }));
                return a;
            }()
        }, o = e, d(m, o);
    }
    return f(h, a), h;
}(g.default.component);

exports.default = m;
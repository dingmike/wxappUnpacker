function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function b(a) {
    return function() {
        var b = a.apply(this, arguments);
        return new Promise(function(c, d) {
            function a(e, f) {
                try {
                    var g = b[e](f), h = g.value;
                } catch (a) {
                    return void d(a);
                }
                return g.done ? void c(h) : Promise.resolve(h).then(function(b) {
                    a("next", b);
                }, function(b) {
                    a("throw", b);
                });
            }
            return a("next");
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

var g = function() {
    function b(b, c) {
        for (var d, e = 0; e < c.length; e++) d = c[e], d.enumerable = d.enumerable || !1, 
        d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(b, d.key, d);
    }
    return function(c, d, a) {
        return d && b(c.prototype, d), a && b(c, a), c;
    };
}(), e = require("./../npm/wepy/lib/wepy.js"), h = a(e), i = require("./../common/global.js"), j = a(i), k = require("./../common/api.js"), l = require("./upload.js"), m = a(l), n = function(a) {
    function p() {
        var b, e, a, f;
        c(this, p);
        for (var g = arguments.length, k = Array(g), i = 0; i < g; i++) k[i] = arguments[i];
        return e = a = d(this, (b = p.__proto__ || Object.getPrototypeOf(p)).call.apply(b, [ this ].concat(k))), 
        a.events = {
            "normalLoadMore-broadcast": function() {
                a.getNormalData();
            },
            "normalNavBarFixed-broadcast": function() {
                a.isFixed = !0, a.$apply();
            },
            "normalNavBarRelative-broadcast": function() {
                a.isFixed = !1, a.$apply();
            },
            "normalSetUp-broadcast": function() {
                a.setUpData();
            }
        }, a.$repeat = {}, a.$props = {
            upload: {}
        }, a.$events = {}, a.components = {
            upload: m.default
        }, a.props = {
            categoryList: [],
            autoLoadNormalData: Boolean,
            isphp: Boolean
        }, a.data = {
            page: 1,
            showFoot: !1,
            normalData: [],
            groupId: 0,
            toTab: 0,
            isFixed: !1
        }, a.methods = {
            clickProduct: function(a) {
                if (j.default.advoiceTapTwice(a)) {
                    var b = a.currentTarget.dataset.id;
                    j.default.getDeviceType(), j.default.getFid(), h.default.navigateTo({
                        url: "commodity?item_id=" + b
                    });
                }
            },
            moreBtnTap: function() {
                this.getNormalData();
            },
            toTab: function(a, b) {
                this.normalData = this.categoryList[a].itemVOList, this.toTab = a, this.groupId = b, 
                this.toView = "item_" + b, this.page = 1, this.isFixed = !1, this.showFoot = 7 >= this.normalData.length || this.normalData.length == this.categoryList[a].total, 
                this.$apply(), this.$emit("tabClick-emit", this.toView, !this.autoLoadNormalData || this.showFoot, !0);
            }
        }, f = e, d(a, f);
    }
    return f(p, a), g(p, [ {
        key: "getNormalData",
        value: function() {
            var a = b(regeneratorRuntime.mark(function b() {
                var c, d, a, e;
                return regeneratorRuntime.wrap(function(b) {
                    for (;;) switch (b.prev = b.next) {
                      case 0:
                        return c = this, c.page++, d = {
                            page: c.page,
                            pageSize: 12,
                            groupId: c.groupId || this.categoryList[0].groupId,
                            fId: j.default.getFid(),
                            deviceType: j.default.config.device_type
                        }, 0 === c.normalData.length && (this.normalData = this.categoryList[0].itemVOList), 
                        a = !1, b.next = 7, (0, k.seeGet)("ng/mall/categoryItem", d);

                      case 7:
                        e = b.sent, e.data.list && (c.normalData = c.normalData.concat(e.data.list), 12 > e.data.list.length && (c.showFoot = !0, 
                        c.$emit("finishNormalData-emit", c.showFoot))), c.$apply();

                      case 10:
                      case "end":
                        return b.stop();
                    }
                }, b, this);
            }));
            return function() {
                return a.apply(this, arguments);
            };
        }()
    } ]), p;
}(h.default.component);

exports.default = n;
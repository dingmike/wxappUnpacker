function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function b(a, b) {
    if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
}

function c(a, b) {
    if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return b && ("object" == typeof b || "function" == typeof b) ? b : a;
}

function d(a, b) {
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

var e = require("./../npm/wepy/lib/wepy.js"), f = a(e), g = require("./../common/global.js"), h = a(g), j = require("./../common/api.js"), i = require("./../common/da.js"), k = a(i), l = function(a) {
    function g() {
        var d, e, m, o;
        b(this, g);
        for (var i = arguments.length, n = Array(i), a = 0; a < i; a++) n[a] = arguments[a];
        return e = m = c(this, (d = g.__proto__ || Object.getPrototypeOf(g)).call.apply(d, [ this ].concat(n))), 
        m.props = {
            seckillData: {},
            moduleId: {},
            column: {}
        }, m.methods = {
            clickProduct: function(a) {
                if (h.default.advoiceTapTwice(a)) {
                    var b = a.currentTarget.dataset.id;
                    h.default.getDeviceType(), h.default.getFid(), k.default.report(164, 7, "-1", b, "", h.default.getFid()), 
                    f.default.navigateTo({
                        url: "commodity?item_id=" + b
                    });
                }
            },
            onEndCount: function(a) {
                this.$emit("refreshSeckillList-emit", a);
            },
            setRemind: function(b, c, d, f, e) {
                var g = this;
                if (b) console.log("已提醒"); else {
                    var i = {
                        activityType: c,
                        activityId: d,
                        formId: e.detail.formId
                    };
                    (0, j.seePost)("ng/reminder/open-activity-reminder", i, function(a) {
                        wx.showToast({
                            title: a.data.data,
                            icon: "none"
                        }), k.default.report(164, 124, "-1", "", "", h.default.getFid()), g.$emit("refreshSeckillList-emit", f);
                    });
                }
            }
        }, o = e, c(m, o);
    }
    return d(g, a), g;
}(f.default.component);

exports.default = l;
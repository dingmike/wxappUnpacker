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

var f = function() {
    function a(a, b) {
        for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, 
        c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c);
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b;
    };
}(), e = require("./../npm/wepy/lib/wepy.js"), g = a(e), h = require("./../common/global.js"), i = a(h), j = function(a) {
    function g() {
        var a, d, f, e;
        b(this, g);
        for (var h = arguments.length, i = Array(h), j = 0; j < h; j++) i[j] = arguments[j];
        return d = f = c(this, (a = g.__proto__ || Object.getPrototypeOf(g)).call.apply(a, [ this ].concat(i))), 
        f.props = {
            num: {
                type: [ Number ],
                coerce: function(a) {
                    return +a;
                },
                default: 1
            },
            maxNumber: {
                type: [ Number ]
            },
            type: {},
            seckillLimit: Number
        }, f.data = {}, f.events = {
            "index-broadcast": function(a) {
                console.log(f.name + " receive " + a.name + " from " + a.source.name);
            },
            "num-broadcast": function(a) {
                f.num = parseInt(a);
            },
            "maxNum-broadcast": function(a) {
                f.maxNumber = parseInt(a);
            },
            "seckillLimitNum-broadcast": function(a) {
                f.seckillLimit = parseInt(a);
            }
        }, f.methods = {
            bindKeyInput: function(a) {
                return this.num = 1 > a.detail.value ? 1 : parseInt(a.detail.value), this.num > this.maxNumber && (this.num = this.maxNumber), 
                this.num + "";
            },
            plus: function(a) {
                2 != a.currentTarget.dataset.type && (this.num = 1 > this.num ? 1 : this.num + 1, 
                this.num > this.maxNumber && (this.num = this.maxNumber), this.seckillLimit && this.num > this.seckillLimit && (this.num = this.seckillLimit, 
                wx.showModal({
                    title: "提示",
                    confirmColor: "#FE3B2E",
                    content: "每人限购" + this.num + "件噢",
                    showCancel: !1
                })));
            },
            minus: function() {
                this.num = 1 >= this.num ? 1 : this.num - 1, this.num > this.maxNumber && (this.num = this.maxNumber);
            }
        }, e = d, c(f, e);
    }
    return d(g, a), f(g, [ {
        key: "onLoad",
        value: function() {
            this.num = 1;
        }
    } ]), g;
}(g.default.component);

exports.default = j;
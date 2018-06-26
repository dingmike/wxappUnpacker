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
    function b(b, c) {
        for (var d, a = 0; a < c.length; a++) d = c[a], d.enumerable = d.enumerable || !1, 
        d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(b, d.key, d);
    }
    return function(c, d, e) {
        return d && b(c.prototype, d), e && b(c, e), c;
    };
}(), e = require("./../npm/wepy/lib/wepy.js"), g = a(e), h = require("./../common/global.js"), i = a(h), j = require("./../common/da.js"), k = a(j), l = function(a) {
    function g() {
        var d, e, f, a;
        b(this, g);
        for (var h = arguments.length, j = Array(h), l = 0; l < h; l++) j[l] = arguments[l];
        return e = f = c(this, (d = g.__proto__ || Object.getPrototypeOf(g)).call.apply(d, [ this ].concat(j))), 
        f.props = {
            activelist: {},
            type: {},
            goodsId: {}
        }, f.events = {
            "activeStartCounterDown-broadcast": function() {
                f.counterDown(!0);
            },
            "activeCloseCounterDown-broadcast": function() {
                f.counterDown(!1);
            }
        }, f.data = {
            timeData: [],
            timeInterval: !1
        }, f.methods = {
            toGroupDetail: function(a) {
                if (i.default.advoiceTapTwice(a)) if (0 < this.timeData[a.currentTarget.dataset.index].countDown) {
                    var b = !1, c = 0;
                    getCurrentPages().map(function(d, e) {
                        "pages/grouponDetail" == d.route && (b = !0, c = getCurrentPages().length - (e + 1));
                    }), b ? (i.default.config.groupId = a.currentTarget.dataset.id, wx.navigateBack({
                        delta: c
                    })) : (k.default.report(131, 305, this.goodsId, this.type, this.activelist[a.currentTarget.dataset.index].grouponActivityId, i.default.getFid()), 
                    wx.navigateTo({
                        url: "grouponDetail?id=" + a.currentTarget.dataset.id
                    }));
                } else wx.showModal({
                    title: "提示",
                    confirmColor: "#FE3B2E",
                    content: "该团刚刚已结束拼团啦！你还可以看看别的团或自己开团哦~",
                    showCancel: !1
                });
            }
        }, a = e, c(f, a);
    }
    var h = Math.floor;
    return d(g, a), f(g, [ {
        key: "counterDown",
        value: function(a) {
            var b = this;
            this.setUpTimeData(), a ? this.timeData.length && (this.timeInterval = setInterval(function() {
                b.timeData.map(function(a) {
                    0 <= --a.countDown && (b.dateFormat(a), b.$apply());
                });
            }, 1e3)) : (clearInterval(this.timeInterval), this.timeData = []);
        }
    }, {
        key: "setUpTimeData",
        value: function() {
            var b = this;
            void 0 != this.activelist && this.activelist.map(function(c) {
                var d = c.countDown, e = {
                    day: h(d / 3600 / 24),
                    hr: h(d / 60 / 60 % 24),
                    min: h(d / 60 % 60),
                    sec: h(d % 60),
                    countDown: d
                };
                b.timeData.push(e);
            });
        }
    }, {
        key: "dateFormat",
        value: function(a) {
            a.day = h(a.countDown / 3600 / 24), a.hr = h(a.countDown / 60 / 60 % 24), a.min = h(a.countDown / 60 % 60), 
            a.sec = h(a.countDown % 60);
        }
    } ]), g;
}(g.default.component);

exports.default = l;
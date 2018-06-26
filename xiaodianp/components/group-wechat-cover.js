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

var e = require("./../npm/wepy/lib/wepy.js"), f = a(e), g = require("./../common/global.js"), h = a(g), i = function(a) {
    function f() {
        var d, e, g, h;
        b(this, f);
        for (var j = arguments.length, k = Array(j), i = 0; i < j; i++) k[i] = arguments[i];
        return e = g = c(this, (d = f.__proto__ || Object.getPrototypeOf(f)).call.apply(d, [ this ].concat(k))), 
        g.props = {
            wxData: {}
        }, g.data = {
            isShowCover: !1
        }, g.events = {}, g.methods = {
            showCover: function() {
                this.isShowCover = !0, this.$apply();
            },
            closeCover: function() {
                this.isShowCover = !1, this.$apply();
            },
            copy: function() {
                wx.setClipboardData({
                    data: this.wxData.groupName,
                    success: function() {
                        wx.showToast({
                            title: "复制成功",
                            icon: "success",
                            duration: 500
                        });
                    }
                });
            },
            previewImage: function() {
                wx.previewImage({
                    urls: [ this.wxData.codeUrl ]
                });
            }
        }, h = e, c(g, h);
    }
    return d(f, a), f;
}(f.default.component);

exports.default = i;
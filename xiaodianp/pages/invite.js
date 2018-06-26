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
}(), e = require("./../npm/wepy/lib/wepy.js"), h = a(e), i = require("./../common/api.js"), j = require("./../common/global.js"), k = a(j), l = function(a) {
    function h() {
        var b, e, f, g;
        c(this, h);
        for (var j = arguments.length, i = Array(j), a = 0; a < j; a++) i[a] = arguments[a];
        return e = f = d(this, (b = h.__proto__ || Object.getPrototypeOf(h)).call.apply(b, [ this ].concat(i))), 
        f.config = {
            navigationBarTitleText: "生成邀请卡",
            backgroundColor: "f1f1f1",
            enablePullDownRefresh: !1
        }, f.data = {
            shareImg: "",
            tips: ""
        }, f.methods = {
            previewImage: function() {
                console.log(1), wx.previewImage({
                    urls: [ this.shareImg ]
                });
            }
        }, g = e, d(f, g);
    }
    return f(h, a), g(h, [ {
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
                        this.shareImg = b.shareImg, c = "", wx.getSystemInfo({
                            success: function(a) {
                                c = a.system.toLowerCase();
                            }
                        }), this.tips = "1、点击上图，预览邀请卡\n", this.tips += c.match("ios") ? "2. 长按预览图，保存邀请卡为图片在朋友圈和微信群中分享" : "2. 在预览图中，点击屏幕右上角，保存邀请卡为图片在朋友圈和微信群中分享", 
                        this.$apply();

                      case 6:
                      case "end":
                        return a.stop();
                    }
                }, a, this);
            }));
            return a;
        }()
    } ]), h;
}(h.default.page);

Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(l, "pages/invite"));
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
});

var f = function() {
    function b(b, c) {
        for (var d, f = 0; f < c.length; f++) d = c[f], d.enumerable = d.enumerable || !1, 
        d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(b, d.key, d);
    }
    return function(c, d, a) {
        return d && b(c.prototype, d), a && b(c, a), c;
    };
}();

require("./npm/wepy-async-function/index.js");

var e = require("./npm/wepy/lib/wepy.js"), g = a(e), h = require("./npm/promise-polyfill/promise.js"), i = a(h), j = require("./common/global.js"), k = a(j), l = function(a) {
    function g() {
        b(this, g);
        var a = c(this, (g.__proto__ || Object.getPrototypeOf(g)).call(this));
        return a.config = {
            pages: [ "pages/mall", "pages/collection", "pages/groupon", "pages/grouponDetail", "pages/rewardGroupDetail", "pages/moreRewardGroup", "pages/cart", "pages/addressManager", "pages/addressAdd", "pages/pay", "pages/order", "pages/orderDetail", "pages/commodity", "pages/coupon", "pages/userCenter", "pages/service", "pages/invite", "pages/activity", "pages/video", "pages/web", "pages/newUser", "pages/search" ],
            window: {
                backgroundColor: "#f2f2f2",
                backgroundTextStyle: "dark",
                navigationBarBackgroundColor: "#fff",
                navigationBarTitleText: "小电铺",
                navigationBarTextStyle: "black",
                enablePullDownRefresh: !0
            },
            tabBar: {
                color: "#999",
                selectedColor: "#fe3b2e",
                borderStyle: "white",
                backgroundColor: "#fff",
                list: [ {
                    pagePath: "pages/mall",
                    iconPath: "images/collection.png",
                    selectedIconPath: "images/collection_active.png",
                    text: "小电铺"
                }, {
                    pagePath: "pages/cart",
                    iconPath: "images/cart.png",
                    selectedIconPath: "images/cart_active.png",
                    text: " 购物车"
                }, {
                    pagePath: "pages/userCenter",
                    iconPath: "images/user.png",
                    selectedIconPath: "images/user_active.png",
                    text: "个人中心"
                } ]
            }
        }, a.globalData = {
            userInfo: null
        }, a.use("promisify"), a.use("requestfix"), a;
    }
    return d(g, a), f(g, [ {
        key: "onLaunch",
        value: function() {
            k.default.getSystemInfo();
        }
    }, {
        key: "onShow",
        value: function(a) {
            console.log("场景", a.scene), k.default.config.scene = a.scene, k.default.config.is_share = 1007 == a.scene || 1008 == a.scene ? 1 : 1014 == a.scene ? 2 : 0, 
            console.log("fid", a.query.f_id), a.query.f_id ? k.default.setFid(a.query.f_id) : wx.getStorageSync("local-f-id") && wx.removeStorageSync("local-f-id");
        }
    }, {
        key: "onHide",
        value: function() {
            wx.getStorageSync("local-f-id") && wx.removeStorageSync("local-f-id");
        }
    } ]), g;
}(g.default.app);

App(require("./npm/wepy/lib/wepy.js").default.$createApp(l, {}));
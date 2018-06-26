function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function b(a) {
    return a;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getAppConfig = exports.jsonify = exports.currencyFormat = exports.getDefaultMallId = exports.wxPay = exports.getUserInfo = exports.getToken = exports.seePost = exports.seeGet = exports.request = exports.once = exports.init = void 0;

var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
    return typeof a;
} : function(a) {
    return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
}, d = require("./../npm/wepy/lib/wepy.js"), f = a(d), e = require("./global.js"), g = a(e), h = g.default.config.is_prod ? "https://m.seeapp.com/index.php/" : "https://see-test.seecsee.com/", i = function() {
    return new Promise(function(a, b) {
        var c = g.default.getUserInfo();
        c ? a(c) : f.default.getUserInfo().then(function(b) {
            g.default.setUserInfo(b.userInfo), a(b.userInfo);
        }).catch(b);
    });
}, j = function(b, c, d) {
    return new Promise(function(i, j) {
        var a = wx.getStorageSync("Xcx-Token");
        a && !1 === g.default.config.first_open ? i({
            data: {
                "Xcx-Token": a
            }
        }) : (console.log("请求后台登录" + g.default.open_info.authorizer_appid), f.default.request({
            url: h + "authority/authWeixin",
            data: {
                code: b,
                authorizer_appid: g.default.open_info.authorizer_appid,
                device: "xiaochengxu",
                device_type: g.default.config.device_type,
                xcx_headimg: c,
                xcx_nickname: d,
                f_id: g.default.getFid()
            }
        }).then(function(a) {
            i(a.data), g.default.config.default_f_id = a.data.data.f_id, g.default.config.default_mall_id = a.data.data.default_mall_id, 
            g.default.config.first_open = !1;
        }).catch(j));
    });
}, k = function(a, b) {
    var c = a.data;
    return g.default.setSeeInfo(c), wx.setStorageSync("Xcx-Token", c["Xcx-Token"]), 
    g.default.config.user_id = c.u_id, console.log(b + "后台登录成功,u_id:", c.u_id, "Token:", c["Xcx-Token"]), 
    g.default.getUserInfo();
}, l = function() {
    return f.default.login().then(function(a) {
        if (0 >= g.default.config.pop_login_num) return b;
        g.default.config.pop_login_num -= 1;
        var c = a.code;
        return wx.getStorageSync("Xcx-Token") ? j(c, "", "").then(function(a) {
            return k(a, "【本地缓存Token】");
        }) : i().then(function(a) {
            g.default.setUserInfo(a);
            var b = a.avatarUrl, d = a.nickName;
            return j(c, b, d).then(function(a) {
                return k(a, "【获取用户信息成功】");
            });
        }).catch(function() {
            return console.log("get userInfo error"), j(c, "", "").then(function(a) {
                return k(a, "【获取用户信息失败】");
            });
        });
    }).catch(function(a) {
        console.log("login error", a);
    });
}, m = function(a) {
    var b = a.data;
    return 1 === b.result ? b : Object.hasOwnProperty.call(b, "msg") && /no right|登录|登陆/.test(b.msg) ? (g.default.config.first_open = !0, 
    g.default.config.pop_login_num = 1, l()) : "" === b.msg ? Promise.reject(a) : (f.default.showModal({
        title: "提示",
        confirmColor: "#FE3B2E",
        content: b.msg,
        showCancel: !1
    }).then(function() {
        1 < getCurrentPages().length && wx.navigateBack();
    }), b);
}, p = function(a) {
    var b;
    b = 200 === a.statusCode && a.data ? "糟糕！" + a.data.msg : "网络异常，请稍后再试", wx.showToast({
        title: b,
        icon: "warn",
        duration: 2e3
    }), console.error(new Error(a.data.msg)), Promise.reject(a);
}, n = function(b, d) {
    var e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "GET", j = arguments[3], k = g.default.getDeviceType(), a = g.default.getFid(), n = b;
    n += 0 <= b.indexOf("?") ? "&" : "?", n += "is_from_kol=1&device_type=" + k + "&f_id=" + a;
    try {
        var q = wx.getStorageSync("Xcx-Token"), r = "GET" === e ? "application/json;charset=UTF-8" : "application/x-www-form-urlencoded", s = {
            url: "" + h + n,
            data: Object.assign({
                f_id: a
            }, d),
            header: {
                "Xcx-Token": q,
                "Content-Type": r
            },
            method: e
        };
        return j ? f.default.request(s).then(j).catch(p) : f.default.request(s).then(m).catch(p);
    } catch (a) {
        return console.error(new Error("获取本地Xcx-Token失败！")), Promise.reject(a);
    }
}, o = function(a, b, c) {
    return n(a, b, "GET", c);
}, q = function(a) {
    var b = {
        type: 9,
        bigOrderId: a.big_order_id || "",
        formId: ""
    };
    o("ng/template/message/send", b);
}, r = function(a) {
    var b = {
        type: 1,
        bigOrderId: a.big_order_id || "",
        formId: a.formId || ""
    };
    o("ng/template/message/send", b);
};

Date.prototype.format = function(a) {
    var b = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    for (var c in /(y+)/.test(a) && (a = a.replace(RegExp.$1, ("" + this.getFullYear()).substr(4 - RegExp.$1.length))), 
    b) new RegExp("(" + c + ")").test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? b[c] : ("00" + b[c]).substr(("" + b[c]).length)));
    return a;
}, exports.init = l, exports.once = function(a) {
    var b;
    return function() {
        return a && (b = a(), a = null), b;
    };
}, exports.request = n, exports.seeGet = o, exports.seePost = function(a, b, c) {
    return n(a, b, "POST", c);
}, exports.getToken = j, exports.getUserInfo = i, exports.wxPay = function(b) {
    return new Promise(function() {
        wx.requestPayment({
            timeStamp: b.timeStamp,
            nonceStr: b.nonceStr,
            package: b.package,
            signType: "MD5",
            paySign: b.paySign,
            success: function() {
                wx.showToast({
                    title: "支付成功",
                    icon: "success",
                    duration: 1500
                }), g.default.config.paySuccess = !0, b.isGrouponOrder && q(b);
                var c, d = b.grouponId ? "grouponDetail?id=" + b.grouponId + "&pid=528" : "order", f = b.grouponId ? "pages/grouponDetail" : "pages/order", h = !1, a = getCurrentPages().length;
                getCurrentPages().forEach(function(b, d) {
                    b.route === f && (h = 0 !== d, c = a - (d + 1)), d === a - 1 && (h = "pages/order" !== b.route);
                }), h ? b.grouponHead ? (g.default.config.activityId = b.activityId, wx.redirectTo({
                    url: d
                })) : (g.default.config.groupId = b.grouponId, wx.navigateBack({
                    delta: c
                })) : wx.redirectTo({
                    url: d
                });
            },
            complete: function(a) {
                console.log(a.errMsg), "requestPayment:fail cancel" !== a.errMsg && "requestPayment:cancel" !== a.errMsg || (g.default.config.paySuccess = !0, 
                wx.redirectTo({
                    url: "order"
                }), b.isSendWaitMsg && r(b));
            }
        });
    });
}, exports.getDefaultMallId = function() {
    return new Promise(function(a, b) {
        0 == +g.default.config.default_mall_id ? f.default.request({
            url: h + "collection/getDefaultMallId?id=" + g.default.getCollectionId(),
            data: {}
        }).then(function(b) {
            g.default.config.default_mall_id = b.data.data.default_mall_id, g.default.config.default_f_id = b.data.data.f_id, 
            console.log("获取默认商城成功：" + g.default.config.default_mall_id + ",f_id:" + g.default.config.default_f_id), 
            a(b.data.data.f_id);
        }).catch(b) : a({
            default_mall_id: g.default.config.default_mall_id
        });
    });
}, exports.currencyFormat = function(a) {
    return "￥" + a;
}, exports.jsonify = function(a) {
    var b = [];
    return JSON.stringify(a, function(a, d) {
        if ("object" === (void 0 === d ? "undefined" : c(d))) {
            if (!b.indexOf(d)) return "__cycle__" + (void 0 === d ? "undefined" : c(d)) + "[" + a + "]";
            b.push(d);
        }
        return d;
    });
}, exports.getAppConfig = function() {
    return new Promise(function(a, b) {
        0 == +g.default.config.default_mall_id ? f.default.request({
            url: h + "weixin/getJsonConfig?authorizer_appid=" + g.default.open_info.authorizer_appid,
            data: {}
        }).then(function(b) {
            g.default.app_config.text = b.data.data.text, g.default.app_config.logo_1 = b.data.data.logo_1, 
            g.default.app_config.logo_2 = b.data.data.logo_2, g.default.app_config.logo_3 = b.data.data.logo_3, 
            0 < +b.data.data.collection_id && !1 === g.default.checkCacheCollection() && (g.default.config.collection_pro = +b.data.data.collection_id, 
            g.default.config.collection_dev = +b.data.data.collection_id, console.log("获取到最新的合集配置：" + g.default.config.collection_pro)), 
            a(g.default.app_config);
        }).catch(b) : a(g.default.app_config);
    });
};
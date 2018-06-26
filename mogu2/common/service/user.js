function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function n(e, n) {
    if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function");
}

function t(e, n) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !n || "object" != typeof n && "function" != typeof n ? e : n;
}

function o(e, n) {
    if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + typeof n);
    e.prototype = Object.create(n && n.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(e, n) : e.__proto__ = n);
}

function r(e, n, t) {
    return function() {
        var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, r = o, i = r.success, u = r.fail, c = r.complete;
        o = (0, y.merge)({}, n, o), "function" == typeof t ? o = t(o) || o : (0, y.merge)(o, t);
        var f = void 0, l = void 0, a = new Promise(function(n, t) {
            o.success = function(e) {
                f = e, "function" == typeof i && i(e), n(e);
            }, o.fail = function(e) {
                l = e, "function" == typeof u && u(e), t(new Error(e.errMsg));
            }, delete o.complete, e(o);
        });
        return "function" == typeof c && (a = a.then(function(e) {
            return c(f), e;
        }, function(e) {
            return c(l), Promise.reject(e);
        })), a;
    };
}

function i(e) {
    Object.assign(v, e);
}

function u() {
    if (!j) {
        try {
            l(wx.getStorageSync(O));
        } catch (e) {
            wx.getStorage({
                key: O,
                success: function(e) {
                    l(e.data);
                },
                fail: function() {
                    _.default.warn("fail to read loginItem");
                }
            });
        }
    }
}

function c() {
    wx.setStorage({
        key: O,
        data: {
            userInfo: j,
            token: k,
            sign: E
        },
        fail: function() {
            _.default.error("fail to write loginItem");
        }
    });
}

function f(e) {
    j = e, Object.defineProperties(j, {
        clone: {
            value: function() {
                return (0, y.clone)(j);
            }
        },
        update: {
            value: function(e) {
                Object.assign(j, (0, y.pick)(e, "uid", "uname", "avatar")), c();
            }
        }
    });
}

function l(e) {
    e && (f(e.userInfo ? e.userInfo : (0, y.pick)(e, "uid", "uname", "avatar")), e.extra && (j.openId = e.extra.oid), 
    k = e.token, x.default.setSession(E = e.sign), x.default.setCookie("__ud_", j.uid), 
    j.openId && x.default.setHeader("mw-oid", j.openId));
}

function a(e) {
    return l(e.loginItem), c(), E;
}

function s(e) {
    throw k = E = j = null, c(), new C(3, e.message);
}

function g() {
    return _.default.log("_login"), new m.default(function(e, n) {
        wx.login({
            success: function(n) {
                e(n.code);
            },
            fail: function(e) {
                n(new C(1, e.errMsg));
            }
        });
    });
}

function d(e) {
    return _.default.log("_simpleLogin"), x.default.request(N.simpleLoginApi, "1", {
        code: e
    }).then(x.default.filterResult).then(a, function(e) {
        return U = !0, s(e);
    });
}

function p(e) {
    return _.default.log("_getUserInfo"), new m.default(function(n, t) {
        wx.getUserInfo({
            withCredentials: !0,
            success: function(t) {
                n({
                    code: e,
                    rawData: t.rawData,
                    signature: t.signature,
                    encryptedData: t.encryptedData,
                    iv: t.iv
                });
            },
            fail: t
        });
    }).then(function(e) {
        return x.default.request(N.loginApi, "1", e).then(x.default.filterResult).then(a, s);
    }, function() {
        return wx.canIUse && wx.canIUse("openSetting") ? I({
            title: "是否要打开设置页面重新授权",
            content: "需要获取您的公开信息（昵称、头像等），请到小程序的设置中打开用户信息授权",
            confirmText: "去设置"
        }).then(function(n) {
            if (n.confirm) return S().then(function(n) {
                if (n.authSetting["scope.userInfo"]) return p(e);
                throw new C(2, "授权失败，请重新授权");
            }, function() {
                throw new C(9, "授权失败，您可能有部分功能无法使用");
            });
            throw new C(9, "授权失败，您可能有部分功能无法使用");
        }, function() {
            throw new C(9, "授权失败，请重新授权");
        }) : I({
            title: "",
            content: "请到小程序列表，删除“" + N.appName + "”，搜索“" + N.appName + "”重新进入并授权",
            showCancel: !1
        }).then(function() {
            throw new C(9, "授权失败，您可能有部分功能无法使用");
        });
    });
}

function w() {
    return x.default.request(N.refreshSignApi, "1", {
        token: k
    }).then(x.default.filterResult).then(a);
}

function h() {
    $ = null;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var m = e(require("../../lib/promise")), x = e(require("../../lib/mwp")), y = require("../../lib/utils"), b = e(require("../base/Events")), _ = e(require("../utils/debug")), v = {
    primaryColor: "#ff5777",
    secondaryColor: "#666666"
}, I = r(wx.showModal, null, function(e) {
    return Object.assign(e, {
        confirmColor: v.primaryColor,
        cancelColor: v.secondaryColor
    });
}), S = r(wx.openSetting), C = (r(wx.getStorage), r(wx.setStorage), r(wx.getSystemInfo), 
r(wx.chooseAddress), function(e) {
    function r(e, o) {
        n(this, r);
        var i = t(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, o));
        return i.isUserError = !0, i.code = e, i;
    }
    return o(r, Error), r;
}()), O = "mgj.user", k = null, E = null, j = null, R = !0, U = !1, N = {
    appName: "蘑菇街女装",
    color: "#ff5777",
    loginApi: "mwp.apollo.weixin.xcx.callback",
    simpleLoginApi: "mwp.apollo.weixin.xcx.simpleCallback",
    refreshSignApi: "mwp.apollo.login.refreshsign"
}, $ = null, q = new b.default(), A = {
    get token() {
        return k;
    },
    get sign() {
        return E;
    },
    get userInfo() {
        return Object.create(j);
    },
    get uid() {
        return j ? j.uid : "";
    },
    $on: q.$on.bind(q),
    $once: q.$once.bind(q),
    $off: q.$off.bind(q),
    $emit: q.$emit.bind(q),
    init: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        return Object.assign(N, e), i({
            primaryColor: N.color
        }), x.default.setLoginHandler(function() {
            return A.refreshSign();
        }), wx.getNetworkType({
            success: function(e) {
                "none" === e.networkType && (R = !1);
            }
        }), wx.canIUse && wx.canIUse("onNetworkStatusChange") && wx.onNetworkStatusChange(function(e) {
            if (!R && e.isConnected) return A.refreshSign();
            R = !0;
        }), u(), null === k ? A.login() : new m.default(function(e, n) {
            wx.checkSession({
                success: function() {
                    e(E);
                },
                fail: function() {
                    A.login().then(e, n);
                }
            });
        });
    },
    login: function() {
        return _.default.log("User.login"), $ || ($ = g().then(function(e) {
            return U ? p(e) : d(e).catch(function() {
                return g().then(function(e) {
                    return p(e);
                });
            });
        }).then(function(e) {
            return h(), A.$emit("login", e), e;
        }).catch(function(e) {
            throw h(), e;
        }));
    },
    refreshSign: function() {
        return _.default.log("User.refreshSign"), $ || (u(), null === k ? A.login() : $ = w().then(function() {
            return h(), A.$emit("login", E), E;
        }).catch(function() {
            return h(), A.login();
        }));
    },
    ensure: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        return $ || (u(), k ? m.default.resolve(E) : e ? m.default.reject(new C(9, "未登录")) : A.login());
    },
    showUserError: function(e) {
        return !!e.isUserError && (3 === e.code ? (I({
            title: "",
            content: e.message,
            showCancel: !1
        }), !0) : (_.default.error(e.message), !1));
    },
    Code: {
        ERR_WX_LOGIN: 1,
        ERR_NO_PERMIT: 2,
        ERR_FORBIDDEN: 3,
        ERR_CANCEL: 9
    }
};

exports.default = A;
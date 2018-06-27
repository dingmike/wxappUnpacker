function e(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}

function t(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {};
    0 == (arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1) && wx.showLoading({
        title: "加载中"
    });
    var i = getApp();
    wx.request({
        url: e,
        header: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
            cookie: "loginSession=" + i.globalData.trd_session
        },
        method: "POST",
        dataType: "json",
        data: t,
        success: function(i) {
            "no_login" !== i.data.msg ? (console.log(e, t, i), wx.hideLoading(), "function" == typeof a && a(i)) : o(n);
        }
    });
}

function o(e) {
    var o = getApp();
    1 != o.globalData.login_lock && (o.globalData.login_lock = !0, n = e, wx.login({
        success: function(n) {
            o.globalData.code = n.code, wx.getUserInfo({
                success: function(n) {
                    o.globalData.userInfo = n.userInfo;
                    t(o.globalData.url + "/index.php?m=Mini&c=Poetry&a=wx_login&xiao_cate_id=78&test=1", {
                        iv: n.iv,
                        encryptedData: n.encryptedData,
                        code: o.globalData.code
                    }, function(t) {
                        var n;
                        n = t.data.session_key ? t.data.session_key : "";
                        var a = {
                            time: new Date().getTime(),
                            trd_session: n
                        };
                        o.globalData.trd_session = n, wx.setStorageSync("trd_session", a), e();
                    });
                },
                fail: function() {
                    wx.showModal({
                        title: "因您未通过授权,登陆失败",
                        content: "如需正常使用，请按确定并在授权管理中打开“用户信息”，重新进小程序即可",
                        showCancel: !1,
                        success: function() {
                            wx.openSetting({
                                success: function(e) {
                                    console.log("openSetting success", e.authSetting);
                                }
                            });
                        }
                    });
                },
                complete: function() {
                    o.globalData.login_lock = !1;
                }
            });
        }
    }));
}

var n, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, i = (getApp(), !1);

module.exports = {
    formatTime: function(t) {
        var o = t.getFullYear(), n = t.getMonth() + 1, a = t.getDate(), i = t.getHours(), s = t.getMinutes(), c = t.getSeconds();
        return [ o, n, a ].map(e).join("/") + " " + [ i, s, c ].map(e).join(":");
    },
    isEmpty: function(e) {
        return !("string" == typeof e && e.length > 0);
    },
    checkPhone: function(e) {
        return console.log(void 0 === e ? "undefined" : a(e)), "number" == typeof e && /^1[34578]\d{9}$/.test(e) ? (console.log("true"), 
        !0) : (console.log("false"), !1);
    },
    request_post: t,
    login: o,
    checkSession: function(e) {
        var t = getApp(), i = wx.getStorageSync("trd_session") || "";
        i.length > 32 && (i = JSON.parse(i)), console.log("key的存储时间为：" + (new Date().getTime() - i.time)), 
        n = e, !i.trd_session || "object" != (void 0 === i ? "undefined" : a(i)) || new Date().getTime() - Number(i.time) >= 864e5 || 32 != i.trd_session.length ? (console.log("key失效，重新登录"), 
        o(e)) : wx.checkSession({
            success: function() {
                wx.getUserInfo({
                    success: function(o) {
                        t.globalData.trd_session = i.trd_session, t.globalData.userInfo = o.userInfo, e();
                    }
                });
            },
            fail: function() {
                o(e);
            }
        });
    },
    getUrlParam: function(e, t) {
        var o = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"), n = e.split("?")[1].substr(0).match(o);
        return null != n ? unescape(n[2]) : null;
    },
    accSub: function(e, t) {
        var o, n, a, i;
        try {
            o = e.toString().split(".")[1].length;
        } catch (e) {
            o = 0;
        }
        try {
            n = t.toString().split(".")[1].length;
        } catch (e) {
            n = 0;
        }
        return a = Math.pow(10, Math.max(o, n)), i = o >= n ? o : n, ((e * a - t * a) / a).toFixed(i);
    },
    navigateTo: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
        if (!0 !== i) {
            i = !0;
            var o = void 0;
            if (e.currentTarget.dataset.navtype && (o = e.currentTarget.dataset.navtype), "back" !== o) {
                var n = e.currentTarget.dataset.url + t;
                if ("MiniProgram" !== o) {
                    if (!(Number(getCurrentPages()) > 11 || "home" === o || "reLaunch" === o)) return "redirectTo" == o ? (console.log(o), 
                    void wx.redirectTo({
                        url: n,
                        complete: function() {
                            i = !1;
                        }
                    })) : void wx.navigateTo({
                        url: n,
                        fail: function(e) {
                            wx.redirectTo({
                                url: n
                            });
                        },
                        complete: function() {
                            i = !1;
                        }
                    });
                    wx.reLaunch({
                        url: n,
                        complete: function() {
                            i = !1;
                        }
                    });
                } else wx.navigateToMiniProgram({
                    appId: "wx3f4695f7f7af6146",
                    path: n,
                    complete: function() {
                        i = !1;
                    }
                });
            } else wx.navigateBack({
                complete: function() {
                    i = !1;
                }
            });
        }
    }
};
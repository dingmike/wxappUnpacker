function o(o, e) {
    if (!(o instanceof e)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function() {
    function o(o, e) {
        for (var t = 0; t < e.length; t++) {
            var s = e[t];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(o, s.key, s);
        }
    }
    return function(e, t, s) {
        return t && o(e.prototype, t), s && o(e, s), e;
    };
}(), t = function(o) {
    return o && o.__esModule ? o : {
        default: o
    };
}(require("../../../common/m.js")), s = /m.mogujie.com\?json={(\w+:[^\s,]+\,?)+}$/, a = function() {
    function a(e, t, s, c, n) {
        o(this, a), this.params = e.data ? e.data : {}, this.updateURL(t), this.lock = !1, 
        this.pageid = s, this.shieldParam = c, this.scope = n;
    }
    return e(a, [ {
        key: "updateURL",
        value: function(o) {
            this.href = o, this.isLegalURL() && (this.params = this.parseURLParams());
        }
    }, {
        key: "isLegalURL",
        value: function() {
            var o = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.href;
            return s.test(o);
        }
    }, {
        key: "parseURLParams",
        value: function() {
            var o = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.href).split("?json="), e = "";
            o[1] && (e = o[1].replace("{", "").replace("}", ""));
            var t = e.split(",").map(function(o) {
                return o.split(":").map(function(o) {
                    return '"' + o + '"';
                }).join(":");
            });
            return t = t ? "{" + t + "}" : "{}", JSON.parse(t);
        }
    }, {
        key: "switchStatus",
        value: function() {
            if (!this.lock) {
                this.lock = !0;
                var o = this.params;
                switch (o.model) {
                  case "关注":
                    this.addfollow(o.userId);
                    break;

                  case "领现金券":
                    this.getCashCoupon(o.proId);
                    break;

                  case "领券":
                    this.getShopCoupon(o.proId, o.shopId);
                    break;

                  case "收藏":
                    this.collectShop(o.shopId);
                    break;

                  case "锚点":
                    this.jumpFloor(o.floor);
                    break;

                  case "领券包":
                    this.getCouponPackage(o.couponId);
                    break;

                  case "showPopup":
                    this.scope.setGlobal({
                        _showPop: !0
                    }), this.lock = !1;
                    break;

                  case "addFollow":
                    this.addfollow(o.userId);
                    break;

                  case "getCashCoupon":
                    this.getCashCoupon(o.proId);
                    break;

                  case "getShopCoupon":
                    this.getShopCoupon(o.proId, o.shopId);
                    break;

                  case "collectShop":
                    this.collectShop(o.shopId);
                    break;

                  case "jumpFloor":
                    this.jumpFloor(o.floor);
                    break;

                  case "getCouponPackage":
                    this.getCouponPackage(o.couponId);
                }
            }
        }
    }, {
        key: "addfollow",
        value: function(o) {
            var e = this;
            t.default.MWP.request("mwp.timelinemwp.addUserMarkActionlet", "1", {
                markType: 1,
                targetUserIds: [ o ]
            }).then(function(o) {
                e.lock = !1, "FAIL_BIZ_SESSION_INVALID" == o.ret ? wx.login() : "SUCCESS" == o.ret ? e.scope.showToast("关注成功") : "FAIL_BIZ_REPEAT" == o.ret ? e.scope.showToast("已关注") : e.scope.showToast("关注失败");
            }).catch(function(o) {
                e.scope.showToast("菇凉，你的网络不太给力～"), e.lock = !1;
            });
        }
    }, {
        key: "getCashCoupon",
        value: function(o) {
            var e = this, s = {
                campId: o,
                source: 16,
                sourceExtra: this.pageid,
                platform: "app"
            };
            s = Object.assign(s, this.shieldParam), t.default.MWP.request("mwp.ford.getPlatformCoupon", "1", s).then(function(o) {
                e.lock = !1, "SUCCESS" == o.ret ? e.scope.showToast("成功领取") : "FAIL_BIZ_SESSION_INVALID" == o.ret ? wx.login() : e.scope.showToast(o.msg || "系统繁忙，请稍后重试");
            }).catch(function(o) {
                e.scope.showToast("菇凉，你的网络不太给力～"), e.lock = !1;
            });
        }
    }, {
        key: "getShopCoupon",
        value: function(o, e) {
            var s = this, a = {
                campId: o,
                shopId: e,
                source: 16,
                sourceExtra: this.pageid
            };
            t.default.MWP.request("mwp.ford.getShopCoupon", "1", a).then(function(o) {
                s.lock = !1, "SUCCESS" == o.ret ? s.scope.showToast("成功领取") : "FAIL_BIZ_SESSION_INVALID" == o.ret ? wx.login() : s.scope.showToast(o.msg || "领取失败，请稍后重试");
            }).catch(function(o) {
                s.scope.showToast("菇凉，你的网络不太给力～"), s.lock = !1;
            });
        }
    }, {
        key: "collectShop",
        value: function(o) {
            var e = this;
            t.default.MWP.request("mwp.shopappservice.collectShop", "1", {
                shopId: o
            }).then(function(o) {
                e.lock = !1, "FAIL_BIZ_1022" == o.ret ? wx.login() : "SUCCESS" == o.ret ? e.scope.showToast("收藏成功") : e.scope.showToast("收藏失败");
            }).catch(function(o) {
                e.scope.showToast("菇凉，你的网络不太给力～"), e.lock = !1;
            });
        }
    }, {
        key: "jumpFloor",
        value: function(o) {
            this.lock = !1;
            var e = this.scope, t = e.getGlobal(), s = t && t.moduleIds;
            e.$nextTick(function() {
                e.setScrollInfo({
                    scrollIntoView: "m" + s[o - 1]
                });
            });
        }
    }, {
        key: "getCouponPackage",
        value: function(o) {
            var e = this, s = {
                relationKey: o
            };
            s = Object.assign(s, this.shieldParam), t.default.MWP.request("mwp.diana.couponLaunch", "3", s).then(function(o) {
                e.lock = !1;
                var t = void 0;
                o && "FAIL_BIZ_SESSION_INVALID" == o.ret ? wx.login() : o && "SUCCESS" == o.ret ? t = o.data && o.data.returnMsg || "恭喜！领券成功~" : o && o.msg && (t = o.msg || "系统繁忙，请稍后重试"), 
                e.scope.showToast(t);
            }).catch(function(o) {
                e.scope.showToast("菇凉，你的网络不太给力～"), e.lock = !1;
            });
        }
    } ]), a;
}();

exports.default = a;
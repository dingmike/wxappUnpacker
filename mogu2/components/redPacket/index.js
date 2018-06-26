function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../../common/m")), o = t(require("../../components/gamePop/index")), n = t(require("../../common/utils/gameUtil")), i = t(require("../../components/toast/index")), a = t(require("../../components/countdown/index")), c = t(require("../../common/utils/cache")), s = e.default.MWP, r = e.default.MCE, u = e.default.fn.sendMsg, d = !1, l = {
    coupon: "https://s10.mogucdn.com/mlcdn/c45406/170911_62bhb4lh4e2l16464a4jl76ljclld_630x714.png",
    couponPackage: "https://s10.mogucdn.com/mlcdn/c45406/170920_507hk0c1ggha2jekba9k83l5kllah_630x714.png"
}, h = {
    coupon: "https://s10.mogucdn.com//mlcdn/c45406/171024_00flkc73iekdb4hdja6lhgei18e2l_630x714.png",
    couponPackage: "https://s10.mogucdn.com//mlcdn/c45406/171024_88agk22cce0g8bi4e90a32ee16e0j_630x714.png"
};

exports.default = {
    _redPacketShowCount: 0,
    mceInfo: {
        pid: "",
        lotteryRule: "",
        environment: "",
        countdownTime: "",
        activityCode: "",
        showXcx: "",
        failMsg: "",
        guideMsg: "",
        copyright: ""
    },
    components: {
        gamePop: o.default,
        countdown: a.default,
        toast: i.default
    },
    data: function() {
        return {
            btnStatus: "",
            showRedPacket: !1,
            isTimeOut: !1
        };
    },
    onLoad: function(t) {
        var e = this;
        switch (this.$on("popClose", function() {
            e.close();
        }), t.mwp) {
          case "mock":
            this.env = s.Env.Mock;
            break;

          case "dev":
            this.env = s.Env.Develop;
            break;

          case "pre":
            this.env = s.Env.PreRelease;
        }
        this.optionsEnvt = t.environment;
    },
    methods: {
        render: function(t) {
            var e = this;
            t && t.pid && (this.mceInfo.pid = t.pid, this._getMceInfo(function() {
                var t = c.default.get("appName");
                e.mceInfo.showXcx.indexOf(t) > -1 && e.canPlayedToday(function(t) {
                    t && e._renderRPInfo();
                });
            }));
        },
        _getMceInfo: function(t) {
            var e = this;
            d = !0, r.get({
                pid: this.mceInfo.pid
            }).then(function(o) {
                if (d = !1, o.list && o.list.length > 0) {
                    var n = o.list[0];
                    e.mceInfo = Object.assign(e.mceInfo, n), e.mceInfo.lotteryRule = n.lotteryRule ? n.lotteryRule.split(";") : "", 
                    e.mceInfo.guideMsg = n.guideMsg ? n.guideMsg.split(";") : "", e.mceInfo.showXcx = n.showXcx || "蘑菇街女装", 
                    t && t();
                }
            }).catch(function(t) {
                d = !1, console.log(t), u(t, {
                    _author: "qiaoyi",
                    threshold: 1
                });
            });
        },
        _renderRPInfo: function() {
            var t = this.mceInfo, e = !1;
            this._redPacketShowCount > 0 && this.resetRedPacket(), e = "online" === t.environment || "test" === this.optionsEnvt, 
            this.showFirstPop(t.lotteryRule, e);
        },
        showFirstPop: function(t, e) {
            var o = this;
            this.$root.$logE("016000563", {
                activityCode: this.mceInfo.activityCode
            });
            var n = {
                bg: "https://s10.mogucdn.com/mlcdn/c45406/170911_7cljhbi5gd2jbb1kge7h5i04i53ih_630x714.png"
            }, i = this.mceInfo.countdownTime;
            this.setData({
                lotteryRule: t,
                showRedPacket: e,
                copyright: this.mceInfo.copyright
            }), e && (this.setHasShowedToday(), this.$countdown.init({
                format: "ss",
                countdown: i,
                endCallback: function() {
                    o.setData({
                        isTimeOut: !0,
                        guideMsg: o.mceInfo.guideMsg
                    });
                }
            }), this.showGamePop(n, !1));
        },
        _doLottery: function(t) {
            var e = this;
            n.default.listenData({
                name: "mwp.aston.simpleGamePort",
                version: "2"
            }, {
                activityCode: this.mceInfo.activityCode
            }, function(o) {
                switch (d = !1, o.status) {
                  case "noLogin":
                    e.$gamePop.close();
                    break;

                  case "win":
                    t && t(o.data);
                    break;

                  case "limit":
                  case "risk":
                  case "noQual":
                    e.$gamePop.close(), o.msg && e.$toast.show(o.msg);
                    break;

                  case "noWin":
                    e.$gamePop.close(), e.mceInfo.failMsg && e.$toast.show(e.mceInfo.failMsg, 3e3);
                    break;

                  default:
                    e.$gamePop.close();
                }
            }, {
                isShowTip: !1,
                needLogin: !0,
                loginSuccess: function() {
                    console.log("授权成功"), d = !1;
                },
                loginFail: function() {
                    console.log("拒绝授权"), d = !1;
                }
            });
        },
        clickStartBtn: function(t) {
            var e = this;
            if (!d) {
                var o = t.detail.formId;
                this.$root.$logForm(o, 1);
                var n = "front";
                this.setData({
                    btnStatus: "front"
                }), this.$root.$logE("016000564", {
                    activityCode: this.mceInfo.activityCode
                }), this.$countdown.stop(), this.btnAimationTimer = setInterval(function() {
                    "front" === n ? (e.setData({
                        btnStatus: "back"
                    }), n = "back") : (e.setData({
                        btnStatus: "front"
                    }), n = "front");
                }, 150), setTimeout(function() {
                    e._doLottery(function(t) {
                        clearInterval(e.btnAimationTimer);
                        var o = t.giftContent, n = {
                            status: "win",
                            giftType: t.giftType,
                            bg: l.couponPackage,
                            btnType: 1,
                            btnLink: "close",
                            data: t,
                            activityCode: e.mceInfo.activityCode
                        };
                        switch (t.giftType) {
                          case "shopCoupon":
                            n.title = o.hitPopTitle || "不错哦，店铺优惠券到手啦", n.text = o.shopName ? o.shopName + "优惠券" : "-店铺优惠券-", 
                            o.picUrl ? (n.bg = l.coupon, n.btnLink = o.picUrl) : n.bg = h.coupon;
                            break;

                          case "platformCoupon":
                            n.title = o.hitPopTitle || "人品爆发，平台优惠券到手", n.text = o.description ? o.description : "-平台通用优惠券-", 
                            o.picUrl ? (n.bg = l.coupon, n.btnLink = o.picUrl) : n.bg = h.coupon;
                            break;

                          case "platPackage":
                            n.title = o.hitPopTitle || "恭喜你获得平台券大礼包", n.text = o.description ? o.description : "-可到我的优惠券列表查看-", 
                            o.couponPackageUrl ? (n.bg = l.couponPackage, n.btnLink = o.couponPackageUrl) : n.bg = h.couponPackage;
                            break;

                          default:
                            n.title = o.hitPopTitle || "恭喜中奖", n.text = o.description ? o.description : "", 
                            n.bg = h.couponPackage;
                        }
                        e.close(), e.showGamePop(n);
                    });
                }, 500);
            }
        },
        showGamePop: function(t, e) {
            void 0 === e ? this.$gamePop.render(t) : this.$gamePop.render(t, e), this.$gamePop.open();
        },
        getNowDate: function() {
            var t = new Date();
            return t.getMonth() + 1 + "_" + t.getDate();
        },
        setHasShowedToday: function() {
            var t = this.getNowDate();
            c.default.put("hasPlayRedPacket_" + this.mceInfo.activityCode, t, {
                persistent: !0
            });
        },
        canPlayedToday: function(t) {
            var e = this;
            t && (this.hasShowedToday() ? t(!1) : s.request("mwp.aston.gameStockInfo", "2", {
                activityCode: this.mceInfo.activityCode,
                isJoinUserCount: 1
            }, {
                method: "POST",
                env: this.env
            }).then(s.filterResult).then(function(o) {
                o && o.dailyLeftCount > 0 ? t(!0) : (e.setHasShowedToday(), t(!1));
            }).catch(function(e) {
                console.error(e), t(!1);
            }));
        },
        hasShowedToday: function() {
            var t = c.default.get("hasPlayRedPacket_" + this.mceInfo.activityCode);
            return !!t && t === this.getNowDate();
        },
        resetRedPacket: function() {
            this.$countdown.reset(), clearInterval(this.btnAimationTimer), this.setData({
                btnStatus: "",
                showRedPacket: !1,
                isTimeOut: !1
            });
        },
        close: function() {
            this.$countdown.stop(), this.setData({
                showRedPacket: !1
            });
        }
    }
};
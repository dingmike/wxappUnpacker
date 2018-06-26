function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = t(require("../../../common/m.js")), e = require("./lib/util.js"), n = t(require("./lib/gameUtil.js")), i = t(require("../../vxNodeModules/@meili/vue-game-pop/src/components/gamePop.js")), s = t(require("../../../common/utils/cache.js")), a = t(require("../../../common/countdown/index.js")), c = (t(require("../../../common/utils/imgUrlTool.js")), 
o.default && o.default.MWP), p = !1, r = {
    name: "vx_game_lotteryPopup",
    components: {
        MvwGamePop: i.default
    },
    _alwaysShow: !0,
    data: function() {
        var t = this, o = this.config.popBase[0] && this.config.popBase[0].showTimes, e = 24 * parseInt(o) * 3600, n = "";
        return n = s.default.get("global.scene"), {
            lotPopShow: !1,
            lotPopMiss: !1,
            lotPopLT: "",
            lotPopBtnStatus: "",
            lotPopSetting: {
                popType: "",
                backgroundImg: "",
                wxPopLink: "",
                h5PopLink: "",
                lotteryRule: "",
                acm: ""
            },
            resPopShow: !1,
            resPopSetting: {},
            openResPop: function() {
                t.resPopShow = !0;
            },
            closeResPop: function() {
                t.resPopShow = !1;
            },
            spaceTime: e,
            scene: n,
            pageId: wx.isH5 ? window.pageInfo && window.pageInfo.pageId : this.$wrapper.pageId
        };
    },
    mounted: function() {
        var t = this;
        this.$on("__lazy-data__", function(o, n) {
            var i = t, s = t.canShow = !1;
            s = !e.cacheControl.getXcxCache(t.spaceTime, t.pageId), t.config.popBase[0] && t.config.popBase[0].alwaysShow && (s = !0), 
            o.length > 0 && s && (i.mceSetting = o, i.setPopSetting());
        });
    },
    created: function() {
        this.popConfig = (0, e.arrToObj)(this.config.winSet), this.noWinSet = this.config.noWinSet[0], 
        this.activityCode = "";
    },
    methods: {
        onLoad: function(t) {
            t.privateSceneId && (this.scene = t.privateSceneId);
        },
        onShow: function() {
            this.closeLotPop();
        },
        onUnload: function() {
            this.closeLotPop();
        },
        setPopSetting: function() {
            var t = this, o = {}, e = [], n = null;
            this.mceSetting.forEach(function(t, n) {
                t.showSceneId ? o[t.showSceneId] || (o[t.showSceneId] = t) : e.push(t);
            }), (n = o[this.scene] ? o[this.scene] : e[0] || {}) && "lotteryPop" === n.popType ? (this.activityCode = n.activityCode, 
            this._checkLotteryTimes(function(o) {
                o && t.setLotteryPop(n);
            })) : "bannerPop" === n.popType && this.setBannerPop(n);
        },
        setLotteryPop: function(t) {
            if (t) {
                var o = this, e = +new Date() / 1e3 + t.countdownTime, n = {
                    popType: t.popType || "bannerPop",
                    acm: t.acm || "",
                    backgroundImg: t.popBackground || "",
                    lotteryRule: t.lotteryRuleMsg ? t.lotteryRuleMsg.split(";") : ""
                };
                o.lotPopLT = t.countdownTime || 59, o.lotPopSetting = Object.assign({}, o.lotPopSetting, n), 
                o.$logE("016000318", {
                    type: "lottery",
                    activityCode: o.activityCode
                }), o.openLotPop(), o.cd = new a.default({
                    endTime: e,
                    diff: 0,
                    format: "ss",
                    update: function(t) {
                        o.lotPopLT = t;
                    },
                    complete: function(t) {
                        o.lotPopLT = t, o.lotPopMiss = !0;
                    }
                }), o.cd.start();
            }
        },
        setBannerPop: function(t) {
            if (t) {
                var o = {
                    popType: t.popType || "bannerPop",
                    acm: t.acm || "",
                    backgroundImg: t.popBackground || "",
                    wxPopLink: t.wxBannerLink || "",
                    h5PopLink: t.h5BannerLink || ""
                };
                this.lotPopSetting = Object.assign({}, this.lotPopSetting, o), this.$logE("016000318", {
                    type: "link"
                }), this.openLotPop();
            }
        },
        openLotPop: function() {
            var t = this;
            this.getGlobal()._showPop || (this.lotPopShow = !0, e.cacheControl.setXcxCache(this.pageId), 
            wx.isH5 ? this.$nextTick(function() {
                t._triggerLazyMotion();
            }) : this.$vm.setData({
                lotPopShow: !0
            }, function() {
                t._triggerLazyMotion();
            }));
        },
        closeLotPop: function() {
            this.lotPopShow && (this.lotPopShow = !1, clearInterval(this.btnAimationTimer), 
            this.cd && this.cd.stop());
        },
        clickStartBtn: function() {
            if (!p) {
                p = !0;
                var t = "front", o = this;
                o.lotPopBtnStatus = "front", o.$logE("016000319", {
                    type: "lottery",
                    activityCode: o.activityCode
                }), o.cd.stop(), o.btnAimationTimer = setInterval(function() {
                    "front" === t ? (o.lotPopBtnStatus = "back", t = "back") : (o.lotPopBtnStatus = "front", 
                    t = "front");
                }, 150), setTimeout(function() {
                    o._doLottery(function(t) {
                        if (t.win) {
                            var e = t && t.data || {}, n = e.giftType;
                            o.resPopSetting = Object.assign({
                                btnType: 1,
                                code: o.activityCode
                            }, o.popConfig[n], {
                                data: e
                            });
                        } else o.resPopSetting = Object.assign({
                            btnType: 1,
                            code: o.activityCode
                        }, o.noWinSet);
                        o.closeLotPop(), o.openResPop(), clearInterval(o.btnAimationTimer);
                    });
                }, 500);
            }
        },
        _checkLotteryTimes: function(t) {
            var o = this;
            t && this.activityCode && c.request("mwp.aston.gameStockInfo", "2", {
                activityCode: this.activityCode
            }).then(c.filterResult).then(function(n) {
                n && n.dailyLeftCount > 0 ? t(!0) : (e.cacheControl.setXcxCache(o.pageId), t(!1));
            }).catch(function(o) {
                console.error(o), t(!1);
            });
        },
        _doLottery: function(t) {
            var o = this;
            this.activityCode && n.default.listenData({
                name: "mwp.aston.simpleGamePort",
                version: "2"
            }, {
                activityCode: this.activityCode
            }, function(e) {
                switch (p = !1, e.status) {
                  case "noLogin":
                    o.closeLotPop();
                    break;

                  case "win":
                    t && t({
                        win: !0,
                        data: e.data
                    });
                    break;

                  case "limit":
                  case "risk":
                  case "noQual":
                    o.closeLotPop(), e.msg && o.showToast(e.msg);
                    break;

                  case "noWin":
                    o.closeLotPop(), t && t({
                        win: !1
                    });
                    break;

                  default:
                    o.closeLotPop(), e.msg && o.showToast(e.msg);
                }
            }, {
                isShowTip: !1,
                needLogin: !0,
                loginSuccess: function() {
                    console.log("授权成功"), p = !1;
                },
                loginFail: function() {
                    console.log("拒绝授权"), p = !1;
                }
            });
        },
        jumpFun: function(t) {
            var o = t.target.dataset, e = o.href, n = o.xcxHref, i = o.acm;
            this.$logE("016000319", {
                type: "link"
            }), wx.isH5 ? (e = e.indexOf("?") > 0 ? e + "&acm=" + i : e + "?acm=" + i, window.logger.goTo(e)) : this.wxa_link && this.wxa_appId ? this.vx_launch(this.wxa_link, {
                appId: this.wxa_appId
            }, t) : this.vx_navigate(n, {}, t);
        },
        _triggerLazyMotion: function() {
            try {
                this.triggerLazyMotion();
            } catch (t) {
                console.log(t);
            }
        }
    }
};

exports.default = {
    componentOptions: r,
    renderComponentsFunc: function(t) {
        t("mvw-game-pop", {
            showContent: !0,
            showInfo: this.resPopShow,
            pop: this.resPopSetting
        }, {
            closeModal: this.closeResPop,
            openModal: this.openResPop
        }, "15247322522710");
    }
};
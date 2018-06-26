function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var s = e(require("../../common/m")), t = e(require("../../common/service/user")), o = e(require("../../common/base/createPage")), i = e(require("../../components/toast/index")), a = e(require("../../components/wall/index_tabNav")), n = e(require("../../common/utils/makeup")), r = e(require("../../components/salesEntry/index")), h = s.default.MWP;

exports.default = (0, o.default)({
    components: {
        toast: i.default,
        wall: a.default,
        salesEntry: r.default
    },
    options: {
        fcid: "",
        source: "pangi",
        shareInfo: {},
        shareParam: "",
        processWidth: 290,
        responseInfoMap: "",
        isRiskControl: !1
    },
    data: {
        isLogin: !1,
        name: "群红包分享",
        bgHeight: 0,
        bgTopMarginTop: 0,
        isRuleShow: !1,
        isQrcodeShow: !1,
        isReplaViewShow: !1,
        ruleImg: "",
        qrcodeImg: "",
        prizes: [],
        showGameMask: !1,
        gameImgCls: "",
        gameImgUrl: "",
        topBgColor: "",
        homeBgImg: "",
        finishResult: {},
        $salesEntry: {
            preMakeupKey: "salesEntry_",
            collectFormId: !0,
            padding: 0,
            ptpC: "mod_rchome_salesEntry"
        },
        showWall: !1,
        itemStyle: {
            buttonText: "立即购买",
            buttonBg: "#FF5777",
            imgH: "480",
            size: "size_3x4",
            tagColor: "#FFBC49",
            buttonColor: "#FFFFFF",
            nameColor: "#333",
            showSale: !0,
            rbShow: "org",
            tagText: "促销价",
            styleColor: "#333"
        }
    },
    onLoad: function() {
        var e = wx.getSystemInfoSync();
        this.setData({
            bgGHeight: 2 * e.windowHeight,
            bgTopMarginTop: 2 * -(e.screenHeight - e.windowHeight)
        }), this.loginInit();
    },
    onReachBottom: function() {
        this.$wall.wallScrollEvent();
    },
    fetchGameData: function() {
        var e = this;
        h.request("mwp.aston.groupRpMyTask", "1.0").then(function(s) {
            e.initMainContent(s);
        }).catch(function(s) {
            console.log(s), e.$toast.show("人气太旺了，稍后再试试~");
        });
    },
    loginInit: function() {
        var e = this;
        t.default.ensure().then(function() {
            e.setData({
                isLogin: !0
            }), e.fetchGameData();
        }, function() {
            e.setData({
                isLogin: !1
            });
        });
    },
    onReady: function() {
        this.__makeup__ = new n.default(this, "85120");
    },
    loginClick: function() {
        this.loginInit();
    },
    initMainContent: function(e) {
        var s = e.data.returnCode;
        4030 !== parseInt(s, 10) ? 1001 === parseInt(s, 10) || 4027 === parseInt(s, 10) || 4028 === parseInt(s, 10) ? this.initGameContainer(e) : this.$toast.show("系统出小差啦~") : this.$toast.show("人气太旺啦，请稍后再试试~");
    },
    initGameContainer: function(e) {
        var s = e.data.data, t = e.data.returnCode;
        if (4027 !== parseInt(t, 10) && 4028 !== parseInt(t, 10)) {
            for (var o = this.parsePrizesData(s), i = [], a = [], n = 0; n < o.length; n++) a.push(o[n]), 
            n > 0 && (n + 1) % 2 == 0 && (i.push(a), a = []);
            var r = this.parsePrizesSysData(s);
            this.options.shareInfo = r.shareInfo, this.options.shareParam = s.selfInfo.shareParam, 
            this.options.responseInfoMap = r.responseInfoMap;
            var h = r.homeBgImgUrl;
            this.setData({
                prizes: i,
                ruleImg: r.ruleImgUrl,
                qrcodeImg: r.qrcodeImgUrl,
                homeBgImg: h
            }), this.initWall();
        } else for (var l = 0; l < s.gameInfo.length; l++) if (parseInt(t, 10) === s.gameInfo[l].responseCode) {
            this.setData({
                showGameMask: !0,
                gameImgCls: 4027 === parseInt(t, 10) ? "game-start-mask" : "game-end-mask",
                gameImgUrl: s.gameInfo[l].image
            });
            break;
        }
    },
    initWall: function() {
        this.setData({
            showWall: !0
        }), "mait" === this.options.source ? (this.$wall.setDataSource({
            source: "mwp_mait"
        }), this.wallParams = {
            pid: this.options.fcid
        }) : this.wallParams = {
            fcid: this.options.fcid,
            cKey: "xcx-guess"
        }, this.$wall.initWall(this.wallParams);
    },
    parsePrizesSysData: function(e) {
        for (var s = e.gameInfo, t = "", o = "", i = {}, a = {}, n = {}, r = "https://s10.mogucdn.com/mlcdn/c45406/171227_66g673da3j848i58c93fld18ikcgj_1125x719.jpg", h = 0; h < s.length; h++) "rule" === s[h].configType ? t = s[h].image : "QRcodeMiniprogram" === s[h].configType ? o = s[h].image : "shareMiniprogram" === s[h].configType ? (i.link = s[h].link, 
        i.title = s[h].title, i.image = s[h].image, i.shareContent = s[h].shareContent) : "responseInfo" === s[h].configType ? a[s[h].responseCode] = {
            image: s[h].image,
            responseMsg: s[h].responseMsg
        } : "homeBgImg" === s[h].configType ? r = s[h].image : "fcid" === s[h].configType ? (this.options.fcid = s[h].responseCode, 
        this.options.source = s[h].responseMsg) : "finshResultInfo" === s[h].configType && (n.finshPeopleCount = s[h].finshPeopleCount, 
        n.finshAmount = s[h].finshAmount);
        return {
            ruleImgUrl: t,
            qrcodeImgUrl: o,
            shareInfo: i,
            responseInfoMap: a,
            homeBgImgUrl: r,
            finishResultObj: n
        };
    },
    parsePrizesData: function(e) {
        var s = e.selfInfo;
        this.options.isRiskControl = e.selfInfo.isRiskControl;
        for (var t = e.prizes, o = [], i = 0; i < t.length; i++) {
            var a = {
                pluginCode: t[i].pluginCode,
                showGoUrl: t[i].moreLink,
                showPosition: t[i].showPosition,
                difficulty: t[i].difficulty
            };
            if (i + 1 < parseInt(s.currentLevel, 10)) a.isCheckShow = !0, a.isShareShow = !1, 
            a.isReplayShow = !1, a.isCompleted = !0, a.showPicUrl = t[i].showPicUrl, a.schedule = t[i].difficulty, 
            a.isProcessShow = !0, a.processWidth = this.options.processWidth, a.gameText = "已获得"; else if (i + 1 > parseInt(s.currentLevel, 10)) a.isCheckShow = !1, 
            a.isShareShow = !1, a.isReplayShow = !1, a.isCompleted = !1, a.schedule = 0, a.processWidth = 0, 
            a.isProcessShow = !1, a.showPicUrl = t[i].showPicUrl2, a.gameText = "0/" + t[i].difficulty + "人已领取"; else {
                s.isCompleted || s.schedule === t[i].difficulty ? (a.isCheckShow = !0, a.isShareShow = !1, 
                a.isReplayShow = !1, a.isCompleted = !0, a.gameText = "已获得") : (wx.canIUse && wx.canIUse("button.open-type.share") ? (a.isShareShow = !0, 
                a.isReplayShow = !1) : (a.isShareShow = !1, a.isReplayShow = !0), a.isCheckShow = !1, 
                a.isCompleted = !1, a.gameText = s.schedule + "/" + parseInt(t[i].difficulty, 10) + "人已领取"), 
                0 === s.schedule ? a.isProcessShow = !1 : a.isProcessShow = !0, a.schedule = s.schedule, 
                a.showPicUrl = t[i].showPicUrl;
                var n = this.options.processWidth * (s.schedule / parseInt(t[i].difficulty, 10));
                n > this.options.processWidth && (n = this.options.processWidth), a.processWidth = n;
            }
            o.push(a);
        }
        return o;
    },
    showRuleView: function() {
        this.setData({
            isRuleShow: !0
        }), this.$logE("016000515", {
            name: "show rule"
        });
    },
    hideRuleView: function(e) {
        e.target.dataset.view && "rule" === e.target.dataset.view && this.setData({
            isRuleShow: !1
        });
    },
    ruleViewSwitch: function() {
        this.setData({
            isRuleShow: !1
        });
    },
    hideReplayView: function() {
        this.setData({
            isReplaViewShow: !1
        });
    },
    goRedPocketPage: function(e) {
        void 0 === this.options.isRiskControl || this.options.isRiskControl ? this.$toast.show("就差一点点，奖品与您擦肩而过~") : (this.pushElog("016000516", "check", e.currentTarget.dataset.level), 
        this.$navigate("/pages/hongbao/list/index?levelType=" + e.currentTarget.dataset.level));
    },
    replayRedPocketPage: function(e) {
        this.pushElog("016000518", "share", e.target.dataset.level), this.setData({
            isReplaViewShow: !0
        });
    },
    goShareClick: function(e) {
        this.$logE("016000518", {
            name: "share",
            levelType: parseInt(e.target.dataset.level, 10)
        }, {
            force: !0
        });
    },
    pushElog: function(e, s, t) {
        this.$logE(e, {
            name: s,
            levelType: parseInt(t, 10)
        });
    },
    rpkFormHanddle: function(e) {
        var s = e.detail.formId;
        this.$logForm(s, 1);
    },
    onShareAppMessage: function() {
        var e = "/pages/rcshare/index?shareParam=" + encodeURIComponent(this.options.shareParam);
        return this.options.shareInfo.link.length > 0 && (e = this.options.shareInfo.link.indexOf("?") > 0 ? this.options.shareInfo.link + "&shareParam=" + encodeURIComponent(this.options.shareParam) : this.options.shareInfo.link + "?shareParam=" + encodeURIComponent(this.options.shareParam)), 
        {
            title: this.options.shareInfo.title,
            path: e,
            imageUrl: this.options.shareInfo.image
        };
    }
});
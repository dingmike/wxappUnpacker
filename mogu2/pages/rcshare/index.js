function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../common/m")), n = e(require("../../common/base/createPage")), s = e(require("../../common/service/user")), a = e(require("../../components/toast/index")), o = e(require("../../components/loading/index")), i = e(require("../../components/wall/index_tabNav")), r = e(require("../../common/utils/makeup")), h = e(require("../../components/salesEntry/index")), c = t.default.MWP;

exports.default = (0, n.default)({
    components: {
        wall: i.default,
        toast: a.default,
        loading: o.default,
        salesEntry: h.default
    },
    data: {
        isLogin: !0,
        name: "群红包分享",
        task: null,
        bgHeight: 0,
        bgShareHeight: 0,
        bgTopMarginTop: 0,
        isShareShow: !1,
        isResultShow: !1,
        userInfo: {},
        bannerInfo: {},
        isOpenSuccess: !0,
        isCouponShow: !1,
        isCashShow: !1,
        isRedPocketShow: !1,
        isBannerShow: !0,
        userInfoList: [],
        isUserListEmpty: !0,
        isSelf: !1,
        stateImgUrl: "",
        couponInfo: {},
        cashInfo: {},
        redPocketInfo: {},
        showGameMask: !1,
        gameImgCls: "",
        gameImgUrl: "",
        showWall: !1,
        topBgColor: "",
        $salesEntry: {
            preMakeupKey: "shareEntry_",
            collectFormId: !0,
            padding: 0,
            ptpC: "mod_rcshare_shareEntry"
        },
        bmBannerInfo: {},
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
    options: {
        fcid: "",
        source: "pangi",
        shareParam: "",
        bannerInfo: {},
        userInfoList: [],
        bmBannerInfo: {}
    },
    onLoad: function(e) {
        this.options.shareParam = e.shareParam;
        var t = wx.getSystemInfoSync();
        this.setData({
            bgHeight: 2 * t.screenHeight,
            bgShareHeight: 2 * t.screenHeight - 2 * (t.screenHeight - t.windowHeight),
            bgTopMarginTop: 2 * -(t.screenHeight - t.windowHeight)
        }), this.loginInit();
    },
    onReady: function() {
        this.__makeup__ = new r.default(this, "85120");
    },
    onHide: function() {
        clearTimeout(this.task), this.task = null;
    },
    onUnload: function() {
        clearTimeout(this.task), this.task = null;
    },
    onReachBottom: function() {
        this.$wall.wallScrollEvent();
    },
    fetchGameResultData: function() {
        var e = this;
        this.$loading.show(), c.request("mwp.aston.groupRpShareInfo", "1.0", {
            shareParam: decodeURIComponent(this.options.shareParam)
        }).then(function(t) {
            e.$loading.hide(), e.initMainContent(t);
        }).catch(function(t) {
            e.$toast.show(t.toString());
        });
    },
    loginInit: function() {
        var e = this;
        s.default.ensure().then(function() {
            e.setData({
                isLogin: !0
            }), e.fetchGameResultData();
        }, function() {
            e.setData({
                isLogin: !1
            });
        });
    },
    loginClick: function() {
        this.loginInit();
    },
    initMainContent: function(e) {
        var t = this.parseSharePageData(e);
        this.options.bannerInfo = t.bannerInfo, this.options.userInfoList = t.userList;
        var n = t.returnCode;
        switch (n) {
          case 1001:
            this.newUserEnter(t);
            break;

          case 4021:
            this.notGetRedPocketBySelf(t, t.userList);
            break;

          case 4022:
            this.redPocketFinsh(t, t.userList);
            break;

          case 4023:
            this.redPocketAlready(t, t.userList);
            break;

          case 4025:
            this.redPocketSysError(t, t.userList);
            break;

          case 4028:
            this.newUserEnter(t);
            break;

          case 4030:
            this.redPocketManyPeople(t, t.userList);
            break;

          default:
            this.redPocketSysError(t, t.userList);
        }
        this.showWallContainer(n);
    },
    showWallContainer: function(e) {
        var t = !1;
        switch (e) {
          case 4021:
          case 4022:
          case 4023:
          case 1002:
          case 4025:
          case 4024:
          case 4026:
          case 4030:
            t = !0;
        }
        t && (this.setData({
            showWall: !0
        }), "mait" === this.options.source ? (this.$wall.setDataSource({
            source: "mwp_mait"
        }), this.wallParams = {
            pid: this.options.fcid
        }) : this.wallParams = {
            fcid: this.options.fcid,
            cKey: "xcx-guess"
        }, this.$wall.initWall(this.wallParams));
    },
    parseSharePageData: function(e) {
        for (var t = e.data.returnCode, n = e.data.data.userList || [], s = e.data.data.prizeInfo || {}, a = {
            shareUserImg: e.data.data.shareUserImg || "",
            shareUserName: e.data.data.shareUserName || ""
        }, o = {
            height: 213,
            link: "",
            imageUrl: "https://s10.mogucdn.com/mlcdn/c45406/171227_4ac50ged51l4e59h46g937dfa4598_750x194.png"
        }, i = {
            left: "https://s10.mogucdn.com/mlcdn/c45406/171103_5e4c4j81a1dl6gk62fi4kg5lae87l_350x136.png",
            leftHeight: 136,
            right: "https://s10.mogucdn.com/mlcdn/c45406/171103_220ahge97b56bcj5djafbfg26ai18_350x136.png",
            rightHeight: 136,
            pop: ""
        }, r = e.data.data.gameInfo, h = {}, c = 0; c < r.length; c++) "responseInfo" === r[c].configType ? 1002 === parseInt(r[c].responseCode, 10) ? h[r[c].responseCode + "_" + r[c].title] = {
            link: r[c].link,
            image: r[c].image,
            title: r[c].title,
            responseMsg: r[c].responseMsg
        } : h[r[c].responseCode] = {
            link: r[c].link,
            image: r[c].image,
            title: r[c].title,
            responseMsg: r[c].responseMsg
        } : "guideMiniprogram" === r[c].configType ? (o.link = r[c].link, o.imageUrl = r[c].image, 
        o.height = r[c].shareContent || 213) : "fcid" === r[c].configType ? (this.options.fcid = r[c].responseCode, 
        this.options.source = r[c].responseMsg) : "shareMinLeftBotton" === r[c].configType ? (i.left = r[c].image, 
        i.leftHeight = r[c].shareContent, this.options.bmBannerInfo.leftLink = r[c].link) : "shareMinRightBotton" === r[c].configType ? (i.right = r[c].image, 
        i.rightHeight = r[c].shareContent, this.options.bmBannerInfo.rightLink = r[c].link) : "minPopBtn" === r[c].configType && (i.pop = r[c].image);
        return {
            returnCode: t,
            userList: n,
            bannerInfo: o,
            userInfo: a,
            prizeInfo: s,
            responseInfoMap: h,
            bmBannerInfo: i
        };
    },
    newUserEnter: function(e) {
        4028 === parseInt(e.returnCode, 10) && this.redPocketGameOver(e);
        var t = {
            nickName: e.userInfo.shareUserName ? e.userInfo.shareUserName : "",
            avator: e.userInfo.shareUserImg ? e.userInfo.shareUserImg : ""
        };
        this.setData({
            isShareShow: !0,
            isResultShow: !1,
            userInfo: t
        });
    },
    notGetRedPocketBySelf: function(e, t) {
        this.$logE("016000187", {
            name: "self",
            state: 5
        });
        var n = !0;
        t.length > 0 && (n = !1), this.setData({
            isSelf: !0,
            isShareShow: !1,
            isResultShow: !0,
            isBannerShow: !1,
            userInfoList: t,
            isUserListEmpty: n,
            bmBannerInfo: e.bmBannerInfo,
            stateImgUrl: e.responseInfoMap[e.returnCode].image
        });
    },
    redPocketFinsh: function(e, t) {
        this.$logE("016000187", {
            name: "finsh",
            state: 4
        });
        var n = !0;
        t.length > 0 && (n = !1), this.setData({
            isShareShow: !1,
            isResultShow: !0,
            userInfoList: t,
            isUserListEmpty: n,
            bannerInfo: this.options.bannerInfo,
            bmBannerInfo: e.bmBannerInfo,
            stateImgUrl: e.responseInfoMap[e.returnCode].image
        });
    },
    redPocketManyPeople: function(e, t) {
        var n = !0;
        t.length > 0 && (n = !1), this.setData({
            isShareShow: !1,
            isResultShow: !0,
            isBannerShow: !1,
            userInfoList: t,
            isUserListEmpty: n,
            bannerInfo: this.options.bannerInfo,
            bmBannerInfo: e.bmBannerInfo,
            stateImgUrl: e.responseInfoMap[e.returnCode].image
        });
    },
    redPocketAlready: function(e, t) {
        this.$logE("016000187", {
            name: "already",
            state: 1
        }), this.redPocketResult(e, t);
    },
    redPocketSysError: function(e, t) {
        this.$logE("016000187", {
            name: "error",
            state: 3
        });
        var n = !0;
        t.length > 0 && (n = !1), this.setData({
            isShareShow: !1,
            isResultShow: !0,
            userInfoList: t,
            isUserListEmpty: n,
            bannerInfo: this.options.bannerInfo,
            bmBannerInfo: e.bmBannerInfo,
            stateImgUrl: e.responseInfoMap[e.returnCode].image
        });
    },
    goRpkHomePage: function() {
        this.$navigate("/pages/rchome/index");
    },
    goRpkHomePageByBanner: function(e) {
        var t = "/pages/rchome/index";
        e.currentTarget.dataset.link.length > 0 && (t = e.currentTarget.dataset.link), this.$navigate(t);
    },
    openRedPacket: function() {
        var e = this;
        this.$logE("016000564", {
            name: "open"
        }), this.$loading.show(), c.request("mwp.aston.groupRpSharelottery", "1.0", {
            shareParam: decodeURIComponent(this.options.shareParam)
        }).then(function(t) {
            e.$loading.hide(), 4029 !== parseInt(t.data.returnCode, 10) ? (e.$logE("016000187", {
                name: "open success",
                state: 1
            }), e.initGameResultContent(t)) : e.$toast.show("亲，您的操作过于频繁啦~");
        }).catch(function(t) {
            e.$toast.show(t.toString());
        });
    },
    initGameResultContent: function(e) {
        var t = this.parseSharePageData(e), n = t.returnCode, s = t.userList;
        switch (n) {
          case 1002:
            this.redPocketResult(t, s);
            break;

          case 4021:
            this.notGetRedPocketBySelf(t, s);
            break;

          case 4022:
            this.redPocketFinsh(t, s);
            break;

          case 4023:
            this.redPocketAlready(t, s);
            break;

          case 4024:
            this.redPocketBrushPast(t, s);
            break;

          case 4026:
            this.redPocketLimit(t, s);
            break;

          case 4025:
            this.redPocketSysError(t, s);
            break;

          case 4028:
            this.redPocketGameOver(t);
            break;

          case 4030:
            this.redPocketManyPeople(t, s);
            break;

          default:
            this.redPocketSysError(t, s);
        }
        this.showWallContainer(n);
    },
    redPocketGameOver: function(e) {
        var t = this;
        this.setData({
            showGameMask: !0,
            gameImgCls: "game-end-mask",
            gameImgUrl: e.responseInfoMap[4028].image
        }), this.task = setTimeout(function() {
            t.$navigate("/pages/home/index");
        }, 2e3);
    },
    redPocketBrushPast: function(e, t) {
        this.$logE("016000187", {
            name: "safe",
            state: 3
        });
        var n = !0;
        t.length > 0 && (n = !1), this.setData({
            isShareShow: !1,
            isResultShow: !0,
            userInfoList: t,
            isUserListEmpty: n,
            bannerInfo: this.options.bannerInfo,
            bmBannerInfo: e.bmBannerInfo,
            stateImgUrl: e.responseInfoMap[e.returnCode].image
        });
    },
    redPocketLimit: function(e, t) {
        this.$logE("016000187", {
            name: "limit",
            state: 2
        });
        var n = !0;
        t.length > 0 && (n = !1), this.setData({
            isShareShow: !1,
            isResultShow: !0,
            userInfoList: t,
            isUserListEmpty: n,
            bannerInfo: this.options.bannerInfo,
            bmBannerInfo: e.bmBannerInfo,
            stateImgUrl: e.responseInfoMap[e.returnCode].image
        });
    },
    redPocketResult: function(e, t) {
        var n = !1, s = !1, a = !1, o = !0;
        t.length > 0 && (o = !1);
        var i = e.prizeInfo, r = e.responseInfoMap["1002_" + i.type];
        if ("payPackage" === i.type) {
            a = !0;
            var h = {
                title: i.title,
                subTitle: i.subTitle,
                payPackageMoney: i.payPackageMoney,
                payPackageId: i.payPackageId,
                jumpUrl: r.link,
                image: r.image
            };
            this.setData({
                redPocketInfo: h
            });
        } else if ("platformCoupon" === i.type) {
            s = !0;
            var c = {
                title: i.title,
                subTitle: i.subTitle,
                limitPrice: i.limitPrice,
                cutPrice: i.cutPrice,
                couponId: i.couponId,
                jumpUrl: r.link,
                image: r.image
            };
            this.setData({
                cashInfo: c
            });
        } else {
            n = !0;
            var l = {
                title: i.title,
                subTitle: i.subTitle,
                shopName: i.shopName,
                limitPrice: i.limitPrice,
                cutPrice: i.cutPrice,
                couponId: i.couponId,
                jumpUrl: r.link,
                image: r.image
            };
            this.setData({
                couponInfo: l
            });
        }
        this.setData({
            isShareShow: !1,
            isResultShow: !0,
            isOpenSuccess: !1,
            isCouponShow: n,
            isCashShow: s,
            isRedPocketShow: a,
            userInfoList: t,
            isUserListEmpty: o,
            bannerInfo: this.options.bannerInfo,
            bmBannerInfo: e.bmBannerInfo
        });
    },
    goRedPocketInfoPage: function() {
        this.$navigate("/pages/hongbao/list/index");
    },
    goCashInfoPage: function(e) {
        var t = "/pages/coupon/index?type=platform";
        e.currentTarget.dataset.jumpurl.length > 0 && (t = e.currentTarget.dataset.jumpurl), 
        this.$navigate(t);
    },
    goCouponInfoPage: function(e) {
        var t = "/pages/coupon/index?type=shop";
        e.currentTarget.dataset.jumpurl.length > 0 && (t = e.currentTarget.dataset.jumpurl), 
        this.$navigate(t);
    },
    rpkFormHanddle: function(e) {
        var t = e.detail.formId;
        this.$logForm(t, 1);
    },
    backToRpkHome: function() {
        var e = this.options.bmBannerInfo.leftLink;
        this.$navigate(e);
    },
    backToActHome: function() {
        var e = this.options.bmBannerInfo.rightLink;
        this.$navigate(e);
    }
});
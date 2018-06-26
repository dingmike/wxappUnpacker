function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function i(t) {
    if (Array.isArray(t)) {
        for (var i = 0, a = Array(t.length); i < t.length; i++) a[i] = t[i];
        return a;
    }
    return Array.from(t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = t(require("../../common/m")), s = t(require("../../common/base/createPage")), e = t(require("../../common/utils/houston")), o = t(require("components/searchHead/index")), h = t(require("components/scrollTab/index")), r = t(require("components/history/index")), n = t(require("components/hotwords/index")), d = t(require("components/tips/index")), p = t(require("components/shopTips/index")), u = a.default.MWP;

exports.default = (0, s.default)({
    components: {
        searchHead: o.default,
        scrollTab: h.default,
        history: r.default,
        hotwords: n.default,
        tips: d.default,
        shopHistory: r.default,
        shopHotwords: n.default,
        shopTips: p.default
    },
    data: {
        $searchHead: {},
        $scrollTab: {},
        $history: {},
        $hotwords: {
            ptpC: "mod_searchMiddle_searchBoxHot"
        },
        $tips: {},
        $shopHistory: {},
        $shopHotwords: {},
        $shopTips: {},
        isShop: !1,
        windowHeight: 1e3
    },
    onLoad: function(t) {
        this.pageOptions = t, this.platform = "XCX", this.isFirstTime = !0, this.isShop = this.data.isShop, 
        this.tabNavData = [ {
            navTitle: "商品",
            navTag: "commodity"
        }, {
            navTitle: "店铺",
            navTag: "shop"
        } ], this.sbDataMap = {
            commodity: {
                storageKey: "_wx_mgj_header_history",
                hotwordCode: "hotWord",
                hotComponent: this.$hotwords,
                hotLength: 10,
                hisComponent: this.$history
            },
            shop: {
                storageKey: "_wx_mgj_header_shop_history",
                hotwordCode: "hotShop",
                hotComponent: this.$shopHotwords,
                hotLength: 12,
                hisComponent: this.$shopHistory
            }
        }, this.$shopHotwords.setData({
            title: "热门推荐"
        }), this.activeTabData = this.sbDataMap[this.tabNavData[0].navTag], this.queryWord = "", 
        this.inputWord = "", this.placeholder = "", this.baseWordAcm = "", this.acm = "", 
        this.fetchPlatform(), this.setScreenHeight(), this.initSearchMiddle();
    },
    onReachBottom: function() {
        this.data.isShop && this.$shopTips.fetchAjaxData(this.inputWord);
    },
    onPageScroll: function() {
        this.data.isShop && this.inputWord && (this.shopSearchLog(1), this.$shopHistory.addOne(this.inputWord));
    },
    fetchPlatform: function() {
        var t = this;
        e.default.getConfig({
            groupName: "searchbar",
            key: "platform",
            defaultValue: "XCX"
        }).then(function(i) {
            t.platform = i;
        }).catch(function() {});
    },
    setScreenHeight: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(i) {
                var a = i.windowHeight;
                t.setData({
                    windowHeight: a
                }), t.$tips.setData({
                    windowHeight: a
                }), t.$shopTips.setData({
                    windowHeight: a
                });
            }
        });
    },
    initSearchMiddle: function() {
        var t = this.pageOptions;
        t.acm && (this.baseWordAcm = t.acm);
        var i = this.$searchHead.initSearchHead(t), a = i.placeholder, s = i.queryWord, e = i.inputWord;
        this.placeholder = a, this.queryWord = s, this.inputWord = e, this.$searchHead.monitorShowPhoto(), 
        this.$scrollTab.initTab(this.tabNavData), this.getHistoryList(), this.getHotwordsData();
    },
    getHistoryList: function() {
        this.activeTabData.hisComponent.getStorageList(this.activeTabData.storageKey, this.data.isShop);
    },
    getHotwordsData: function() {
        var t = this, i = this.activeTabData.hotwordCode;
        this.isFirstTime && (i = "hotWord,image"), u.request("mwp.pagani.moduleFacade", "1", {
            code: i,
            platform: this.platform
        }).then(function(i) {
            t.isFirstTime = !1;
            var a = t.activeTabData.hotLength;
            t.activeTabData.hotComponent.resolveHotwordsData(i, t.isShop, a);
        });
    },
    getTipsData: function(t) {
        this.isShop ? this.handleShopTipsData(t) : this.handleTipsData(t);
    },
    handleTipsData: function(t) {
        var i = this, a = {};
        u.request("mwp.pagani.moduleFacade", "1", {
            code: "tips",
            keyWord: t,
            platform: this.platform
        }).then(function(s) {
            t ? (a = s.ret == u.Code.Success && s.data.tips.data && s.data.tips.data.length > 0 ? s.data.tips.data || {} : [ {
                tipType: 1,
                acm: "3.ms.0_0_0.0.0.0.0",
                query: t
            } ], i.$tips.setTipsData(a, t), i.addLog(a)) : i.$tips.setTipsData({}, t);
        });
    },
    handleShopTipsData: function(t) {
        var a = this, s = this.$shopTips.data, e = s.shopTipsData || [], o = [], h = s.pageNum;
        u.request("mwp.pagani.search", "12", {
            cKey: "xcx-shop",
            shopName: t,
            page: h,
            platform: this.platform
        }).then(function(s) {
            s.ret == u.Code.Success && s.data && s.data.list && (s.data.list.length > 0 ? (o = h > 1 ? [].concat(i(e), i(s.data.list)) : s.data.list, 
            a.addShopTipLog(s.data.list)) : h > 1 ? o = e : a.$shopTips.setData({
                isEmpty: !0
            }), a.$shopTips.setTipsData(o, t));
        });
    },
    clearInputValue: function() {
        this.inputWord = "", this.$searchHead.setData({
            inputWord: "",
            isShowClearButton: !1
        }), this.data.isShop && this.getHistoryList(), this.resetTips();
    },
    resetTips: function() {
        this.$shopTips.setTipsData([], !1), this.$tips.setTipsData([], !1);
    },
    handleChangeTab: function(t) {
        var i = this.tabNavData[t].navTag;
        this.activeTabData = this.sbDataMap[i], this.setData({
            isShop: "shop" === i
        }), this.isShop = this.data.isShop, this.$logE("000000501", {
            tabName: this.tabNavData[t].navTitle
        }), this.getHistoryList(), this.getHotwordsData(), this.inputWord ? this.getTipsData(this.inputWord) : this.resetTips();
    },
    bindKeyInput: function(t) {
        this.inputWord = t.detail.value, this.isShop && (this.$shopTips.changePageNum(1), 
        this.$shopTips.setTipsData([], this.inputWord), this.$shopTips.setData({
            isEmpty: !1
        })), this.getTipsData(this.inputWord), this.$searchHead.isShowClearButton(this.inputWord);
    },
    searchFun: function(t) {
        this.data.isShop ? this.inputWord && (this.shopSearchLog(3), this.$shopHistory.addOne(this.inputWord)) : (this.inputWord ? this.queryWord = this.inputWord : (this.queryWord = this.queryWord, 
        this.acm = this.baseWordAcm), this.tapHandler(t));
    },
    bindHisNavigate: function(t) {
        this.data.isShop ? this.bindHisShopTapNavigate(t) : this.bindTapNavigate(t);
    },
    bindHotNavigate: function(t) {
        this.data.isShop ? this.bindHotShopTapNavigate(t) : this.bindTapNavigate(t);
    },
    bindTipNavigate: function(t) {
        this.data.isShop ? this.bindShopTipsNavigate(t) : this.bindTipsNavigate(t);
    },
    bindTapNavigate: function(t) {
        var i = t.currentTarget.dataset;
        this.queryWord = i.queryword ? i.queryword : "", this.acm = i.acm ? i.acm : "", 
        this.tapHandler(t);
    },
    bindTipsNavigate: function(t) {
        var i = t.currentTarget.dataset;
        this.queryWord = i.queryword ? i.queryword : "", this.q = i.q ? i.q : "", this.acm = i.acm ? i.acm : "", 
        this.index = i.index > -1 ? i.index : "", this.tip = i.tip ? i.tip : "", this.$logE("000666666", {
            acm: this.acm,
            index: this.index,
            title: this.q,
            q: this.inputWord,
            tip: this.tip
        }), this.tapHandler(t);
    },
    tapHandler: function(t) {
        var i = t.currentTarget.dataset;
        if (this.queryWord.indexOf("<code>") > -1) {
            var a = this.queryWord.substring(6);
            this.$navigate(a, {}), this.$history.addOne(this.queryWord);
        } else {
            var s = "/pages/wallSearch/index";
            i.link && "undefined" !== i.link && (s = i.link), i.q = this.queryWord, this.acm && (i.acm = this.acm), 
            i.fromPage = this.pageOptions.fromPage || "", this.$redirect(s, i), this.$history.addOne(this.queryWord);
        }
    },
    bindHisShopTapNavigate: function(t) {
        var i = t.currentTarget.dataset;
        this.inputWord = i.queryword, this.$searchHead.setPlaceHolder(this.placeholder, this.inputWord), 
        this.getTipsData(this.inputWord), this.$searchHead.isShowClearButton(this.inputWord), 
        this.$shopHistory.addOne(this.queryWord);
    },
    bindHotShopTapNavigate: function(t) {
        this.shoptapHandler(t);
    },
    bindShopTipsNavigate: function(t) {
        var i = t.currentTarget.dataset;
        this.queryWord = i.queryword ? i.queryword : "", this.shopSearchLog(2), this.shoptapHandler(t), 
        this.$shopHistory.addOne(this.queryWord);
    },
    shoptapHandler: function(t) {
        var i = t.currentTarget.dataset, a = i.link;
        i.q = this.inputWord, this.$redirect(a, i);
    },
    submitForm: function(t) {
        var i = t.detail.formId;
        this.$logForm(i, 1);
    },
    shopSearchLog: function(t) {
        this.$logE("000000502", {
            q: this.inputWord,
            sceneId: t
        });
    },
    addShopTipLog: function(t) {
        for (var i = [], a = 0; a < t.length; a++) i[a] = t[a].shopId;
        this.$logE("016000279", {
            shopIds: i,
            q: this.inputWord
        });
    },
    addLog: function(t) {
        for (var i = Math.min(t.length, 10), a = {
            acm: [],
            index: [],
            tags: [],
            query: []
        }, s = 0; s < i; s++) {
            var e = t[s];
            a.acm.push(e.acm || ""), a.index.push(s), a.query.push(e.query);
            for (var o = e.tags || [], h = [], r = 0; r < o.length; r++) h.push(o[r].tag);
            a.tags.push(h);
        }
        this.$logE("000000120", a);
    }
});
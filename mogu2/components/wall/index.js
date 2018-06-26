function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = a(require("../../common/m")), t = a(require("../../common/utils/imgUrlTool")), s = a(require("../../common/utils/debug")), o = a(require("../../components/imcall/index")), i = e.default.MWP, r = e.default.MCE, n = e.default.fn.sendMsg;

exports.default = {
    components: {
        imcall: o.default
    },
    initComSetting: function() {
        Object.assign(this, {
            defDataSource: {
                source: "pagani",
                api: "mwp.pagani.search",
                ver: "11"
            },
            defaultParams: {
                cKey: "xcx-cate",
                fcid: "",
                page: 1,
                sort: "pop",
                mwpVersion: 11,
                isGoBackup: !0
            },
            defaulteExtFields: {},
            wallParams: {},
            isLoading: !0,
            isAjaxEnd: !1,
            ajaxData: {},
            endContent: !1,
            emptyClick: 0,
            itemPackage: null,
            itemPackageList: null,
            itemPackageNum: 0,
            itemInsertNum: 0,
            itemPackageNumMax: 24,
            itemPackageNumMin: 20,
            itemPackageListMaxLen: 29,
            scrollLogData: [],
            scrollLogedFlag: {},
            itemIndex: 0,
            ajaxErrorNum: 0,
            itemIds: null,
            itemTotalNum: 0,
            timeFlag: 0,
            logSetTimeFlag: 0,
            scrollIndTime: 200,
            urlParamNames: !1,
            itemImgWidth: 350,
            itemImgRatio: "3:4",
            isAndroidPlat: !1,
            imShopIds: [],
            navData: {},
            firstBackNavFlag: !1,
            scrollIntoViewId: !1,
            scrollNavRpxTop: !1,
            scrollNavPxTop: !1,
            scrollNavFixedClass: "",
            scrollNavStickyClass: "",
            showImType: 0,
            cparamTask: null,
            cparamFinsh: !1,
            cparamReplayCount: 0,
            useCache: !0,
            maxItemCount: 0,
            maxItemPage: 0,
            notItemCount: 0,
            exposeExtInfo: null,
            searchNoResultFlag: !1,
            searchLessResultFlag: !1,
            searchResultInfo: {}
        });
    },
    data: function() {
        return {
            itemPackageList: [],
            scrollBoxHeight: wx.getSystemInfoSync().windowHeight,
            bottomHeight: 1500
        };
    },
    methods: {
        _now: Date.now || function() {
            return new Date().getTime();
        },
        initWallNav: function() {},
        firstBackNavInit: function() {},
        scrollNavEvent: function() {
            this.isSupportSelector && this.getInViewItems();
        },
        setDataSource: function(a) {
            this.userDataSource = a;
        },
        setWallItemField: function(a) {
            this.extFields = a;
        },
        initWall: function(a) {
            var e = this;
            e.initComSetting(), e.isSupportSelector = wx.canIUse && wx.canIUse("createSelectorQuery"), 
            a.maxItemCount > 0 && (a.maxItemCount <= 8 ? e.maxItemCount = 8 : e.maxItemCount = a.maxItemCount), 
            a.maxItemPage > 0 && (e.maxItemPage = a.maxItemPage), e.wallParams = Object.assign({}, e.defaultParams, a), 
            a.pageSize ? a.pageSize <= e.itemPackageNumMin && (e.wallParams.pageSize = e.itemPackageNumMin) : e.wallParams.pageSize = e.itemPackageNumMax, 
            !1 === e.wallParams.useCache && (e.useCache = e.wallParams.useCache), e.userDataSource = Object.assign({}, e.defDataSource, e.userDataSource), 
            a.version && (e.wallParams.mwpVersion = a.version, e.userDataSource.ver = a.version), 
            e.extFields = Object.assign({}, e.defaulteExtFields, e.extFields), e.sysInfo = wx.getSystemInfoSync(), 
            e.isAndroidPlat = "android" === e.sysInfo.platform || "devtools" === e.sysInfo.platform, 
            e.initWallNav(), e.resetWallParams(), e.pushData(), e.isAllowAjax();
        },
        isAllowAjax: function() {
            var a = this;
            a.isAjaxEnd || a.isLoading || (a.timeFlag = a._now(), a.getGoodsAjax());
        },
        getGoodsAjax: function() {
            var a = this;
            a.isLoading = !0;
            var e = Object.assign({}, a.wallParams), t = [];
            for (var o in e) t.push(e[o]);
            var n = t.join("_");
            if (a.useCache && a.ajaxData[n]) {
                a.isLoading = !1;
                var l = a.ajaxData[n];
                l.isOldAjax = !0, a.setBackParams(l), a.loadCallBack(l), a.pushResultData(l);
            } else {
                var c = e.cKey;
                if ("mwp_mait" === a.userDataSource.source) r.get(e, !1 === a.userDataSource.goCdn).then(function(t) {
                    var s = t;
                    s.cKey = c, s.dataKey = n, s.wallParams = e, a.handleAjaxResData(s), a.isLoading = !1;
                }).catch(function(t) {
                    a.isLoading = !1;
                    var s = Object.assign({}, e, {
                        cKey: c,
                        api: "mwp.darwin.get",
                        ver: "3",
                        err: t
                    });
                    a.pushMaitErrorLog("麦田请求返回数据失败", s), console.log("mwp回调出错"), console.log(t);
                }); else {
                    var m = "pagani" === a.userDataSource.source, p = {};
                    if (m) {
                        var u = s.default.read().wallDebugIP;
                        u && u.length > 0 ? p.headers = {
                            "mw-debug": u,
                            "mw-ckey": e.cKey
                        } : p.headers = {
                            "mw-ckey": e.cKey
                        };
                    }
                    i.request(a.userDataSource.api, a.userDataSource.ver, e, p).then(i.filterResult).then(function(t) {
                        if (t.ret = "SUCCESS", t.ret) {
                            var s = t;
                            s.cKey = c, s.dataKey = n, s.wallParams = e, s.searchRewrite && (a.wallParams.lastq = s.searchRewrite.keyword, 
                            s.searchRewrite.rewriteResult && (s.wallParams.q = s.searchRewrite.rewriteKeyword, 
                            a.wallParams.q = s.searchRewrite.rewriteKeyword), a.initSearchLessResultContainer(s.searchRewrite)), 
                            a.handleAjaxResData(s);
                        }
                        a.isLoading = !1;
                    }).catch(function(t) {
                        if (console.log("mwp回调出错"), e.isGoBackup) {
                            var s = a.userDataSource.source + "请求返回数据失败", o = "";
                            m && (o = "https://backup.mogucdn.com/list/" + a.getWallParamsMD5(e));
                            var i = Object.assign({}, e, {
                                cKey: c,
                                api: a.userDataSource.api,
                                ver: a.userDataSource.ver,
                                err: t,
                                backupurl: o
                            });
                            if (a.pushCDNElog(e, o), a.pushErrorLog(s, i) && m && e.page <= 10) {
                                console.log("图墙进入cdn容灾");
                                var r = {};
                                r.cKey = c, r.dataKey = n, r.wallParams = e, r.backupurl = o, a.getWallBack(r);
                            } else console.log(t), a.isLoading = !1;
                        } else a.resetWallParams(), a.endContent = "empty", a.pushData(), a.$broadcast("notGoBackup");
                    });
                }
            }
        },
        initSearchLessResultContainer: function(a) {
            this.searchNoResultFlag = a.rewriteResult, this.searchLessResultFlag = !a.rewriteResult && a.recommed && a.recommed.length > 0, 
            this.searchResultInfo = a, this.exposeSearchResultDataInfo(), this.exposeSearchKeywordDataInfo();
        },
        exposeSearchResultDataInfo: function() {
            var a = 0;
            this.searchLessResultFlag && (a = 1), this.$root.$logE("000000228", {
                type: a
            });
        },
        exposeSearchKeywordDataInfo: function() {
            var a = [];
            a.push(this.searchResultInfo.acm), this.$root.$logE("0x00000000", {
                acms: a
            });
        },
        searchKeyClick: function(a) {
            var e = a.currentTarget.dataset, t = "noResult";
            this.searchLessResultFlag && (t = "lessResult"), this.$root.$redirect("/pages/wallSearch/index", {
                type: t,
                acm: e.acm,
                q: e.keyword
            });
        },
        pushCDNElog: function(a, e) {
            this.$root.$logE("000051802", {
                name: "mwp cdn point",
                recovery_url: e,
                mwp_api: this.userDataSource.api,
                mwp_version: this.userDataSource.ver,
                mwp_parameter: {
                    cKey: a.cKey,
                    page: a.page,
                    fcid: a.fcid
                }
            });
        },
        pushMaitErrorLog: function(a, e) {
            var t = this, s = Object.assign(e, {
                _author: "huaishuo,yanqi,qiyun",
                threshold: 80
            });
            return n(new Error(a), s), t.ajaxErrorNum++, !(t.ajaxErrorNum > 2) || (t.endContent = "end", 
            t.scrollEnd(), !1);
        },
        pushErrorLog: function(a, e) {
            var t = this, s = Object.assign(e, {
                _author: "huaishuo,yanqi,changgong,qiaoyu,shunfeng",
                threshold: 80
            });
            return n(new Error(a), s), t.ajaxErrorNum++, !(t.ajaxErrorNum > 2) || (t.endContent = "end", 
            t.scrollEnd(), !1);
        },
        getWallBack: function(a) {
            var t = this;
            e.default.requestManager.sendRequest({
                url: a.backupurl,
                data: {},
                header: {
                    "content-type": "application/json"
                },
                success: function(e) {
                    var s = e.data.data;
                    s && s.param ? (s.cKey = a.cKey, s.dataKey = a.dataKey, s.wallParams = a.wallParams, 
                    t.updateParams(s.param._mgjuuid, s, function(a) {
                        t.cparamFinsh ? t.cparamFinsh = !1 : (t.cparamFinsh = !0, t.cparamReplayCount = 0, 
                        t.handleAjaxResData(a), t.isLoading = !1);
                    }), t.cparamTask = setInterval(function() {
                        t.cparamFinsh && (t.isLoading = !1, t.cparamFinsh = !1, t.cparamReplayCount = 0, 
                        clearInterval(t.cparamTask)), t.cparamReplayCount >= 100 && (console.log("mwp更新cparam参数超时"), 
                        t.isLoading = !1, t.cparamFinsh = !0, t.cparamReplayCount = 0, clearInterval(t.cparamTask), 
                        t.handleAjaxResData(s)), t.cparamReplayCount++;
                    }, 20)) : t.isLoading = !1;
                },
                fail: function() {
                    console.log("容灾也请求失败，没救了"), t.isLoading = !1;
                },
                complete: function(a) {
                    404 === a.statusCode && (t.isLoading = !1, t.cparamFinsh = !1, t.cparamReplayCount = 0, 
                    clearInterval(t.cparamTask), t.isAllowAjax());
                }
            });
        },
        updateParams: function(a, e, t) {
            console.log("调用mwp参数cparams回调");
            for (var s = this, o = {}, r = {}, n = e.wall.docs, l = 0; l < n.length; l++) {
                var c = n[l].cparam;
                if (c) {
                    var m = n[l].tradeItemId;
                    o[m] || (r[m] = n[l], o[m] = c);
                }
            }
            Object.keys(o).length > 0 ? i.request("mwp.admwp.updateCParam", 1, {
                uuid: a,
                fakecparams: o
            }).then(i.filterResult).then(function(a) {
                e.wall.docs = s.parseParamsData(a, r, e), t(e);
            }).catch(function() {
                console.log("mwp获取cparams回调出错"), t(e);
            }) : (console.log("mwp获取cparams回调为空"), t(e));
        },
        parseParamsData: function(a, e, t) {
            var s = t.wall.docs;
            for (var o in e) e[o].cparam = a[o], e[o].link = this.parseParamsItemLink(e[o].link, a[o]);
            for (var i = [], r = 0; r < s.length; r++) e[s[r].tradeItemId] ? i.push(e[s[r].tradeItemId]) : i.push(s[r]);
            return i;
        },
        parseParamsItemLink: function(a, e) {
            var t = a;
            if (-1 !== a.indexOf("?")) {
                for (var s = a.split("?"), o = [], i = s[1].split("&"), r = 0; r < i.length; r++) if (-1 !== i[r].indexOf("cparam")) {
                    var n = "cparam=" + e;
                    o.push(n);
                } else o.push(i[r]);
                s[1] = o.join("&"), t = s.join("?");
            }
            return t;
        },
        getWallParamsMD5: function(a) {
            for (var t = [ "cKey", "fcid", "q", "pid", "shopId", "uname", "shopname", "promotionId", "page", "mwpVersion" ], s = "", o = 0; o < t.length; o++) {
                var i = a[t[o]];
                "q" === t[o] && i && (i = decodeURI(i)), s += (void 0 === i ? "" : i) + "-";
            }
            var r = e.default.fn.md5(s);
            return console.log("本次容灾请求的cdnKey为", s), console.log("本次容灾请求的md5Key为", r), r;
        },
        handOtherItem: function(a) {
            return a;
        },
        handMaitItem: function(a, e) {
            var s = this;
            if (!a.modelType || "sapp_feeds_qiang" !== a.modelType && "sapp_feeds_banner" !== a.modelType && "sapp_feeds_brand" !== a.modelType || s.notItemCount++, 
            a.activityDesc && a.activityDesc.length > 0 && (a.showPromotionDesc = !0, a.activityDesc.length > 5 ? a.promotionInfo = a.activityDesc.substr(0, 5) + "..." : a.promotionInfo = a.activityDesc), 
            e.wallParams && e.wallParams.bType && (a.busType = "dm1_" + e.wallParams.bType), 
            a.imgOrg = a.image, a.img = t.default.getGoodsRatioSuffix(a.image, s.itemImgWidth, s.itemImgRatio), 
            a.link = a.item_xcx_url || a.item_url || a.link, a.orgPrice = a.price, a.price = a.discountPrice, 
            a.sale = a.itemSale, a.botRight = a.itemLikes, a.itemLikes || 0 === a.itemLikes) {
                var o = a.itemLikes;
                o > 1e4 && (o = (o / 1e4).toFixed(1) + "w"), a.botRight = o + " 收藏";
            }
            if (a.sale || 0 === a.sale) {
                var i = a.sale;
                i > 1e4 && (i = (i / 1e4).toFixed(1) + "w"), a.saleText = i;
            }
            if (a.pintuanAvatar && (a.pintuanAvatar = t.default.getGoodsRatioSuffix(a.pintuanAvatar, 50, "1:1")), 
            a.pintuanAvatarList && a.pintuanAvatarList.length > 0) {
                a.ptAvatarArr = a.pintuanAvatarList.split(","), a.pintuanAvatarArr = [];
                for (var r = 0, n = a.ptAvatarArr.length; r < n; r++) a.ptAvatarArr[r] && a.pintuanAvatarArr.push(t.default.getGoodsRatioSuffix(a.ptAvatarArr[r], 50, "1:1"));
            }
            return a.tradeItemId = a.item_id, a;
        },
        getExposeBussinessTypeCode: function(a) {
            var e = 0;
            switch (a) {
              case "xcx-cate":
                e = 6003;
                break;

              case "xcx-search":
              case "xcx-image-search":
                e = 6002;
                break;

              default:
                e = 6e3;
            }
            return e;
        },
        getRandomTradeItemId: function(a) {
            for (var e = "", t = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ], s = 0; s < a; s++) e += t[Math.round(Math.random() * (t.length - 1))];
            return e;
        },
        handPaganiItem: function(a, e) {
            var s = this;
            if (e.wallParams && e.wallParams.cKey) {
                for (var o = "", i = e.wallParams.cKey.split("-"), r = 0; r < i.length; r++) o += i[r];
                a.ckey = o;
            }
            if (e.wallParams) {
                var n = e.wallParams.bType;
                console.log("bType = " + n), a.busType = n ? "dm1_" + n : "dm1_" + this.getExposeBussinessTypeCode(e.wallParams.cKey);
            }
            if (a.type) {
                if (a.wallType = parseInt(a.type, 10), !s.showPaganiOther && 2 !== a.wallType) return !1;
                1 === a.wallType && a.clientUrl && a.show && a.show.img && (a.bannerLink = a.clientUrl, 
                a.tradeItemId = s.getRandomTradeItemId(10), a.bannerImg = t.default.getWidthSuffix(a.show.img, s.itemImgWidth));
            }
            var l = !(!e.param || !e.param.ptpPartC) && e.param.ptpPartC;
            if (e.param && !1 === e.param.duplicate && a.tradeItemId && s.itemIds[a.tradeItemId] && !a.cparam) return console.log("前端进行商品去重，商品信息如下："), 
            console.log(a), !1;
            if (a.tradeItemId && (s.itemIds[a.tradeItemId] = !0), a.onSaleTime && a.onSaleTime.length > 0) a.botRight = a.onSaleTime; else {
                var c = a.cfav;
                c > 1e4 && (c = (c / 1e4).toFixed(1) + "w"), a.botRight = c + " 收藏";
            }
            if (a.sale || 0 === a.sale) {
                var m = a.sale;
                m > 1e4 && (m = (m / 1e4).toFixed(1) + "w"), a.saleText = m;
            }
            if (a.lefttop_taglist && a.lefttop_taglist.length && (a.leftTop = a.lefttop_taglist[0].img), 
            a.showWordBanner = !1, a.wordBanner && a.wordBanner.content && a.wordBanner.image && (a.showWordBanner = !0), 
            a.nameTags = [], a.leftbottom_taglist && a.leftbottom_taglist.length) for (var p = 0; p < a.leftbottom_taglist.length; p++) {
                var u = a.leftbottom_taglist[p];
                a.nameTags.push(u);
            }
            if (a.props && a.props.length) for (var g = 0; g < a.props.length; g++) {
                var d = {
                    bgColor: "#eff3f6",
                    color: "#5a6f85",
                    content: a.props[g]
                };
                a.nameTags.push(d);
            }
            if (a.pintuanAvatar && (a.pintuanAvatar = t.default.getGoodsRatioSuffix(a.pintuanAvatar, 50, "1:1")), 
            a.imgOrg = a.img, a.img = t.default.getGoodsRatioSuffix(a.img, s.itemImgWidth, s.itemImgRatio), 
            a.ptpC = l ? l + "_" + a.index : "", a.bkey = "." + (a._b_key ? a._b_key : "") + "." + a.index, 
            a.useTags = [], a.showUseTitle = !1, a.useTitle && (a.showUseTitle = !0, a.leftbottom_taglist && a.leftbottom_taglist.length)) for (var h = "", f = 0; f < a.leftbottom_taglist.length && !((h += a.leftbottom_taglist[f].content).length > 10); f++) a.useTags.push(a.leftbottom_taglist[f]);
            return a.showImState = !1, a.showImType && 0 !== a.showImType && (a.showImState = !0, 
            s.showImType = a.showImType, s.imShopIds.push(a.shopId)), a;
        },
        handleAjaxResOtherCallback: function() {},
        handleAjaxResData: function(a) {
            var e = this;
            e.$broadcast("wallResBack", a), e.ajaxData[a.dataKey] = a;
            var s = e.userDataSource.source;
            if ("other" === s || "mwp_mait" === s) {
                var o = (parseInt(a.nextPage, 10) || 2) - 1;
                a.param = {}, a.param.page = o, a.wall = {}, a.wall.isEnd = a.isEnd, a.wall.docs = a.list;
            } else "resOther" === s && e.handleAjaxResOtherCallback(a);
            if (a.wall && a.wall.docs) {
                var i = a.wall.docs, r = [];
                i.length > 0 && (e.itemTotalNum += i.length);
                for (var n = 0; n < i.length; n++) {
                    var l = i[n];
                    if (l && (l.index = e.itemIndex, "pagani" === s ? l = e.handPaganiItem(l, a) : "mwp_mait" === s && (l = e.handMaitItem(l, a)), 
                    l)) {
                        if (e.extFields && Object.keys(e.extFields).length > 0) for (var c in e.extFields) l[c] ? console.log("返回接口中有字段" + c + "，不能被覆盖") : l[c] = e.extFields[c];
                        (l = e.handOtherItem(l, a)).imgOrg && (l.mainImg11 = t.default.getGoodsRatioSuffix(l.imgOrg, e.itemImgWidth, "1:1"), 
                        l.mainImg79 = t.default.getGoodsRatioSuffix(l.imgOrg, e.itemImgWidth, "7:9"), l.mainImg34 = t.default.getGoodsRatioSuffix(l.imgOrg, e.itemImgWidth, "3:4"), 
                        l.mainImg23 = t.default.getGoodsRatioSuffix(l.imgOrg, e.itemImgWidth, "2:3")), l.showIm && l.tradeItemId && l.shopId ? l.showImFlag = !0 : l.showImFlag = !1, 
                        r.push(l), e.itemIndex++;
                    }
                }
                a.wall.docs = r;
            }
            e.isSureBack(a.wallParams) && (e.ajaxErrorNum = 0, e.setBackParams(a), e.setExposeExtInfo(a), 
            e.loadCallBack(a), e.pushResultData(a), a.wall && a.wall.isEnd && e.$broadcast("wallEnd", a));
        },
        reloadWall: function() {
            var a = this;
            a.setWallParam({
                page: 1
            }), a.resetWallParams(), a.isAllowAjax();
        },
        loadCallBack: function(a) {
            var e = this;
            e.firstBackNavFlag || (e.firstBackNavFlag = !0, a.wall.isEnd && 1 === parseInt(a.param.page, 10) && a.wall && a.wall.docs && 0 === a.wall.docs.length || e.firstBackNavInit(a));
            var t = a.wall.docs || [];
            e.packageItems(t), console.log("目前加载商品总数" + e.itemPackageList.length * e.wallParams.pageSize + "个"), 
            (a.wall.isEnd || e.itemPackageList.length >= e.itemPackageListMaxLen || e.maxItemNum > 0 && e.itemInsertNum >= e.maxItemNum) && (e.endContent = "end", 
            1 === parseInt(a.param.page, 10) && a.wall && a.wall.docs && 0 === a.wall.docs.length && (e.endContent = "noResult", 
            e.$broadcast("diyEmpty", function(a) {
                e.endContent = a;
            }, a)), e.scrollEnd()), e.isMaxCount() && e.maxCountEmpty(), !this.isMaxCountWeight() && e.isMaxPageCount() && e.maxCountEmpty(), 
            e.wallParams.page++;
        },
        setBackParams: function(a) {
            var e = this;
            a.wall && a.wall.cpc_offset && (e.wallParams.cpc_offset = a.wall.cpc_offset), a.param && a.param.offset && (e.wallParams.offset = a.param.offset);
        },
        isMaxCount: function() {
            return this.maxItemCount > 0 && this.itemInsertNum >= this.maxItemCount;
        },
        isMaxPageCount: function() {
            return this.maxItemPage > 0 && this.itemInsertNum >= this.maxItemPage * this.wallParams.pageSize;
        },
        isMaxCountWeight: function() {
            return this.maxItemCount > 0;
        },
        maxCountEmpty: function() {
            this.endContent = "empty", this.scrollEnd();
        },
        packageItems: function(a) {
            var e = this, t = !1;
            if (!a || !a.length) return e.emptyClick++, e.emptyClick > 5 && (e.scrollEnd(), 
            e.emptyClick = 0), !1;
            e.emptyClick = 0;
            for (var s = 0; s < a.length; s++) {
                var o = a[s];
                if (e.itemPackage.push(o), o.tradeItemId && (o.index || 0 === o.index) && (o.logID = "pagani_log_" + o.tradeItemId + "_" + o.index, 
                e.scrollLogData.push(o), e.scrollLogedFlag[o.logID] = !1), e.itemPackageNum++, e.itemInsertNum++, 
                o.showImFlag && e.imShopIds.push(o.shopId), e.maxItemNum > 0 && e.itemInsertNum >= e.maxItemNum) break;
                if (e.isMaxCount()) break;
                if (!this.isMaxCountWeight() && e.isMaxPageCount()) break;
                e.itemPackageNum >= e.wallParams.pageSize + e.notItemCount && (console.log("目前加载非商品总数" + e.notItemCount + "个"), 
                e.notItemCount > 0 && (e.notItemCount = 0), e.pushPackageData(), t = !0);
            }
            t || setTimeout(function() {
                e && e.isAllowAjax && e.isAllowAjax();
            }, 50);
        },
        pushPackageData: function() {
            var a = this;
            if (a.itemPackage && a.itemPackageNum) {
                var e = a.itemPackageList.length;
                a.itemPackageList.push({
                    name: "itemPackage" + e,
                    isShow: !0,
                    activeTop: 0,
                    activeBot: 0
                });
                var t = {};
                t["itemPackage" + e] = a.itemPackage, console.log("本次新增图墙的数据包："), console.log(a.itemPackage), 
                a.pushData(t), a.getImData(), a.itemPackage = [], a.imShopIds = [], a.itemPackageNum = 0, 
                a.isSupportSelector && a.getInViewItems();
            }
        },
        getImData: function() {
            var a = this;
            a.imShopIds && 0 === a.imShopIds.length || a.$imcall.setImOpts({
                type: a.showImType,
                class: "im_icon",
                text: "",
                style: "",
                allocateType: 1,
                shopIds: a.imShopIds.slice(0)
            });
        },
        scrollEnd: function() {
            var a = this;
            a.isAjaxEnd = !0, a.pushPackageData(), a.setData({
                endContent: a.endContent
            });
        },
        isSureBack: function(a) {
            var e = this.wallParams;
            for (var t in a) if (e[t] && e[t] !== a[t]) return !1;
            return !0;
        },
        resetWallParams: function() {
            var a = this;
            a.itemPackage = [], a.itemPackageList = [], a.scrollLogData = [], a.scrollLogedFlag = {}, 
            a.itemPackageNum = 0, a.itemInsertNum = 0, a.isAjaxEnd = !1, a.endContent = !1, 
            a.isLoading = !1, a.emptyClick = 0, a.ajaxErrorNum = 0, a.itemTotalNum = 0, a.itemIds = {}, 
            a.imShopIds = [], a.wallParams.cpc_offset = 0, a.wallParams.offset = "", a.goodsExposeData = {
                eventid: "0x00000000",
                acms: [],
                cpcs: [],
                iids: [],
                indexs: [],
                properties: {},
                ptpPartC: "",
                fcid: ""
            }, a.cpcExposeData = {
                eventid: !1,
                cparams: [],
                ptpPartC: "",
                fcid: ""
            }, a.itemIndex = 0;
        },
        setWallParam: function(a) {
            this.wallParams = Object.assign(this.wallParams, a);
        },
        wallScrollEvent: function() {
            var a = this;
            a._now() - a.timeFlag > a.scrollIndTime && (a.isSupportSelector && a.getInViewItems(), 
            a.isAllowAjax());
        },
        pushData: function(a) {
            var e = this, t = Object.assign({}, {
                endContent: e.endContent,
                scrollNavFixedClass: e.scrollNavFixedClass,
                scrollNavStickyClass: e.scrollNavStickyClass,
                navData: e.navData,
                itemPackageList: e.itemPackageList,
                searchNoResultFlag: e.searchNoResultFlag,
                searchLessResultFlag: e.searchLessResultFlag,
                searchResultInfo: e.searchResultInfo
            }, a);
            this.setData(t);
        },
        pushResultData: function(a) {
            var e = this;
            if (a.param && a.wallParams && a.param.ptpPartC && (e.goodsExposeData.ptpPartC = a.param.ptpPartC, 
            e.goodsExposeData.eventid = a.param.eventId || "0x00000000", e.goodsExposeData.fcid = a.param.fcid || "", 
            e.goodsExposeData.properties = {
                tableName: a.wallParams.sort || "",
                fcid: a.wallParams.fcid || "",
                q: a.wallParams.q || ""
            }, e.cpcExposeData.ptpPartC = a.param.ptpPartC, e.cpcExposeData.eventid = a.param.cpcEventId || "70004", 
            e.cpcExposeData.fcid = a.param.fcid || ""), !e.isSupportSelector) {
                var t = a.wall.docs || [];
                e.pushItemListLog(t);
            }
        },
        setExposeExtInfo: function(a) {
            this.exposeExtInfo = a;
        },
        getExposeExtInfo: function() {
            return this.exposeExtInfo;
        },
        parseExposeData: function() {
            var a = this.getExposeExtInfo();
            if (a && a.param && a.wallParams) {
                var e = "", t = this.exposeExtInfo.param.fcid, s = this.exposeExtInfo.param.ptpPartC, o = this.exposeExtInfo.wallParams.q, i = {
                    tableName: (e = this.exposeExtInfo.wallParams.tableName ? this.exposeExtInfo.wallParams.tableName : this.exposeExtInfo.wallParams.sort) || "",
                    fcid: t || "",
                    q: o || ""
                };
                return this.searchNoResultFlag ? i = Object.assign(i, {
                    name: this.searchResultInfo.rewriteKeyword,
                    noResult: !0,
                    lessResult: !1
                }) : this.searchLessResultFlag && (i = Object.assign(i, {
                    name: this.searchResultInfo.keyword,
                    noResult: !1,
                    lessResult: !0
                })), {
                    fcid: t,
                    ptpPartC: s,
                    properties: i
                };
            }
            return null;
        },
        getExposeInfo: function() {
            var a = this.parseExposeData() || {};
            return {
                fcid: a.fcid || "",
                ptpPartC: a.ptpPartC || "",
                properties: a.properties || {}
            };
        },
        getInViewItems: function() {
            var a = this;
            this.$root && this.$root.$expose && this.$root.$expose(this), clearTimeout(a.logSetTimeFlag), 
            a.logSetTimeFlag = setTimeout(function() {
                for (var e = [], t = "", s = {}, o = 0; o < a.scrollLogData.length; o++) {
                    var i = a.scrollLogData[o], r = i.logID;
                    a.scrollLogedFlag[r] || (s[r] = i, e.push("#" + r));
                }
                e.length && (t = e.join(","), wx.createSelectorQuery().selectAll(t).boundingClientRect(function(e) {
                    var t = [];
                    e.forEach(function(e) {
                        e.top < a.sysInfo.windowHeight && (t.push(s[e.id]), a.scrollLogedFlag[e.id] = !0);
                    }), a.pushItemListLog(t);
                }).exec());
            }, 400);
        },
        pushItemListLog: function(a) {
            for (var e = this, t = 0, s = 0; s < a.length; s++) {
                var o = a[s];
                o.wallType && 1 === o.wallType && t++, e.getItemLogData(o);
            }
            (e.goodsExposeData.iids.length || t > 0 && t === a.length) && (console.log("触发图墙曝光打点"), 
            console.log(e.goodsExposeData), e.$root.$logE(e.goodsExposeData.eventid, e.goodsExposeData)), 
            e.cpcExposeData.cparams.length && (console.log("触发cpc商品曝光打点."), console.log(e.cpcExposeData), 
            e.$root.$logE(e.cpcExposeData.eventid, e.cpcExposeData)), e.goodsExposeData.acms = [], 
            e.goodsExposeData.cpcs = [], e.goodsExposeData.iids = [], e.goodsExposeData.indexs = [], 
            e.cpcExposeData.cparams = [];
        },
        getItemLogData: function(a) {
            var e = this;
            a.tradeItemId && (e.goodsExposeData.acms.push(a.acm), e.goodsExposeData.indexs.push(a.index), 
            1 !== a.wallType && e.goodsExposeData.iids.push(a.tradeItemId), a.cparam && (e.goodsExposeData.cpcs.push(a.tradeItemId), 
            e.cpcExposeData.cparams.push(a.cparam)));
        },
        linkClick: function(a) {
            var e = this, t = a.currentTarget.dataset;
            if (t.link) {
                var s = {};
                t.acm && (s.acm = t.acm), t.ptpC && (s.ptpC = t.ptpC), t.logIndex && (s.logIndex = t.logIndex), 
                t.logMod && (s.logMod = t.logMod), t.logBtype && (s.logBtype = t.logBtype), e.useRedirect || "detail" === e.$root.query.fromPage ? (a.currentTarget.dataset.fromPage = e.$root.query.fromPage, 
                e.$root.$redirect(t.link, s)) : e.$root.$navigate(t.link, s);
            }
        }
    },
    onReady: function() {
        var a = this;
        wx.getSystemInfo({
            success: function(e) {
                a.setData({
                    scrollBoxHeight: e.windowHeight
                });
            }
        }), setTimeout(function() {
            wx.getSystemInfo({
                success: function(e) {
                    a && a.setData && a.setData({
                        scrollBoxHeight: e.windowHeight
                    });
                }
            });
        }, 300), setTimeout(function() {
            wx.getSystemInfo({
                success: function(e) {
                    a && a.setData && a.setData({
                        scrollBoxHeight: e.windowHeight
                    });
                }
            });
        }, 600);
    }
};
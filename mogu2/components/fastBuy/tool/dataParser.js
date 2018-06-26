function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function() {
    function e(e, t) {
        for (var s = 0; s < t.length; s++) {
            var i = t[s];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, s, i) {
        return s && e(t.prototype, s), i && e(t, i), t;
    };
}(), s = function() {
    function s(t) {
        e(this, s), this.skuPtp = {}, this.skuPtpCnt = {}, this.skuLiveParam = {}, this.skuExtensions = {}, 
        this.shopExtensions = {}, this.skuPintuan = {}, this.params = null, this.extensions = {
            cps: "",
            cpsUnion: "",
            sourceMarket: t && t.sourceMarket || "weixin"
        }, this.channel = "", this.certificate = "", this.activityId = "", this.activityType = "", 
        this.orderFrom = "", this.platFormType = "", this.sourceMarket = t && t.sourceMarket || "weixin", 
        this.marketType = "", this.pintuanReqDTO = null, this.ptpCnt = t.ptpCnt, this.chosenFenqi = !1;
    }
    return t(s, [ {
        key: "changeParams",
        value: function(e) {
            var t = this, s = {}, i = [], r = [], a = this;
            return r = e.shops || [], this.sourceMarket = e.sourceMarket || this.sourceMarket, 
            this.channel = e.channel || "", this.certificate = e.certificate || "", this.activityId = e.activityId || "", 
            this.activityType = e.activityType || "", this.orderFrom = e.orderFrom || "", this.platFormType = e.platFormType || "H5", 
            this.marketType = e.marketType || "market_mogujie", this.repayStageReqDTO = e.repayStageReqDTO || null, 
            r.map(function(s) {
                var r = {}, o = [];
                (s.skus || []).map(function(e) {
                    var s = {};
                    s.quantity = e.number, s.skuId = e.stockId || e.skuId || "", s.extensions = {
                        ptp: e.ptp,
                        ptpCnt: e.ptpCnt,
                        sourceMarket: t.sourceMarket
                    }, e.bizExtra && (s.extensions.bizExtra = e.bizExtra), e.liveParams && (s.extensions.liveParams = e.liveParams, 
                    t.skuLiveParam[s.skuId] = e.liveParams), "cart" != t.orderFrom && (s.extensions.ptpCnt = t.ptpCnt), 
                    e.pinTuan && (s.pintuanReqDTO = e.pinTuan, t.skuPintuan[s.skuId] = e.pinTuan), e.activityReqDTO && (s.activityReqDTO = e.activityReqDTO), 
                    s.promotionKeyList = e.itemProId ? [ e.itemProId ] : e.promotionKeyList, t.skuPtp[s.skuId] = e.ptp, 
                    t.skuPtpCnt[s.skuId] = e.ptpCnt, t.skuLiveParam[s.skuId] = e.liveParams, o.push(s);
                }), r.comment = s.comment || "", r.extensions = s.extensions || {
                    sourceMarket: t.sourceMarket
                }, r.logisticsCode = s.logisticsCode || "", r.promotionKeyList = s.promotionKeyList || [], 
                r.createOrderSkuGroupReqDTOList = o, e.pinTuan && (a.pintuanReqDTO = e.pinTuan, 
                r.pintuanReqDTO = e.pinTuan), i.push(r);
            }), s = {
                addressId: e.addressId || 0,
                promotionKeyList: e.promotionKeyList || [],
                channel: this.channel,
                extensions: {
                    orderFrom: this.orderFrom
                },
                marketType: this.marketType,
                createOrderShopGroupReqDTOList: i
            }, this.repayStageReqDTO && (this.chosenFenqi = !0, s.repayStageReqDTO = this.repayStageReqDTO), 
            this.platFormType && (s.platFormType = this.platFormType), this.sourceMarket && (s.extensions.sourceMarket = this.sourceMarket, 
            this.extensions.sourceMarket = this.sourceMarket), this.modouUse && (s.modouUse = this.modouUse), 
            this.orderFrom && (this.extensions.orderFrom = this.orderFrom), this.certificate && (s.extensions.certificate = this.certificate, 
            this.extensions.certificate = this.certificate), this.activityId && (s.extensions.activityId = this.activityId, 
            this.extensions.activityId = this.activityId), this.activityType && (s.extensions.activityType = this.activityType, 
            this.extensions.activityType = this.activityType), s;
        }
    }, {
        key: "parseParams",
        value: function(e) {
            var t = this, s = e.shopGroupList || [], i = [], r = this.sourceMarket, a = this, o = {};
            if (s.map(function(e) {
                var s = e.skuGroupList || [], o = e.selectedLogistics, n = [], p = "";
                p = e.tagsDTO && e.tagsDTO.itemTypeTag ? e.tagsDTO.itemTypeTag : e.tagsDTO && e.tagsDTO.itemProcessTag ? e.tagsDTO.itemProcessTag : "", 
                s.map(function(e) {
                    var s = e.quantity, i = e.skuIdEsc, o = [].concat(e.selectedPromotionList[0] && e.selectedPromotionList[0].promotionKey || ""), p = e.extensions && e.extensions.itemTypeTag || "", c = {
                        skuId: i,
                        quantity: s,
                        promotionKeyList: o,
                        extensions: {
                            ptp: a.skuPtp[i],
                            ptpCnt: t.skuPtpCnt[i],
                            sourceMarket: r
                        }
                    };
                    e.extensions.bizExtra && (c.extensions.bizExtra = e.extensions.bizExtra), t.skuLiveParam[i] && (c.extensions.liveParams = t.skuLiveParam[i]), 
                    "cart" != t.orderFrom && (c.extensions.ptpCnt = t.ptpCnt), p && (c.extensions.itemTypeTag = p), 
                    t.skuPintuan[i] && (c.pintuanReqDTO = t.skuPintuan[i]), e.activityReqDTO && (c.activityReqDTO = e.activityReqDTO), 
                    n.push(c);
                });
                var c = {
                    shopKey: e.shopKey,
                    comment: e.buyerComment || "",
                    extensions: p ? {
                        identifyTag: p,
                        sourceMarket: r
                    } : {
                        sourceMarket: r
                    },
                    logisticsCode: o && o.expressCode || "",
                    promotionKeyList: [].concat(e.selectedPromotionList[0] && e.selectedPromotionList[0].promotionKey || ""),
                    createOrderSkuGroupReqDTOList: n
                };
                a.pintuanReqDTO && (c.pintuanReqDTO = a.pintuanReqDTO), i.push(c);
            }), o = {
                addressId: e.address && e.address.addressId,
                promotionKeyList: [].concat(e.selectedPromotionList[0] && e.selectedPromotionList[0].promotionKey || ""),
                channel: this.channel,
                extensions: a.extensions || e.extensions || {},
                platFormType: a.platFormType,
                createOrderShopGroupReqDTOList: i
            }, e.confirmRepayStageResDTO && this.chosenFenqi && e.confirmRepayStageResDTO.canPayStage) {
                var n = e.confirmRepayStageResDTO, p = n.perPrice, c = n.num, u = n.fee, m = n.chosen;
                m && (o.repayStageReqDTO = {
                    payway: "repayStage",
                    perPrice: p,
                    num: c,
                    fee: u,
                    chosen: m
                });
            }
            return this.params = o, o;
        }
    }, {
        key: "reQueryString",
        value: function(e) {
            var t = this.sourceMarket, s = this.params.createOrderShopGroupReqDTOList, i = this.params.promotionKeyList;
            return delete this.params.eventType, e.shopKey ? s.map(function(s) {
                var i = s.createOrderSkuGroupReqDTOList, r = s.promotionKeyList;
                delete s.eventType, e.shopKey && s.shopKey === e.shopKey && (e.promotionKey && (r[0] = e.promotionKey, 
                s.eventType = 4), e.logisticsCode && (s.logisticsCode = e.logisticsCode), s.extensions = e.openPresale ? {
                    identifyTag: "YS",
                    sourceMarket: t
                } : {
                    sourceMarket: t
                }, s.comment = e.shopComments ? e.shopComments[e.shopKey] : s.comment, i.map(function(t) {
                    var s = t.skuId;
                    delete t.eventType, e.skuId && s === e.skuId && (t.quantity = e.number, t.eventType = 2);
                }));
            }) : (e.promotionKey && (i[0] = e.promotionKey, this.params.eventType = 5), e.addressId && (this.params.addressId = e.addressId, 
            this.params.eventType = 1), e.repayStageReqDTO && (this.params.repayStageReqDTO = e.repayStageReqDTO)), 
            this.params;
        }
    }, {
        key: "getCreateOrderParams",
        value: function() {
            try {
                this.extensions.did = wx.getStorageSync("mgj.did");
            } catch (e) {
                console.log(e);
            }
            return this.params;
        }
    } ]), s;
}();

exports.default = s;
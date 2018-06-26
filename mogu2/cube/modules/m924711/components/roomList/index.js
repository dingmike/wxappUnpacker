function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

t(require("../../../../../common/m.js"));

var i = t(require("./dataService/dataService.js")), e = t(require("./liveCount/index.js")), o = t(require("../../../../../common/utils/imgUrlTool.js"));

exports.default = {
    name: "roomList",
    components: {
        liveCount: e.default
    },
    methods: {
        initWithTabId: function(t) {
            this.tabId = t, this.$liveCount.setUpTabId(this.tabId);
        },
        getInitialData: function() {
            this.reset(), this.getListData("INIT");
        },
        reset: function() {
            this.isLoadingData = !1, this.end = !0, this.pageIndex = 1, this.liveItemCount = 0, 
            this.insertedSpecialSaleCount = 0, this.listItems = [], this.specialSales = [], 
            this.showLoadingView = !1, this.showLoadingErrorView = !1, this.showEmptyView = !1, 
            this.showList = !1, this.showLoadingMoreView = !1, this.showLoadingMoreErrorView = !1;
        },
        getMoreData: function() {
            this.getListData("LOAD_MORE");
        },
        getListData: function(t) {
            var e = this;
            if (!(this.isLoadingData || "LOAD_MORE" == t && this.end)) {
                this.isLoadingData = !0, "INIT" == t ? (this.showLoadingErrorView = !1, this.showEmptyView = !1, 
                this.showList = !1, this.showLoadingMoreView = !1, this.showLoadingMoreErrorView = !1, 
                this.showLoadingView = !0, this.pushData()) : "LOAD_MORE" == t && (this.showLoadingMoreErrorView = !1, 
                this.showLoadingMoreView = !0, this.pushData());
                var o = {
                    tabId: this.tabId,
                    pageIndex: this.pageIndex
                };
                i.default.getListData(o, function(i) {
                    e.isLoadingData = !1, e.showLoadingView = !1, i ? ("LOAD_MORE" != t && (e.specialSales = i.specialSales), 
                    e.end = i.end, e.pageIndex = i.pageIndex, e.addLives(i.lives), e.insertSpecialSale(), 
                    "LOAD_MORE" != t && (e.listItems.length > 0 ? e.showList = !0 : e.showEmptyView = !0), 
                    e.showLoadingMoreView = !e.end, e.$liveCount.setUpLiveCount(i.liveCount, e.end ? i.liveCount : e.liveItemCount)) : "LOAD_MORE" != t ? e.showLoadingErrorView = !0 : (e.showLoadingMoreView = !1, 
                    e.showLoadingMoreErrorView = !0), e.pushData();
                });
            }
        },
        addLives: function(t) {
            if (t && !(t.length <= 0)) for (var i = 0; i < t.length; i++) {
                var e = t[i];
                0 != e.playType && 2 != e.playType || (this.isLiveItemAlreadyContained(e) || (this.adjustLiveItem(e), 
                this.addLiveItemToListItems(e), this.liveItemCount++));
            }
        },
        isLiveItemAlreadyContained: function(t) {
            if (!t || this.liveItemCount <= 0) return !1;
            for (var i = !1, e = 0; e < this.listItems.length; e++) {
                var o = this.listItems[e];
                if ("LIVE" == o.dataType) {
                    var s = o;
                    if (t.actUserId === s.actUserId && t.roomId === s.roomId && t.groupId === s.groupId) {
                        i = !0;
                        break;
                    }
                }
            }
            return i;
        },
        adjustLiveItem: function(t) {
            if (t) {
                if (t.cover && (t.cover = o.default.getGoodsRatioSuffix(t.cover, 250, "1:1")), t.avatar && (t.avatar = o.default.getGoodsRatioSuffix(t.avatar, 250, "1:1")), 
                t.actorTag && t.actorTag.listIcon && (t.actorTag.listIcon = o.default.getGoodsRatioSuffix(t.actorTag.listIcon, 136, "136:60")), 
                t.carts && t.carts.shopCarts && t.carts.shopCarts.length > 0) for (var i = 0; i < t.carts.shopCarts.length; i++) {
                    var e = t.carts.shopCarts[i];
                    e.url = o.default.getGoodsRatioSuffix(e.url, 98, "1:1");
                }
                if (t.visitorCount >= 1e4) {
                    var s = t.visitorCount / 1e4;
                    t.visitorCount = s.toFixed(2) + "w";
                }
                if (t.favCount >= 1e4) {
                    var a = t.favCount / 1e4;
                    t.favCount = a.toFixed(2) + "w";
                }
            }
        },
        addLiveItemToListItems: function(t) {
            if (t) {
                var i = t;
                i.dataType = "LIVE", this.listItems.push(i);
            }
        },
        insertSpecialSale: function() {
            if (!(!this.specialSales || this.specialSales.length <= 0 || this.insertedSpecialSaleCount >= this.specialSales.length)) for (var t = this.insertedSpecialSaleCount; t < this.specialSales.length; t++) {
                var i = this.specialSales[t], e = i;
                e.dataType = "SPECIAL_SALE";
                var o = i.index;
                this.insertListItemWithExpectedIndex(e, o) && (this.adjustSpecialSaleItem(i), this.insertedSpecialSaleCount++);
            }
        },
        adjustSpecialSaleItem: function(t) {
            if (t && (t.bgImg = o.default.getGoodsRatioSuffix(t.bgImg, 702, "702:384"), t.actorAvatar = o.default.getGoodsRatioSuffix(t.actorAvatar, 70, "1:1"), 
            t.roomMark = o.default.getGoodsRatioSuffix(t.roomMark, 250, "250:40"), t.specialSalesGoods && (t.specialSalesGoods.moreIcon = o.default.getGoodsRatioSuffix(t.specialSalesGoods.moreIcon, 134, "134:248"), 
            t.specialSalesGoods.goods && t.specialSalesGoods.goods.length > 0))) for (var i = 0; i < t.specialSalesGoods.goods.length; i++) {
                var e = t.specialSalesGoods.goods[i];
                e.cover = o.default.getGoodsRatioSuffix(e.cover, 172, "1:1"), e.priceIcon = o.default.getGoodsRatioSuffix(e.priceIcon, 44, "44:25");
            }
        },
        insertablePositionCount: function() {
            return this.liveItemCount + this.insertedSpecialSaleCount;
        },
        insertListItemWithExpectedIndex: function(t, i) {
            if (!t) return !1;
            var e = this.insertablePositionCount();
            if (!this.end && e <= 0) return !1;
            if (!this.end && i > e) return !1;
            if (this.end && this.liveItemCount <= 0) return !1;
            var o = 0;
            return i <= 0 && (i = 1), o = i <= e ? i - 1 : this.listItems.length, this.listItems.splice(o, 0, t), 
            !0;
        },
        pushData: function() {
            var t = {
                listItems: this.listItems,
                showLoadingView: this.showLoadingView,
                showLoadingErrorView: this.showLoadingErrorView,
                showEmptyView: this.showEmptyView,
                showList: this.showList,
                showLoadingMoreView: this.showLoadingMoreView,
                showLoadingMoreErrorView: this.showLoadingMoreErrorView
            };
            this.setData(t);
        },
        formSubmit: function(t) {
            var i = t.detail.formId;
            this.$root.$logForm(i, 2);
        },
        liveItemTapped: function(t) {
            var i = t.currentTarget.dataset.itemData;
            this.trackLiveItemTapEvent(i), this.goToLivePage(i);
        },
        trackLiveItemTapEvent: function(t) {
            var i = {
                roomID: t.roomId + ""
            };
            this.$root.$logE("016000506", i);
        },
        goToLivePage: function(t) {
            var i = {
                actorUserId: t.actUserId || "",
                roomId: t.roomId || 0,
                acm: t.acm || ""
            };
            this.jumpMiniProgram("/pages/live/index", i);
        },
        jumpMiniProgram: function(t, i) {
            var e = Object.assign({
                appId: "wx21c17841db9593cd"
            }, i);
            this.$root.$launch(t, e);
        },
        specialSaleTapped: function(t) {
            var i = t.currentTarget.dataset.itemData.link;
            i && i.length > 0 && this.jumpMiniProgram(i);
        }
    }
};
Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}(require("../../../../components/wall/index"));

exports.default = {
    components: {
        wall: a.default
    },
    data: function() {
        return {
            pageNum: 1,
            shopTipsData: {},
            isShowShopTipsWrap: !1,
            windowHeight: 1e3,
            isEmpty: !1
        };
    },
    setTipsData: function(a, e) {
        this.setData({
            shopTipsData: a,
            isShowShopTipsWrap: e
        });
    },
    changePageNum: function(a) {
        this.setData({
            pageNum: a
        });
    },
    fetchAjaxData: function(a) {
        var e = this.data.pageNum + 1;
        console.log("searchWord:", a, "pageNum:", e), this.changePageNum(e), this.$root.handleShopTipsData(a);
    }
};
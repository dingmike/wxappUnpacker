function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../../../../common/m")), i = t(require("../base/color")), o = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    return e.default = t, e;
}(require("../base/index")), a = e.default.MWP, n = o.handleRequestError;

exports.default = {
    data: function() {
        return {};
    },
    components: {
        color: i.default
    },
    onLoad: function() {},
    addFavItem: function() {
        var t = this;
        this.$loading.show(), a.request("mwp.shopfavorite.itemLike", "1", {
            pf: "xcx",
            mids: this.itemId,
            ptpCnt: this.$root.ptpData.ptp_cnt
        }).then(a.filterResult).then(function() {
            t.setData({
                isFaved: !0
            }), t.$loading.hide();
        }).catch(function(e) {
            t.$loading.hide(), n(e);
        });
    },
    delFavItem: function() {
        var t = this;
        this.$loading.show(), a.request("mwp.shopfavorite.itemUnLike", "1", {
            pf: "xcx",
            mids: this.itemId
        }).then(a.filterResult).then(function() {
            t.setData({
                isFaved: !1
            }), t.$loading.hide();
        }).catch(function(e) {
            t.$loading.hide(), n(e);
        });
    },
    methods: {
        init: function(t) {
            this.itemId = t.itemId, this.$loading = t.$loading, this.setData({
                isFaved: t.isFaved
            });
        },
        onFavClick: function(t) {
            var e = t.detail.formId;
            this.$root.$logForm(e, 2), this.data.isFaved ? (this.$root.$logE("016000012", {
                ops: "1",
                id: this.itemId,
                type: "goods"
            }), this.delFavItem()) : (this.$root.$logE("016000012", {
                ops: "0",
                id: this.itemId,
                type: "goods"
            }), this.addFavItem());
        }
    }
};
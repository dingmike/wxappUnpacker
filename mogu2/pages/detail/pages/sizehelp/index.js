function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../../common/m")), i = e(require("../../../../common/base/createPage")), n = e(require("../../../../components/loading/index")), o = e(require("../../../../components/toast/index")), a = e(require("../../../../components/error/index")), r = e(require("./components/editInfo/index")), s = e(require("./components/reportInfo/index")), d = e(require("./components/sizeImg/index")), u = e(require("../../components/ruleInfo/index")), p = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}(require("../../components/base/index")), l = p.PageStatus, f = p.responseSuccessHandle, c = p.responseErrorhandle, m = t.default.MWP;

exports.default = (0, i.default)({
    components: {
        loading: n.default,
        toast: o.default,
        errorPage: a.default,
        editInfo: r.default,
        reportInfo: s.default,
        sizeImg: d.default,
        ruleInfo: u.default
    },
    data: {},
    onShow: function() {
        this.itemData && this.getSizeData(this.itemId);
    },
    onLoad: function() {
        var e = this;
        this.$loading.show(), wx.showNavigationBarLoading(), this.optionsReady = this.$getOptions().then(function(t) {
            e.options = t || {}, e.itemId = t.itemId, e.ptp = t.ptp || "", e.cparam = t.cparam || "", 
            e.acm = t.acm || "", e._mgjuuid = t._mgjuuid || "", console.log("options: ", t);
        });
    },
    onReady: function() {
        var e = this;
        this.optionsReady.then(function() {
            e.getSizeData(e.itemId);
        });
    },
    getSizeData: function(e) {
        this.$root.$mwp("http.detail.api", "1", {
            template: "6-2-detail_sizehelper-1.0.0",
            iid: e
        }).then(m.filterResult).then(f.bind(this, {
            success: this.setSizeData,
            itemId: e
        })).catch(c.bind(this, {
            itemId: e
        }));
    },
    setSizeData: function(e) {
        var t = this.itemId;
        this.itemData = e;
        var i = e.sizeHelperInfo;
        this.setData({
            itemData: e,
            sizeHelperInfo: i,
            pageStatus: l.REQUEST_SUCCESS
        }), this.$editInfo.init({
            sizeHelperInfo: i,
            itemId: t
        }), this.$ruleInfo.init(i), this.$reportInfo.init(i), this.$sizeImg.init(i);
    }
});
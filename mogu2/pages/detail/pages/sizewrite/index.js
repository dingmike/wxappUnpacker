function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../../common/m")), i = e(require("../../../../common/base/createPage")), n = e(require("../../../../components/loading/index")), o = e(require("../../../../components/toast/index")), a = e(require("../../../../components/error/index")), s = e(require("./components/select/index")), r = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}(require("../../components/base/index")), u = r.PageStatus, d = r.responseSuccessHandle, c = r.responseErrorhandle, l = t.default.MWP;

exports.default = (0, i.default)({
    components: {
        loading: n.default,
        toast: o.default,
        errorPage: a.default,
        select: s.default
    },
    data: {},
    onShow: function() {},
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
        }).then(l.filterResult).then(d.bind(this, {
            success: this.setSizeData,
            itemId: e
        })).catch(c.bind(this, {
            itemId: e
        }));
    },
    setSizeData: function(e) {
        this.itemData = e;
        var t = e.sizeHelperInfo;
        this.setData({
            itemData: e,
            sizeHelperInfo: t,
            pageStatus: u.REQUEST_SUCCESS
        }), this.$select.init(t);
    }
});
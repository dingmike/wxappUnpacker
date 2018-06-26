function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(t) {
    return (0, e.default)({
        components: {
            error: a.default
        },
        data: {},
        initWrapper: function(e) {
            this.pageName = e.pageName || "", this.domain = e.domain || "act.mogujie.com", this.requestUrl = t.pageDataUrl, 
            this.backupData = t.backupData, -1 !== this.pageName.indexOf("%") && (this.pageName = decodeURIComponent(this.pageName)), 
            e.pageName ? (this.isUp = e.isup, this.notShare = e.noshare) : (this.isUp = t.isup, 
            this.notShare = t.notShare), this.options = e;
            var a = new r.MComponent((0, s.default)({
                isCodeB: !!this._scene || !!this._shortQuery,
                openLazyMod: !!t.openLazyMod,
                subMod: t.subMod || {}
            }), this);
            this.$children = (this.$children || []).concat(a), this.$root.$wrapper = a;
        },
        onLoad: function(t) {
            t._shortQuery ? this._shortQuery = t._shortQuery : t.scene ? this._scene = t.scene : this.initWrapper(t);
        },
        onReady: function() {
            var t = this;
            this.retry = 0, this._shortQuery ? this.$getOptions().then(function(e) {
                t.initWrapper(e), t.requestData();
            }) : this._scene ? this.$getOptions().then(function(e) {
                t.initWrapper(e), t.requestData();
            }) : this.requestData();
        },
        errorHandle: function() {
            this.retry < 2 ? (this.retry++, console.error("网络错误，再次请求"), this.requestData()) : (this.retry = 0, 
            this.backupData ? this.succHandle({
                data: this.backupData
            }) : this.setError());
        },
        succHandle: function(t) {
            t && t.data && t.data.pageInfo ? (this.setData({
                showError: !1
            }), this.$wrapper.setPageInfo(this, t.data.pageInfo, t.data.Env, this.isUp, this.notShare, this.options, t.data.acmInfo)) : this.errorHandle();
        },
        requestData: function() {
            var t = this;
            this.retry = this.retry || 0;
            var e = this.pageName ? "https://" + this.domain + "/" + this.pageName + ".json" : this.requestUrl;
            wx.request({
                url: e,
                success: function(e) {
                    t.succHandle(e);
                },
                fail: function(e) {
                    t.errorHandle();
                }
            });
        },
        scroll: function(t) {
            this.$wrapper.scroll(t);
        },
        upper: function(t) {
            this.$wrapper.upper(t);
        },
        lower: function(t) {
            this.$wrapper.lower(t);
        },
        onPullDownRefresh: function() {
            this.$wrapper.onPullDownRefresh();
        },
        onReachBottom: function() {
            this.$wrapper.onReachBottom();
        },
        onPageScroll: function(t) {
            this.$wrapper.onPageScroll(t);
        },
        onShareAppMessage: function(t) {
            return this.$wrapper.onShareAppMessage(t);
        },
        setError: function() {
            var t = {};
            t.type = "REQUEST_ERROR", t.callback = this.requestData.bind(this), this.setData({
                showError: !0
            }), this.$error.init(t);
        }
    });
};

var e = t(require("../../common/base/createPage")), r = require("../../common/base/PageFactory"), a = t(require("../../components/error/index")), s = t(require("./index"));
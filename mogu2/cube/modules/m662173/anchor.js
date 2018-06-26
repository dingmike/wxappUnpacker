function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

t(require("../../../common/m.js"));

var e = t(require("./featURL.js")), i = {
    name: "anchor",
    props: {
        item: {},
        acm: {
            default: ""
        },
        acmIndex: {
            default: 0
        }
    },
    data: function() {
        var t = this.item.url && this.item.url.trim(), e = this.item.xcxUrl && this.item.xcxUrl.trim();
        return {
            targetUrl: wx.isH5 ? t : e
        };
    },
    methods: {
        handleClick: function(t) {
            wx.isH5 && window && "edit" === window.__cubeAnchorEnv || (this.targetUrl && this.featURLIns.updateURL(this.targetUrl), 
            !this.targetUrl || this.featURLIns.isLegalURL() ? (wx.isH5 && t.preventDefault(), 
            this.featURLIns.switchStatus()) : (wx.isH5 && t.preventDefault(), this.vx_navigate(this.targetUrl, {}, t)));
        },
        formSubmitHandler: function(t) {
            this.$root.$logForm(t.detail.formId, 2), this.handleClick(t);
        }
    },
    mounted: function() {
        var t = this.getShieldParam(), i = wx.isH5 ? window.pageInfo && window.pageInfo.pageId : this.$root && this.$root.$wrapper.pageId;
        this.featURLIns = new e.default(this.item, this.targetUrl, i || "", t, this);
    }
};

exports.default = {
    componentOptions: i,
    renderComponentsFunc: function(t) {}
};
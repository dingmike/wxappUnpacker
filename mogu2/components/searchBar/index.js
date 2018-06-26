function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../../common/m")), a = t(require("../imcall/index")), o = e.default.MWP;

exports.default = {
    components: {
        imcall: a.default
    },
    data: function() {
        return {
            placeholder: "",
            sbQueryWord: "",
            needRedirect: !0,
            needChange: !0,
            isFixed: !0,
            ptpC: ""
        };
    },
    onLoad: function(t) {
        this.options = t;
    },
    onShow: function() {
        this.acm = "";
        var t = this.options && this.options.q ? this.options.q : "";
        t = decodeURIComponent(t);
        var e = this.options && this.options.placeholder ? this.options.placeholder : this.options && this.options.q ? this.options.q : "";
        e = decodeURIComponent(e), t ? this.setPlaceholder(e, t) : this.requestWord();
    },
    failedEvent: function() {
        this.setPlaceholder("搜索你想要的宝贝", "");
    },
    requestWord: function() {
        var t = this;
        o.request("mwp.pagani.moduleFacade", "1", {
            code: "sketch"
        }).then(function(e) {
            var a = "", o = "";
            e && e.data && e.data.sketch && e.data.sketch.data && e.data.sketch.data.frontword ? (a = e.data.sketch.data.frontword, 
            o = e.data.sketch.data.query, t.setPlaceholder(a, o)) : t.failedEvent(), t.eLogger(e);
        }).catch(function() {
            t.failedEvent();
        });
    },
    eLogger: function(t) {
        var e = t.data.sketch.data.acm ? t.data.sketch.data.acm : "", a = [];
        e && (this.acm = e, a.push(e), this.$root.$logE("0x00000000", {
            acms: a
        }));
    },
    methods: {
        setPlaceholder: function(t, e) {
            this.setData({
                placeholder: t,
                sbQueryWord: e
            });
        },
        goMiddlePage: function(t) {
            var e = this, a = "/pages/searchMiddle/index";
            this.acm && (t.currentTarget.dataset.acm = this.acm), this.data.needChange && (t.currentTarget.dataset.needChange = this.data.needChange), 
            e.data.needRedirect ? (t.currentTarget.dataset.fromPage = e.$root.query.fromPage, 
            this.$root.$redirect(a, t.currentTarget.dataset)) : this.$root.$navigate(a, t.currentTarget.dataset);
        }
    }
};
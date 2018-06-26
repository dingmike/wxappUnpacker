function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../common/m.js")), a = {
    name: "app",
    components: {
        imcall: e(require("../../../components/imcall/index.js")).default
    },
    _alwaysShow: !0,
    data: function() {
        var e = this.config.style[0];
        return {
            backColor: e.backColor,
            charColor: e.charColor,
            botColor: e.botColor,
            province: "",
            placeholder: "",
            sbQueryWord: "",
            needRedirect: !0,
            needChange: !0,
            isFixed: !0,
            acm: ""
        };
    },
    created: function() {},
    mounted: function() {
        var e = this;
        this.$on("__lazy-data__", function(t, a, o) {
            t && t.length > 0 && (e.province = t[0].province);
        });
    },
    methods: {
        onShow: function() {
            this.requestPlaceholder();
        },
        requestPlaceholder: function() {
            var e = this, a = {
                appPlat: wx.isH5 ? "m" : "sapp",
                code: "sketch"
            };
            t.default.MWP.request("mwp.pagani.moduleFacade", "1", a).then(function(t) {
                var a = "", o = "";
                if (t && t.data && t.data.sketch && t.data.sketch.data && t.data.sketch.data.frontword) {
                    var r = t.data.sketch.data;
                    a = r.frontword, o = r.query, e.setPlaceholder(a, o), e.acm = r.acm;
                } else e.failedEvent();
                e.eLogger(t);
            }).catch(function(t) {
                e.failedEvent();
            });
        },
        failedEvent: function() {
            this.setPlaceholder("搜索你想要的宝贝", "");
        },
        setPlaceholder: function(e, t) {
            this.placeholder = e, this.sbQueryWord = t;
        },
        goMiddlePage: function(e) {
            var t = this, a = "/pages/searchMiddle/index";
            this.acm && (e.currentTarget.dataset.acm = this.acm), this.data.needChange && (e.currentTarget.dataset.needChange = this.data.needChange), 
            t.data.needRedirect ? (e.currentTarget.dataset.fromPage = t.$root.query.fromPage, 
            this.$root.$redirect(a, e.currentTarget.dataset)) : this.$root.$navigate(a, e.currentTarget.dataset);
        },
        eLogger: function(e) {
            var t = e.data.sketch.data.acm ? e.data.sketch.data.acm : "", a = [];
            t && (this.acm = t, a.push(t), this.$root.$logE("0x00000000", {
                acms: a
            }));
        }
    }
};

exports.default = {
    componentOptions: a,
    renderComponentsFunc: function(e) {}
};
function o(o) {
    return o && o.__esModule ? o : {
        default: o
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

o(require("../../../common/m.js"));

var t = o(require("../../vxNodeModules/@meili/cube-common-popup/commonActPopup.js")), i = o(require("./moduleCache.js")), n = {
    name: "vx_tools_floatingAndPopup",
    _alwaysShow: !0,
    components: {
        CommonActPopup: t.default
    },
    data: function() {
        var o = this, t = this.floatSetting = this.config.floatSetting && this.config.floatSetting[0] || {}, i = this.popSetting = this.config.popSetting && this.config.popSetting[0] || {}, n = "";
        return t.floatWidth && t.floatHeight && (n = n + "width:" + t.floatWidth / 100 + "rem;height:" + t.floatHeight / 100 + "rem;"), 
        n = n + "bottom:" + t.botMargin / 100 + "rem;", "middle" === t.floatOption ? n += "left:50%; transform:translate(-50%,0)" : n = "floatRight" === t.floatOption ? n + "right:" + t.lrMargin / 100 + "rem;" : n + "left:" + t.lrMargin / 100 + "rem;", 
        n = this.transformStyleCode(n), {
            showFloat: !1,
            floatToPopup: !1,
            floatStyle: n,
            floatObj: {},
            showPop: !1,
            popObj: {
                width: i.popWidth || 480,
                height: i.popHeight || 660,
                backgroundImg: "",
                wxPopLink: "",
                h5PopLink: "",
                acm: "",
                showCloseIcon: !0,
                showBtn: !1
            },
            btnCallback: function() {
                o.showPop = !1;
            },
            closeCallback: function() {
                o.showPop = !1;
            }
        };
    },
    created: function() {
        var o = this.config.popMait && this.config.popMait[0] && this.config.popMait[0].sourceKey || "", t = this.config.floatMait && this.config.floatMait[0] && this.config.floatMait[0].sourceKey || "", i = this.moduleFun = this.config.moduleFun && this.config.moduleFun[0] && this.config.moduleFun[0].moduleFun || "float";
        this.floatToPopup = "floatToPopup" === i, this.floatSourceKey = t, this.popSourceKey = o;
    },
    mounted: function() {
        var o = this;
        this.$on("__lazy-data__", function(t, i) {
            var n = t[0];
            if (i === o.floatSourceKey && n && (o.floatObj = Object.assign({
                hasContent: !0
            }, o.floatObj, n), o.funShowFloat()), i === o.popSourceKey && n) {
                var e = {
                    backgroundImg: n.image,
                    wxPopLink: n.link_xcx,
                    h5PopLink: n.link,
                    acm: n.acm
                };
                o.popObj = Object.assign({
                    hasContent: !0
                }, o.popObj, e), o.funShowPop();
            }
        });
    },
    methods: {
        onGlobal: function() {
            this.getGlobal()._showPop && "popup" === this.moduleFun && (this.showPop = !0);
        },
        onShow: function() {
            this.showPop && (this.showPop = !1, this.setGlobal({
                _showPop: !1
            }));
        },
        funShowFloat: function() {
            "float" !== this.moduleFun && "floatToPopup" !== this.moduleFun || (this.showFloat = !0);
        },
        funShowPop: function() {
            var o = this.config.popSpecial && this.config.popSpecial[0] && this.config.popSpecial[0].handPop || !1, t = this.popSetting && +this.popSetting.showTimes, n = this.popSetting && this.popSetting.alwaysShow;
            if ("popup" === this.moduleFun && !o) if (n) this.showPop = !0; else {
                var e = new i.default("popupRemind_" + this.popSourceKey, t);
                e.getCache() || (this.showPop = !0, e.setCache());
            }
        },
        clickFloat: function(o) {
            var t = o.currentTarget.dataset, i = t.needPop, n = this.floatObj.wxa_appId, e = this.floatObj.wxa_link, a = t.xcxHref;
            i ? this.showPop = !0 : n && e ? this.vx_launch(e, {
                appId: n
            }, o) : a && this.vx_navigate(a, {}, o);
        }
    }
};

exports.default = {
    componentOptions: n,
    renderComponentsFunc: function(o) {
        o("common-act-popup", {
            showPopup: this.showPop,
            popSetting: this.popObj,
            btnCallback: this.btnCallback,
            closeCallback: this.closeCallback
        }, {}, "15247322529270");
    }
};
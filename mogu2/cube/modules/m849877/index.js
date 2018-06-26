function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, i = t(require("../../../common/m.js")), e = t(require("./countdown/index.js")), s = {
    name: "vx_pit_specialbrands",
    components: {},
    data: function() {
        var t = this.config.baseConfig[0];
        return {
            shops: [],
            isShowModule: !0,
            isRequesting: !0,
            standBlcoks: 0,
            rightCornorTxt: t.rightCornorTxt,
            rightCornorLink: t.rightCornorLink,
            rightCornorH5Link: t.rightCornorH5Link,
            boxStyle: this.transformStyleCode({
                marginTop: this.config.box[0].marginTop / 100 + "rem",
                marginBottom: this.config.box[0].marginBottom / 100 + "rem"
            }),
            emptyStyle: this.transformStyleCode({
                minHeight: this.config.dev[0].height / 100 + "rem",
                marginTop: this.config.box[0].marginTop / 100 + "rem",
                marginBottom: this.config.box[0].marginBottom / 100 + "rem"
            })
        };
    },
    mounted: function() {
        var t = this;
        this.cds = [], this.config.shop[0].size && (this.standBlcoks = parseInt(this.config.shop[0].size)), 
        this.$on("__lazy-data__", function(o) {
            t.config.dev[0].maxNumber && (o = o.splice(0, 1 * t.config.dev[0].maxNumber)), i.default.getServerTime().then(function(i) {
                t.serverTime = i.time, t.shops = t.mapRawData(o), t.isRequesting = !1, t.$nextTick(function() {
                    t.$root.triggerLazyload && t.$root.triggerLazyload();
                });
            });
        });
    },
    updated: function() {
        this.triggerLazyMotion();
    },
    methods: {
        onShow: function() {
            this.cds && this.cds.forEach(function(t, o) {
                return t && t.resume();
            });
        },
        onHide: function() {
            this.cds && this.cds.forEach(function(t, o) {
                return t && t.pause();
            });
        },
        onUnload: function() {
            this.cds && this.cds.forEach(function(t, o) {
                return t && t.stop();
            });
        },
        onGlobal: function() {
            var t = this.getGlobal().__tab_click_index__, o = this.config.dev[0].tabIndexs;
            this.config.dev[0].alwaysShow ? this.isShowModule = !0 : (o = o.replace(/^[^0-9]?$/i, ",").split(","), 
            this.isShowModule = o.includes("" + t));
        },
        instanceCountdown: function(t, o, i) {
            var s = this, n = new e.default({
                endTime: t,
                diff: o,
                update: function(t, o) {
                    s.shops[i].leftTime = t;
                },
                complete: function() {
                    s.shops[i].leftTime = "已结束", s.shops[i].isEnd = !0;
                }
            });
            this.cds.push(n), n.start();
        },
        mapRawData: function(t) {
            var o = this, i = +this.serverTime / 1e3 >>> 0, e = +new Date() / 1e3 >>> 0, s = i - e;
            return t.map(function(t, e) {
                t.effectETime <= i ? (t.isHide = !0, t.leftTime = "已结束", t.isEnd = !0) : (t.isEnd = !1, 
                (t.effectETime - i) / 86400 >= 1 ? t.leftTime = "剩下" + Math.floor((t.effectETime - i) / 86400) + "天" : (t.leftTime = "", 
                o.instanceCountdown(t.effectETime, s, e)));
            }), t;
        },
        timeoutCb: function(t) {
            this.shops[t].isEnd = !0;
        }
    }
};

exports.default = {
    componentOptions: s,
    renderComponentsFunc: function(t) {
        if (this.shops && this.shops.length > 0 && this.isShowModule && this.shops.length > 0 && this.shops) {
            var i = this.shops;
            "object" === o(this.shops) && "[object Array]" == Object.prototype.toString.call(this.shops) ? i = this.shops.concat() : "object" === o(this.shops) && "[object Object]" == Object.prototype.toString.call(this.shops) && (i = Object.assign({}, this.shops));
            for (var e in i) t("mvw-image", {
                lazyLoad: !0,
                src: this.shops[e].appShopHeadImg,
                "v-suffix": {
                    mode: "width",
                    "suffix-width": "750"
                },
                __vx_class: "brand-shop-image"
            }, {}, "15247322528220_" + e);
        }
    }
};
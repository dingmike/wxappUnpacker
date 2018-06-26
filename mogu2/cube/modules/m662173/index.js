function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, a = (t(require("../../../common/m.js")), {
    name: "vx_pit_singlebanner",
    components: {
        anchor: t(require("./anchor.js")).default
    },
    data: function() {
        return {
            isShow: !0,
            banners: [],
            configData: this.config,
            anchorData: this.config.pluginData.anchor,
            isRequestData: !this.config.mait[0].sourceKey
        };
    },
    computed: {
        bannerList: function() {
            var t = [];
            return this.config.banner.length > 0 && (t = this.config.banner), this.banners.length > 0 && (t = this.banners), 
            t;
        }
    },
    methods: {
        onGlobal: function() {
            var t = this.getGlobal().__tab_click_index__, n = (this.getGlobal().__tab_click_options__, 
            this.getGlobal().__tab_click_pid__, this.config.listenEvent[0].alwaysShow), a = this.config.listenEvent[0].showNum.replace(/\s/g, "").split(/,|，/g);
            if (!n) {
                var i = a.indexOf(t);
                this.isShow = i >= 0;
            }
        },
        genImgScale: function(t) {
            var n = /\_(\d+)x(\d+)\./, a = t.image.match(n);
            a[0] && a[1] && a[2] && (t._image = {
                w: a[1],
                h: a[2],
                scale: Math.round(a[2] / a[1] * 1e4) / 100
            });
        }
    },
    mounted: function() {
        var t = this;
        this.$on("__lazy-data__", function(n) {
            n.length && (n.forEach(function(n) {
                t.genImgScale(n);
            }), t.banners = n, t.isRequestData = !0, setTimeout(function() {
                t.__haskilled || t.triggerLazyMotion();
            }, 100));
        });
    }
});

exports.default = {
    componentOptions: a,
    renderComponentsFunc: function(t) {
        if (this.isShow) {
            if (this.bannerList) {
                var a = this.bannerList;
                "object" === n(this.bannerList) && "[object Array]" == Object.prototype.toString.call(this.bannerList) ? a = this.bannerList.concat() : "object" === n(this.bannerList) && "[object Object]" == Object.prototype.toString.call(this.bannerList) && (a = Object.assign({}, this.bannerList));
                for (var i in a) {
                    var e = this.bannerList[i];
                    this.isRequestData && e.image && t("mvw-image", {
                        mode: "widthFix",
                        lazyLoad: !0,
                        "v-suffix": {
                            mode: "width",
                            "suffix-width": 1e3
                        },
                        src: e.image,
                        __vx_class: "pit-img"
                    }, {}, "15247322528890_" + i);
                }
            }
            if (this.anchorData) {
                var o = this.anchorData;
                "object" === n(this.anchorData) && "[object Array]" == Object.prototype.toString.call(this.anchorData) ? o = this.anchorData.concat() : "object" === n(this.anchorData) && "[object Object]" == Object.prototype.toString.call(this.anchorData) && (o = Object.assign({}, this.anchorData));
                for (var s in o) {
                    var r = this.anchorData[s];
                    t("anchor", {
                        dataCubeAcm: r.acm,
                        item: r,
                        acmIndex: s,
                        acmTotal: this.anchorData.length
                    }, {}, "15247322528891_" + s);
                }
            }
        }
    }
};
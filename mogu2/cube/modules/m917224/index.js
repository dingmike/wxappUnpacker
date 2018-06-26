Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../../common/m.js")), n = {
    name: "shareReward",
    components: {},
    data: function() {
        var e = this.config.baseConfig[0];
        return {
            moduleBgImg: e.moduleBgImg,
            moduleBgColor: e.moduleBgColor,
            btnBg: e.btnBg,
            btnLink: e.btnLink,
            xcxBtnLink: e.xcxBtnLink,
            isShowInfo: !1,
            shareCoupon: 0,
            shareValue: 0,
            defaultInfo: "",
            marqueeInfo: []
        };
    },
    mounted: function() {
        var e = this;
        this.fetchMWP().then(function(n) {
            var t = n.total, o = n.value;
            e.shareCoupon = t, e.shareValue = o;
        }).catch(function(e) {
            console.log(e);
        }), this.$on("__lazy-data__", function(n) {
            var t = [], o = [];
            n.length > 0 && (n.length > 20 && (n.length = 20), t = e.shuffle(n)), t.forEach(function(n, t) {
                e.marqueeInfo.push(n.marqueeInfo), n.defaultInfo && o.push(n.defaultInfo);
            }), e.defaultInfo = o[0];
        });
    },
    methods: {
        fetchMWP: function() {
            var n = e.default.MWP;
            return new Promise(function(e, t) {
                n.request("mwp.score.queryAccountInfo", "1.0", {}).then(n.filterResult).then(function(n) {
                    var t = Object.assign({
                        total: 0,
                        value: ""
                    }, n);
                    e(t);
                }).catch(function(e) {
                    t({
                        msg: e
                    });
                });
            });
        },
        shuffle: function(e) {
            for (var n = e.length - 1; n >= 0; n--) {
                var t = Math.floor(Math.random() * (n + 1)), o = e[t];
                e[t] = e[n], e[n] = o;
            }
            return e;
        }
    }
};

exports.default = {
    componentOptions: n,
    renderComponentsFunc: function(e) {
        e("mvw-image", {
            mode: "widthFix",
            lazyLoad: !1,
            "v-suffix": {
                mode: "width",
                "suffix-width": 750
            },
            src: this.moduleBgImg,
            __vx_class: "wrapper-bg"
        }, {}, "15247322520040"), e("mvw-image", {
            mode: "widthFix",
            lazyLoad: !1,
            "v-suffix": {
                mode: "width",
                "suffix-width": 750
            },
            src: this.btnBg,
            __vx_class: "sr-btn"
        }, {}, "15247322520081");
    }
};
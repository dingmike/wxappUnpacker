Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, i = (function(t) {
    t && t.__esModule;
}(require("../../../common/m.js")), {
    components: {},
    data: function() {
        var t = this.config.collapse[0], i = this.config.mait[0], o = this.config.image[0], e = this.config.module[0], n = this.config.block[0], r = this.config.tag[0];
        return {
            count: i.size,
            imageWidth: o.width,
            isShow: !0,
            isRequesting: !0,
            isCollapse: t.isCollapse,
            order: n.order,
            list: [],
            baseStyle: this.transformStyleCode({
                background: e.bgColor,
                marginTop: e.marginTop / 100 + "rem",
                marginBottom: e.marginBottom / 100 + "rem"
            }),
            collapseStyle: this.transformStyleCode({
                height: t.height / 100 + "rem",
                marginBottom: this.config.module[0].marginBottom / 100 + "rem"
            }),
            blockWrapStyle: this.transformStyleCode({
                paddingTop: e.paddingTop / 100 + "rem",
                paddingBottom: e.paddingBottom / 100 + "rem",
                paddingLeft: e.paddingSide / 100 + "rem",
                paddingRight: e.paddingSide / 100 + "rem"
            }),
            imageStyle: this.transformStyleCode({
                width: o.width / 100 + "rem",
                height: o.height / 100 + "rem",
                marginBottom: o.marginBottom / 100 + "rem",
                marginRight: o.marginRight / 100 + "rem"
            }),
            tagStyle: this.transformStyleCode({
                width: r.width / 100 + "rem",
                height: r.height / 100 + "rem",
                top: r.top / 100 + "rem",
                right: r.right / 100 + "rem"
            }),
            moreStyle: this.transformStyleCode({
                top: t.height / 100 + "rem",
                backgroundImage: "url(" + t.bgImg + ")"
            })
        };
    },
    computed: {
        emptyStyle: function() {
            var t = this.config.block[0].colNum, i = this.count % t ? parseInt(this.count / t) + 1 : this.count / t, o = this.config.block[0].marginBottom, e = this.config.image[0].height, n = this.config.image[0].marginBottom, r = this.config.block[0].order, s = this.config.module[0], m = "col" === r ? e + n + 45 : e > 45 ? e : 45;
            return this.transformStyleCode({
                height: ((m + o) * i + s.paddingTop + s.paddingBottom) / 100 + "rem"
            });
        },
        blockStyle: function() {
            var t = this.config.block[0], i = this.config.module[0], o = this.config.block[0].colNum, e = (750 - 2 * i.paddingSide) / o;
            return this.transformStyleCode({
                marginRight: t.marginRight / 100 + "rem",
                marginBottom: t.marginBottom / 100 + "rem",
                width: e / 100 + "rem"
            });
        }
    },
    methods: {
        getData: function() {
            var t = this;
            this.$on("__lazy-data__", function(i, o) {
                var e = (i || []).slice(0, t.count);
                t.isShow = e.length > 0, t.isRequesting = !1, t.list = e;
            });
        },
        showMore: function() {
            this.isCollapse = !1;
        }
    },
    mounted: function() {
        this.getData();
    },
    updated: function() {
        this.triggerLazyMotion();
    }
});

exports.default = {
    componentOptions: i,
    renderComponentsFunc: function(i) {
        if (this.isShow && this.list) {
            var o = this.list;
            "object" === t(this.list) && "[object Array]" == Object.prototype.toString.call(this.list) ? o = this.list.concat() : "object" === t(this.list) && "[object Object]" == Object.prototype.toString.call(this.list) && (o = Object.assign({}, this.list));
            for (var e in o) {
                var n = this.list[e];
                i("mvw-image", {
                    lazyLoad: !0,
                    src: n.image,
                    "v-suffix": {
                        mode: "width",
                        "suffix-width": this.imageWidth
                    },
                    __vx_class: "block-image",
                    __vx_style: this.imageStyle
                }, {}, "15247322526170_" + e), n.imageTag && i("mvw-image", {
                    lazyLoad: !0,
                    src: n.imageTag,
                    mode: "aspectFill",
                    "v-suffix": {
                        mode: "width"
                    },
                    __vx_class: "block-item-tag",
                    __vx_style: this.tagStyle
                }, {}, "15247322526171_" + e);
            }
        }
    }
};
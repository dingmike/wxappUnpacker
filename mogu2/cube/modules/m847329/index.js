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
    name: "vx_pit_image_title_link",
    components: {},
    data: function() {
        var t = this.config.length[0].minCount, i = this.config.length[0].maxCount, o = t && t > 0 ? t : 1, e = i && i >= o ? i : o, n = this.config.collapse ? this.config.collapse[0] : {};
        return {
            isShow: !0,
            isRequesting: !0,
            isCollapse: n.isCollapse,
            list: [],
            configData: this.config,
            minCount: o,
            maxCount: e,
            emptyStyle: this.transformStyleCode({
                minHeight: this.config.listenEvent[0].height / 100 + "rem",
                marginTop: this.config.box[0].marginTop / 100 + "rem",
                marginBottom: this.config.box[0].marginBottom / 100 + "rem",
                backgroundColor: this.config.box[0].bgColor
            }),
            boxStyle: this.transformStyleCode({
                paddingTop: this.config.box[0].paddingTop / 100 + "rem",
                paddingBottom: this.config.box[0].paddingBottom / 100 + "rem",
                paddingLeft: this.config.box[0].paddingLeft / 100 + "rem",
                marginTop: this.config.box[0].marginTop / 100 + "rem",
                marginBottom: this.config.box[0].marginBottom / 100 + "rem",
                backgroundColor: this.config.box[0].bgColor,
                backgroundImage: "url(" + (this.config.box[0].bgImage || this.config.box[0].bgImageBak) + ")"
            }),
            itemStyle: this.transformStyleCode({
                width: this.config.item[0].width / 100 + "rem",
                height: this.config.item[0].height / 100 + "rem",
                marginRight: this.config.item[0].marginRight / 100 + "rem",
                marginBottom: this.config.item[0].marginBottom / 100 + "rem",
                borderRadius: this.config.item[0].borderRadius / 100 + "rem"
            }),
            imageStyle: this.transformStyleCode({
                width: this.config.image[0].width / 100 + "rem",
                height: this.config.image[0].height / 100 + "rem",
                top: this.config.image[0].top / 100 + "rem",
                left: this.config.image[0].left / 100 + "rem",
                borderRadius: this.config.item[0].borderRadius / 100 + "rem"
            }),
            titleStyle: this.transformStyleCode({
                width: this.config.title[0].width / 100 + "rem",
                height: this.config.title[0].height / 100 + "rem",
                top: this.config.title[0].top / 100 + "rem",
                left: this.config.title[0].left / 100 + "rem",
                fontSize: this.config.title[0].fontSize / 100 + "rem",
                textAlign: this.config.title[0].textAlign,
                fontWeight: this.config.title[0].isBold ? "bold" : "normal"
            }),
            subTitleStyle: this.transformStyleCode({
                width: this.config.subTitle[0].width / 100 + "rem",
                height: this.config.subTitle[0].height / 100 + "rem",
                top: this.config.subTitle[0].top / 100 + "rem",
                left: this.config.subTitle[0].left / 100 + "rem",
                fontSize: this.config.subTitle[0].fontSize / 100 + "rem",
                textAlign: this.config.subTitle[0].textAlign,
                fontWeight: this.config.subTitle[0].isBold ? "bold" : "normal"
            }),
            tagStyle: this.transformStyleCode({
                width: this.config.tag[0].width / 100 + "rem",
                height: this.config.tag[0].height / 100 + "rem",
                top: this.config.tag[0].top / 100 + "rem",
                right: this.config.tag[0].right / 100 + "rem"
            }),
            moreStyle: this.transformStyleCode({
                top: n.height / 100 + "rem",
                backgroundImage: "url(" + n.bgImg + ")"
            }),
            collapseStyle: this.transformStyleCode({
                height: n.height / 100 + "rem",
                marginBottom: this.config.box[0].marginBottom / 100 + "rem"
            })
        };
    },
    mounted: function() {
        this.init();
    },
    updated: function() {
        this.triggerLazyMotion();
    },
    methods: {
        init: function() {
            this._lazyData();
        },
        onGlobal: function() {
            var t = this.getGlobal().__tab_click_index__, i = (this.getGlobal().__tab_click_options__, 
            this.getGlobal().__tab_click_pid__, this.config.listenEvent[0].alwaysShow), o = this.config.listenEvent[0].showNum.replace(/\s/g, "").split(/,|，/g);
            if (!i) {
                var e = o.indexOf(t);
                this.isShow = e >= 0, console.log("MCUBE_MOD_ID_847329_showArr: ", o), console.log("MCUBE_MOD_ID_847329_tabIndex: ", t);
            }
        },
        _lazyData: function() {
            var t = this;
            this.config.mait[0].sourceKey || (this.isRequesting = !1), this.$on("__lazy-data__", function(i, o) {
                var e = (i || []).slice(0, t.maxCount);
                t.list = e, t.isRequesting = !1;
            });
        },
        showMore: function() {
            this.isCollapse = !1;
        }
    }
});

exports.default = {
    componentOptions: i,
    renderComponentsFunc: function(i) {
        if (this.isShow && this.list && this.list.length >= this.minCount && this.list) {
            var o = this.list;
            "object" === t(this.list) && "[object Array]" == Object.prototype.toString.call(this.list) ? o = this.list.concat() : "object" === t(this.list) && "[object Object]" == Object.prototype.toString.call(this.list) && (o = Object.assign({}, this.list));
            for (var e in o) {
                var n = this.list[e];
                n.image && i("mvw-image", {
                    lazyLoad: !0,
                    src: n.image,
                    mode: "aspectFill",
                    "v-suffix": {
                        mode: "width"
                    },
                    __vx_class: "active-entry-item-image",
                    __vx_style: this.imageStyle
                }, {}, "15247322529810_" + e), n.imageTag && i("mvw-image", {
                    lazyLoad: !0,
                    src: n.imageTag,
                    mode: "aspectFill",
                    "v-suffix": {
                        mode: "width"
                    },
                    __vx_class: "active-entry-item-tag",
                    __vx_style: this.tagStyle
                }, {}, "15247322529811_" + e);
            }
        }
    }
};
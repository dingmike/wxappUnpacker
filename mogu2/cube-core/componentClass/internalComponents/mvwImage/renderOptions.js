function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = t(require("../../../../common/utils/imgUrlTool.js")), e = t(require("../../utils/switch"));

require("../../utils/index");

exports.default = {
    name: "mvw-image",
    props: {
        src: String,
        __vx_class: String,
        mode: String,
        __vx_style: String,
        "v-suffix": Object,
        lazyLoad: {
            type: Boolean,
            default: !0
        }
    },
    data: function() {
        return {
            inView: !e.default.lazyload,
            lazyLoad: this.lazyLoad,
            classId: "",
            exUrl: this["v-suffix"] ? this.imgUrlTool(this.src, this["v-suffix"]) : this.src
        };
    },
    watch: {
        src: function(t) {
            this.exUrl = this["v-suffix"] ? this.imgUrlTool(t, this["v-suffix"]) : t;
        }
    },
    computed: {
        transStyle: function() {
            var t = this;
            if ("[object Object]" === Object.prototype.toString.call(this.__vx_style)) {
                var i = [];
                return (Object.keys(this.__vx_style) || []).forEach(function(e) {
                    i.push(e + ":" + t.style[e]);
                }), i.join(";");
            }
            return this.__vx_style;
        }
    },
    methods: {
        imgUrlTool: function(t, e) {
            switch (e.mode) {
              case "width":
                return i.default.getWidthSuffix(t, e["suffix-width"]);

              case "goods":
                return i.default.getGoodsRatioSuffix(t, e["suffix-width"], e["suffix-ratio"]);

              case "def":
                return i.default.getDefSuffix(t);

              case "no-resize":
                return i.default.getNoResizeSuffix(t);

              default:
                return i.default.getDefSuffix(t);
            }
        },
        handleError: function(t) {
            this.binderror && this.binderror(t);
        },
        handleLoad: function(t) {
            this.bindload && this.bindload(t);
        },
        modInView: function() {
            !this.inView && e.default.lazyload && (this.inView = !0);
        },
        modNotInView: function() {
            this.inView && e.default.lazyload && (this.inView = !1);
        }
    }
};
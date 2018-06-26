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
    name: "recommend1and6",
    components: {},
    data: function() {
        return {
            isEmpty: !1,
            list: []
        };
    },
    computed: {
        style: function() {
            return this.config.style[0];
        },
        dataConfig: function() {
            return this.config.data[0];
        },
        tagImg: function() {
            return this.style.tagImg || "https://s10.mogucdn.com/mlcdn/c45406/180309_209kkij24j7ij054b999lbk98g20b_50x48.jpg";
        },
        placeHolder: function() {
            return this.dataConfig.size || 10;
        }
    },
    mounted: function() {
        var t = this;
        this.$on("__lazy-data__", function(i, e, o) {
            0 === i.length && (t.isEmpty = !0), i.map(function(i, e) {
                i.list && i.list.length > 0 && (i.isShowTwoRowStyle = t.isShowTwoRowStyle(i), i.list = t.resetListItemData(i));
            }), t.list = i;
        });
    },
    methods: {
        resetListItemData: function(t) {
            var i = t.list, e = i.length || 0, o = 0, s = this.isShowTwoRowStyle(t);
            if (e < 3) i = []; else {
                o = !s && e > 6 ? 7 : 3, i = i.slice(0, o);
                for (var n = 0; n < i.length; n++) i[n].className = "rcm-item-" + (s ? "single-" : "double-") + n;
            }
            return i;
        },
        isShowTwoRowStyle: function(t) {
            return "xcx_1x6" !== t.modelType;
        }
    }
});

exports.default = {
    componentOptions: i,
    renderComponentsFunc: function(i) {
        if (this.list.length > 0 && this.list) {
            var e = this.list;
            "object" === t(this.list) && "[object Array]" == Object.prototype.toString.call(this.list) ? e = this.list.concat() : "object" === t(this.list) && "[object Object]" == Object.prototype.toString.call(this.list) && (e = Object.assign({}, this.list));
            for (var o in e) {
                var s = this.list[o];
                if (s.list && s.list.length > 0 && s.list) {
                    var n = s.list;
                    "object" === t(s.list) && "[object Array]" == Object.prototype.toString.call(s.list) ? n = s.list.concat() : "object" === t(s.list) && "[object Object]" == Object.prototype.toString.call(s.list) && (n = Object.assign({}, s.list));
                    for (var l in n) {
                        var c = s.list[l];
                        0 == l && i("mvw-image", {
                            lazyLoad: !0,
                            src: c.image || c.whiteImage || "",
                            mode: "aspectFill",
                            "v-suffix": {
                                mode: "aspectFill",
                                "suffix-width": "250",
                                "suffix-ratio": "2:1"
                            },
                            __vx_class: "rcm-item-image"
                        }, {}, "15247322521390_" + o + "_" + l), l > 0 && i("mvw-image", {
                            lazyLoad: !0,
                            src: c.whiteImage || "",
                            mode: "aspectFill",
                            "v-suffix": {
                                mode: "goods",
                                "suffix-width": "250",
                                "suffix-ratio": "1:1"
                            },
                            __vx_class: "rcm-item-image"
                        }, {}, "15247322521401_" + o + "_" + l);
                    }
                }
            }
        }
    }
};
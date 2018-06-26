function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function i(t) {
    if (Array.isArray(t)) {
        for (var i = 0, e = Array(t.length); i < t.length; i++) e[i] = t[i];
        return e;
    }
    return Array.from(t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, s = require("../../../common/m.js"), n = (t(s), t(require("../../../common/ticker/index.js"))), r = {
    name: "swiper",
    components: {},
    data: function() {
        var t = this.config.style && this.config.style[0], i = {}, e = {}, s = {}, n = {};
        if (t) {
            var r = t.height ? t.height : 320;
            i = {
                height: r / 100 + "rem",
                backgroundColor: t.bgColor,
                backgroundImage: "url(" + (t.bgImage || t.bgImageBak) + ")",
                backgroundSize: "contain"
            }, e = {
                width: (750 - 2 * t.marginLeft) / 100 + "rem",
                marginTop: t.marginTop / 100 + "rem",
                marginBottom: t.marginBottom / 100 + "rem",
                marginLeft: t.marginLeft / 100 + "rem",
                marginRight: t.marginLeft / 100 + "rem"
            }, s = {
                height: r / 100 + "rem",
                backgroundColor: t.bgColor
            }, t.scrollPos && "left" == t.scrollPos && (n = {
                left: t.marginLeft / 100 + "rem",
                transform: "none",
                bottom: (t.scrollLeft ? t.scrollLeft : 0) / 100 + "rem"
            });
        }
        return {
            list: null,
            resetList: null,
            index: 0,
            transformStyle: "translate3d(0,0,0)",
            transiting: !1,
            boxStyle: this.transformStyleCode(i),
            imgStyle: this.transformStyleCode(e),
            emptyStyle: this.transformStyleCode(s),
            scrollPosStyle: this.transformStyleCode(n)
        };
    },
    created: function() {
        var t = this;
        this.init(), this.config.bannerFromMait[0].sourceKey ? this.$on("__lazy-data__", function(i) {
            t.list = i || [], t.resetList = t.resetSliderData(i) || [], t.autoMove();
        }) : (this.list = this.config.slider || [], this.resetList = this.resetSliderData(this.list) || [], 
        this.autoMove());
    },
    methods: {
        onHide: function() {
            this.tickObj && this.tickObj.pause();
        },
        onShow: function() {
            this.tickObj && this.tickObj.resume();
        },
        init: function() {
            var t = this;
            this.startX = 0, this.originX = 0, this.waiting = !1;
            try {
                s.System.get("systemInfo").then(function(i) {
                    t.screenWidth = i.screenWidth, t.initTransition();
                });
            } catch (t) {}
        },
        initTransition: function() {
            this.transitionX = -this.screenWidth, this.transformStyle = "translate3d(" + -this.screenWidth + "px,0,0)";
        },
        resetSliderData: function(t) {
            var e = [];
            return t.length > 0 && (e = [ t[t.length - 1] ].concat(i(t), [ t[0] ])), e;
        },
        autoMove: function() {
            var t = this;
            if (this.list.length > 1) {
                var i = (0, n.default)();
                this.tickObj = i.interval(function() {
                    if (!t.__hasKilled && (t.list || []).length) {
                        var i = t.index + 1;
                        t.moveToNext(i);
                    }
                }, 5e3), i.start();
            }
        },
        handleTouchStart: function(t) {
            this.list.length > 1 && (this.tickObj.pause(), this.startX = t.changedTouches[0].clientX, 
            this.startY = t.changedTouches[0].clientY, this.originX = this.transitionX);
        },
        handleTouchMove: function(t) {
            if (!this.waiting) {
                var i = t.changedTouches[0], e = Math.abs(i.clientX - this.startX), s = Math.abs(i.clientY - this.startY);
                if (e && s / e < 1.8 && t.preventDefault && t.preventDefault(), this.list.length > 1) {
                    var n = i.clientX - this.startX;
                    this.transitionX = this.originX + n, this.transformStyle = "translate3d(" + this.transitionX + "px,0,0)";
                }
            }
        },
        handleTouchEnd: function(t) {
            if (this.list.length > 1) {
                var i = t.changedTouches[0].clientX - this.startX;
                if (Math.abs(i) > 50) {
                    var e = this.index + (i > 0 ? -1 : 1);
                    this.moveToNext(e);
                } else this.moveToSelf();
            }
        },
        moveToSelf: function() {
            this.transition({
                nextTransitionX: this.originX,
                nextIndex: this.index,
                moveToFirst: !1,
                moveToLast: !1
            });
        },
        moveToNext: function(t) {
            var i = void 0, e = !1, s = !1;
            t < 0 ? (t = this.list.length - 1, i = 0, e = !0) : t >= this.list.length ? (t = 0, 
            i = (this.list.length + 1) * -this.screenWidth, s = !0) : i = (t + 1) * -this.screenWidth, 
            this.transition({
                nextTransitionX: i,
                nextIndex: t,
                moveToFirst: e,
                moveToLast: s
            });
        },
        transition: function(t) {
            var i = this, e = t.nextTransitionX, s = t.nextIndex, n = t.moveToFirst, r = t.moveToLast;
            this.waiting || (this.waiting = !0, this.transiting = !0, this.transitionX = e, 
            this.transformStyle = "translate3d(" + this.transitionX + "px,0,0)", this.index = s, 
            setTimeout(function() {
                i.__hasKilled || (i.transiting = !1, r && (i.transitionX = 1 * -i.screenWidth, i.transformStyle = "translate3d(" + i.transitionX + "px,0,0)"), 
                n && (i.transitionX = i.list.length * -i.screenWidth, i.transformStyle = "translate3d(" + i.transitionX + "px,0,0)"), 
                setTimeout(function() {
                    i.waiting = !1, i.tickObj.resume(!0);
                }, 100));
            }, 300));
        }
    }
};

exports.default = {
    componentOptions: r,
    renderComponentsFunc: function(t) {
        if (this.resetList) if (this.resetList && 0 === this.resetList.length) ; else if (this.resetList && this.resetList.length > 0 && this.resetList) {
            var i = this.resetList;
            "object" === e(this.resetList) && "[object Array]" == Object.prototype.toString.call(this.resetList) ? i = this.resetList.concat() : "object" === e(this.resetList) && "[object Object]" == Object.prototype.toString.call(this.resetList) && (i = Object.assign({}, this.resetList));
            for (var s in i) t("mvw-image", {
                src: this.resetList[s].image,
                "v-suffix": {
                    mode: "width"
                },
                mode: "widthFix",
                __vx_class: "swiper-slide_img",
                __vx_style: this.imgStyle
            }, {}, "15247322525350_" + s);
        }
    }
};
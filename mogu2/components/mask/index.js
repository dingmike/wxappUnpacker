Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    name: "Mask",
    _timer: null,
    data: function() {
        return {
            isShow: null,
            zIndex: 99
        };
    },
    onLoad: function() {},
    onReady: function() {},
    methods: {
        show: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            clearTimeout(this._timer);
            var i = t.zIndex || this.data.zIndex, e = t.opacity;
            this.setData({
                isShow: !0,
                zIndex: i,
                opacity: e,
                amimation: !0
            });
        },
        showWithoutAnimation: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            clearTimeout(this._timer);
            var i = t.zIndex || this.data.zIndex, e = t.opacity;
            this.setData({
                isShow: !0,
                zIndex: i,
                opacity: e,
                amimation: !1
            });
        },
        hide: function() {
            var t = this;
            this.setData({
                isShow: !1
            }), this._timer = setTimeout(function() {
                t.setData({
                    isShow: null,
                    opacity: null
                });
            }, 400);
        },
        forceHide: function() {
            this.setData({
                isShow: null,
                opacity: null
            });
        },
        onMaskClick: function() {
            this.$parent.$emit("hideDialog");
        }
    }
};
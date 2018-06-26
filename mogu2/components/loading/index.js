Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    name: "Loading",
    _timer: null,
    data: function() {
        return {
            show: !1
        };
    },
    onLoad: function() {},
    onReady: function() {},
    methods: {
        show: function() {
            var t = this;
            this._timer && clearTimeout(this._timer), this._timer = setTimeout(function() {
                t._timer = null, t.setData({
                    show: !0
                });
            }, 500);
        },
        hide: function() {
            this._timer && (clearTimeout(this._timer), this._timer = null), this.setData({
                show: !1
            });
        }
    }
};
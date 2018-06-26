Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = {
    _timer: null,
    data: function() {
        return {
            show: !1,
            message: ""
        };
    },
    methods: {
        show: function(t, e, i) {
            var s = this;
            "function" == typeof e ? (i = e, e = 2e3) : void 0 === e && (e = 2e3), clearTimeout(this._timer), 
            this.setData({
                show: !0,
                message: t
            }), e > 0 && e !== 1 / 0 && (this._timer = setTimeout(function() {
                s.hide(), i && i();
            }, e));
        },
        hide: function() {
            this._timer = clearTimeout(this._timer), this.setData({
                show: !1
            });
        }
    }
};
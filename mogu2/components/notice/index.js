Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../common/im/util"));

exports.default = {
    _timer: null,
    data: function() {
        return {
            show: !1,
            icon: null,
            title: "",
            time: 5e3,
            y: 0,
            desc: "",
            businessId: 0,
            trigger: function() {},
            cancel: function() {}
        };
    },
    onHide: function() {
        this.hide();
    },
    methods: {
        tap: function(t) {
            var e = t.target, i = this.data, n = i.trigger, a = i.cancel;
            e.dataset && e.dataset.iscancel ? a() : n(), this.hide();
        },
        bindContact: function(e) {
            var i = e.detail, n = i.path, a = i.query;
            n && "/" !== n && (n = n.replace(/^\/\//i, "/"), this.$root.$navigate(n + "?" + t.default.queryString(a)));
        },
        show: function() {
            var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (this.$parent) {
                var i = this.data.show;
                this.timer && clearTimeout(this.timer), i ? this.hide(function() {
                    t._doShow(e);
                }) : this._doShow(e);
            }
        },
        _doShow: function(t) {
            var e = this;
            t.show = !0, this.setData(t, function() {
                e.setData({
                    y: 100
                });
                var t = e.data.time;
                e.timer = setTimeout(function() {
                    e.hide();
                }, t);
            });
        },
        hide: function() {
            var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : function() {};
            this.setData({
                y: 0
            }, function() {
                setTimeout(function() {
                    t.setData({
                        show: !1
                    }), e();
                }, 200);
            });
        },
        start: function(t) {
            t.touches.length > 0 && (this.startY = t.touches[0].clientY);
        },
        end: function(t) {
            if (t.changedTouches.length > 0) {
                var e = t.changedTouches[0].clientY, i = this.startY - e;
                if (0 === i) return;
                i > 35 ? ((0, this.data.cancel)(), this.hide()) : this.setData({
                    y: 100
                });
            }
        }
    }
};
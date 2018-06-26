Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        return {
            bnbList: [],
            isShowBottomBar: !1
        };
    },
    methods: {
        initBottomNavBar: function(t) {
            console.log(this.$root.query.hasBot), this.$root.query.hasBot && this.setData({
                isShowBottomBar: !0
            }), this.lazyData(), this.makeup();
        },
        lazyData: function() {
            var t = this;
            this.$on("__lazy-data__", function(a, o, i) {
                if (i && o && t.data && t.data.pids && t.data.pids.length > 0) {
                    var s = o[t.data.pids[0]].list || [];
                    t.transData(s);
                }
            });
        },
        makeup: function() {
            var t = this;
            this.$on("__makeup_done__", function(a, o, i) {
                if (i && o && t.data && t.data.makeupKey && o[t.data.makeupKey]) {
                    var s = o[t.data.makeupKey].list || [];
                    t.transData(s);
                }
            });
        },
        transData: function(t) {
            var a = "/" + this.$root.route || this.$root.__route__, o = void 0;
            t.map(function(t) {
                o = t.link.split("?")[0], t.isActive = a.indexOf(o) >= 0, console.log(o);
            }), this.setData({
                bnbList: t
            });
        }
    }
};
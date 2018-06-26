Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    name: "totalMount",
    data: function() {
        return {
            isShow: !1,
            rightStatus: !1,
            status: -1,
            ammountDotLeftArray: [ 0 ],
            ammountDotRightArray: [ 0, 0 ],
            info: {}
        };
    },
    init: function(t) {
        for (var o = {
            defaultImage: "",
            miniAppGoUrl: ""
        }, i = Object.assign(o, t.info || {}), a = Math.floor(t.info.remain / 100).toString().split(""), n = Math.floor(t.info.remain % 100).toString().split(""), r = n.length, s = 0; s < 2 - r; s++) n.unshift(0);
        this.setData({
            ammountDotLeftArray: a,
            ammountDotRightArray: n,
            isShow: !0,
            rightStatus: t.rightStatus,
            status: t.status,
            info: i || {}
        });
    },
    onReady: function() {},
    methods: {
        gotoGround: function() {
            this.$root.$navigate(this.data.info.miniAppGoUrl);
        }
    }
};
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        return {};
    },
    onLoad: function() {},
    methods: {
        init: function(t, e) {
            var i = t.pintuanInfo || {}, n = e.activityId || "", a = i.lotteryResultList || [];
            this.setData({
                tuanType: i.tuanType,
                lotteryResultList: a,
                activityId: n
            });
        }
    }
};
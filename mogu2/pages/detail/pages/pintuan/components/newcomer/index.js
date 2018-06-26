Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        return {};
    },
    onLoad: function() {},
    methods: {
        init: function(t) {
            var e = t.pintuanInfo, n = e && e.isNew;
            this.setData({
                isNew: n
            });
        }
    }
};
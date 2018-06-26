Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        return {};
    },
    methods: {
        init: function(t) {
            var e = t.progressData;
            this.setData(Object.assign({}, e, {
                isShow: e && "{}" !== JSON.stringify(e) || !1
            }));
        }
    }
};
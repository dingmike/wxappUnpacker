Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        return {};
    },
    methods: {
        goWall: function(t) {
            var e = t.currentTarget.dataset.page;
            this.$root.$navigate(e);
        }
    }
};
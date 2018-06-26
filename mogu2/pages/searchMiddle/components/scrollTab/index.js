Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        return {
            activeIndex: 0,
            navList: []
        };
    },
    initTab: function(t) {
        this.setData({
            navList: t
        });
    },
    setTabHighlight: function(t) {
        this.setData({
            activeIndex: t
        });
    },
    methods: {
        changeTab: function(t) {
            var e = t.currentTarget.dataset.tabIndex;
            this.data.activeIndex !== e && (this.setTabHighlight(e), this.$root.handleChangeTab(e));
        }
    }
};
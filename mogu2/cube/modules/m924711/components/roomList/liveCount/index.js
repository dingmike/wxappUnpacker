Object.defineProperty(exports, "__esModule", {
    value: !0
});

!function(t) {
    t && t.__esModule;
}(require("../../../../../../common/m.js"));

exports.default = {
    name: "liveCount",
    methods: {
        setUpTabId: function(t) {
            this.tabId = t, this.totalCount = 0, this.viewedCount = 0, this.updateLiveCount();
        },
        setUpLiveCount: function(t, e) {
            this.totalCount = t, this.viewedCount = e, this.updateLiveCount();
        },
        updateLiveCount: function() {
            var t = this.canShowLiveCount();
            this.show !== t && (this.show = t, this.show ? this.setData({
                show: !0,
                totalCount: this.totalCount,
                viewedCount: this.viewedCount
            }) : this.setData({
                show: !1
            })), this.show && this.setData({
                totalCount: this.totalCount,
                viewedCount: this.viewedCount
            });
        },
        canShowLiveCount: function() {
            var t = !1;
            return 1 === this.tabId && this.viewedCount >= 40 && (t = !0), t;
        }
    }
};
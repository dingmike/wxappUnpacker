Object.defineProperty(exports, "__esModule", {
    value: !0
});

!function(t) {
    t && t.__esModule;
}(require("../../../../../common/m.js"));

exports.default = {
    name: "tabNavigation",
    methods: {
        setSelectedTabChangeCallback: function(t) {
            this.selectedTabChangeCallback = t;
        },
        setNavData: function(t) {
            this.navData = t, this.updateTabNav();
        },
        updateTabNav: function() {
            this.show = this.navData && this.navData.length > 0, this.show && (this.setTabItemMinWidth(), 
            this.setDefaultNavPosition(), this.setDefaultSelectedTabItem()), this.setData({
                show: this.show,
                tabList: this.navData,
                tabItemMinWidth: this.tabItemMinWidth,
                fixed: this.fixed,
                scrollIntoViewId: this.scrollIntoViewId
            });
        },
        setTabItemMinWidth: function() {
            var t = this.navData.length;
            this.tabItemMinWidth = 750 / t - 70;
        },
        setDefaultNavPosition: function() {
            this.fixed = !1;
        },
        setDefaultSelectedTabItem: function() {
            for (var t = void 0, e = 0; e < this.navData.length; e++) {
                var a = this.navData[e];
                if (void 0 != this.selectedTabItemId && a.id == this.selectedTabItemId) {
                    t = e;
                    break;
                }
                void 0 == t && a.active && (t = e);
            }
            void 0 == t && (t = 0), this.selectTabItemAtIndex(t), this.scrollIntoViewId = "tabItemId_" + t;
        },
        selectTabItemAtIndex: function(t) {
            if (this.scrollIntoViewId = "", !(t < 0 || t >= this.navData.length)) for (var e = 0; e < this.navData.length; e++) {
                var a = this.navData[e];
                e == t ? (this.selectedTabItemId = a.id, this.trackTabItemSelectionEvent(a), a.selected = !0, 
                this.notifySelectedTabChanged(a)) : a.selected = !1;
            }
        },
        trackTabItemSelectionEvent: function(t) {
            var e = {
                tabID: t.id + ""
            };
            this.$root.$logE("016000505", e);
        },
        notifySelectedTabChanged: function(t) {
            this.selectedTabChangeCallback && this.selectedTabChangeCallback(t);
        },
        formSubmit: function(t) {
            var e = t.detail.formId;
            this.$root.$logForm(e, 2);
        },
        tabItemSelected: function(t) {
            var e = t.currentTarget.dataset.selectedIndex;
            this.selectTabItemAtIndex(e), this.setData({
                tabList: this.navData
            });
        },
        setTabNavFixed: function(t) {
            this.fixed != t && (this.fixed = t, this.setData({
                fixed: this.fixed
            }));
        }
    }
};
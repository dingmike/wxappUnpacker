Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        return {
            pids: [ "72708" ],
            list: [],
            info: {},
            BgColor: "##333333",
            color: "#a1a1a1",
            onColor: "#ffffff",
            scrollLeft: 0,
            ptpC: ""
        };
    },
    onLoad: function(t) {
        this.fcid = t && t.fcid ? t.fcid : "", this.baseUrl = "/" + (this.$root.route || this.$root.__route__);
    },
    methods: {
        init: function(t) {
            var e = this;
            if (t && t.list && t.list.length > 0 && t.info) {
                var i = t.info, n = t.list || [];
                i.isOn = this.baseUrl == i.link, n.map(function(t, n) {
                    e.fcid == t.fcid && e.baseUrl == i.itemLink ? (t.isOn = !0, e.isOnIndex = n + 1) : t.isOn = !1;
                }), this.setData({
                    list: n,
                    info: i
                }), setTimeout(function() {
                    e.getNodeInfo();
                }, 500);
            }
        },
        getNodeInfo: function() {
            var t = this;
            if (this.isOnIndex > 0) {
                var e = 0, i = 0, n = 0;
                if (wx.canIUse && wx.canIUse("createSelectorQuery") && wx.canIUse("getSystemInfoSync")) {
                    var o = wx.getSystemInfoSync().screenWidth;
                    wx.createSelectorQuery().selectAll(".tab-top-item").boundingClientRect(function(s) {
                        var r = s[t.isOnIndex];
                        r && (e = r.width, i = r.left, n = i >= o / 2 ? i - o / 2 + e / 2 : 0, t.setData({
                            scrollLeft: n
                        }));
                    }).exec();
                }
            }
        },
        gotoWall: function(t) {
            var e = t.currentTarget.dataset, i = e.href || "", n = e.fcid || "";
            i === this.baseUrl && n === this.fcid || this.$root.$redirect(t);
        }
    }
};
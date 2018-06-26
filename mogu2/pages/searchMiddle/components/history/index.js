Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        return {
            isShop: !1,
            hisList: [],
            isShowHisList: !1,
            storageList: []
        };
    },
    getStorageList: function(t, s) {
        var e = this;
        this.isShop = s, this.storageKey = t, wx.getStorage({
            key: t,
            complete: function(t) {
                var s = t && t.data ? t.data : [], i = s.length > 0;
                e.setHistoryData(s, i);
            }
        });
    },
    setHistoryData: function(t, s) {
        this.setData({
            storageList: t,
            hisList: t.slice(0, 10),
            isShowHisList: s,
            isShop: this.isShop
        });
    },
    addOne: function(t) {
        var s = this.data.storageList;
        t = t.trim();
        var e = s.indexOf(t);
        -1 == e ? (s.unshift(t), s.length > this.maxLength && s.pop()) : (s.splice(e, 1), 
        s.unshift(t)), wx.setStorage({
            key: this.storageKey,
            data: s
        });
    },
    methods: {
        clearStorageList: function() {
            var t = this;
            wx.removeStorage({
                key: this.storageKey,
                success: function() {
                    var s = [];
                    t.setHistoryData(s, !1);
                },
                complete: function(t) {
                    console.log(t);
                },
                fail: function() {
                    console.log("not clear storage");
                }
            });
        }
    }
};
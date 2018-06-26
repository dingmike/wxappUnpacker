Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    data: function() {
        return {
            hotWordInfo: [],
            isShowChange: "",
            title: "热门搜索"
        };
    },
    onLoad: function() {
        this.hotwordInfo = [], this.hotwordLength = "", this.hotwordSplit = [], this.changeLength = 0, 
        this.changeIndex = 0;
    },
    _splitData: function() {
        for (var t = 0; t < this.hotwordLength; t += this.hotLength) this.hotwordSplit.push(this.hotwordInfo.slice(t, t + this.hotLength));
        this.changeLength = this.hotwordSplit.length;
    },
    methods: {
        changeHotword: function() {
            var t = this.hotwordSplit[this.changeIndex];
            ++this.changeIndex >= this.changeLength && (this.changeIndex = 0), this.hotWordLog(t), 
            this.setData({
                hotWordInfo: t
            });
        },
        hotWordLog: function(t) {
            var h = [];
            if (t && t.length > 0) {
                for (var o = 0, a = t.length; o < a; o++) {
                    var i = t[o].acm;
                    h.push(i);
                }
                this.$root.$logE("0x00000000", {
                    acms: h
                });
            }
        }
    },
    resolveHotwordsData: function(t, h, o) {
        this.hotLength = o, this.isShop = h, h ? t && t.data && t.data.hotShop && t.data.hotShop.data && (this.hotwordInfo = t.data.hotShop.data) : t && t.data && t.data.hotWord && t.data.hotWord.data && (this.hotwordInfo = t.data.hotWord.data), 
        this.hotwordLength = this.hotwordInfo.length;
        var a = this.hotwordLength > this.hotLength;
        this._splitData(), this.hotWordLog(this.hotwordSplit[this.changeIndex]), this.setData({
            hotWordInfo: this.hotwordSplit[this.changeIndex],
            isShowChange: a
        }), t.data.image && this.$parent.$broadcast("showPhoto", t.data.image);
    }
};
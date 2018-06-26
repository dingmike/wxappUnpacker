Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = [ {
    image: "https://s10.mogucdn.com/p2/161213/upload_57bl76e9010115f3fj1d2k1kj5l4b_44x44.png",
    text: "再看点别的？"
}, {
    image: "https://s10.mogucdn.com/p2/161213/upload_6c4a17j86gb0lh9hba01i464fkie2_44x44.png",
    text: "哎呀都看完了"
}, {
    image: "https://s10.mogucdn.com/p2/161213/upload_1iddk17bfe1k4257f207i467f21e8_44x44.png",
    text: "叽~木有啦"
}, {
    image: "https://s10.mogucdn.com/p2/161213/upload_2e6ig5fb6k773l546a9gj8g2k7bfg_44x44.png",
    text: "哎一古~刷完了"
}, {
    image: "https://s10.mogucdn.com/p2/161213/upload_124lgj5ji1h9f3ci0bdbe5k4gf1kk_44x44.png",
    text: "没有了呢"
}, {
    image: "https://s10.mogucdn.com/p2/161213/upload_1122hdalb10h08kbiehd344fj6j1k_44x44.png",
    text: "汪~木有啦"
} ], e = t.length;

exports.default = {
    data: function() {
        return {
            isEnd: !1,
            placeholder: "加载中...",
            image: "",
            text: ""
        };
    },
    onLoad: function() {
        var a = this.data, g = t[Math.floor(Math.random() * e)];
        this.setData(Object.assign(a, {
            image: g.image,
            text: a.text || g.text
        }));
    }
};
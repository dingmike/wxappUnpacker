Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = {
    REQUEST_ERROR: {
        image: "https://s16.mogucdn.com/p2/170106/upload_06ekl2b2khbklk257h5c057ccdelc_514x258.png",
        title: "网络加载失败",
        btnText: "点击刷新"
    },
    NOT_FOUND: {
        image: "https://s8.mogucdn.com/pic/150112/17y7h4_ieydcyjsha2dgndcmuytambqgiyde_410x354.png",
        title: "很抱歉，找不到你要访问的页面",
        btnText: "返回"
    }
};

exports.default = {
    data: function() {
        return {};
    },
    methods: {
        init: function(e) {
            this.type = e.type || "NOT_FOUND", this.callback = e.callback, this.setData({
                image: e.image || t[this.type].image,
                title: e.title || t[this.type].title,
                btnText: e.btnText || t[this.type].btnText
            });
        },
        onBtnClick: function() {
            "NOT_FOUND" === this.type ? wx.navigateBack() : this.callback && this.callback();
        }
    }
};
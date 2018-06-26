function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../../common/service/upload")), o = e(require("../../../../common/utils/cache"));

exports.default = {
    data: function() {
        return {
            isShowClearButton: !1,
            placeholderWord: "",
            queryWord: "",
            inputWord: "",
            isShowPhoto: !1,
            isFirstGuide: !1
        };
    },
    initSearchHead: function(e) {
        var t = {}, o = t.placeholder, a = t.queryWord, i = t.inputWord;
        return e.q || e.placeholder ? (o = this.decodeUserInput(e.placeholder ? e.placeholder : e.q), 
        a = this.decodeUserInput(e.q || ""), i = e.needChange ? o : "") : (o = "搜索你想要的宝贝", 
        a = "女装"), console.log("placeholder", o), this.setPlaceHolder(o, i), this.isShowClearButton(i), 
        {
            placeholder: o,
            queryWord: a,
            inputWord: i
        };
    },
    decodeUserInput: function(e) {
        return decodeURIComponent(e);
    },
    monitorShowPhoto: function() {
        var e = this;
        this.$parent.$on("showPhoto", function(t) {
            t.data && t.data.enableSearch && 1 === parseInt(t.data.enableSearch, 10) && (o.default.get("wall.search.guide", {
                persistent: !0
            }) || e.setData({
                isFirstGuide: !0
            }), e.setData({
                isShowPhoto: !0
            }));
        });
    },
    setPlaceHolder: function(e, t) {
        this.setData({
            placeholderWord: e,
            inputWord: t
        });
    },
    isShowClearButton: function(e) {
        this.setData({
            isShowClearButton: e
        });
    },
    methods: {
        meKnowClick: function() {
            o.default.put("wall.search.guide", {
                isGuide: !0
            }, {
                persistent: !0
            }), this.setData({
                isFirstGuide: !1
            });
        },
        searchPhotoClick: function() {
            var e = this;
            this.$root.$logE("016000242", {
                name: "wall photo click"
            }), wx.chooseImage({
                count: 1,
                success: function(a) {
                    wx.showLoading({
                        title: "正在上传图片..."
                    }), t.default.uploadImage(a.tempFilePaths[0], {
                        api: "image/mossput",
                        appKey: "16m"
                    }).then(function(t) {
                        wx.hideLoading(), null !== t && (o.default.remove("wall.img.page"), e.$root.$navigate("/pages/wallImage/index", {
                            localPath: a.tempFilePaths[0],
                            path: t.path,
                            originPath: t.path
                        }));
                    }).catch(function() {
                        wx.hideLoading();
                    });
                }
            });
        }
    }
};
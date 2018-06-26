App({
    onLaunch: function() {
        wx.getSetting({
            success: function(t) {
                t.authSetting["scope.userInfo"] || wx.reLaunch({
                    url: "/pages/auth/auth"
                });
            }
        });
    },
    globalData: {
        userInfo: null,
        url: "https://riyubao.net/oralproject/public/index.php/",
        openid: "",
        type: "21天口语达人养成计划",
        img: "/images/item/ly.png",
        bgimg: "https://riyubao.net/oralproject/public/datas/item/b2.jpg",
        coimg: "/images/coimg/ly.jpg",
        detailImg: "https://riyubao.net/oralproject/public/datas/item/lyDetail2.jpg",
        ifFree: "0",
        days: 0
    }
});
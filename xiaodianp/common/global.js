Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = {
    initAppOpenInfo: function() {
        if (!this.open_info.is_init) {
            this.open_info.is_init = !0;
            var a = wx.getExtConfigSync ? wx.getExtConfigSync() : {};
            console.log("extConfig", a), a.authorizer_appid && (this.open_info.authorizer_appid = a.authorizer_appid), 
            a.device_type && (this.config.device_type = a.device_type), a.collection_id && (this.config.collection_pro = a.collection_id, 
            this.config.collection_dev = a.collection_id);
        }
    },
    open_info: {
        is_init: !1,
        authorizer_appid: "wx8bd8c025fe64f778"
    },
    setFid: function(a) {
        1 < arguments.length && void 0 !== arguments[1] && arguments[1], wx.setStorageSync("local-f-id", a);
    },
    getFid: function() {
        return wx.getStorageSync("local-f-id") ? wx.getStorageSync("local-f-id") : this.config.default_f_id;
    },
    setShareFid: function(a, b) {
        var c = a.split(",");
        b && (9 === c.length ? c.push(b) : 10 === c.length && (c[9] = b)), this.setFid(c.join(","));
    },
    checkCacheCollection: function() {
        return 0 < wx.getStorageSync("local-collection-id");
    },
    setCollectionId: function(a) {
        return 0 < this.config.default_mall_id ? void (this.config.collection_with_mall = a) : void wx.setStorageSync("local-collection-id", a);
    },
    getCollectionId: function() {
        if (0 < this.config.collection_with_mall) return this.config.collection_with_mall;
        var a = wx.getStorageSync("local-collection-id");
        return 0 < a ? a : 0 === this.config.is_prod ? this.config.collection_dev : this.config.collection_pro;
    },
    getDeviceType: function() {
        return this.config.device_type;
    },
    getShareTitle: function() {
        return this.config.share_title;
    },
    getUserInfo: function() {
        return this.userInfo = wx.getStorageSync("local-UserInfo"), this.userInfo;
    },
    getShareDefault: function() {
        return {
            title: this.config.share_title,
            path: "/pages/mall?id=" + this.config.default_mall_id + "&f_id=" + this.getFid() + "&is_share=" + this.config.is_share
        };
    },
    setUserInfo: function(a) {
        this.userInfo = a, wx.setStorageSync("local-UserInfo", this.userInfo);
    },
    getSeeInfo: function() {
        return this.token;
    },
    setSeeInfo: function(a) {
        this.token = a;
    },
    addStartAnimation: function(a) {
        var b = wx.createAnimation({
            duration: 300,
            timingFunction: "ease",
            delay: 0,
            transformOrigin: "50% 50%"
        });
        new Promise(function(c) {
            b.opacity(1).step(), a.animationShadow = b.export(), b.bottom(-800).step(), a.animationData = b.export(), 
            c();
        }).then(function() {
            b.bottom(0).step(), a.animationData = b.export(), a.$apply();
        });
    },
    addEndAnimation: function(a) {
        var b = wx.createAnimation({
            duration: 400,
            timingFunction: "ease",
            delay: 0,
            transformOrigin: "50% 50%"
        });
        b.bottom(-800).step(), a.animationData = b.export(), b.opacity(0).step(), a.animationShadow = b.export(), 
        a.$apply();
    },
    advoiceTapTwice: function(a) {
        var b = a.timeStamp;
        return 500 > b - this.config.lastTapTime && 0 !== this.config.lastTapTime && b > this.config.lastTapTime ? (this.config.lastTapTime = b, 
        !1) : (this.config.lastTapTime = b, !0);
    },
    sku: {
        change: !1,
        cur_num: 1,
        max_num: 1
    },
    weixin_auth_deny: {
        chooseAddress: 0
    },
    getSystemInfo: function() {
        return new Promise(function(a, b) {
            wx.getSystemInfo({
                success: function(b) {
                    var c = !1;
                    b.model.includes("iPhone X") && (c = !0), wx.setStorageSync("isIPhoneX", c), a(b);
                },
                fail: function(a) {
                    b(a);
                }
            });
        });
    },
    app_config: {
        text: "SEE 小电铺提供服务",
        logo_1: "https://image.seecsee.com/s/p/product_v2/1b0/062/h9o/3x4he04k8s8csso04wcgwok4ko.png",
        logo_2: "",
        logo_3: ""
    },
    config: {
        is_prod: 1,
        device_type: 201,
        collection_pro: 91112,
        collection_dev: 89527,
        default_mall_id: 0,
        default_f_id: 0,
        collection_with_mall: 0,
        user_id: 0,
        user_info_id: 0,
        coupon_id: 0,
        coupon_denomination: 0,
        coupon_limitMoney: 0,
        pop_login_num: 1,
        first_open: !0,
        lastTapTime: 0,
        activityId: 0,
        groupId: 0,
        share_title: "小电铺",
        is_share: 0,
        paySuccess: !1,
        scene: 1001,
        AndroidPay: !1
    },
    get isIPhoneX() {
        return wx.getStorageSync("isIPhoneX");
    }
};
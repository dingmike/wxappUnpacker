Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {
    $version: "2.5.0",
    $env: "production",
    $mixins: [ [ "../mixins/logger/index", "Logger" ], "../mixins/cps", "../mixins/debug", "../mixins/navigation", "../mixins/share", "../mixins/options", "../mixins/abtest", "../mixins/performance" ],
    $globalTemplate: {
        name: "mg",
        path: "../components/mg/index.js"
    },
    MWP: {
        AppKey: "100063",
        TTID: "NMMain@mgj_wxxcx_1.0"
    },
    MCE: {
        appPlat: "sapp",
        group: "scene_sapp"
    },
    logger: {
        platform: "57",
        pages: {
            "pages/home/index": 1e6,
            "pages/404/index": 1000175,
            "pages/address/index": 1010678,
            "pages/auth/index": 1000003,
            "pages/brand/index": 1000004,
            "pages/brandonsale/index": 1011129,
            "pages/brandShop/index": 1000005,
            "pages/buy/index": 1000006,
            "pages/cart/index": 1000008,
            "pages/categoryChannel/index": 1010556,
            "pages/class/index": 1000009,
            "pages/detail/index": 1010677,
            "pages/detail/pages/normal/index": 1000013,
            "pages/detail/pages/pinrule/index": 1000014,
            "pages/detail/pages/pintuan/index": 1000015,
            "pages/detail/pages/rush/index": 1000016,
            "pages/detail/pages/seckill/index": 1000017,
            "pages/detail/pages/sharePic/index": 1004790,
            "pages/detail/pages/sizehelp/index": 1010558,
            "pages/detail/pages/sizewrite/index": 1010559,
            "pages/detail/pages/tuangou/index": 1000192,
            "pages/hongbao/detail/index": 1000022,
            "pages/hongbao/list/index": 1000023,
            "pages/insurance/freight/index": 1000027,
            "pages/logisticsList/index": 1000036,
            "pages/myFeedback/index": 1010762,
            "pages/newBrandShop/index": 1007544,
            "pages/order/detail/index": 1000037,
            "pages/order/list/index": 1000038,
            "pages/order/ptlist/index": 1000039,
            "pages/payresult/index": 1000040,
            "pages/personal/index": 1000041,
            "pages/pinshare/index": 1000042,
            "pages/pintuan/lotteryresult/index": 1000043,
            "pages/pintuanActive/index": 1000044,
            "pages/pintuanIndex/index": 1000045,
            "pages/pintuanLottery/index": 1000046,
            "pages/rchome/index": 1000226,
            "pages/rcshare/index": 1000227,
            "pages/searchMiddle/index": 1000054,
            "pages/service/index": 1010560,
            "pages/unionCoupon/index": 1000062,
            "pages/user/bindPhone/index": 1000239,
            "pages/wallAct/index": 1000063,
            "pages/wallCategory/index": 1000064,
            "pages/wallCategoryEntry/index": 1000065,
            "pages/wallPackage/index": 1000067,
            "pages/wallRelative/index": 1000068,
            "pages/wallSearch/index": 1000070,
            "pages/web/index": 1000251,
            "pages/debug/index": 1000072,
            "pages/refund/apply/index": 1000073,
            "pages/refund/applydetail/index": 1000074,
            "pages/refund/applyresult/index": 1000075,
            "pages/refund/cash/index": 1000076,
            "pages/refund/detail/index": 1000077,
            "pages/refund/help/detail/index": 1000078,
            "pages/refund/help/list/index": 1000079,
            "pages/refund/im/index": 1000080,
            "pages/refund/logistics/index": 1000081,
            "pages/refund/logisticsAgain/index": 1000082,
            "pages/refund/logisticsEdit/index": 1000083,
            "pages/refund/protocol/index": 1000084,
            "pages/refund/request/index": 1000085,
            "pages/act/assistmain/index": 1010708,
            "pages/act/index": 1000001,
            "pages/act/signgift/index": 1010702,
            "pages/act/signgiftrecord/index": 1010703,
            "pages/shop/category/index": 1005995,
            "pages/shop/custom/index": 1005996,
            "pages/shop/getCoupon/index": 1000056,
            "pages/shop/home/index": 1000057,
            "pages/shop/hotSearch/index": 1000058,
            "pages/shop/info/index": 1010589,
            "pages/shop/newBrandShop/index": 1010631,
            "pages/shop/search/index": 1000059,
            "pages/rate/add/index": 1000049,
            "pages/rate/append/index": 1000050,
            "pages/rate/list/index": 1000051,
            "pages/winrecord/index": 1000071,
            "pages/wallTuan/index": 1000069,
            "pages/wallImage/course/index": 1000244,
            "pages/wallImage/index": 1000245,
            "pages/wallknow/index": 1000246,
            "pages/fav/index": 1000019,
            "pages/feedback/index": 1000020,
            "pages/footprint/index": 1000021,
            "pages/coupon/index": 1000011,
            "pages/im/chat/index": 1000024,
            "pages/im/contact/index": 1000025,
            "pages/im/index": 1000026,
            "pages/redPacket/main/index": 1010586,
            "pages/redPacket/rules/index": 1010587,
            "pages/redPacket/withdrawFail/index": 1010588,
            "pages/integral/mfact/index": 1011047,
            "pages/integral/mfact/sub/index": 1011048,
            "pages/integral/mfact/subrefresh/index": 1011049
        }
    },
    cache: {
        APPID: "wxca3957e5474b3670",
        appName: "蘑菇街女装",
        primaryColor: "#ff5777"
    },
    im: {
        appId: 3,
        appNum: 3,
        appTitle: "蘑菇街女装",
        isMin: 0,
        notify: "1"
    },
    ABTest: {
        groupName: "mogujiewxa"
    }
};

e.tabs = [ {
    text: "首页",
    path: "/pages/home/index"
}, {
    text: "爆款特卖",
    path: "/pages/brandonsale/index"
}, {
    text: "所有商品",
    path: "/pages/class/index"
}, {
    text: "购物车",
    path: "/pages/cart/index"
}, {
    text: "我的",
    path: "/pages/personal/index"
} ], e.urls = [ {
    name: "home",
    url: "home"
}, {
    name: "404",
    url: "404"
}, {
    name: "address",
    url: "address"
}, {
    name: "auth",
    url: "auth"
}, {
    name: "brand",
    url: "brand"
}, {
    name: "brandonsale",
    url: "brandonsale"
}, {
    name: "brandShop",
    url: "brandShop"
}, {
    name: "buy",
    url: "buy"
}, {
    name: "cart",
    url: "cart"
}, {
    name: "categoryChannel",
    url: "categoryChannel"
}, {
    name: "class",
    url: "class"
}, {
    name: "detail",
    url: "detail"
}, {
    name: "detail",
    url: "detail/pages/normal",
    params: [ "itemId" ]
}, {
    name: "pinrule",
    url: "detail/pages/pinrule"
}, {
    name: "pintuanDetail",
    url: "detail/pages/pintuan",
    params: [ "itemId", "activityId" ]
}, {
    name: "rushDetail",
    url: "detail/pages/rush",
    params: [ "itemId", "activityId" ]
}, {
    name: "seckillDetail",
    url: "detail/pages/seckill",
    params: [ "itemId", "activityId" ]
}, {
    name: "detailPagesSharePic",
    url: "detail/pages/sharePic"
}, {
    name: "detailPagesSizehelp",
    url: "detail/pages/sizehelp"
}, {
    name: "detailPagesSizewrite",
    url: "detail/pages/sizewrite"
}, {
    name: "detailPagesTuangou",
    url: "detail/pages/tuangou"
}, {
    name: "hongbaoDetail",
    url: "hongbao/detail"
}, {
    name: "hongbaoList",
    url: "hongbao/list"
}, {
    name: "refundFreight",
    url: "insurance/freight",
    params: [ "orderId", "refundId" ]
}, {
    name: "logisticsList",
    url: "logisticsList",
    params: [ "type", "orderId" ]
}, {
    name: "myFeedback",
    url: "myFeedback"
}, {
    name: "newBrandShop",
    url: "newBrandShop"
}, {
    name: "orderDetail",
    url: "order/detail",
    alias: [ "pintuanOrderDetail" ],
    params: [ "orderId" ]
}, {
    name: "orderList",
    url: "order/list",
    params: [ "orderStatus" ]
}, {
    name: "pintuanOrderList",
    url: "order/ptlist",
    params: [ "orderStatus" ]
}, {
    name: "payresult",
    url: "payresult",
    params: [ "payOrderId" ]
}, {
    name: "personal",
    url: "personal"
}, {
    name: "pinshare",
    url: "pinshare",
    params: [ "tuanId" ]
}, {
    name: "pintuanLotteryResult",
    url: "pintuan/lotteryresult",
    params: [ "activityId" ]
}, {
    name: "pintuanActive",
    url: "pintuanActive",
    params: [ "pid" ]
}, {
    name: "pintuanIndex",
    url: "pintuanIndex"
}, {
    name: "pintuanLottery",
    url: "pintuanLottery",
    params: [ "pid" ]
}, {
    name: "rchome",
    url: "rchome"
}, {
    name: "rcshare",
    url: "rcshare"
}, {
    name: "searchMiddle",
    url: "searchMiddle"
}, {
    name: "service",
    url: "service"
}, {
    name: "unionCoupon",
    url: "unionCoupon"
}, {
    name: "userBindPhone",
    url: "user/bindPhone"
}, {
    name: "wallAct",
    url: "wallAct",
    params: [ "pageName" ]
}, {
    name: "wallCategory",
    url: "wallCategory",
    params: [ "fcid", "title" ]
}, {
    name: "wallCategoryEntry",
    url: "wallCategoryEntry"
}, {
    name: "wallPackage",
    url: "wallPackage",
    params: [ "title" ]
}, {
    name: "wallRelative",
    url: "wallRelative",
    params: [ "pid", "iid" ]
}, {
    name: "wallSearch",
    url: "wallSearch",
    params: [ "q" ]
}, {
    name: "web",
    url: "web"
}, {
    name: "debug",
    url: "debug"
}, {
    name: "refundApply",
    url: "refund/apply",
    params: [ "orderId" ]
}, {
    name: "refundApplyDetail",
    url: "refund/applydetail",
    params: [ "orderId" ]
}, {
    name: "refundApplyResult",
    url: "refund/applyresult",
    params: [ "orderId" ]
}, {
    name: "refundCash",
    url: "refund/cash",
    params: [ "orderId" ]
}, {
    name: "refundDetail",
    url: "refund/detail",
    params: [ "orderId" ]
}, {
    name: "refundHelpDetail",
    url: "refund/help/detail"
}, {
    name: "refundHelpList",
    url: "refund/help/list"
}, {
    name: "refundIM",
    url: "refund/im",
    params: [ "orderId" ]
}, {
    name: "refundLogistics",
    url: "refund/logistics",
    params: [ "refundId" ]
}, {
    name: "refundLogisticsAgain",
    url: "refund/logisticsAgain",
    params: [ "refundId", "shopOrderId" ]
}, {
    name: "refundLogisticsEdit",
    url: "refund/logisticsEdit",
    params: [ "orderId" ]
}, {
    name: "refundProtocol",
    url: "refund/protocol"
}, {
    name: "refundRequest",
    url: "refund/request",
    params: [ "orderId" ]
}, {
    name: "actAssistmain",
    url: "act/assistmain"
}, {
    name: "act",
    url: "act"
}, {
    name: "actSigngift",
    url: "act/signgift"
}, {
    name: "actSigngiftrecord",
    url: "act/signgiftrecord"
}, {
    name: "shopCategory",
    url: "shop/category"
}, {
    name: "shopCustom",
    url: "shop/custom"
}, {
    name: "shopGetCoupon",
    url: "shop/getCoupon"
}, {
    name: "shop",
    url: "shop/home",
    params: [ "shopId" ]
}, {
    name: "shopHotSearch",
    url: "shop/hotSearch",
    params: [ "shopId" ]
}, {
    name: "shopInfo",
    url: "shop/info"
}, {
    name: "shopNewBrandShop",
    url: "shop/newBrandShop"
}, {
    name: "shopSearch",
    url: "shop/search",
    params: [ "shopId" ]
}, {
    name: "rateAdd",
    url: "rate/add",
    params: [ "orderId" ]
}, {
    name: "rateAppend",
    url: "rate/append",
    params: [ "orderId" ]
}, {
    name: "rateList",
    url: "rate/list",
    params: [ "itemId" ]
}, {
    name: "winRecord",
    url: "winrecord",
    params: [ "activityId" ]
}, {
    name: "wallTuan",
    url: "wallTuan"
}, {
    name: "wallImageCourse",
    url: "wallImage/course"
}, {
    name: "wallImage",
    url: "wallImage"
}, {
    name: "wallknow",
    url: "wallknow"
}, {
    name: "fav",
    url: "fav"
}, {
    name: "feedback",
    url: "feedback"
}, {
    name: "footprint",
    url: "footprint"
}, {
    name: "coupon",
    url: "coupon"
}, {
    name: "imChat",
    url: "im/chat"
}, {
    name: "imContact",
    url: "im/contact"
}, {
    name: "im",
    url: "im"
}, {
    name: "redPacketMain",
    url: "redPacket/main"
}, {
    name: "redPacketRules",
    url: "redPacket/rules"
}, {
    name: "redPacketWithdrawFail",
    url: "redPacket/withdrawFail"
}, {
    name: "integralMfact",
    url: "integral/mfact"
}, {
    name: "integralMfactSub",
    url: "integral/mfact/sub"
}, {
    name: "integralMfactSubrefresh",
    url: "integral/mfact/subrefresh"
} ], exports.default = e;
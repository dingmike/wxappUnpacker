Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.appTitle = "我的支付红包", exports.pageSize = 10;

var e = exports.walletAppId = "wx26550136c4b70208", a = {
    SHOP: {
        ID: "2",
        TITLE: "蘑菇街女裝"
    },
    BAIHUO: {
        ID: "68",
        TITLE: "小店微商城"
    }
}, t = {
    SHOP: {
        BANNER: "82583",
        BALANCE: "82587"
    },
    BAIHUO: {
        BANNER: "82584",
        BALANCE: "82588"
    },
    WALLET: {
        BANNER: "77800",
        BALANCE: "79869"
    }
};

exports.wxAppList = [ {
    name: "mgj",
    id: "wxca3957e5474b3670",
    bannerPid: t.SHOP.BANNER,
    balancePid: t.SHOP.BALANCE,
    market: a.SHOP.TITLE,
    tabs: [ {
        merchantId: a.SHOP.ID,
        text: a.SHOP.TITLE
    } ]
}, {
    name: "nordstrom",
    id: "wx1139ad0275dd69c3",
    bannerPid: t.BAIHUO.BANNER,
    balancePid: t.BAIHUO.BALANCE,
    market: a.BAIHUO.TITLE,
    tabs: [ {
        merchantId: a.BAIHUO.ID,
        text: a.BAIHUO.TITLE
    } ]
}, {
    name: "mgjLive",
    id: "wx21c17841db9593cd",
    bannerPid: t.SHOP.BANNER,
    balancePid: t.SHOP.BALANCE,
    market: a.SHOP.TITLE,
    tabs: [ {
        merchantId: a.SHOP.ID,
        text: a.SHOP.TITLE
    } ]
}, {
    name: "meiliqianbao",
    id: e,
    bannerPid: t.WALLET.BANNER,
    balancePid: t.WALLET.BALANCE,
    market: a.SHOP.TITLE,
    tabs: [ {
        merchantId: a.SHOP.ID,
        text: a.SHOP.TITLE
    }, {
        merchantId: a.BAIHUO.ID,
        text: a.BAIHUO.TITLE
    } ]
}, {
    name: "fastFish",
    id: "wx2dcd55d55e472a98",
    bannerPid: t.SHOP.BANNER,
    balancePid: t.SHOP.BALANCE,
    market: a.SHOP.TITLE,
    tabs: [ {
        merchantId: a.SHOP.ID,
        text: a.SHOP.TITLE
    } ]
}, {
    name: "belly",
    id: "",
    bannerPid: t.SHOP.BANNER,
    balancePid: t.SHOP.BALANCE,
    market: a.SHOP.TITLE,
    tabs: [ {
        merchantId: a.SHOP.ID,
        text: a.SHOP.TITLE
    } ]
}, {
    name: "chaojihongbao",
    id: "wx446e3ce0ede2e766",
    bannerPid: t.WALLET.BANNER,
    balancePid: t.WALLET.BALANCE,
    market: a.SHOP.TITLE,
    tabs: [ {
        merchantId: a.SHOP.ID,
        text: a.SHOP.TITLE
    }, {
        merchantId: a.BAIHUO.ID,
        text: a.BAIHUO.TITLE
    } ]
}, {
    name: "outfit",
    id: "wx9d2c626c7ee86531",
    bannerPid: t.SHOP.BANNER,
    balancePid: t.SHOP.BALANCE,
    market: a.SHOP.TITLE,
    tabs: [ {
        merchantId: a.SHOP.ID,
        text: a.SHOP.TITLE
    } ]
}, {
    name: "promotion",
    id: "wxca3957e5474b3670",
    bannerPid: t.SHOP.BANNER,
    balancePid: t.SHOP.BALANCE,
    market: a.SHOP.TITLE,
    tabs: [ {
        merchantId: a.SHOP.ID,
        text: a.SHOP.TITLE
    } ]
}, {
    name: "moguSelection",
    id: "wx6a366ee63446446b",
    bannerPid: t.SHOP.BANNER,
    balancePid: t.SHOP.BALANCE,
    market: a.SHOP.TITLE,
    tabs: [ {
        merchantId: a.SHOP.ID,
        text: a.SHOP.TITLE
    } ]
} ];
function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = a(require("../../common/m")), e = a(require("../../common/base/createPage")), i = a(require("../../common/utils/imgUrlTool")), s = a(require("../../components/wall/index_sortNav")), o = a(require("../../components/searchBar/index")), n = a(require("../../components/loading/index")), l = t.default.MWP;

exports.default = (0, e.default)({
    components: {
        searchBar: o.default,
        loading: n.default,
        wall: s.default
    },
    data: {
        $searchBar: {
            isFixed: !1,
            needRedirect: !1,
            needChange: !1
        }
    },
    handClickTab: function(a) {
        for (var t = this, e = a.currentTarget.dataset, i = e.fcid, s = e.index, o = 0; o < t.leftBarList.length; o++) {
            var n = t.leftBarList[o];
            n.activeClass = s == o ? "active" : "";
        }
        for (var l = t.$wall.navData.sortFilter, o = 0; o < l.length; o++) {
            var r = l[o];
            "pop" == r.sortKey ? r.onClass = t.$wall.tabOnClass : r.onClass = "";
        }
        t.$wall.setWallParam({
            page: 1,
            fcid: i,
            sort: "pop"
        }), t.$wall.resetWallParams(), t.$wall.pushData(), t.$wall.isAllowAjax(), t.setData({
            contentId: "category_page_top",
            hidClass: "hid_class",
            leftBarList: t.leftBarList,
            topBanner: t.bannersList[s],
            cateBox: t.catesList[s].maitResources
        }), setTimeout(function() {
            t.setData({
                contentId: "category_page_top",
                hidClass: ""
            });
        }, 80);
    },
    handMaitData: function(a) {
        var t = this, e = a.modules;
        t.leftBarList = [], t.bannersList = [], t.catesList = [];
        for (var s = 0; s < e.length; s++) {
            var o = e[s], n = {}, l = o.cateBox || {}, r = o.wall || {};
            if (o.banner.maitResources && o.banner.maitResources.length && ((n = o.banner.maitResources[0]).img = i.default.getWidthSuffix(n.image, 530)), 
            t.bannersList[s] = n, l.maitResources && l.maitResources.length) for (var c = l.maitResources, d = 0; d < c.length; d++) {
                var g = c[d];
                g.img = i.default.getWidthSuffix(g.image, 130);
            }
            t.catesList[s] = l, t.leftBarList[s] = {
                activeClass: "",
                name: o.title,
                fcid: r.fcid || "50010"
            };
        }
        t.leftBarList[0].activeClass = "active", t.setData({
            leftBarList: t.leftBarList,
            topBanner: t.bannersList[0],
            cateBox: t.catesList[0].maitResources
        }), this.$wall.setWallNav({
            scrollNavRpxTop: !1
        }), this.$wall.initWall({
            cKey: "xcx-cate",
            fcid: t.leftBarList[0].fcid
        }), this.$wall.itemImgRatio = "7:9";
    },
    loadPageData: function() {
        var a = this;
        l.request("mwp.pagani.marketSchemaWithMait", "1", {
            market: "100",
            platform: "h5"
        }).then(l.filterResult).then(function(t) {
            t.modules && t.modules.length ? (a.handMaitData(t), a.catePageTimeFlag = Date.now(), 
            setTimeout(function() {
                a.$loading.hide();
            }, 400), a.setData({
                contentId: "category_page_top",
                tabId: "category_page_top2",
                hidClass: ""
            })) : a.loadPageDataBack();
        }).catch(function(t) {
            a.loadPageDataBack();
        });
    },
    loadPageDataBack: function() {
        var a = this;
        console.log("进入分类页图墙容灾逻辑，再次请求listbackup"), t.default.requestManager.sendRequest({
            url: "https://backup.mogucdn.com/list/71110d4df5251358ea902d668eed862c",
            data: {},
            header: {
                "content-type": "application/json"
            },
            success: function(t) {
                a.handMaitData(t.data.data), a.catePageTimeFlag = Date.now(), setTimeout(function() {
                    a.$loading.hide();
                }, 400), a.setData({
                    contentId: "category_page_top",
                    tabId: "category_page_top2",
                    hidClass: ""
                });
            },
            fail: function() {
                console.log("容灾也请求失败，没救了"), a.catePageTimeFlag = 0, setTimeout(function() {
                    a.$loading.hide();
                }, 400), a.setData({
                    contentId: "category_page_top",
                    tabId: "category_page_top2",
                    hidClass: ""
                });
            }
        });
    },
    onLoad: function(a) {
        var t = this;
        t.$loading.show(), t.catePageTimeFlag = Date.now(), t.loadPageData();
    },
    onShow: function() {
        var a = this;
        wx.setNavigationBarTitle({
            title: "精选分类"
        }), Date.now() - a.catePageTimeFlag > 6e5 && (a.$loading.show(), a.setData({
            contentId: "category_page_top",
            tabId: "category_page_top2",
            hidClass: "hid_class"
        }), a.loadPageData());
    },
    onReady: function() {}
});
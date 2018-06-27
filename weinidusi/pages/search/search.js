getApp();

var t = require("../../utils/util.js");

Page({
    data: {
        poem_list: [],
        page: 1,
        keyword: "",
        no_search: !1
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        var a = this.getData;
        t.checkSession(a);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    navigateTo: function(a) {
        t.navigateTo(a);
    },
    getData: function(a) {
        var e = this;
        "search" == a && this.setData({
            page: 0
        });
        var i = {
            keyword: this.data.keyword,
            page: this.data.page
        };
        t.request_post("https://fudai.i-meihao.shop/index.php?m=Mini&c=Poetry&a=poetry_list", i, function(t) {
            0 !== t.data.list.length || "search" !== a ? "search" !== a ? e.setData({
                poem_list: e.data.poem_list.concat(t.data.list),
                no_search: !1,
                uid: t.data.uid
            }) : e.setData({
                poem_list: t.data.list
            }) : e.setData({
                no_search: !0,
                poem_list: []
            });
        });
    },
    nextPage: function() {
        this.setData({
            page: ++this.data.page,
            keyword: ""
        }), this.getData(this.data.page);
    },
    search: function(t) {
        this.setData({
            page: 1,
            keyword: t.detail.value.keyword
        }), this.getData("search");
    }
});
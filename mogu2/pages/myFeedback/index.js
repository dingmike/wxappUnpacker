function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e) {
    if (Array.isArray(e)) {
        for (var t = 0, a = Array(e.length); t < e.length; t++) a[t] = e[t];
        return a;
    }
    return Array.from(e);
}

var a = e(require("../../common/base/createPage")), n = e(require("../../common/m")), r = e(require("./moment")), i = e(require("../../components/toast/index")), o = e(require("../../components/loading/index")), s = e(require("../../components/end/index")), u = n.default.MWP;

(0, a.default)({
    components: {
        toast: i.default,
        loading: o.default,
        end: s.default
    },
    data: {
        pageSize: 20,
        pageNum: 1,
        source: "mogujie",
        producer: "wx",
        feedbackList: []
    },
    onLoad: function() {
        this.getMineFeedback();
    },
    getMineFeedback: function() {
        var e = this, a = this.data, n = a.pageNum, i = a.pageSize, o = a.source, s = a.producer, c = a.feedbackList, d = {
            source: o,
            producer: s,
            page: n,
            pageSize: i
        };
        u.request("mwp.cscenter.mineFeedback", 1, d).then(u.filterResult).then(function(a) {
            wx.stopPullDownRefresh(), a.list.length < i && (e.isEnd = !0, e.$end.setData({
                isEnd: !0,
                text: "没有更多了~"
            })), a.list.forEach(function(e) {
                e.created = r.default.format(1e3 * e.created, "YYYY.MM.DD HH:mm");
            });
            var o = [];
            o = 1 == n ? a.list : [].concat(t(c), t(a.list)), e.setData({
                feedbackList: o,
                hasLoad: !0
            });
        }).catch(function(t) {
            e.$toast.show(t.message);
        });
    },
    onPullDownRefresh: function() {
        var e = this;
        this.$end.setData({
            isEnd: !1
        }), this.setData({
            pageNum: 1,
            showEnd: !1
        }, function() {
            e.getMineFeedback();
        });
    },
    onReachBottom: function() {
        var e = this;
        this.setData({
            showEnd: !0
        }, function() {
            e.isEnd || e.setData({
                pageNum: e.data.pageNum + 1
            }, function() {
                e.getMineFeedback();
            });
        });
    },
    previewImage: function(e) {
        var t = e.currentTarget.dataset.image;
        wx.previewImage({
            urls: [ t ]
        });
    }
});
Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../components/base/color"));

exports.default = {
    data: function() {
        return {
            reportList: []
        };
    },
    components: {
        color: t.default
    },
    onLoad: function() {},
    methods: {
        lookMore: function() {
            var t = this.reportList = this.trialReports, e = this.showMore = !1;
            this.setData({
                reportList: t,
                showMore: e
            });
        },
        init: function(t) {
            var e = this.trialReports = t.trialReports || [], o = !1, r = [];
            e && e.length > 4 ? (o = !0, r = this.reportList = e.slice(0, 4)) : r = this.reportList = e, 
            this.setData({
                reportList: r,
                showMore: o
            });
        }
    }
};
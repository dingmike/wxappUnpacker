Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../common/reminder/wxCustomReminder.js"));

exports.default = {
    name: "pintuanItem",
    data: function() {
        return {};
    },
    methods: {
        setReminder: function(e) {
            var o = this, r = e.detail.formId || "";
            this.$root && this.$root.$logForm && this.$root.$logForm(r, 1);
            var i = e.currentTarget.dataset.remind, s = e.currentTarget.dataset.item;
            i.bizIds = s.item_id, i.startTime = Number(s.effectSTime), i.reminderType = "goods-single", 
            i.activityId = s.originId;
            var n = {
                h5Config: {},
                wxConfig: i
            };
            t.default.setReminder(n, function(t) {
                o.showToast ? o.showToast(t.msg, 1e3) : o.$root && o.$root.$toast ? o.$root.$toast.show(t.msg, 1e3) : wx && wx.showToast({
                    title: t.msg,
                    duration: 1e3
                });
            });
        }
    }
};
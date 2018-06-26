function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var n = e(require("../../common/im/notice")), t = e(require("../../common/im/index")), o = e(require("../notice/index"));

exports.default = {
    components: {
        notice: o.default
    },
    data: function() {
        return {
            $notice: {
                icon: "https://s10.mogucdn.com/mlcdn/c45406/170830_3baie3i2jl9haa0l297b0g0571ahc_136x136.png",
                title: null,
                desc: null
            }
        };
    },
    onLoad: function() {
        t.default.getNotify().then(function(e) {
            e && n.default.init().catch(function(e) {
                console.error("IM login fail:", e);
            });
        });
    },
    onShow: function() {
        var e = this;
        n.default.onMsg(function(n) {
            e.show({
                title: n.shopName || "",
                desc: n.content || "",
                businessId: n.businessId,
                trigger: e.trigger,
                cancel: e.cancel
            });
        });
    },
    onHide: function() {
        n.default.offMsg();
    },
    methods: {
        show: function(e) {
            this.$notice.show(e);
        },
        trigger: function() {
            n.default.readMsg(1);
        },
        cancel: function() {
            console.log("cancel");
        }
    }
};
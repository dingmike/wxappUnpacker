Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../base/color"));

exports.default = {
    components: {
        color: e.default
    },
    methods: {
        init: function(e) {
            var t = e.itemInfo;
            this.setData({
                itemInfo: t
            });
        }
    }
};
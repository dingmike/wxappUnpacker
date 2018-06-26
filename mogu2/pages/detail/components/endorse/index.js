Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../base/color"));

exports.default = {
    data: function() {
        return {};
    },
    components: {
        color: e.default
    },
    onLoad: function() {},
    methods: {
        initMceData: function(e) {
            var t = e.default && e.default.list, o = (t && t.length > 0 && t[0]).endorseImage;
            this.setData({
                endorseImage: o
            });
        }
    }
};
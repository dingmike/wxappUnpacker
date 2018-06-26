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
        init: function(e) {
            var t = e.price;
            this.setData(t);
        }
    }
};
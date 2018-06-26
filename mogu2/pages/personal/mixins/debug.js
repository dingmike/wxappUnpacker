function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("../../../common/config")), u = e(require("../../../common/utils/debug"));

exports.default = {
    _debugCount: 0,
    _debugTime: 0,
    data: function() {
        return {
            showDebug: !1,
            code: ""
        };
    },
    onShow: function() {
        var e = u.default.read().showDebug || "develop" === t.default.$env;
        if (e) return this.setData({
            showDebug: e
        });
    },
    methods: {
        onSwitchDebug: function(e) {
            if (!this.data.showDebug) {
                if (0 === this._debugTime && (this._debugTime = e.timeStamp), e.timeStamp - this._debugTime <= 300) {
                    if (this._debugCount++, this._debugTime = e.timeStamp, this._debugCount < 6) return;
                    this.setData({
                        showDebug: !0
                    });
                }
                this._debugCount = 0, this._debugTime = 0;
            }
        }
    }
};
Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../../../common/m")), i = require("../../../../../../common/utils/encrypt/aes.js"), e = function(t) {
    if (t && t.__esModule) return t;
    var i = {};
    if (null != t) for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (i[e] = t[e]);
    return i.default = t, i;
}(require("../../../../components/base/index")).handleRequestError, o = t.default.MWP, s = t.default.fn.md5;

exports.default = {
    data: function() {
        return {
            isShow: !1,
            slideLength: 12,
            correctPosition: 20,
            maskLeft: 0,
            slideLeft: 0,
            barWidth: 92 / 552 * 100,
            tips: {
                text: "向右滑动滑块完成拼图",
                type: "normal"
            }
        };
    },
    onLoad: function() {},
    methods: {
        init: function(t) {
            var i = wx.getSystemInfoSync();
            this.screenWidth = i.windowWidth || i.screenWidth, this.screenRatio = this.screenWidth / 750, 
            this.barRatio = 1 - 92 / 552 * 100 / 100, this.startX = 145 * this.screenRatio, 
            this.times = 0, this.setData({
                imageUrl: t.imageUrl
            });
        },
        getInitialData: function() {
            var t = this;
            this.$root.$mwp("mwp.mgsSecurityproduct.seckillIssue", "1", {}).then(o.filterResult).then(function(i) {
                t.token = i.token, t.key = i.key, t.offset = i.offset, t.slideRatio = 1 - i.slideLength / 100, 
                t.setData({
                    slideLength: i.slideLength,
                    correctPosition: i.correctPosition,
                    maskLeft: i.correctPosition * t.slideRatio,
                    tips: {
                        text: "向右滑动滑块完成拼图",
                        type: "normal"
                    }
                });
            });
        },
        showSlider: function() {
            this.setData({
                isShow: !0
            });
        },
        hideSlider: function() {
            this.$root.$wrapper && this.$root.$wrapper.$emit("$mask.forceHide"), this.setData({
                isShow: !1
            });
        },
        onSliderMove: function(t) {
            var i = t.touches[0];
            this.updateData(i);
        },
        onSliderEnd: function(t) {
            var i = t.changedTouches[0];
            this.updateData(i), this.movePosition = Math.round(this.movePosition);
            var e = this.movePosition, o = this.data.correctPosition, s = this.offset;
            e >= o && e <= o + s ? this.checkValid() : this.validFailCallback();
        },
        updateData: function(t) {
            this.moveX = t.clientX;
            var i = (this.moveX - this.startX) / (552 * this.screenRatio * this.barRatio) * 100;
            this.movePosition = Math.min(Math.max(0, i), 100), this.setData({
                slideLeft: this.movePosition * this.slideRatio,
                barWidth: this.movePosition * this.barRatio + 92 / 552 * 100
            });
        },
        checkValid: function() {
            var t = this;
            this.$root.$wrapper && this.$root.$wrapper.$emit("$loading.show");
            var r = s("9aAbGQjhx2" + s(this.key) + "4Jmn7uwx3K").substring(0, 16);
            r = i.CryptoJS.enc.Utf8.parse(r);
            var a = i.CryptoJS.AES.encrypt(this.movePosition.toString(), r, {
                mode: i.CryptoJS.mode.ECB,
                padding: i.CryptoJS.pad.Pkcs7
            }), n = i.CryptoJS.enc.Base64.stringify(a.ciphertext);
            this.$root.$mwp("mwp.mgsSecurityproduct.seckillValidate", "1", {
                token: this.token,
                movedPosition: n
            }).then(o.filterResult).then(function(i) {
                t.$root.$wrapper && t.$root.$wrapper.$emit("$loading.hide"), i.validateResult ? (t.$emit("valid-success", t.token), 
                t.hideSlider(), t.resetSlider()) : t.validFailCallback(i.errorMsg);
            }).catch(function(i) {
                t.$root.$wrapper && t.$root.$wrapper.$emit("$loading.hide"), e.bind(t, i)(), t.validFailCallback();
            });
        },
        resetSlider: function() {
            this.times = 0, this.movePosition = 0, this.setData({
                barWidth: 92 / 552 * 100,
                slideLeft: 0,
                tips: {
                    text: "向右滑动滑块完成拼图",
                    type: "normal"
                }
            });
        },
        validFailCallback: function(t) {
            this.times++, this.movePosition = 0, this.setData({
                barWidth: 92 / 552 * 100,
                slideLeft: 0,
                tips: {
                    text: t || "验证失败，请重新拖动",
                    type: "fail"
                }
            }), this.times >= 5 && (this.times = 0, this.getInitialData());
        },
        wordsToBytes: function(t) {
            for (var i = [], e = 0; e < 32 * t.length; e += 8) i.push(t[e >>> 5] >>> 24 - e % 32 & 255);
            return i;
        }
    }
};
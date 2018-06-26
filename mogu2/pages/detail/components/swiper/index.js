function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = t(require("../../../../common/utils/imgUrlTool")), e = require("../../../../common/m"), a = t(e), s = function(t) {
    if (t && t.__esModule) return t;
    var i = {};
    if (null != t) for (var e in t) Object.prototype.hasOwnProperty.call(t, e) && (i[e] = t[e]);
    return i.default = t, i;
}(require("../base/index")), o = a.default.MWP, h = s.fn.getImageSize, r = s.handleRequestError;

exports.default = {
    data: function() {
        return {
            page: 1,
            scrollLeft: 0,
            transitionDuration: "0",
            placeholder: "https://s10.mogucdn.com/mlcdn/c45406/171227_01b9eadgc49c10fd68a0k05651bhh_1040x1560.png"
        };
    },
    onLoad: function() {
        this.page = 1;
    },
    methods: {
        init: function(t) {
            var a = this, s = t.topImages, o = t.itemInfo;
            this.video = o && o.video || {};
            var r = this.videoId = this.video.videoId, n = this.videoCover = this.video.cover || "";
            if (s || r && n) {
                var d = void 0;
                s = s || [], r && n && s.unshift(n);
                var u = [];
                this.topImages = s.map(function(t) {
                    var e = i.default.getGoodsRatioSuffix(t, 750, "2:3"), a = h(e), s = 520 * a.height / a.width;
                    return (!d || d < s) && (d = s), u.push({
                        width: 520,
                        height: s
                    }), e;
                }), this.originTopImages = s, this.imageLoadHistory = s.map(function(t, i) {
                    return a.imageLoadHistory && a.imageLoadHistory[i] || !1;
                }), this.pageSize = this.topImages.length, this.deviceWidth = e.System.getSync("systemInfo").windowWidth, 
                this.pageWidth = 750, this.maxLenLimit = this.deviceWidth / 2, this.minLenLimit = 5, 
                this.loadImage(), this.setData({
                    videoCover: r ? n : "",
                    topImages: this.topImages,
                    maxHeight: d,
                    imageSizeList: u
                });
            }
        },
        showBigImage: function(t) {
            var i = +t.currentTarget.dataset.index;
            wx.previewImage({
                current: this.topImages[i],
                urls: this.topImages
            });
        },
        loadImage: function() {
            var t = this.page, i = this.imageLoadHistory, e = this.pageSize;
            1 === t ? (i[t] = !0, i[t - 1] = !0) : t === e ? (i[t - 1] = !0, i[t - 2] = !0) : (i[t] = !0, 
            i[t - 1] = !0, i[t - 2] = !0), this.setData({
                imageLoadHistory: i
            });
        },
        handleScroll: function(t) {
            this.scrollWidth = t.detail.scrollWidth;
        },
        handleTouchStart: function(t) {
            var i = t.changedTouches[0];
            this.touch = i, this.startTime = new Date(), this.userScrolling = !1;
        },
        handleTouchMove: function(t) {
            var i = t.changedTouches[0], e = i.pageX - this.touch.pageX, a = i.pageY - this.touch.pageY, s = Math.abs(e), o = Math.abs(a), h = this.minLenLimit;
            s <= h || s > h && o > 1 * s ? this.$root.$wrapper && this.$root.$wrapper.setData({
                isPageScrollDisabled: !1
            }) : (this.$root.$wrapper && this.$root.$wrapper.setData({
                isPageScrollDisabled: !0
            }), (1 === this.page && e > 0 || this.page === this.pageSize && e < 0) && (e /= 3), 
            this.setData({
                scrollLeft: this.scrollLeft - e * (this.pageWidth / this.deviceWidth),
                transitionDuration: "0"
            }));
        },
        handleTouchEnd: function(t) {
            this.handleTouchEndFunc(t);
        },
        handleTouchCancel: function(t) {
            this.handleTouchEndFunc(t);
        },
        handleTouchEndFunc: function(t) {
            var i = t.changedTouches[0].pageX - this.touch.pageX, e = Math.abs(i), a = new Date() - this.startTime, s = this.maxLenLimit, o = this.minLenLimit;
            (e > s || a < 300 && e > o) && (i < 0 ? this.page = this.page < this.pageSize ? ++this.page : this.pageSize : i > 0 && (this.page = this.page > 1 ? --this.page : 1));
            var h = this.page, r = 540 * this.pageSize + 40, n = 0;
            n = 1 === h ? 0 : h === this.pageSize ? r - 750 : 455 + 540 * (h - 2), this.scrollLeft = n, 
            this.loadImage(), this.setData({
                scrollLeft: n,
                transitionDuration: "300ms",
                imageLoadHistory: this.imageLoadHistory
            }), this.$root.$wrapper && this.$root.$wrapper.setData({
                isPageScrollDisabled: !1
            });
        },
        videoPlay: function() {
            var t = this;
            this.url ? this.$root.$wrapper.$emit("swiper.video", this.url, this.videoCover) : this.$root.$mwp("mwp.media.queryVideo", "1", {
                videoId: this.videoId
            }).then(o.filterResult).then(function(i) {
                var e = i.playSet;
                t.url = e[0].url, t.$root.$wrapper.$emit("swiper.video", t.url, t.videoCover);
            }).catch(function(i) {
                r.bind(t, i)();
            });
        }
    }
};
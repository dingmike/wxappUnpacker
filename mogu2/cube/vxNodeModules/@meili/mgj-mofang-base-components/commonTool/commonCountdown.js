Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = {
    components: {},
    name: "common-countdown",
    props: [ "id", "leftTime", "numstyleConfig", "fontstyleConfig", "timeoutCb" ],
    data: function() {
        var t = Math.random().toString(36).substring(7);
        return {
            countDownId: void 0 !== this.id ? "countDownId-" + this.id : "countDownId-" + t,
            isInview: !0,
            throttleId: null,
            paused: !1,
            lastTime: 0,
            isTimeout: !1,
            firstLoad: !0,
            days: "00",
            hours: "00",
            minutes: "00",
            seconds: "00",
            leftTimeValue: this.leftTime ? this.leftTime : 0,
            fontstyle: Object.assign({
                color: "#000",
                fontSize: 24,
                marginLR: 0
            }, this.fontstyleConfig),
            numstyle: Object.assign({
                color: "#000",
                fontSize: 24,
                backgroundColor: "#fff",
                borderRadius: 0,
                padding: 0
            }, this.numstyleConfig),
            timeoutCallback: this.timeoutCb || function(t) {},
            classData: "flex flex-center "
        };
    },
    watch: {
        leftTime: function(t) {
            this.throtleSetData && this.throtleSetData({
                leftTimeValue: t
            });
        }
    },
    mounted: function() {
        this.getLeftTimeFormat(this.leftTimeValue), this.loop();
    },
    computed: {
        classNumM: function() {
            return "num_" + this.minutes;
        },
        classNumS: function() {
            return "num_" + this.seconds;
        }
    },
    methods: {
        onShow: function() {
            this.isFirstLoad || (this.isInview = !0, this.countDownInViewStatusChange());
        },
        onHide: function() {
            this.isFirstLoad = !1, this.isInview = !1, this.countDownInViewStatusChange();
        },
        isIntoView: function(t, e) {
            return !(!t.top || !t.height) && (t.top <= 0 && t.height + t.top >= 0 || t.top > 0 && t.top <= e);
        },
        asynIsIntoView: function() {
            var t = this;
            if (wx.isH5) {
                var e = this.$el.getBoundingClientRect(), i = this.isIntoView(e, window.innerHeight);
                if (this.isInview === i) return;
                this.isInview = i, this.countDownInViewStatusChange();
            } else {
                var s = wx.getSystemInfoSync();
                wx.createSelectorQuery().select("#" + this.countDownId).boundingClientRect(function(e) {
                    var i = t.isIntoView(e, s.windowHeight);
                    t.isInview !== i && (t.isInview = i, t.countDownInViewStatusChange());
                }).exec();
            }
        },
        countDownInViewStatusChange: function() {
            if (!this.isTimeout) if (this.isInview) {
                this.paused = !1;
                var t = (+new Date() / 1e3 >>> 0) - this.lastTime, e = this.leftTimeValue;
                wx.isH5 ? this.leftTimeValue = e - t < 0 ? 0 : e - t : this.throtleSetData({
                    leftTimeValue: e - t < 0 ? 0 : e - t
                }), this.loop();
            } else this.paused = !0, this.lastTime = +new Date() / 1e3 >>> 0;
        },
        scroll: function() {
            var t = this;
            this.throttleId || (this.throttleId = setTimeout(function() {
                clearTimeout(t.throttleId), t.throttleId = null, t.asynIsIntoView();
            }, 200));
        },
        loop: function() {
            var t = this;
            if (!this.paused) {
                var e = this;
                if (this.getLeftTimeFormat(this.leftTimeValue), this.leftTimeValue > 0) this.throtleSetData && this.throtleSetData({
                    leftTimeValue: e.leftTimeValue - 1
                }), clearTimeout(this.loopSet), this.loopSet = setTimeout(function() {
                    t.loop();
                }, 1e3); else {
                    if (0 !== this.leftTimeValue) return;
                    clearTimeout(this.loopSet), this.isTimeout || (this.timeoutCallback(this.id), wx.isH5 ? this.isTimeout = !0 : this.throtleSetData && e.throtleSetData({
                        isTimeout: !0
                    }));
                }
            }
        },
        getLeftTimeFormat: function(t) {
            var e = parseInt(t / 60 / 60 / 24, 10), i = parseInt(t / 60 / 60 % 24, 10), s = parseInt(t / 60 % 60, 10), n = parseInt(t % 60, 10);
            e = (e = "" + e).length < 2 ? this.addZero(e) : (e = "" + e).substr(e.length - 2), 
            this.throtleSetData && this.throtleSetData({
                days: e,
                hours: this.addZero(i),
                minutes: this.addZero(s),
                seconds: this.addZero(n)
            });
        },
        addZero: function(t) {
            return (t = t || 0) >= 10 ? "" + t : t < 10 && t >= 0 ? "0" + t : "00";
        }
    }
};

exports.default = {
    componentOptions: t,
    renderComponentsFunc: function(t) {}
};
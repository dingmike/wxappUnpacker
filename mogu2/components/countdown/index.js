Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../common/m")).default.fn.sendMsg;

exports.default = {
    _timer: null,
    _listTimer: null,
    data: function() {
        return {
            format: "",
            countdown: 0,
            countdownList: []
        };
    },
    getTimeItems: function(t, i, e) {
        t < 0 && (t = 0);
        var s = [], n = i.match(/[a-zA-Z]{1,3}/g), o = i.match(/[\u4e00-\u9fa5]+|[^a-zA-Z]/g) || [], r = this.getTime(t, i, e), a = n.length;
        return n.map(function(t, i) {
            e && ("00" === r[t] || "0" === r[t]) && i < a - 1 || s.push({
                num: r[t],
                symbol: o[i]
            });
        }), s;
    },
    getTime: function(t, i) {
        var e = Math.floor(t / 86400), s = Math.floor((t - 24 * e * 60 * 60) / 3600), n = Math.floor((t - 60 * (24 * e * 60 + 60 * s)) / 60), o = Math.floor(t - 60 * (24 * e * 60 + 60 * s + n));
        return t >= 86400 && -1 === i.indexOf("d") && (s += 24 * e), t >= 3600 && -1 === i.indexOf("h") && (n += 60 * s), 
        t >= 60 && -1 === i.indexOf("m") && (o += 60 * n), {
            dd: this.formatTime(e),
            hh: this.formatTime(s),
            mm: this.formatTime(n),
            ss: this.formatTime(o),
            d: e,
            h: s,
            m: n,
            s: o
        };
    },
    formatTime: function(t) {
        return t < 10 ? "0" + t : t;
    },
    setCountdownTimeItems: function(t, i) {
        var e = i.isHideZero, s = i.format, n = i.runCallback, o = i.endCallback, r = parseInt(Math.ceil(t / 1e3));
        n && n(r), r <= 0 && (clearTimeout(this._timer), o && o(r));
        var a = this.getTimeItems(r, s, e);
        this.setData({
            timeItems: a
        });
    },
    initCountdown: function(t, i) {
        var e = this;
        clearTimeout(this._timer);
        var s = new Date().getTime(), n = t - s, o = n % 1e3 || 0;
        this._timer = setTimeout(function() {
            e.initCountdown(t, i);
        }, o), this.setCountdownTimeItems(n, i);
    },
    setCountdownTimeItemsList: function() {
        var t = this, i = [], e = 0, s = new Date().getTime();
        this.showTimeList.forEach(function(n) {
            var o = n.format, r = n.endTime, a = n.isHideZero, m = parseInt(Math.ceil((r - s) / 1e3));
            m <= 0 && (m = 0, e++);
            var h = t.getTimeItems(m, o, a);
            i.push(h);
        }), this.showTimeList.length === e && clearTimeout(this._listTimer), this.setData({
            timeItemsList: i
        });
    },
    initCountdownList: function(t) {
        var i = this;
        clearTimeout(this._listTimer);
        var e = new Date().getTime(), s = (t - e) % 1e3 || 0;
        this._listTimer = setTimeout(function() {
            i.initCountdownList(t);
        }, s), this.setCountdownTimeItemsList();
    },
    onShow: function() {
        this.resume(), this.resumeList();
    },
    onHide: function() {
        this.stop(), this.stopList();
    },
    onUnload: function() {
        this.stop(), this.stopList();
    },
    stop: function() {
        this._timer = clearTimeout(this._timer);
    },
    stopList: function() {
        this._listTimer = clearTimeout(this._listTimer);
    },
    resume: function() {
        if (this.format && this.endTime && !this._timer) {
            var t = this.endTime, i = this.format, e = this.runCallback, s = this.endCallback;
            this.initCountdown(t, {
                format: i,
                runCallback: e,
                endCallback: s
            });
        }
    },
    resumeList: function() {
        if (this.showTimeList && this.showTimeList.length > 0 && !this._listTimer) {
            var t = this.maxEndTime;
            this.initCountdownList(t);
        }
    },
    reset: function() {
        if (!this.options) return console.error("[reset] can not apply reset function before init"), 
        void t(new Error("[reset] can not apply reset function before init", {
            _author: "changsheng",
            threshold: 1
        }));
        this.setUp(this.options);
    },
    resetList: function() {
        if (!this.listOptions) return console.error("[resetList] can not apply reset function before init"), 
        void t(new Error("[resetList] can not apply reset function before init", {
            _author: "changsheng",
            threshold: 1
        }));
        this.setUpList(this.listOptions);
    },
    setUp: function(t) {
        var i = t.countdown, e = t.format, s = t.runCallback, n = t.endCallback, o = t.numClass, r = void 0 === o ? "" : o, a = t.symbolClass, m = void 0 === a ? "" : a, h = t.className, u = void 0 === h ? "" : h, l = t.isHideZero, c = 1e3 * i, f = new Date().getTime() + c;
        this.endTime = f, this.format = e, this.runCallback = s, this.endCallback = n, this.isHideZero = l, 
        this.initCountdown(f, {
            isHideZero: l,
            format: e,
            runCallback: s,
            endCallback: n
        }), this.setData({
            numClass: r,
            symbolClass: m,
            className: u
        });
    },
    setUpList: function(t) {
        this.countdownList = t.countdownList;
        var i = new Date().getTime(), e = 0;
        this.showTimeList = this.countdownList.map(function(t) {
            var s = Number(t.countdown) || 0, n = t.format, o = i + 1e3 * s, r = t.isHideZero;
            return o > e && (e = o), {
                format: n,
                endTime: o,
                isHideZero: r
            };
        }), this.maxEndTime = e, this.initCountdownList(e);
    },
    methods: {
        init: function(t) {
            this.options = t, this.setUp(t);
        },
        initList: function(t) {
            this.listOptions = t, this.setUpList(t);
        }
    }
};
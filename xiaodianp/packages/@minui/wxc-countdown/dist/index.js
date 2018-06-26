Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = function() {
    function a(a, b) {
        var c, d = [], f = !0, g = !1;
        try {
            for (var h, i = a[Symbol.iterator](); !(f = (h = i.next()).done) && (d.push(h.value), 
            !b || d.length !== b); f = !0) ;
        } catch (a) {
            g = !0, c = a;
        } finally {
            try {
                !f && i.return && i.return();
            } finally {
                if (g) throw c;
            }
        }
        return d;
    }
    return function(b, c) {
        if (Array.isArray(b)) return b;
        if (Symbol.iterator in Object(b)) return a(b, c);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}();

exports.default = Component({
    behaviors: [],
    properties: {
        countdown: {
            type: Number,
            value: 0,
            observer: "init"
        },
        format: {
            type: String,
            value: "dd天hh时mm分ss秒"
        },
        numStyle: {
            type: String,
            value: ""
        },
        symbolStyle: {
            type: String,
            value: ""
        }
    },
    data: {
        computeTime: 0,
        endTimeMs: 0
    },
    detached: function() {
        this.onPageHide();
    },
    methods: {
        init: function() {
            var a = this.data, b = a.countdown, c = a.format;
            this.computeTime = b, this.format = c;
            var d = Date.now();
            this.endTimeMs = d + 1e3 * this.computeTime, this.initCountdown();
        },
        initCountdown: function() {
            var a = this;
            clearInterval(this._timer);
            var b = Date.now(), c = this.endTimeMs - b;
            this._timer = setTimeout(function() {
                a.initCountdown();
            }, c % 1e3 || 0), this.setCountdownTimeItems(c);
        },
        setCountdownTimeItems: function(a) {
            this.computeTime = parseInt(Math.ceil(a / 1e3)), this.emitRunCount(this.computeTime), 
            0 >= this.computeTime && (clearInterval(this._timer), this.emitEndCount());
            var b = this.getTimeItems(this.computeTime, this.format);
            b.length && 4 === b.length && "00" === b[0].num && b.shift(), this.setData({
                timeItems: b
            });
        },
        getTimeItems: function(a, b) {
            0 > a && (a = 0);
            var c = b.match(/[a-zA-Z]{1,3}/g) || [], d = b.match(/[\u4e00-\u9fa5]+|[^a-zA-Z]/g) || [], f = this.getTime(a, b);
            return c.map(function(a, b) {
                return {
                    num: f[a],
                    symbol: d[b]
                };
            });
        },
        getTime: function(b, c) {
            var d = b, e = [ 60, 60, 24 ].map(function(a) {
                var b = d % a;
                return d = Math.floor(d / a), b;
            }), f = a(e, 3), g = f[0], h = f[1], j = f[2];
            return 86400 < b && -1 === c.indexOf("d") && (j += 24 * d), 3600 < b && -1 === c.indexOf("h") && (h += 60 * j), 
            60 < b && -1 === c.indexOf("m") && (g += 60 * h), {
                dd: this.formatTime(d),
                hh: this.formatTime(j),
                mm: this.formatTime(h),
                ss: this.formatTime(g),
                d: d,
                h: j,
                m: h,
                s: g
            };
        },
        formatTime: function(a) {
            return 10 > a ? "0" + a : a;
        },
        emitRunCount: function() {
            this.triggerEvent("runcount", {
                computeTime: this.computeTime
            });
        },
        emitEndCount: function() {
            this.triggerEvent("endcount");
        },
        onPageShow: function() {
            var a = Date.now();
            this.format && this.endTimeMs && (this.computeTime = parseInt((this.endTimeMs - a) / 1e3), 
            this.initCountdown());
        },
        onPageHide: function() {
            clearInterval(this._timer);
        }
    }
});
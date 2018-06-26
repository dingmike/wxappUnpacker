function a(a, b) {
    if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var b = function() {
    function a(a, b) {
        for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, 
        c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c);
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b;
    };
}(), c = function() {
    function c() {
        var b = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        a(this, c), Object.assign(this, {
            options: b
        }), this.__init();
    }
    return b(c, [ {
        key: "__init",
        value: function() {
            this.page = getCurrentPages()[getCurrentPages().length - 1], this.setData = this.page.setData.bind(this.page), 
            this.restart(this.options);
        }
    }, {
        key: "setDefaults",
        value: function() {
            return {
                date: "June 7, 2087 15:03:25",
                refresh: 1e3,
                offset: 0,
                onEnd: function() {},
                render: function() {}
            };
        }
    }, {
        key: "mergeOptions",
        value: function(a) {
            var b = this.setDefaults();
            for (var c in b) b.hasOwnProperty(c) && (this.options[c] = void 0 === a[c] ? b[c] : a[c], 
            "date" === c && "object" != typeof this.options.date && (this.options.date = new Date(this.options.date)), 
            "function" == typeof this.options[c] && (this.options[c] = this.options[c].bind(this)));
            "object" != typeof this.options.date && (this.options.date = new Date(this.options.date));
        }
    }, {
        key: "getDiffDate",
        value: function() {
            var a = Math.floor, b = (this.options.date.getTime() - Date.now() + this.options.offset) / 1e3, c = {
                years: 0,
                days: 0,
                hours: 0,
                min: 0,
                sec: 0,
                millisec: 0
            };
            return 0 >= b ? (this.interval && (this.stop(), this.options.onEnd()), c) : (31557600 <= b && (c.years = a(b / 31557600), 
            b -= 86400 * (365.25 * c.years)), 86400 <= b && (c.days = a(b / 86400), b -= 86400 * c.days), 
            3600 <= b && (c.hours = a(b / 3600), b -= 3600 * c.hours), 60 <= b && (c.min = a(b / 60), 
            b -= 60 * c.min), c.sec = Math.round(b), c.millisec = 1e3 * (b % 1), c);
        }
    }, {
        key: "leadingZeros",
        value: function(a) {
            var b = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 2;
            return a = a + "", a.length > b ? a : (Array(b + 1).join("0") + a).substr(-b);
        }
    }, {
        key: "update",
        value: function(a) {
            return this.options.date = "object" == typeof a ? a : new Date(a), this.render(), 
            this;
        }
    }, {
        key: "stop",
        value: function() {
            return this.interval && (clearInterval(this.interval), this.interval = !1), this;
        }
    }, {
        key: "render",
        value: function() {
            return this.options.render(this.getDiffDate()), this;
        }
    }, {
        key: "start",
        value: function() {
            var a = this;
            return !this.interval && (this.render(), this.options.refresh && (this.interval = setInterval(function() {
                a.render();
            }, this.options.refresh)), this);
        }
    }, {
        key: "updateOffset",
        value: function(a) {
            return this.options.offset = a, this;
        }
    }, {
        key: "restart",
        value: function() {
            var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            return this.mergeOptions(a), this.interval = !1, this.start(), this;
        }
    } ]), c;
}();

exports.default = c;
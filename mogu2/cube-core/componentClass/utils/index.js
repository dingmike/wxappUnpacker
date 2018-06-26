function t(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function e(t) {
    return "function" == typeof t && /native code/.test(t.toString());
}

function r(t) {
    return void 0 !== t && null !== t && "" !== t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports._Set = exports.nextTick = exports.hasProto = exports.noop = void 0;

var n = function() {
    function t(t, e) {
        for (var r = 0; r < e.length; r++) {
            var n = e[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(t, n.key, n);
        }
    }
    return function(e, r, n) {
        return r && t(e.prototype, r), n && t(e, n), e;
    };
}(), o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

exports.typeOf = function(t) {
    var e = /\[object (\S*)?\]/g, r = f.call(t);
    return e.exec(r)[1];
}, exports.def = function(t, e, r, n) {
    Object.defineProperty(t, e, {
        value: r,
        enumerable: !!n,
        writable: !0,
        configurable: !0
    });
}, exports.isObject = function(t) {
    return null !== t && "object" === (void 0 === t ? "undefined" : o(t));
}, exports.isPlainObject = function(t) {
    return "[object Object]" === f.call(t);
}, exports.hasOwn = function(t, e) {
    return s.call(t, e);
}, exports.remove = function(t, e) {
    if (t.length) {
        var r = t.indexOf(e);
        if (r > -1) return t.splice(r, 1);
    }
}, exports.parsePath = function(t) {
    if (!l.test(t)) {
        var e = t.split(".");
        return function(t) {
            for (var r = 0; r < e.length; r++) {
                if (!t) return;
                t = t[e[r]];
            }
            return t;
        };
    }
}, exports.isNative = e, exports.bind = function(t, e) {
    function r(r) {
        var n = arguments.length;
        try {
            return n ? n > 1 ? t.apply(e, arguments) : t.call(e, r) : t.call(e);
        } catch (t) {
            console.error("there is an error in bind", t);
        }
    }
    return r._length = t.length, r;
}, exports.extend = function(t, e) {
    for (var r in e) t[r] = e[r];
    return t;
}, exports.toArray = function(t, e) {
    e = e || 0;
    for (var r = t.length - e, n = new Array(r); r--; ) n[r] = t[r + e];
    return n;
}, exports.callHook = function(t, e) {
    var r = t[e];
    r && r.call(t);
}, exports.callDirHook = function(t, e, r) {
    var n = e.def && e.def[r];
    n && n(t, e);
}, exports.formatModuleConfig = function(t) {
    return t && t.formData && Object.keys(t.formData).forEach(function(e) {
        e && t.formData[e] && (t[e] = t.formData[e]);
    }), t;
}, exports.kebabize = function(t) {
    return (t + "").replace(/([A-Z])/g, function(t, e, r) {
        return 0 === r ? t.toLowerCase() : "-" + t.toLowerCase();
    });
}, exports.isLargerVersion = function(t) {
    if (!t || !c) return !1;
    var e = t.split("."), r = c.split(".");
    return e[0] != r[0] ? r[0] > e[0] : e[1] != r[1] ? r[1] > e[1] : r[2] >= e[2];
}, exports.isExist = r, exports.handleAcmJoin = function(t, e, n, o, i, u) {
    if (!t) return "";
    var c = (r(n) ? "-idx_" + n : "") + (r(o) ? "-mfs_" + o : "") + (i ? "-dm1_" + i : "") + "-wx";
    return u ? t + "-" + (e || "").split(".")[6] + c : e + c;
};

var i = require("../../../common/m"), u = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(i), c = !1;

try {
    var a = i.System.getSync("systemInfo");
    c = a.SDKVersion;
} catch (t) {
    console.error(t);
}

var f = Object.prototype.toString, s = (exports.noop = function() {}, exports.hasProto = "__proto__" in {}, 
Object.prototype.hasOwnProperty), l = /[^\w.$]/, p = void 0;

"undefined" != typeof Set && e(Set) ? exports._Set = p = Set : exports._Set = p = function() {
    function e() {
        t(this, e), this.set = Object.create(null);
    }
    return n(e, [ {
        key: "has",
        value: function(t) {
            return !0 === this.set[t];
        }
    }, {
        key: "add",
        value: function(t) {
            this.set[t] = !0;
        }
    }, {
        key: "clear",
        value: function() {
            this.set = Object.create(null);
        }
    } ]), e;
}();

exports.nextTick = function() {
    function t() {
        try {
            r = !1;
            var t = e.slice(0);
            e.length = 0;
            for (var n = 0; n < t.length; n++) t[n]();
        } catch (t) {
            console.error("nexttick error", t);
        }
    }
    var e = [], r = !1, n = void 0;
    return n = function(e) {
        setTimeout(function() {
            e && e.__hasKiled || t();
        }, 0);
    }, function(t, o) {
        var i = void 0;
        if (e.push(function() {
            t ? t.call(o) : i && i(o);
        }), r || (r = !0, n(o)), !t && void 0 !== u.default.Promise) return new u.default.Promise(function(t, e) {
            i = t;
        });
    };
}();

exports._Set = p;
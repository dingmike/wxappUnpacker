function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function r(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function n(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var a = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
    };
}(), o = require("./observer/index"), i = e(require("./observer/watcher")), u = require("./utils/index"), l = require("./init/initWatch"), c = e(require("../../common/base/Events.js")), s = function(e) {
    function s(e, n, a, o, i, u) {
        return t(this, s), r(this, (s.__proto__ || Object.getPrototypeOf(s)).call(this, e, n, a, o, i, u));
    }
    return n(s, c.default), a(s, [ {
        key: "$watch",
        value: function(e, t, r) {
            var n = this;
            if ((0, u.isPlainObject)(t)) return (0, l.createWatcher)(n, e, t, r);
            r = r || {};
            var a = new i.default(n, e, t, r);
            return r.immediate && t.call(n, a.value), function() {
                a.teardown();
            };
        }
    }, {
        key: "$set",
        value: function(e, t, r) {
            o.set.call(this, e, t, r);
        }
    }, {
        key: "$del",
        value: function(e, t) {
            o.del.call(this, e, t);
        }
    }, {
        key: "$nextTick",
        value: function(e) {
            (0, u.nextTick)(e, this);
        }
    }, {
        key: "setData",
        value: function(e) {
            this.$vm.setData(e);
        }
    }, {
        key: "throtleSetData",
        value: function(e, t) {
            this.__hasKilled || (this.$wrapper.__throttleSetDataQueue.push({
                vm: this,
                obj: e
            }), t && !this.$wrapper["throtleSetData_" + t] ? (this.$wrapper["throtleSetData_" + t] = this.$wrapper.__throtleSetData(t), 
            this.$wrapper["throtleSetData_" + t]()) : t && this.$wrapper["throtleSetData_" + t] ? this.$wrapper["throtleSetData_" + t]() : this.$wrapper.throtleSetData());
        }
    }, {
        key: "vxCollectMwpRequest",
        value: function(e, t, r) {
            return this.$wrapper.__collectMwpRequest(e, t, r);
        }
    } ]), s;
}();

exports.default = s;
function e(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function t(e) {
    d.clear(), s(e, d);
}

function s(e, t) {
    var i = void 0, h = void 0, n = Array.isArray(e);
    if ((n || (0, r.isObject)(e)) && Object.isExtensible(e)) {
        if (e.__ob__) {
            var a = e.__ob__.dep.id;
            if (t.has(a)) return;
            t.add(a);
        }
        if (n) for (i = e.length; i--; ) s(e[i], t); else for (i = (h = Object.keys(e)).length; i--; ) s(e[h[i]], t);
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = function() {
    function e(e, t) {
        for (var s = 0; s < t.length; s++) {
            var i = t[s];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, s, i) {
        return s && e(t.prototype, s), i && e(t, i), t;
    };
}(), h = require("./scheduler"), n = require("./dep"), r = (function(e) {
    e && e.__esModule;
}(n), require("../utils/index")), a = 0, u = function() {
    function s(t, i, h, n) {
        e(this, s), this.vm = t, t._vx_watchers.push(this), n ? (this.deep = !!n.deep, this.lazy = !!n.lazy, 
        this.sync = !!n.sync) : this.deep = this.lazy = this.sync = !1, this.cb = h, this.id = ++a, 
        this.active = !0, this.dirty = this.lazy, this.deps = [], this.newDeps = [], this.depIds = new r._Set(), 
        this.newDepIds = new r._Set(), this.expression = "", "function" == typeof i ? this.getter = i : (this.getter = (0, 
        r.parsePath)(i), this.getter || (this.getter = function() {})), this.value = this.lazy ? void 0 : this.get();
    }
    return i(s, [ {
        key: "get",
        value: function() {
            (0, n.pushTarget)(this);
            var e = void 0, s = this.vm;
            return e = this.getter.call(s, s), this.deep && t(e), (0, n.popTarget)(), this.cleanupDeps(), 
            e;
        }
    }, {
        key: "addDep",
        value: function(e) {
            var t = e.id;
            this.newDepIds.has(t) || (this.newDepIds.add(t), this.newDeps.push(e), this.depIds.has(t) || e.addSub(this));
        }
    }, {
        key: "cleanupDeps",
        value: function() {
            for (var e = this.deps.length; e--; ) {
                var t = this.deps[e];
                this.newDepIds.has(t.id) || t.removeSub(this);
            }
            var s = this.depIds;
            this.depIds = this.newDepIds, this.newDepIds = s, this.newDepIds.clear(), s = this.deps, 
            this.deps = this.newDeps, this.newDeps = s, this.newDeps.length = 0;
        }
    }, {
        key: "update",
        value: function() {
            this.lazy ? this.dirty = !0 : this.sync ? this.run() : (0, h.queueWatcher)(this);
        }
    }, {
        key: "run",
        value: function() {
            if (this.active) {
                var e = this.get();
                if (e !== this.value || (0, r.isObject)(e) || this.deep) {
                    var t = this.value;
                    this.value = e, this.cb.call(this.vm, e, t);
                }
            }
        }
    }, {
        key: "evaluate",
        value: function() {
            this.value = this.get(), this.dirty = !1;
        }
    }, {
        key: "depend",
        value: function() {
            for (var e = this.deps.length; e--; ) this.deps[e].depend();
        }
    }, {
        key: "teardown",
        value: function() {
            if (this.active) {
                this.vm._isBeingDestroyed || (0, r.remove)(this.vm._vx_watchers, this);
                for (var e = this.deps.length; e--; ) this.deps[e].removeSub(this);
                this.active = !1;
            }
        }
    } ]), s;
}();

exports.default = u;

var d = new r._Set();
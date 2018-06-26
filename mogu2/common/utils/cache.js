function t(t, e) {
    function n() {
        this.constructor = t;
    }
    r(t, e), t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype, 
    new n());
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.PersistentStorage = exports.MemoryStorage = void 0;

var e = require("../../lib/utils"), r = Object.setPrototypeOf || {
    __proto__: []
} instanceof Array && function(t, e) {
    t.__proto__ = e;
} || function(t, e) {
    for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
}, n = function() {
    function t() {
        this._storage = Object.create(null);
    }
    return t.getInstance = function() {
        return null === this._instance ? this._instance = new this() : this._instance;
    }, t.prototype.has = function(t) {
        return t in this._storage;
    }, t.prototype.forEach = function(t, e) {
        var r = this._storage;
        for (var n in r) t.call(e, r[n], n);
    }, t.prototype.purge = function() {
        this._storage = Object.create(null);
    }, t.prototype.put = function(t, e, r) {
        return void 0 === e ? this.remove(t) : this._storage[t] = e;
    }, t.prototype.get = function(t) {
        return this._storage[t];
    }, t.prototype.getAll = function() {
        return (0, e.clone)(this._storage);
    }, t.prototype.remove = function(t) {
        delete this._storage[t];
    }, t.prototype.getAndRemove = function(t) {
        var e = this.get(t);
        return void 0 !== e && this.remove(t), e;
    }, t._instance = null, t;
}(), o = 20, i = function(e) {
    function r(t) {
        void 0 === t && (t = o);
        var r = e.call(this) || this;
        return r._queue = [], r.capacity = t, r;
    }
    return t(r, e), r.prototype.purge = function() {
        e.prototype.purge.call(this), this._queue = [];
    }, r.prototype.put = function(t, r, n) {
        if (void 0 === n && (n = {}), void 0 !== e.prototype.put.call(this, t, r)) {
            if (!0 === n.keep) return r;
            var o = this._queue, i = o.indexOf(t);
            if (i >= 0 && o.splice(i, 1), o.push(t), o.length > this.capacity) for (var s = 0, a = o.length - this.capacity; s < a; s++) e.prototype.remove.call(this, o[s]), 
            o.shift();
            return r;
        }
    }, r.prototype.get = function(t) {
        var r = e.prototype.get.call(this, t);
        if (void 0 !== r) return this._queue.sort(function(e, r) {
            return e === t || r === t ? 1 : 0;
        }), r;
    }, r.prototype.remove = function(t) {
        e.prototype.remove.call(this, t);
        var r = this._queue.indexOf(t);
        r >= 0 && this._queue.splice(r, 1);
    }, r;
}(n), s = "default", a = function(e) {
    function r(t) {
        void 0 === t && (t = s);
        var n = this;
        if (r._namespaces[t]) throw new Error('PersistentStorage with namespace "' + t + '" exists');
        return n = e.call(this) || this, r._namespaces[t] = !0, n._namespace = "storage." + t, 
        n._writeTimer = null, n.readSync(), n;
    }
    return t(r, e), r.prototype.purge = function() {
        e.prototype.purge.call(this), this.write();
    }, r.prototype.put = function(t, r, n) {
        if (void 0 === n && (n = {}), void 0 !== e.prototype.put.call(this, t, r)) return this.write(n.immediate), 
        r;
    }, r.prototype.remove = function(t) {
        e.prototype.remove.call(this, t), this.write();
    }, r.prototype.readSync = function() {
        try {
            var t = wx.getStorageSync(this._namespace);
            t && (this._storage = t);
        } catch (t) {}
    }, r.prototype.write = function(t) {
        var e = this;
        void 0 === t && (t = !1), !0 === t && this._writeSync(), this._writeTimer && clearTimeout(this._writeTimer), 
        this._writeTimer = setTimeout(function() {
            e._write(), e._writeTimer = null;
        }, 0);
    }, r.prototype._write = function() {
        wx.setStorage({
            key: this._namespace,
            data: this._storage
        });
    }, r.prototype._writeSync = function() {
        wx.setStorageSync(this._namespace, this._storage);
    }, r._namespaces = Object.create(null), r;
}(n), c = {
    has: function(t) {
        return i.getInstance().has(t) || a.getInstance().has(t);
    },
    forEach: function(t, e) {
        i.getInstance().forEach(t, e), a.getInstance().forEach(t, e);
    },
    put: function(t, e, r) {
        return void 0 === r && (r = {}), r.persistent ? a.getInstance().put(t, e, r) : i.getInstance().put(t, e, r);
    },
    get: function(t, e) {
        if (void 0 === e && (e = {}), e.persistent) return a.getInstance().get(t);
        var r = i.getInstance().get(t);
        return void 0 === r ? a.getInstance().get(t) : r;
    },
    remove: function(t, e) {
        void 0 === e && (e = {}), e.persistent || i.getInstance().remove(t), a.getInstance().remove(t);
    },
    getAndRemove: function(t, e) {
        if (void 0 === e && (e = {}), e.persistent) return a.getInstance().getAndRemove(t);
        var r = i.getInstance().getAndRemove(t);
        return void 0 === r ? a.getInstance().getAndRemove(t) : r;
    }
};

exports.MemoryStorage = i, exports.PersistentStorage = a, exports.default = c;
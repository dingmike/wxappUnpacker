function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function e(t, e) {
    function o() {
        this.constructor = t;
    }
    c(t, e), t.prototype = null === e ? Object.create(e) : (o.prototype = e.prototype, 
    new o());
}

function o(t, e) {
    function o() {
        a = Object.create(null), s = [];
    }
    function r() {
        n.default.debug("batchedSetData"), n.default.debug("buffer length", JSON.stringify(a).length);
        var r = function() {
            for (var t = 0, e = c.length; t < e; t++) try {
                c[t]();
            } catch (t) {
                n.default.error("uncaught exception in setData callback", t.stack);
            }
        };
        (0, i.apply)(t, e, [ a, u && r ]);
        var c = s;
        o(), u || r();
    }
    var a, s, c = null, u = t.length > 1;
    return o(), function(t, e) {
        n.default.time("setData"), clearTimeout(c), t && (0, i.merge)(a, t), "function" == typeof e && s.push(e);
        for (var o in t) t.hasOwnProperty(o) && (0, i.setAt)(o, this.data, t[o]);
        c = setTimeout(r, 0), n.default.timeEnd("setData");
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.MPage = exports.MComponent = exports.MNode = exports.constants = void 0;

for (var n = t(require("../utils/debug")), i = require("../../lib/utils"), r = t(require("./Events")), a = [ "onLoad", "onShow", "onReady", "onHide", "onUnload" ], s = Object.freeze({
    LIFECYCLE: a
}), c = Object.setPrototypeOf || {
    __proto__: []
} instanceof Array && function(t, e) {
    t.__proto__ = e;
} || function(t, e) {
    for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
}, u = function(t) {
    function o(e, o) {
        var n = this;
        if (!o) throw new Error("component should have parent node");
        return (n = t.call(this) || this)._validate(e), n.$parent = o, n._methods = {}, 
        n._setName(e.name), n._setData(e.data), n._setChildren(e.components), n._setMixins(e.mixins), 
        n._addMethods(e.methods), n._setRest(e), n._setLifecycleListener(), n._mount(), 
        n;
    }
    return e(o, t), o.getComponentClass = function() {
        return this;
    }, Object.defineProperty(o.prototype, "data", {
        get: function() {
            return null;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(o.prototype, "components", {
        get: function() {
            return this._components;
        },
        set: function(t) {
            this._components = t, this._setChildren(t);
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(o.prototype, "$root", {
        get: function() {
            return this.$parent.$root;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(o.prototype, "$id", {
        get: function() {
            return this.$parent.$id + "." + this.name;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(o.prototype, "$scope", {
        get: function() {
            return "";
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(o.prototype, "$components", {
        get: function() {
            return this.$children;
        },
        enumerable: !0,
        configurable: !0
    }), o.prototype.setData = function(t, e) {}, o.prototype.$log = function(t) {
        for (var e = [], o = 1; o < arguments.length; o++) e[o - 1] = arguments[o];
        "string" == typeof t ? e.unshift("[" + this.$id + "] " + t) : e.unshift("[" + this.$id + "]", t), 
        (0, i.apply)(n.default.log, n.default, e);
    }, o.prototype.$dispatch = function(t) {
        for (var e = [], o = 1; o < arguments.length; o++) e[o - 1] = arguments[o];
        var r = [ t ].concat(e), a = this._events[t], s = !0;
        if (a) for (var c = 0, u = a.length; c < u; c++) try {
            !1 === (0, i.apply)(a[c], this, e) && (s = !1);
        } catch (e) {
            n.default.error("fail to execute event handler of", t, e.stack);
        }
        s && this.$parent && this.$parent.$dispatch && (0, i.apply)(this.$parent.$dispatch, this.$parent, r);
    }, o.prototype.$broadcast = function() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        (0, i.apply)(this.$emit, this, t);
        for (var o = 0, n = this.$children.length; o < n; o++) {
            var r = this.$children[o];
            (0, i.apply)(r.$broadcast, r, t);
        }
    }, o.prototype.$kill = function() {
        for (var t = 0, e = this.$children.length; t < e; t++) try {
            this.$children[t].$kill();
        } catch (e) {
            n.default.error(this.$id, "Fail to kill child", this.$children[t].$scope, e.stack);
        }
        this._unmount(), this.$children = null, this.$parent = null;
    }, o.prototype._validate = function(t) {
        if (!t) throw new Error("options is undefined");
    }, o.prototype._setName = function(t) {}, o.prototype._setData = function(t) {}, 
    o.prototype._addMethods = function(t) {
        var e = this;
        t && Object.keys(t).forEach(function(o) {
            "function" == typeof t[o] && (e._methods[o] = t[o]);
        });
    }, o.prototype._setChildren = function(t) {
        var e = this;
        void 0 === t && (t = {});
        var o = this.constructor.getComponentClass();
        return this.$children = Object.keys(t).map(function(n) {
            var i = Object.assign({}, t[n], {
                name: n
            });
            return new o(i, e);
        }), this.$children;
    }, o.prototype._setMixins = function(t) {
        void 0 === t && (t = []), (this._mixins = t).forEach(this._mix, this);
    }, o.prototype._setRest = function(t) {
        Object.assign(this, (0, i.omit)(t, "name", "data", "components", "mixins", "methods"));
    }, o.prototype._setLifecycleListener = function() {
        var t = this;
        a.forEach(function(e) {
            var o = "wx:" + e;
            t.$on(o, t._lifecycleHandler.bind(t, e));
        });
    }, o.prototype._mix = function(t) {
        "function" == typeof t.data && this.setData(t.data()), this._addMethods(t.methods), 
        Object.assign(this, (0, i.omit)(t, "data", "methods", "components", a));
    }, o.prototype._mount = function() {}, o.prototype._unmount = function() {}, o.prototype._lifecycleHandler = function(t) {
        var e = this, o = (0, i.toArray)(arguments, 1);
        if (this._mixins.forEach(function(r) {
            if (r[t]) try {
                (0, i.apply)(r[t], e, o);
            } catch (o) {
                n.default.error(e.$id, "fail to execute mixin lifecycle method", t, o.stack);
            }
        }), this[t]) try {
            (0, i.apply)(this[t], this, o);
        } catch (e) {
            n.default.error(this.$id, "fail to execute lifecycle method", t, e.stack);
        }
    }, o;
}(r.default), p = function(t) {
    function o(e, o) {
        var n = t.call(this, e, o) || this;
        return n._addMethods(e.methods), Object.assign(n, n._methods), n;
    }
    return e(o, t), Object.defineProperty(o.prototype, "data", {
        get: function() {
            return this.$parent.data[this.name];
        },
        set: function(t) {
            t = (0, i.merge)(t, this.data), this.$root.setData((e = {}, e[this.$scope] = t, 
            e));
            var e;
        },
        enumerable: !0,
        configurable: !0
    }), o.prototype.setData = function(t, e) {
        if (this.$parent) {
            var o = this.data, n = {};
            for (var r in t) t.hasOwnProperty(r) && (n[this.$scope + "." + r] = t[r], (0, i.setAt)(r, o, t[r]));
            this.$root.setData(n, e);
        }
    }, Object.defineProperty(o.prototype, "$scope", {
        get: function() {
            return this._scope || (this._scope = [ this.$parent.$scope, this.name ].filter(Boolean).join(".")), 
            this._scope;
        },
        enumerable: !0,
        configurable: !0
    }), o.prototype._validate = function(e) {
        if (t.prototype._validate.call(this, e), !e.name) throw new Error("component name is required");
        if (e.data && "function" != typeof e.data) throw new Error("component data must be function");
    }, o.prototype._setName = function(t) {
        this.name = "$" + t;
    }, o.prototype._setData = function(t) {
        this.data = Object.assign(t ? t() : {}, {
            $scope: this.$scope,
            _pid: this.$parent.data._pid
        });
    }, o.prototype._mount = function() {
        var e = this;
        t.prototype._mount.call(this), this.$parent[this.name] = this;
        var o = this._methods;
        if (o) {
            var n = this.$root, i = this.$scope;
            Object.keys(o).forEach(function(t) {
                "function" == typeof o[t] && Object.defineProperty(n, i + "." + t, {
                    value: o[t].bind(e),
                    configurable: !0,
                    writable: !0
                });
            });
        }
    }, o.prototype._unmount = function() {
        t.prototype._unmount.call(this);
        var e = this._methods;
        if (e) {
            var o = this.$root, n = this.$scope;
            Object.keys(e).forEach(function(t) {
                "function" == typeof e[t] && delete o[n + "." + t];
            });
        }
    }, o;
}(u), f = function(t) {
    function o(e, o) {
        var n = t.call(this, e, o) || this;
        return Object.assign(n, n._methods), n;
    }
    return e(o, t), o.addGlobalComponent = function(t, e) {
        this.globalComponents[t] = e;
    }, o.getComponentClass = function() {
        return p;
    }, Object.defineProperty(o.prototype, "name", {
        get: function() {
            return this._name ? this._name : this.$root ? this._name = "@" + this.route.replace(/^pages\/(.+)\/index$/, "$1").replace(/\//g, "_") : "";
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(o.prototype, "data", {
        get: function() {
            return this.$root.data;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(o.prototype, "route", {
        get: function() {
            return this.$root.route || this.$root.__route__;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(o.prototype, "query", {
        get: function() {
            return this.$root.options || this.$root.query;
        },
        enumerable: !0,
        configurable: !0
    }), o.prototype.setData = function(t, e) {
        this.$root && this.$root.setData(t, e);
    }, Object.defineProperty(o.prototype, "$id", {
        get: function() {
            return this.name;
        },
        enumerable: !0,
        configurable: !0
    }), Object.defineProperty(o.prototype, "$root", {
        get: function() {
            return this.$parent;
        },
        enumerable: !0,
        configurable: !0
    }), o.prototype._setData = function() {
        this.data && (this.data._pid = this.$parent.__wxWebviewId__);
    }, o.prototype._addMethods = function(t) {
        var e = this;
        t && Object.keys(t).forEach(function(o) {
            "function" == typeof t[o] && (e[o] = t[o]);
        });
    }, o.prototype._setChildren = function(e) {
        return void 0 === e && (e = {}), Object.assign(e, o.globalComponents), t.prototype._setChildren.call(this, e);
    }, o.prototype._mount = function() {
        var e = this;
        t.prototype._mount.call(this);
        var o = this.$root;
        this.$children.forEach(function(t) {
            Object.defineProperty(o, t.name, {
                value: t,
                configurable: !0
            });
        }), Object.keys((0, i.omit)(this, a)).forEach(function(t) {
            "function" == typeof e[t] && Object.defineProperty(o, t, {
                value: e[t].bind(e),
                configurable: !0
            });
        }), this._mixins.forEach(function(t) {
            var e = (0, i.omit)(t, "data", "methods", a);
            Object.keys(e).forEach(function(t) {
                Object.defineProperty(o, t, {
                    value: e[t],
                    configurable: !0
                });
            });
        });
    }, o.prototype._unmount = function() {
        var e = this;
        t.prototype._unmount.call(this);
        var o = this.$root;
        this.$children.forEach(function(t) {
            delete o[t.name];
        }), Object.keys((0, i.omit)(this, a)).forEach(function(t) {
            "function" == typeof e[t] && delete o[t];
        }), this._mixins.forEach(function(t) {
            var e = (0, i.omit)(t, "data", "methods", a);
            Object.keys(e).forEach(function(t) {
                delete o[t];
            });
        });
    }, o.globalComponents = {}, o;
}(u), h = a, l = {
    onLoad: function(t) {
        this.query = t;
        try {
            Object.defineProperty(this, "setData", {
                value: o(this.setData, this)
            });
        } catch (t) {
            n.default.warn("Can not override Page#setData");
        }
        this.$page = this.$getFactory().createMPage(this), this.$page.$broadcast("wx:onLoad", t);
    },
    onUnload: function() {
        this.$page.$broadcast("wx:onUnload"), this.$page.$kill(), this.$page = null;
    }
}, d = 0, y = h.length; d < y; d++) {
    var m = h[d];
    l[m] || (l[m] = function(t) {
        return function() {
            this.$page.$broadcast("wx:" + t);
        };
    }(m));
}

var b = function() {
    function t(e) {
        var o = this;
        e.mixins || (e.mixins = []), (n = e.mixins).push.apply(n, t.defaultMixins), e.$getFactory = function() {
            return o;
        }, this.lifecycle = (0, i.pick)(e, h), this.options = (0, i.omit)(e, h);
        var n;
    }
    return t.addDefaultMixin = function() {
        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
        var o = this.defaultMixins;
        t.forEach(function(t) {
            o.indexOf(t) < 0 && o.push(t);
        });
    }, t.addGlobalComponent = function(t, e) {
        f.addGlobalComponent(t, e);
    }, t.createPage = function(e) {
        return new t(e).create();
    }, t.prototype.create = function() {
        var t = Object.assign({}, this.options, l);
        return Page(t);
    }, t.prototype.createMPage = function(t) {
        return new f(Object.assign({}, this.options, this.lifecycle), t);
    }, t.defaultMixins = [], t;
}();

exports.constants = s, exports.MNode = u, exports.MComponent = p, exports.MPage = f, 
exports.default = b;
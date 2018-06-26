function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function n(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function o(e, t) {
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

var i = function() {
    function e(e, t) {
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), r = require("../../common/base/PageFactory"), a = e(require("./observer/watcher")), s = require("./utils/index"), l = e(require("./utils/mcomponent")), c = e(require("./init/initData")), u = e(require("./init/initProps")), d = e(require("./init/initEvent")), h = e(require("./init/initComponents")), f = e(require("./init/initComputed")), _ = e(require("./init/initMethods")), p = e(require("./init/initMixins")), v = require("./init/initWatch"), m = e(require("./init/initWxMethod")), x = e(require("./business")), y = 0, b = function(e) {
    function b(e, o, i, r, a, l) {
        t(this, b);
        var c = n(this, (b.__proto__ || Object.getPrototypeOf(b)).call(this, e, o, i, r, a, l)), u = o.moduleId, d = o.systemModuleId;
        c._vx_uid = y++, c._vx_moduleId = u, c._vx_systemModuleId = d, c._vx_moduleAcm = o.acm, 
        c._globalVM = e, c._vx_moduleConfig = o, o.isShopData ? (c.moduleInfo = (0, s.formatModuleConfig)(o), 
        c.formData = (0, s.formatModuleConfig)(o.content)) : c.config = (0, s.formatModuleConfig)(o.schema), 
        c._vx_watchers = [], c._vx_data = null, c._vx_dirtyData = [], c._vx_props = {}, 
        c._events = {}, c.options = i.componentOptions, c.renderComponentsFunc = i.renderComponentsFunc, 
        c.parent = r, c.$wrapper = e.$wrapper, c._vx_components = (0, s.extend)(c._vx_components || {}, c.options.components), 
        c._vx_children = [], c._vx_oldChildren = [], c.setComponents.call(c), (0, s.extend)(c, c.options), 
        (0, s.extend)(c, {
            components: {}
        }), a && a.props && (c._vx_props = a.props, (0, s.extend)(c, a.props)), a && a.events && (Object.keys(a.events).forEach(function(e) {
            c._events[e] = [ a.events[e] ];
        }), c.methods = c.methods || {}, (0, s.extend)(c.methods, a.events));
        var h = (0, s.extend)(c.businessMethods, c.options.methods);
        return c.methods = c.methods || {}, (0, s.extend)(c, {
            methods: h
        }), a && a.key && (c.key = a.key), c.setScrollInfo = l.setScrollInfo, c.setShareInfo = l.setShareInfo, 
        c.setGlobal = l.setGlobal, c.getGlobal = l.getGlobal, c.setGlobalCssInfo = l.setGlobalCssInfo, 
        c.triggerLazyMotion = l.triggerLazyMotion, c.setOnShare = l.setOnShare, c.showToast = l.showToast, 
        c.hideToast = l.hideToast, c.env = l.env, c.methods && c.methods.onShare && l.setOnShare(function(e) {
            try {
                return c.methods.onShare.call(c, e);
            } catch (e) {
                return console.error("this inst is destroy, share cant use this", e), {};
            }
        }), c.name = c.name || "m" + u, c._init(), c.initBusiness(), (0, s.callHook)(c, "created"), 
        (0, s.callHook)(c, "beforeMount"), c;
    }
    return o(b, x.default), i(b, [ {
        key: "_init",
        value: function() {
            var e = this;
            (0, s.callHook)(this, "beforeCreate"), p.default.call(this), d.default.call(this), 
            u.default.call(this), _.default.call(this), c.default.call(this), h.default.call(this, b, this.parent), 
            f.default.call(this), v.initWatch.call(this), this._vx_watchers.push(new a.default(this, function() {
                if (!e.__hasKilled) {
                    var t = {};
                    e._vx_dirtyData.forEach(function(n) {
                        e._vx_data && void 0 !== e._vx_data[n] && (t[n] = e._vx_data[n]);
                    });
                    for (var n in e.computed) void 0 !== e[n] && (t[n] = e[n]);
                    for (var o in e.props) {
                        var i = e.props[o];
                        (0, s.isObject)(i) || (0, s.isNative)(i) ? void 0 !== e[o] && (t[o] = e[o]) : void 0 !== e[i] && (t[i] = e[i]);
                    }
                    if ([ "__vx_class", "__vx_style" ].forEach(function(n) {
                        t[n] = e[n] || "";
                    }), e.$vm) {
                        var r = function() {
                            e.__hasKilled || (0, s.callHook)(e, "updated");
                        };
                        if ((0, s.isLargerVersion)("1.5.0")) e.$vm.setData(t, r); else {
                            e.$vm.setData(t);
                            setTimeout(r, 0);
                        }
                        (0, s.callHook)(e, "beforeUpdate");
                    }
                    return e.mountedInParent(), e.renderComponents.call(e, e.renderComponentsFunc), 
                    e._vx_dirtyData = [], e._vx_data;
                }
            }, function() {}, {
                deep: !0
            })), m.default.call(this);
        }
    }, {
        key: "setComponents",
        value: function() {
            var e = this._vx_components, t = {};
            for (var n in e) e[n].componentOptions || (e[n] = (0, l.default)(e[n], function() {
                return {};
            })), e[n].componentOptions.name || (e[n].componentOptions.name = n), t[e[n].componentOptions.name] = e[n];
            this._vx_components = t;
        }
    }, {
        key: "setProps",
        value: function(e) {
            for (var t in e) this[t] = e[t];
        }
    }, {
        key: "mountedInParent",
        value: function() {
            var e = this;
            if (!this.parent.$children || -1 == this.parent.$children.findIndex(function(t) {
                return t.name == "$" + e.label;
            })) {
                this.parent.$children = (this.parent.$children || []).concat(new r.MComponent(Object.assign({}, this, {
                    name: this.label
                }), this.parent)), function() {
                    var t = {
                        label: e.label
                    };
                    e._vx_dirtyData.forEach(function(n) {
                        e._vx_data && void 0 !== e._vx_data[n] && (t[n] = e._vx_data[n]);
                    });
                    for (var n in e.computed) void 0 !== e[n] && (t[n] = e[n]);
                    for (var o in e.props) {
                        var i = e.props[o];
                        (0, s.isObject)(i) || (0, s.isNative)(i) ? void 0 !== e[o] && (t[o] = e[o]) : void 0 !== e[i] && (t[i] = e[i]);
                    }
                    [ "__vx_class", "__vx_style" ].forEach(function(n) {
                        t[n] = e[n] || "";
                    });
                    var r = function() {
                        e.__hasKilled || ((0, s.callDirHook)(e, {}, "bind"), (0, s.callHook)(e, "mounted"));
                    };
                    (0, s.isLargerVersion)("1.5.0") ? e.$vm.setData(t, r) : (e.$vm.setData(t), setTimeout(r, 0));
                }();
            }
        }
    }, {
        key: "destroy",
        value: function() {
            var e = this;
            if ((0, s.callHook)(this, "beforeDestroy"), this.parent.$children) {
                var t = this.parent.$children.findIndex(function(t) {
                    return t.name == "$" + e.label;
                });
                -1 != t && this.parent.$children.splice(t, 1);
            }
            this._vx_children && this._vx_children.length && this._vx_children.forEach(function(e) {
                e.destroy();
            }), this.$vm.$children = [];
            try {
                this.$vm.$kill();
            } catch (e) {
                console.error("delete inst error");
            }
            this.__hasKilled = this.$vm.__hasKilled = !0, (0, s.callHook)(this, "destroyed");
        }
    }, {
        key: "label",
        get: function() {
            return this.key ? this.name + "_" + this.key : this.__isCommonComponent ? this.name : this.name + "_" + this._vx_uid;
        }
    }, {
        key: "$vm",
        get: function() {
            return this.parent && this.parent["$" + this.label];
        }
    }, {
        key: "$root",
        get: function() {
            return this.$vm.$root;
        }
    } ]), b;
}();

exports.default = b;
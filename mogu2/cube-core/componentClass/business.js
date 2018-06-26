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

function a(e, t, r) {
    if (e && e.currentTarget && e.currentTarget.dataset) {
        var n = e.currentTarget.dataset;
        if (!n.href && !n.page) return;
        f(t, r, e);
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = function() {
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
}(), i = function e(t, r, n) {
    null === t && (t = Function.prototype);
    var a = Object.getOwnPropertyDescriptor(t, r);
    if (void 0 === a) {
        var o = Object.getPrototypeOf(t);
        return null === o ? void 0 : e(o, r, n);
    }
    if ("value" in a) return a.value;
    var i = a.get;
    if (void 0 !== i) return i.call(n);
}, u = e(require("./api")), c = require("./internalComponents/index"), l = require("./utils/index"), s = require("../../common/m"), f = e(s).default.fn.debounce(function(e, t, r) {
    e.call(t, r);
}, 1e3, !0), v = function(e) {
    function f(e, n, o, i, u, l) {
        t(this, f);
        var v = r(this, (f.__proto__ || Object.getPrototypeOf(f)).call(this, e, n, o, i, u, l));
        v._vx_components = {};
        for (var _ in c.internalComponents) v._vx_components[c.internalComponents[_].componentOptions.name] = c.internalComponents[_];
        return v._vx_lazyData = {}, v._vx_lazyDataCtx = {}, v.businessMethods = {
            $vx_redirect: function(e) {
                a(e, v.vx_redirect, v);
            },
            $vx_navigate: function(e) {
                a(e, v.vx_navigate, v);
            },
            $vx_launch: function(e) {
                a(e, v.vx_launch, v);
            },
            $logE: function(e, t) {
                v.$root.$logE(e, t);
            },
            getShieldParam: function() {
                return {
                    platform: "sp"
                };
            },
            $vx_getSystemInfo: function() {
                return s.System.getSync("systemInfo");
            },
            $vx_formSubmitHandler: function(e) {
                v.vx_formSubmitHandler(e);
            }
        }, v;
    }
    return n(f, u.default), o(f, [ {
        key: "initBusiness",
        value: function() {
            this.initLazyData();
        }
    }, {
        key: "initLazyData",
        value: function() {
            var e = this;
            this.$vm.$on("vx:__lazy-data__", function(t, r, n) {
                e._vx_lazyData[r] = t, e._vx_lazyDataCtx[r] = n, e.$emit("__lazy-data__", t, r, n);
            });
        }
    }, {
        key: "transformStyleCode",
        value: function(e) {
            var t = void 0, r = [];
            if ("string" != typeof e) try {
                var n = e;
                Object.keys(n).forEach(function(e) {
                    var t = (0, l.kebabize)(e);
                    r.push(t + ":" + n[e]);
                }), t = r.join(";") + ";";
            } catch (e) {
                return "";
            } else t = e;
            if (!t || !t.split) return t;
            var a = t.split(";");
            return (a = (a || []).map(function(e) {
                var t = e.split(":");
                if (t && t.length > 1) {
                    var r = t[1].split(" ");
                    r = (r || []).map(function(e) {
                        return -1 != e.indexOf("rem") ? e.replace(/(([+-]?)\d*(\.?\d*))rem/g, function(e, t) {
                            return "0" == t ? "0" : 100 * t + "rpx";
                        }) : -1 != e.indexOf("px") ? e.replace(/(([+-]?)\d*(\.?\d*))px/g, function(e, t) {
                            return "0" == t ? "0" : t + "rpx";
                        }).replace(/rrpx/g, "rpx") : e;
                    }), t[1] = r.join(" ");
                }
                return t.join(":");
            })).join(";");
        }
    }, {
        key: "_removeDupDataset",
        value: function(e) {
            var t = [ "cubeacm", "anchorindex", "pitindex", "datalogcontent", "datalogiid", "cubeacmnode" ], r = {};
            return (e && Object.keys(e) || []).forEach(function(n) {
                -1 === t.indexOf(n.toLowerCase()) && (r[n] = e[n]);
            }), r;
        }
    }, {
        key: "_handleLogAcm",
        value: function(e) {
            var t = e.currentTarget && e.currentTarget.dataset || {}, r = this.$wrapper.__hasLogged;
            if (!r) return "";
            var n = 0, a = r["m" + this._vx_moduleId] && r["m" + this._vx_moduleId].__len || 0, o = this._vx_moduleAcm, i = !1;
            if (!o) return "";
            t.cubeAcm ? (n = r["m" + this._vx_moduleId][t.cubeAcm], o = t.cubeAcm, i = !0) : void 0 !== t.anchorIndex ? n = r["m" + this._vx_moduleId]["anchor" + t.anchorIndex] : void 0 !== t.pitIndex && (n = r["m" + this._vx_moduleId]["pit" + t.pitIndex]);
            try {
                return this.vx_handleAcm(o, n, a, i);
            } catch (e) {
                return console.error("acm format error"), "";
            }
        }
    }, {
        key: "vx_handleAcm",
        value: function(e, t, r, n) {
            if (!e) return "";
            var a = this.$wrapper.acmInfo;
            return (0, l.handleAcmJoin)(e, this._vx_moduleAcm, t, r, a, !!n);
        }
    }, {
        key: "vx_getModuleAcm",
        value: function() {
            return this._vx_moduleAcm;
        }
    }, {
        key: "vx_redirect",
        value: function(e, t, r) {
            var n = r, a = e;
            "string" != typeof e && (n = a, a = null);
            var o = n && n.currentTarget && n.currentTarget.dataset;
            if (o) {
                o = this._removeDupDataset(o);
                var i = this._handleLogAcm(n);
                if (o.acm = i, a && (o.href = a), n.currentTarget.dataset = Object.assign(o, t), 
                !o.href && !o.page) return;
                o.cparam || delete o.cparam, this.$root.$redirect(n);
            } else {
                if (!e) return;
                this.$root.$redirect(e, t);
            }
        }
    }, {
        key: "vx_navigate",
        value: function(e, t, r) {
            var n = r, a = e;
            "string" != typeof e && (n = a, a = null);
            var o = n && n.currentTarget && n.currentTarget.dataset;
            if (o) {
                o = this._removeDupDataset(o);
                var i = this._handleLogAcm(n);
                if (o.acm = i, a && (o.href = a), n.currentTarget.dataset = Object.assign(o, t), 
                !o.href && !o.page) return;
                o.cparam || delete o.cparam, this.$root.$navigate(n);
            } else {
                if (!e) return;
                this.$root.$navigate(e, t);
            }
        }
    }, {
        key: "vx_launch",
        value: function(e, t, r) {
            var n = r, a = e;
            "string" != typeof e && (n = a, a = null);
            var o = n && n.currentTarget && n.currentTarget.dataset;
            if (o) {
                o = this._removeDupDataset(o);
                var i = this._handleLogAcm(n);
                if (o.acm = i, a && (o.href = a), n.currentTarget.dataset = Object.assign(o, t), 
                !o.href && !o.page) return;
                o.appId ? this.$root.$launch(n) : this.$root.$navigate(n);
            } else {
                if (!e) return;
                this.$root.$launch(e, t);
            }
        }
    }, {
        key: "vx_formSubmitHandler",
        value: function(e) {
            var t = e.detail.formId;
            this.$root.$logForm(t, 1);
        }
    }, {
        key: "$on",
        value: function(e, t) {
            if ("__lazy-data__" === e) for (var r in this._vx_lazyData) t(this._vx_lazyData[r], r, this._vx_lazyDataCtx[r]);
            i(f.prototype.__proto__ || Object.getPrototypeOf(f.prototype), "$on", this).call(this, e, t);
        }
    } ]), f;
}();

exports.default = v;
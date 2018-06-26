function t(t, e, n) {
    a.get = function() {
        return this[e][n];
    }, a.set = function(t) {
        this[e][n] = t;
    }, Object.defineProperty(t, n, a);
}

function e(t, e) {
    return t.call(e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.proxy = t, exports.default = function() {
    var a = this;
    if (this.data) {
        "Function" === (0, n.typeOf)(this.data) && (this.data = e(this.data, this)), this._vx_data = this.data, 
        this.data = function() {
            return Object.assign({}, a._vx_data);
        };
        var o = Object.keys(this._vx_components) || [];
        o = o.map(function(t) {
            return "$" + t;
        }), Object.keys(this._vx_data).forEach(function(e) {
            a._vx_dirtyData.push(e);
            var n = o.indexOf(e), i = o[n];
            -1 !== n && a._vx_components[i].componentOptions.__isCommonComponent || t(a, "_vx_data", e);
        }), (0, i.observe)(this._vx_data, this, null);
    }
};

var n = require("../utils/index"), i = require("../observer/index"), a = {
    enumerable: !0,
    configurable: !0,
    get: n.noop,
    set: n.noop
};
Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function() {
    var i = this;
    for (var t in this.props) {
        var o = this.props[t];
        !(0, s.isObject)(o) || (0, s.isNative)(o) || this[t] || (this[t] = o.default);
    }
    this._vx_props && (Object.keys(this._vx_props).forEach(function(r) {
        (0, e.proxy)(i, "_vx_props", r);
    }), (0, r.observe)(this._vx_props, this, null));
};

var e = require("./initData"), r = require("../observer/index"), s = require("../utils/index");
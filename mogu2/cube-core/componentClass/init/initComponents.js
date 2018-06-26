function o(o, n, e, t, s) {
    var l = {
        setScrollInfo: this.setScrollInfo,
        setGlobalCssInfo: this.setGlobalCssInfo,
        setShareInfo: this.setShareInfo,
        setGlobal: this.setGlobal,
        getGlobal: this.getGlobal,
        triggerLazyMotion: this.triggerLazyMotion,
        setOnShare: this.setOnShare,
        showToast: this.showToast,
        hideToast: this.hideToast,
        env: this.env
    };
    return new i(this._globalVM, this._vx_moduleConfig, this._vx_components[n], this.$vm, {
        props: e,
        events: t,
        key: s
    }, l);
}

function n(n, e, t, s, i) {
    var l = this, _ = void 0, r = void 0, h = 0;
    for (var c in this._vx_oldChildren) this._vx_oldChildren[c].key == i && (_ = this._vx_oldChildren[c], 
    r = h), h++;
    _ ? (_.setProps(t), this._vx_children.push(_), this._vx_oldChildren.splice(r, 1)) : this._vx_children.push(o.call(l, n, e, t, s, i));
}

function e() {
    for (var o in this._vx_oldChildren) this._vx_oldChildren[o].destroy();
    this._vx_oldChildren.splice(0);
}

function t(n) {
    var e = this;
    this._vx_components && Object.keys(this._vx_components).forEach(function(t) {
        if (e._vx_components[t] && e._vx_components[t].componentOptions && e._vx_components[t].componentOptions.__isCommonComponent) {
            var s = void 0, i = void 0, l = 0;
            for (var _ in e._vx_oldChildren) e._vx_oldChildren[_].name == t && (s = e._vx_oldChildren[_], 
            i = l), l++;
            var r = {};
            if (e._vx_components[t].componentOptions.__propsFunc) {
                r = e._vx_components[t].componentOptions.__propsFunc.call(e);
                var h = [];
                h = Object.keys(r), e._vx_components[t].componentOptions.props = h;
            }
            s ? (s.setProps(r), e._vx_children.push(s), e._vx_oldChildren.splice(i, 1)) : e._vx_children.push(o.call(e, n, t, r, {}));
        }
    });
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(l, _) {
    var r = this;
    i = l, this.renderComponent = function(e, t, s, i) {
        r._vx_components[e] && r._vx_components[e].componentOptions && (i ? n.call(r, _, e, t, s, i) : r._vx_children.push(o.call(r, _, e, t, s)));
    }, this.renderComponents = function(o) {
        r._vx_oldChildren = r._vx_children, r._vx_children = [], t.call(r, _), o.call(r, (0, 
        s.bind)(r.renderComponent, r)), e.call(r);
    };
};

var s = require("../utils/index"), i = void 0;
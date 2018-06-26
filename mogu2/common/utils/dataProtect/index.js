function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = e(require("./utils/trim")), r = e(require("./utils/type")), a = new RegExp("\\[([0-9]+)\\]", "gi"), n = new RegExp("\\[('|\\\"|)([a-zA-Z0-9-]+)('|\\\"|)\\]", "gi"), c = function(e) {
    var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    if ("string" != typeof r || 0 === r.length) return e;
    a.test(r) && (r = r.replace(a, ".{{$1}}")), n.test(r) && (r = r.replace(n, ".$2"));
    var c = /\{\{([0-9]+)\}\}/gi;
    return r.split(".").reduce(function(e, r) {
        if (e) return "string" == typeof r && (r = (0, t.default)(r)), c.test(r) && (r = Number(r.replace(c, "$1"))), 
        "" === r ? e : e[r];
    }, e);
}, s = {
    zero: 0,
    null: null,
    undefined: void 0,
    emptyString: "",
    emptyArray: [],
    emptyObject: {}
}, i = function(e, a) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    if ("object" !== (0, r.default)(e) && "array" !== (0, r.default)(e)) return e;
    if ("string" != typeof a || 0 === a.length) return e;
    var i = (0, t.default)(a).split(/[ ]+/), u = Object.assign({}, s, n), l = function t() {
        var r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0, a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1, n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        if ((a += 1) >= i.length) return r;
        var s = i[a];
        switch (s) {
          case "&&":
            return r && t(r, a);

          case "||":
            return r || t(r, a);

          case "==":
          case "===":
          case "!=":
          case "!==":
          case ">":
          case ">=":
          case "<":
          case "<=":
            var u = t(r, a, !0);
            switch (s) {
              case "==":
                r = r == u;
                break;

              case "===":
                r = r === u;
                break;

              case "!=":
                r = r != u;
                break;

              case "!==":
                r = r !== u;
                break;

              case ">":
                r = r > u;
                break;

              case ">=":
                r = r >= u;
                break;

              case "<":
                r = r < u;
                break;

              case "<=":
                r = r <= u;
            }
            return t(r, a + 1);

          default:
            var l = /^(!+)(.*)/, f = null;
            if (l.test(s) && (f = s.replace(l, "$1"), s = s.replace(l, "$2")), r = c(e, s), 
            f) switch (f) {
              case "!":
                r = !r;
                break;

              case "!!":
                r = !!r;
            }
        }
        return n ? r : t(r, a);
    }(), f = (0, r.default)(l);
    if (l) switch (f) {
      case "array":
        l = 0 === l.length ? u.emptyArray : l;
        break;

      case "object":
        l = 0 === Object.keys(l).length ? u.emptyObject : l;
    } else switch (f) {
      case "null":
        l = u.null;
        break;

      case "undefined":
        l = u.undefined;
        break;

      case "number":
        l = u.zero;
        break;

      case "string":
        l = u.emptyString;
    }
    return l;
}, u = {
    get: i,
    set: function() {},
    check: function(e, t, r) {
        return !!i(e, t, r);
    }
};

exports.default = u;
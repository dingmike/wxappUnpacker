function t(t, r, i) {
    null != t && ("number" == typeof t ? this.fromNumber(t, r, i) : null == r && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, r));
}

function r() {
    return new t(null);
}

function i(t) {
    return S.charAt(t);
}

function e(t, r) {
    var i = A[t.charCodeAt(r)];
    return null == i ? -1 : i;
}

function o(t) {
    var i = r();
    return i.fromInt(t), i;
}

function s(t) {
    var r, i = 1;
    return 0 != (r = t >>> 16) && (t = r, i += 16), 0 != (r = t >> 8) && (t = r, i += 8), 
    0 != (r = t >> 4) && (t = r, i += 4), 0 != (r = t >> 2) && (t = r, i += 2), 0 != (r = t >> 1) && (t = r, 
    i += 1), i;
}

function n(t) {
    this.m = t;
}

function h(t) {
    this.m = t, this.mp = t.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, 
    this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t;
}

function a() {
    this.i = 0, this.j = 0, this.S = new Array();
}

function u() {
    return new a();
}

function f() {
    if (null == B) {
        for (B = u(); E < w; ) {
            var t = Math.floor(65536 * Math.random());
            x[E++] = 255 & t;
        }
        for (B.init(x), E = 0; E < x.length; ++E) x[E] = 0;
        E = 0;
    }
    return B.next();
}

function p() {}

function c(r, i) {
    return new t(r, i);
}

function l(r, i) {
    if (i < r.length + 11) return console.error("Message too long for RSA"), null;
    for (var e = new Array(), o = r.length - 1; o >= 0 && i > 0; ) {
        var s = r.charCodeAt(o--);
        s < 128 ? e[--i] = s : s > 127 && s < 2048 ? (e[--i] = 63 & s | 128, e[--i] = s >> 6 | 192) : (e[--i] = 63 & s | 128, 
        e[--i] = s >> 6 & 63 | 128, e[--i] = s >> 12 | 224);
    }
    e[--i] = 0;
    for (var n = new p(), h = new Array(); i > 2; ) {
        for (h[0] = 0; 0 == h[0]; ) n.nextBytes(h);
        e[--i] = h[0];
    }
    return e[--i] = 2, e[--i] = 0, new t(e);
}

function y() {
    this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, 
    this.dmq1 = null, this.coeff = null;
}

function v(t) {
    var r, i, e = "";
    for (r = 0; r + 3 <= t.length; r += 3) i = parseInt(t.substring(r, r + 3), 16), 
    e += M.charAt(i >> 6) + M.charAt(63 & i);
    for (r + 1 == t.length ? (i = parseInt(t.substring(r, r + 1), 16), e += M.charAt(i << 2)) : r + 2 == t.length && (i = parseInt(t.substring(r, r + 2), 16), 
    e += M.charAt(i >> 2) + M.charAt((3 & i) << 4)); (3 & e.length) > 0; ) e += I;
    return e;
}

var m, g = {}, d = {};

d.KJUR = {};

var D = d.KJUR;

"Microsoft Internet Explorer" == g.appName ? (t.prototype.am = function(t, r, i, e, o, s) {
    for (var n = 32767 & r, h = r >> 15; --s >= 0; ) {
        var a = 32767 & this[t], u = this[t++] >> 15, f = h * a + u * n;
        o = ((a = n * a + ((32767 & f) << 15) + i[e] + (1073741823 & o)) >>> 30) + (f >>> 15) + h * u + (o >>> 30), 
        i[e++] = 1073741823 & a;
    }
    return o;
}, m = 30) : "Netscape" != g.appName ? (t.prototype.am = function(t, r, i, e, o, s) {
    for (;--s >= 0; ) {
        var n = r * this[t++] + i[e] + o;
        o = Math.floor(n / 67108864), i[e++] = 67108863 & n;
    }
    return o;
}, m = 26) : (t.prototype.am = function(t, r, i, e, o, s) {
    for (var n = 16383 & r, h = r >> 14; --s >= 0; ) {
        var a = 16383 & this[t], u = this[t++] >> 14, f = h * a + u * n;
        o = ((a = n * a + ((16383 & f) << 14) + i[e] + o) >> 28) + (f >> 14) + h * u, i[e++] = 268435455 & a;
    }
    return o;
}, m = 28), t.prototype.DB = m, t.prototype.DM = (1 << m) - 1, t.prototype.DV = 1 << m;

t.prototype.FV = Math.pow(2, 52), t.prototype.F1 = 52 - m, t.prototype.F2 = 2 * m - 52;

var T, b, S = "0123456789abcdefghijklmnopqrstuvwxyz", A = new Array();

for (T = "0".charCodeAt(0), b = 0; b <= 9; ++b) A[T++] = b;

for (T = "a".charCodeAt(0), b = 10; b < 36; ++b) A[T++] = b;

for (T = "A".charCodeAt(0), b = 10; b < 36; ++b) A[T++] = b;

n.prototype.convert = function(t) {
    return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t;
}, n.prototype.revert = function(t) {
    return t;
}, n.prototype.reduce = function(t) {
    t.divRemTo(this.m, null, t);
}, n.prototype.mulTo = function(t, r, i) {
    t.multiplyTo(r, i), this.reduce(i);
}, n.prototype.sqrTo = function(t, r) {
    t.squareTo(r), this.reduce(r);
}, h.prototype.convert = function(i) {
    var e = r();
    return i.abs().dlShiftTo(this.m.t, e), e.divRemTo(this.m, null, e), i.s < 0 && e.compareTo(t.ZERO) > 0 && this.m.subTo(e, e), 
    e;
}, h.prototype.revert = function(t) {
    var i = r();
    return t.copyTo(i), this.reduce(i), i;
}, h.prototype.reduce = function(t) {
    for (;t.t <= this.mt2; ) t[t.t++] = 0;
    for (var r = 0; r < this.m.t; ++r) {
        var i = 32767 & t[r], e = i * this.mpl + ((i * this.mph + (t[r] >> 15) * this.mpl & this.um) << 15) & t.DM;
        for (t[i = r + this.m.t] += this.m.am(0, e, t, r, 0, this.m.t); t[i] >= t.DV; ) t[i] -= t.DV, 
        t[++i]++;
    }
    t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t);
}, h.prototype.mulTo = function(t, r, i) {
    t.multiplyTo(r, i), this.reduce(i);
}, h.prototype.sqrTo = function(t, r) {
    t.squareTo(r), this.reduce(r);
}, t.prototype.copyTo = function(t) {
    for (var r = this.t - 1; r >= 0; --r) t[r] = this[r];
    t.t = this.t, t.s = this.s;
}, t.prototype.fromInt = function(t) {
    this.t = 1, this.s = t < 0 ? -1 : 0, t > 0 ? this[0] = t : t < -1 ? this[0] = t + DV : this.t = 0;
}, t.prototype.fromString = function(r, i) {
    var o;
    if (16 == i) o = 4; else if (8 == i) o = 3; else if (256 == i) o = 8; else if (2 == i) o = 1; else if (32 == i) o = 5; else {
        if (4 != i) return void this.fromRadix(r, i);
        o = 2;
    }
    this.t = 0, this.s = 0;
    for (var s = r.length, n = !1, h = 0; --s >= 0; ) {
        var a = 8 == o ? 255 & r[s] : e(r, s);
        a < 0 ? "-" == r.charAt(s) && (n = !0) : (n = !1, 0 == h ? this[this.t++] = a : h + o > this.DB ? (this[this.t - 1] |= (a & (1 << this.DB - h) - 1) << h, 
        this[this.t++] = a >> this.DB - h) : this[this.t - 1] |= a << h, (h += o) >= this.DB && (h -= this.DB));
    }
    8 == o && 0 != (128 & r[0]) && (this.s = -1, h > 0 && (this[this.t - 1] |= (1 << this.DB - h) - 1 << h)), 
    this.clamp(), n && t.ZERO.subTo(this, this);
}, t.prototype.clamp = function() {
    for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t; ) --this.t;
}, t.prototype.dlShiftTo = function(t, r) {
    var i;
    for (i = this.t - 1; i >= 0; --i) r[i + t] = this[i];
    for (i = t - 1; i >= 0; --i) r[i] = 0;
    r.t = this.t + t, r.s = this.s;
}, t.prototype.drShiftTo = function(t, r) {
    for (var i = t; i < this.t; ++i) r[i - t] = this[i];
    r.t = Math.max(this.t - t, 0), r.s = this.s;
}, t.prototype.lShiftTo = function(t, r) {
    var i, e = t % this.DB, o = this.DB - e, s = (1 << o) - 1, n = Math.floor(t / this.DB), h = this.s << e & this.DM;
    for (i = this.t - 1; i >= 0; --i) r[i + n + 1] = this[i] >> o | h, h = (this[i] & s) << e;
    for (i = n - 1; i >= 0; --i) r[i] = 0;
    r[n] = h, r.t = this.t + n + 1, r.s = this.s, r.clamp();
}, t.prototype.rShiftTo = function(t, r) {
    r.s = this.s;
    var i = Math.floor(t / this.DB);
    if (i >= this.t) r.t = 0; else {
        var e = t % this.DB, o = this.DB - e, s = (1 << e) - 1;
        r[0] = this[i] >> e;
        for (var n = i + 1; n < this.t; ++n) r[n - i - 1] |= (this[n] & s) << o, r[n - i] = this[n] >> e;
        e > 0 && (r[this.t - i - 1] |= (this.s & s) << o), r.t = this.t - i, r.clamp();
    }
}, t.prototype.subTo = function(t, r) {
    for (var i = 0, e = 0, o = Math.min(t.t, this.t); i < o; ) e += this[i] - t[i], 
    r[i++] = e & this.DM, e >>= this.DB;
    if (t.t < this.t) {
        for (e -= t.s; i < this.t; ) e += this[i], r[i++] = e & this.DM, e >>= this.DB;
        e += this.s;
    } else {
        for (e += this.s; i < t.t; ) e -= t[i], r[i++] = e & this.DM, e >>= this.DB;
        e -= t.s;
    }
    r.s = e < 0 ? -1 : 0, e < -1 ? r[i++] = this.DV + e : e > 0 && (r[i++] = e), r.t = i, 
    r.clamp();
}, t.prototype.multiplyTo = function(r, i) {
    var e = this.abs(), o = r.abs(), s = e.t;
    for (i.t = s + o.t; --s >= 0; ) i[s] = 0;
    for (s = 0; s < o.t; ++s) i[s + e.t] = e.am(0, o[s], i, s, 0, e.t);
    i.s = 0, i.clamp(), this.s != r.s && t.ZERO.subTo(i, i);
}, t.prototype.squareTo = function(t) {
    for (var r = this.abs(), i = t.t = 2 * r.t; --i >= 0; ) t[i] = 0;
    for (i = 0; i < r.t - 1; ++i) {
        var e = r.am(i, r[i], t, 2 * i, 0, 1);
        (t[i + r.t] += r.am(i + 1, 2 * r[i], t, 2 * i + 1, e, r.t - i - 1)) >= r.DV && (t[i + r.t] -= r.DV, 
        t[i + r.t + 1] = 1);
    }
    t.t > 0 && (t[t.t - 1] += r.am(i, r[i], t, 2 * i, 0, 1)), t.s = 0, t.clamp();
}, t.prototype.divRemTo = function(i, e, o) {
    var n = i.abs();
    if (!(n.t <= 0)) {
        var h = this.abs();
        if (h.t < n.t) return null != e && e.fromInt(0), void (null != o && this.copyTo(o));
        null == o && (o = r());
        var a = r(), u = this.s, f = i.s, p = this.DB - s(n[n.t - 1]);
        p > 0 ? (n.lShiftTo(p, a), h.lShiftTo(p, o)) : (n.copyTo(a), h.copyTo(o));
        var c = a.t, l = a[c - 1];
        if (0 != l) {
            var y = l * (1 << this.F1) + (c > 1 ? a[c - 2] >> this.F2 : 0), v = this.FV / y, m = (1 << this.F1) / y, g = 1 << this.F2, d = o.t, D = d - c, T = null == e ? r() : e;
            for (a.dlShiftTo(D, T), o.compareTo(T) >= 0 && (o[o.t++] = 1, o.subTo(T, o)), t.ONE.dlShiftTo(c, T), 
            T.subTo(a, a); a.t < c; ) a[a.t++] = 0;
            for (;--D >= 0; ) {
                var b = o[--d] == l ? this.DM : Math.floor(o[d] * v + (o[d - 1] + g) * m);
                if ((o[d] += a.am(0, b, o, D, 0, c)) < b) for (a.dlShiftTo(D, T), o.subTo(T, o); o[d] < --b; ) o.subTo(T, o);
            }
            null != e && (o.drShiftTo(c, e), u != f && t.ZERO.subTo(e, e)), o.t = c, o.clamp(), 
            p > 0 && o.rShiftTo(p, o), u < 0 && t.ZERO.subTo(o, o);
        }
    }
}, t.prototype.invDigit = function() {
    if (this.t < 1) return 0;
    var t = this[0];
    if (0 == (1 & t)) return 0;
    var r = 3 & t;
    return r = r * (2 - (15 & t) * r) & 15, r = r * (2 - (255 & t) * r) & 255, r = r * (2 - ((65535 & t) * r & 65535)) & 65535, 
    (r = r * (2 - t * r % this.DV) % this.DV) > 0 ? this.DV - r : -r;
}, t.prototype.isEven = function() {
    return 0 == (this.t > 0 ? 1 & this[0] : this.s);
}, t.prototype.exp = function(i, e) {
    if (i > 4294967295 || i < 1) return t.ONE;
    var o = r(), n = r(), h = e.convert(this), a = s(i) - 1;
    for (h.copyTo(o); --a >= 0; ) if (e.sqrTo(o, n), (i & 1 << a) > 0) e.mulTo(n, h, o); else {
        var u = o;
        o = n, n = u;
    }
    return e.revert(o);
}, t.prototype.toString = function(t) {
    if (this.s < 0) return "-" + this.negate().toString(t);
    var r;
    if (16 == t) r = 4; else if (8 == t) r = 3; else if (2 == t) r = 1; else if (32 == t) r = 5; else {
        if (4 != t) return this.toRadix(t);
        r = 2;
    }
    var e, o = (1 << r) - 1, s = !1, n = "", h = this.t, a = this.DB - h * this.DB % r;
    if (h-- > 0) for (a < this.DB && (e = this[h] >> a) > 0 && (s = !0, n = i(e)); h >= 0; ) a < r ? (e = (this[h] & (1 << a) - 1) << r - a, 
    e |= this[--h] >> (a += this.DB - r)) : (e = this[h] >> (a -= r) & o, a <= 0 && (a += this.DB, 
    --h)), e > 0 && (s = !0), s && (n += i(e));
    return s ? n : "0";
}, t.prototype.negate = function() {
    var i = r();
    return t.ZERO.subTo(this, i), i;
}, t.prototype.abs = function() {
    return this.s < 0 ? this.negate() : this;
}, t.prototype.compareTo = function(t) {
    var r = this.s - t.s;
    if (0 != r) return r;
    var i = this.t;
    if (0 != (r = i - t.t)) return this.s < 0 ? -r : r;
    for (;--i >= 0; ) if (0 != (r = this[i] - t[i])) return r;
    return 0;
}, t.prototype.bitLength = function() {
    return this.t <= 0 ? 0 : this.DB * (this.t - 1) + s(this[this.t - 1] ^ this.s & this.DM);
}, t.prototype.mod = function(i) {
    var e = r();
    return this.abs().divRemTo(i, null, e), this.s < 0 && e.compareTo(t.ZERO) > 0 && i.subTo(e, e), 
    e;
}, t.prototype.modPowInt = function(t, r) {
    var i;
    return i = t < 256 || r.isEven() ? new n(r) : new h(r), this.exp(t, i);
}, t.ZERO = o(0), t.ONE = o(1), a.prototype.init = function(t) {
    var r, i, e;
    for (r = 0; r < 256; ++r) this.S[r] = r;
    for (i = 0, r = 0; r < 256; ++r) i = i + this.S[r] + t[r % t.length] & 255, e = this.S[r], 
    this.S[r] = this.S[i], this.S[i] = e;
    this.i = 0, this.j = 0;
}, a.prototype.next = function() {
    var t;
    return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, t = this.S[this.i], 
    this.S[this.i] = this.S[this.j], this.S[this.j] = t, this.S[t + this.S[this.i] & 255];
};

var B, w = 256, x = new Array(), E = 0;

p.prototype.nextBytes = function(t) {
    var r;
    for (r = 0; r < t.length; ++r) t[r] = f();
}, y.prototype.doPublic = function(t) {
    return t.modPowInt(this.e, this.n);
}, y.prototype.encrypt = function(t) {
    var r = l(t, this.n.bitLength() + 7 >> 3);
    if (null == r) return null;
    var i = this.doPublic(r);
    if (null == i) return null;
    var e = i.toString(16);
    return 0 == (1 & e.length) ? e : "0" + e;
};

var M = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", I = "=";

void 0 !== D.asn1 && D.asn1 || (D.asn1 = {}), D.asn1.ASN1Util = new function() {
    this.integerToByteHex = function(t) {
        var r = t.toString(16);
        return r.length % 2 == 1 && (r = "0" + r), r;
    }, this.bigIntToMinTwosComplementsHex = function(r) {
        var i = r.toString(16);
        if ("-" != i.substr(0, 1)) i.length % 2 == 1 ? i = "0" + i : i.match(/^[0-7]/) || (i = "00" + i); else {
            var e = i.substr(1).length;
            e % 2 == 1 ? e += 1 : i.match(/^[0-7]/) || (e += 2);
            for (var o = "", s = 0; s < e; s++) o += "f";
            i = new t(o, 16).xor(r).add(t.ONE).toString(16).replace(/^-/, "");
        }
        return i;
    }, this.getPEMStringFromHex = function(t, r) {
        var i = CryptoJS.enc.Hex.parse(t), e = CryptoJS.enc.Base64.stringify(i).replace(/(.{64})/g, "$1\r\n");
        return e = e.replace(/\r\n$/, ""), "-----BEGIN " + r + "-----\r\n" + e + "\r\n-----END " + r + "-----\r\n";
    };
}(), function(t) {
    var r, i = {};
    i.decode = function(i) {
        var e;
        if (r === t) {
            var o = "= \f\n\r\t \u2028\u2029";
            for (r = [], e = 0; e < 64; ++e) r["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)] = e;
            for (e = 0; e < o.length; ++e) r[o.charAt(e)] = -1;
        }
        var s = [], n = 0, h = 0;
        for (e = 0; e < i.length; ++e) {
            var a = i.charAt(e);
            if ("=" == a) break;
            if (-1 != (a = r[a])) {
                if (a === t) throw "Illegal character at offset " + e;
                n |= a, ++h >= 4 ? (s[s.length] = n >> 16, s[s.length] = n >> 8 & 255, s[s.length] = 255 & n, 
                n = 0, h = 0) : n <<= 6;
            }
        }
        switch (h) {
          case 1:
            throw "Base64 encoding incomplete: at least 2 bits missing";

          case 2:
            s[s.length] = n >> 10;
            break;

          case 3:
            s[s.length] = n >> 16, s[s.length] = n >> 8 & 255;
        }
        return s;
    }, i.re = /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/, 
    i.unarmor = function(t) {
        var r = i.re.exec(t);
        if (r) if (r[1]) t = r[1]; else {
            if (!r[2]) throw "RegExp out of sync";
            t = r[2];
        }
        return i.decode(t);
    }, d.Base64 = i;
}(), function(t) {
    function r(t, i) {
        t instanceof r ? (this.enc = t.enc, this.pos = t.pos) : (this.enc = t, this.pos = i);
    }
    function i(t, r, i, e, o) {
        this.stream = t, this.header = r, this.length = i, this.tag = e, this.sub = o;
    }
    r.prototype.get = function(t) {
        if (void 0 === t && (t = this.pos++), t >= this.enc.length) throw "Requesting byte offset " + t + " on a stream of length " + this.enc.length;
        return this.enc[t];
    }, r.prototype.hexDigits = "0123456789ABCDEF", r.prototype.hexByte = function(t) {
        return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t);
    }, r.prototype.hexDump = function(t, r, i) {
        for (var e = "", o = t; o < r; ++o) if (e += this.hexByte(this.get(o)), !0 !== i) switch (15 & o) {
          case 7:
            e += "  ";
            break;

          case 15:
            e += "\n";
            break;

          default:
            e += " ";
        }
        return e;
    }, r.prototype.reTime = /^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/, 
    i.prototype.reSeemsASCII = /^[ -~]+$/, i.prototype.posStart = function() {
        return this.stream.pos;
    }, i.prototype.posEnd = function() {
        return this.stream.pos + this.header + Math.abs(this.length);
    }, i.prototype.toHexString = function(t) {
        return this.stream.hexDump(this.posStart(), this.posEnd(), !0);
    }, i.decodeLength = function(t) {
        var r = t.get(), i = 127 & r;
        if (i == r) return i;
        if (i > 3) throw "Length over 24 bits not supported at position " + (t.pos - 1);
        if (0 === i) return -1;
        r = 0;
        for (var e = 0; e < i; ++e) r = r << 8 | t.get();
        return r;
    }, i.hasContent = function(t, e, o) {
        if (32 & t) return !0;
        if (t < 3 || t > 4) return !1;
        var s = new r(o);
        if (3 == t && s.get(), s.get() >> 6 & 1) return !1;
        try {
            var n = i.decodeLength(s);
            return s.pos - o.pos + n == e;
        } catch (t) {
            return !1;
        }
    }, i.decode = function(t) {
        t instanceof r || (t = new r(t, 0));
        var e = new r(t), o = t.get(), s = i.decodeLength(t), n = t.pos - e.pos, h = null;
        if (i.hasContent(o, s, t)) {
            var a = t.pos;
            if (3 == o && t.get(), h = [], s >= 0) {
                for (var u = a + s; t.pos < u; ) h[h.length] = i.decode(t);
                if (t.pos != u) throw "Content size is not correct for container starting at offset " + a;
            } else try {
                for (;;) {
                    var f = i.decode(t);
                    if (0 === f.tag) break;
                    h[h.length] = f;
                }
                s = a - t.pos;
            } catch (t) {
                throw "Exception while decoding undefined length content: " + t;
            }
        } else t.pos += s;
        return new i(e, n, s, o, h);
    }, d.ASN1 = i;
}();

var R = d.ASN1;

R.prototype.getHexStringValue = function() {
    var t = this.toHexString(), r = 2 * this.header, i = 2 * this.length;
    return t.substr(r, i);
}, y.prototype.parseKey = function(t) {
    try {
        var r = 0, i = 0, e = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(t) ? d.Hex.decode(t) : d.Base64.unarmor(t), o = R.decode(e);
        if (2 !== o.sub.length) return !1;
        var s = o.sub[1].sub[0];
        return r = s.sub[0].getHexStringValue(), this.n = c(r, 16), i = s.sub[1].getHexStringValue(), 
        this.e = parseInt(i, 16), !0;
    } catch (t) {
        return !1;
    }
};

var C = function(t) {
    y.call(this), t && "string" == typeof t && this.parseKey(t);
};

(C.prototype = new y()).constructor = C;

var N = function(t) {
    t = t || {}, this.default_key_size = parseInt(t.default_key_size) || 1024, this.default_public_exponent = t.default_public_exponent || "010001", 
    this.log = t.log || !1, this.key = null;
};

N.prototype.setKey = function(t) {
    this.log && this.key && console.warn("A key was already set, overriding existing."), 
    this.key = new C(t);
}, N.prototype.encrypt = function(t, r) {
    var i = r || "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQClvdUhP6EMMXJw3iApoGzqh7AS\rGTrkHLHGJYiK8dR5QDqK4NB2jH3+G3BEuMiasN3nKR5sEDZmH8MyqJEq0AyQl8wJ\rrR9nhACurJzPiCZgkjLiKK+X309m+tusI8f6VBieOwFIOKdExO/g6d5ClatLkIDk\rUed5G3KyupwMVAWJBQIDAQAB";
    this.setKey(i);
    try {
        return v(this.key.encrypt(t));
    } catch (t) {
        return !1;
    }
}, module.exports = new N();
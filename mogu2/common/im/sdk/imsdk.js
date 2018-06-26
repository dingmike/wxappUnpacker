var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(e, o) {
    "object" == ("undefined" == typeof exports ? "undefined" : t(exports)) && "object" == ("undefined" == typeof module ? "undefined" : t(module)) ? module.exports = o() : "function" == typeof define && define.amd ? define([], o) : "object" == ("undefined" == typeof exports ? "undefined" : t(exports)) ? exports.imsdk = o() : e.imsdk = o();
}(void 0, function() {
    return function(t) {
        function e(n) {
            if (o[n]) return o[n].exports;
            var i = o[n] = {
                exports: {},
                id: n,
                loaded: !1
            };
            return t[n].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports;
        }
        var o = {};
        return e.m = t, e.c = o, e.p = "", e(0);
    }([ function(t, e, o) {
        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        e.__esModule = !0;
        var i = o(1), r = n(o(2)), s = n(o(5)), a = null;
        a || (a = new r.default(), a.getClientMsgId = i.getClientMsgId, a.debug = s.default, 
        a.now = i.now), e.default = a, t.exports = e.default;
    }, function(e, o) {
        o.__esModule = !0;
        var n = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        }, i = new Date().getTime(), r = parseInt(1e3 * Math.random() + 23), s = parseInt(1e3 * Math.random() + 23), a = i * Math.pow(2, 10) + r, u = i * Math.pow(2, 10) + s, c = 0, p = o.now = function() {
            return new Date().getTime() + c;
        }, l = o.setTimeOff = function(t) {
            c = t;
        }, h = o.buildQuery = function(t) {
            var e = [];
            for (var o in t) e.push(o + "=" + t[o]);
            return e.join("&");
        }, d = (o.defer = setTimeout, o.noop = function() {}), f = o.getRequestId = function() {
            return "" + ++u;
        }, y = o.getClientMsgId = function() {
            return "" + ++a;
        }, v = o.webSocket = function() {
            try {
                return window.WebSocket || window.MozWebSocket;
            } catch (t) {
                return null;
            }
        }(), m = o.supportWs = !!v, g = o.wx = function() {
            try {
                return g;
            } catch (t) {
                return null;
            }
        }(), b = o.parseData = function(t) {
            if (t && "string" == typeof t) try {
                t = JSON.parse(t);
            } catch (t) {}
            return t;
        }, _ = o.stringifyData = function(t) {
            return t && "object" === (void 0 === t ? "undefined" : n(t)) && (t = JSON.stringify(t)), 
            t;
        };
        o.default = {
            now: p,
            setTimeOff: l,
            buildQuery: h,
            noop: d,
            getRequestId: f,
            getClientMsgId: y,
            webSocket: v,
            supportWs: m,
            wx: g,
            parseData: b,
            stringifyData: _
        };
    }, function(e, o, n) {
        function i(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function s(e, o) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !o || "object" != (void 0 === o ? "undefined" : t(o)) && "function" != typeof o ? e : o;
        }
        function a(e, o) {
            if ("function" != typeof o && null !== o) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === o ? "undefined" : t(o)));
            e.prototype = Object.create(o && o.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(e, o) : e.__proto__ = o);
        }
        o.__esModule = !0;
        var u = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var o = arguments[e];
                for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n]);
            }
            return t;
        }, c = i(n(3)), p = i(n(4)), l = i(n(6)), h = i(n(7)), d = i(n(8)), f = i(n(10)), y = n(1), v = n(5), m = (0, 
        i(v).default)("MSG"), g = function() {
            return new Date().getTime();
        }, b = function(t) {
            function e() {
                r(this, e);
                var o = s(this, t.call(this));
                return o.reqPool = {}, o.failPool = {}, o.io = null, o.readyState = 3, o.openCb = y.noop, 
                o.queue = new d.default(), o.opts = l.default, o.isConnected = !0, o.networkType = null, 
                o;
            }
            return a(e, t), e.prototype.getState = function() {
                return this.readyState;
            }, e.prototype.config = function(t) {
                if (3 === this.readyState) {
                    var e = t.debug;
                    (0, v.dev)(!!e && (!0 === e ? "" : e)), this.opts = u(this.opts, t);
                }
            }, e.prototype.open = function(t, e) {
                var o = this;
                return console.warn(this.readyState), 3 !== this.readyState ? void e(1 === this.readyState, {}) : (m.log("conn start"), 
                this.openCb = e, this.config(t), this.readyState = 0, this.timestamp = g(), this.io = new p.default(this.opts, e), 
                this.connectTimer = setTimeout(function() {
                    o.close(), o.readyState = 3, e(!1, "connect timeOut");
                }, this.opts.connectTime), this._initIoEvent(), void this._initWindowEvent());
            }, e.prototype.syncTime = function() {
                this.send("syncTime", {
                    client_time: "" + (0, y.now)()
                }, function(t, e) {
                    var o = (0, y.now)(), n = e.server_time - e.client_time - parseInt((o - e.client_time) / 2);
                    (0, y.setTimeOff)(Math.abs(n) > 1e3 ? n : 0);
                });
            }, e.prototype.doLogin = function(t, e) {
                if (0 === this.readyState) {
                    var o = this.requestMap("login", t);
                    o.data.client_type || (o.data.client_type = "poll" === this.io.curTransport ? 7 : 3), 
                    m.log("start login: %o", o), this._doSend(o, e, !0);
                }
            }, e.prototype.send = function(t, e) {
                var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : y.noop, n = this.requestMap(t, e);
                m.log("send a msg(%s): %o", t, n), this._doSend(n, o);
            }, e.prototype.reSend = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : y.noop, o = this.failPool[t];
                console.log(this.failPool), o ? this._doSend(o, e) : e(!1, "can't find package");
            }, e.prototype.stop = function(t) {
                m.log("client choose to close conn %s", t), this.io.stop(t);
            }, e.prototype._initIoEvent = function() {
                this.io.on("open", this.onOpen.bind(this)), this.io.on("error", this.onError.bind(this)), 
                this.io.on("closing", this.onClosing.bind(this)), this.io.on("close", this.onClose.bind(this)), 
                this.io.on("message", this.onMsg.bind(this)), this.io.on("packet", this.onHeartbeat.bind(this));
            }, e.prototype.onClosing = function(t) {
                this.readyState = 2, this.emit("closeing", t);
            }, e.prototype.onClose = function(t) {
                0 === this.readyState && this.openCb(!1, "webscocket closed"), this.readyState = 3, 
                this.queue.stop(), this.hbTimer && clearTimeout(this.hbTimer), m.error("webscocket closed"), 
                this.emit("close", t);
            }, e.prototype.onError = function(t) {
                0 === this.readyState && (this.openCb(!1, "network error"), this.readyState = 3), 
                this.emit("error", t);
            }, e.prototype.onMsg = function(t) {
                var e = t.request_id, o = this.reqPool[e];
                if (o) {
                    var n = o.cb, i = o.timerId, r = o.req, s = o.timestamp, a = 0;
                    if (i && clearTimeout(i), t.command_id === r.command_id) a = 1, n(!1, t); else if (t && t.data) {
                        var u = t.data;
                        a = u.result_code || u.result || 0, u.result = a, 0 === a ? (this.failPool[e] && delete this.failPool[e], 
                        u.request_id = e, n(!0, u)) : (this.failPool[e] = r, u.request_id = e, n(!1, u));
                    } else a = 2, n(!1, t);
                    return m.log("recive a ack %o", t), this.sLog.send({
                        ext: {
                            requestPath: r.module_id + "/" + r.command_id,
                            requestCostTime: g() - s,
                            httpCode: a
                        }
                    }), void delete this.reqPool[e];
                }
                var c = this.pushMap(t);
                if (c && c.type) {
                    var p = c.type, l = c.ackData;
                    m.log("recive a push(%s) %o", p, t.data), this.emit(p, t), -1 === h.default.noAckPush.indexOf(p) && (m.log("ack for server push %o", l), 
                    this.io.send(l));
                }
            }, e.prototype.onOpen = function() {
                var t = this;
                this.connectTimer && clearTimeout(this.connectTimer);
                var e = this.opts.data, o = e.device_id, n = e.user_id;
                this.sLog = new f.default({
                    url: this.opts.url,
                    uuid: o,
                    uid: n
                }), this.sLog.send({
                    ext: {
                        requestPath: "connect",
                        requestCostTime: g() - this.timestamp,
                        httpCode: 0
                    }
                }), m.log("conn success, start to login..."), this.readyState = 0, this.doLogin(this.opts.data, function(e, o) {
                    e ? (t.queue.start(), t.readyState = 1, t.syncTime(), m.log("login success %o", o), 
                    t.emit("open", t.opts.data)) : t.close(3022, "login fail"), t.openCb(e, o);
                });
            }, e.prototype.onHeartbeat = function() {
                var t = this;
                this.hbTimer && clearTimeout(this.hbTimer), this.hbTimer = setTimeout(function() {
                    t.send("hb", {}), t.onHeartbeat();
                }, this.opts.hbTime);
            }, e.prototype._bindReqFunc = function() {
                var t = this, e = h.default.request;
                Object.keys(e).forEach(function(e) {
                    t[e] = function(o) {
                        return t.request(e, o);
                    };
                });
            }, e.prototype.pushMap = function(t) {
                var e = h.default.push[t.module_id + "#" + t.command_id];
                if (e) {
                    var o = {
                        data: {},
                        module_id: t.module_id,
                        command_id: t.command_id + 1,
                        request_id: (0, y.getRequestId)(),
                        biz_type: t.biz_type || this.opts.biz_type,
                        version: t.version || this.opts.packageVersion,
                        reserved: t.reserved || this.opts.reserved
                    };
                    return "message" === e && (o.data.server_message_id = t.data.message.server_message_id), 
                    {
                        type: e,
                        ackData: o
                    };
                }
            }, e.prototype.close = function(t, e) {
                this.hbTimer && clearTimeout(this.hbTimer), m.log("start close"), this.io.close(t, e);
            }, e.prototype._initWindowEvent = function() {
                var t = this;
                wx && wx.onNetworkStatusChange && wx.onNetworkStatusChange(function(e) {
                    var o = e.isConnected, n = e.networkType;
                    o ? (t.timestamp = g(), t.io.reconnect()) : t.close(), m.log("networkChange:[%o, %o]", o, n), 
                    t.isConnected = o, t.networkType = n;
                });
            }, e.prototype.requestMap = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, o = h.default.request[t];
                if (o) return o = o.split("#"), {
                    module_id: Number(o[0]),
                    command_id: Number(o[1]),
                    biz_type: this.opts.biz_type,
                    data: e,
                    request_id: (0, y.getRequestId)(),
                    version: this.opts.packageVersion,
                    reserved: this.opts.reserved
                };
            }, e.prototype._doSend = function(t, e) {
                var o = this, n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                m.log("msg do send %o(%o)", t, n);
                var i = t.request_id;
                if (i) {
                    if (n) {
                        var r = function(n) {
                            return setTimeout(function() {
                                var i = o.reqPool[n], r = i.req, s = i.timestamp;
                                o.failPool[n] = r, 10 !== r.module_id && 1 !== r.command_id && o.sLog.send({
                                    ext: {
                                        requestPath: r.module_id + "/" + r.command_id,
                                        requestCostTime: g() - s,
                                        httpCode: 1006
                                    }
                                }), delete o.reqPool[n], e(!1, t);
                            }, o.opts.msgTime);
                        }(i);
                        return this.reqPool[i] = {
                            req: t,
                            timerId: r,
                            timestamp: g(),
                            cb: e
                        }, void this.io.send(t);
                    }
                    this.queue.push(function() {
                        var n = function(t) {
                            return setTimeout(function() {
                                var n = o.reqPool[t], i = n.req, r = n.timestamp;
                                o.failPool[t] = i, 10 !== i.module_id && 1 !== i.command_id && o.sLog.send({
                                    ext: {
                                        requestPath: i.module_id + "/" + i.command_id,
                                        requestCostTime: g() - r,
                                        httpCode: 1006
                                    }
                                }), delete o.reqPool[t], e(!1, i);
                            }, o.opts.msgTime);
                        }(i);
                        o.reqPool[i] = {
                            req: t,
                            timerId: n,
                            timestamp: g(),
                            cb: e
                        }, o.io.send(t);
                    });
                } else e(!1, new Error("not a request Package"));
            }, e;
        }(c.default);
        o.default = b, e.exports = o.default;
    }, function(t, e, o) {
        function n() {}
        function i(t, e, o) {
            this.fn = t, this.context = e, this.once = o || !1;
        }
        function r() {
            this._events = new n(), this._eventsCount = 0;
        }
        var s = Object.prototype.hasOwnProperty, a = "~";
        Object.create && (n.prototype = Object.create(null), new n().__proto__ || (a = !1)), 
        r.prototype.eventNames = function() {
            var t, e, o = [];
            if (0 === this._eventsCount) return o;
            for (e in t = this._events) s.call(t, e) && o.push(a ? e.slice(1) : e);
            return Object.getOwnPropertySymbols ? o.concat(Object.getOwnPropertySymbols(t)) : o;
        }, r.prototype.listeners = function(t, e) {
            var o = a ? a + t : t, n = this._events[o];
            if (e) return !!n;
            if (!n) return [];
            if (n.fn) return [ n.fn ];
            for (var i = 0, r = n.length, s = new Array(r); i < r; i++) s[i] = n[i].fn;
            return s;
        }, r.prototype.emit = function(t, e, o, n, i, r) {
            var s = a ? a + t : t;
            if (!this._events[s]) return !1;
            var u, c, p = this._events[s], l = arguments.length;
            if (p.fn) {
                switch (p.once && this.removeListener(t, p.fn, void 0, !0), l) {
                  case 1:
                    return p.fn.call(p.context), !0;

                  case 2:
                    return p.fn.call(p.context, e), !0;

                  case 3:
                    return p.fn.call(p.context, e, o), !0;

                  case 4:
                    return p.fn.call(p.context, e, o, n), !0;

                  case 5:
                    return p.fn.call(p.context, e, o, n, i), !0;

                  case 6:
                    return p.fn.call(p.context, e, o, n, i, r), !0;
                }
                for (c = 1, u = new Array(l - 1); c < l; c++) u[c - 1] = arguments[c];
                p.fn.apply(p.context, u);
            } else {
                var h, d = p.length;
                for (c = 0; c < d; c++) switch (p[c].once && this.removeListener(t, p[c].fn, void 0, !0), 
                l) {
                  case 1:
                    p[c].fn.call(p[c].context);
                    break;

                  case 2:
                    p[c].fn.call(p[c].context, e);
                    break;

                  case 3:
                    p[c].fn.call(p[c].context, e, o);
                    break;

                  case 4:
                    p[c].fn.call(p[c].context, e, o, n);
                    break;

                  default:
                    if (!u) for (h = 1, u = new Array(l - 1); h < l; h++) u[h - 1] = arguments[h];
                    p[c].fn.apply(p[c].context, u);
                }
            }
            return !0;
        }, r.prototype.on = function(t, e, o) {
            var n = new i(e, o || this), r = a ? a + t : t;
            return this._events[r] ? this._events[r].fn ? this._events[r] = [ this._events[r], n ] : this._events[r].push(n) : (this._events[r] = n, 
            this._eventsCount++), this;
        }, r.prototype.once = function(t, e, o) {
            var n = new i(e, o || this, !0), r = a ? a + t : t;
            return this._events[r] ? this._events[r].fn ? this._events[r] = [ this._events[r], n ] : this._events[r].push(n) : (this._events[r] = n, 
            this._eventsCount++), this;
        }, r.prototype.removeListener = function(t, e, o, i) {
            var r = a ? a + t : t;
            if (!this._events[r]) return this;
            if (!e) return 0 == --this._eventsCount ? this._events = new n() : delete this._events[r], 
            this;
            var s = this._events[r];
            if (s.fn) s.fn !== e || i && !s.once || o && s.context !== o || (0 == --this._eventsCount ? this._events = new n() : delete this._events[r]); else {
                for (var u = 0, c = [], p = s.length; u < p; u++) (s[u].fn !== e || i && !s[u].once || o && s[u].context !== o) && c.push(s[u]);
                c.length ? this._events[r] = 1 === c.length ? c[0] : c : 0 == --this._eventsCount ? this._events = new n() : delete this._events[r];
            }
            return this;
        }, r.prototype.removeAllListeners = function(t) {
            var e;
            return t ? (e = a ? a + t : t, this._events[e] && (0 == --this._eventsCount ? this._events = new n() : delete this._events[e])) : (this._events = new n(), 
            this._eventsCount = 0), this;
        }, r.prototype.off = r.prototype.removeListener, r.prototype.addListener = r.prototype.on, 
        r.prototype.setMaxListeners = function() {
            return this;
        }, r.prefixed = a, r.EventEmitter = r, t.exports = r;
    }, function(e, o, n) {
        function i(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function r(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function s(e, o) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !o || "object" != (void 0 === o ? "undefined" : t(o)) && "function" != typeof o ? e : o;
        }
        function a(e, o) {
            if ("function" != typeof o && null !== o) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === o ? "undefined" : t(o)));
            e.prototype = Object.create(o && o.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), o && (Object.setPrototypeOf ? Object.setPrototypeOf(e, o) : e.__proto__ = o);
        }
        o.__esModule = !0;
        var u = i(n(3)), c = n(1), p = (0, i(n(5)).default)("NET"), l = function(t) {
            function e(o) {
                r(this, e);
                var n = s(this, t.call(this));
                return n.reconnTimes = 0, n.curTransport = null, n.readyState = 3, n.opts = o, n.protocols = o.protocols, 
                n.url = o.url || o.uri, n.doConnect(), n;
            }
            return a(e, t), e.prototype.doConnect = function() {
                try {
                    wx.connectSocket({
                        url: this.url
                    }), wx.onSocketOpen(this.onOpen.bind(this)), wx.onSocketError(this.onError.bind(this)), 
                    wx.onSocketMessage(this.onMsg.bind(this)), wx.onSocketClose(this.onClose.bind(this));
                } catch (e) {
                    var t = window.WebSocket || window.MozWebSocket;
                    this.ws = new t(this.url), this.ws.onopen = this.onOpen.bind(this), this.ws.onmessage = this.onMsg.bind(this), 
                    this.ws.onerror = this.onError.bind(this), this.ws.onclose = this.onClose.bind(this);
                }
            }, e.prototype.doClose = function(t, e) {
                p.log("stat close");
                try {
                    wx.closeSocket(t, e);
                } catch (o) {
                    this.ws.close(t, e);
                }
            }, e.prototype.doSend = function(t) {
                try {
                    wx.sendSocketMessage({
                        data: t
                    });
                } catch (e) {
                    this.ws.send(t);
                }
            }, e.prototype.onPacket = function(t) {
                for (var e = arguments.length, o = Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++) o[n - 1] = arguments[n];
                this.emit("packet", {
                    type: t,
                    data: o
                }), this.emit.apply(this, [ t ].concat(o));
            }, e.prototype.reconnect = function() {
                if (3 === this.readyState) return ++this.reconnTimes > 2 ? (p.log("reconn fail 3 times, will stop!"), 
                this.close()) : void this.doConnect();
            }, e.prototype.onOpen = function(t) {
                this.reconnTimes = 0, this.readyState = 1, this.emit("open", t);
            }, e.prototype.onMsg = function(t) {
                var e = (0, c.parseData)(t.data);
                p.log("got msg %o", e), this.onPacket("message", e);
            }, e.prototype.onError = function(t) {
                p.error("got a error: %o", t), this.onPacket("error", t);
            }, e.prototype.onClose = function(t) {
                this.readyState = 3, p.log("connect close: %o", t), t.code, this.emit("close", t);
            }, e.prototype.close = function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1e3, e = arguments[1];
                1 === this.readyState && (this.readyState = 2, this.emit("closing", {
                    code: t,
                    reason: e
                }), this.doClose(t, e));
            }, e.prototype.send = function(t) {
                t && this.doSend((0, c.stringifyData)(t));
            }, e;
        }(u.default);
        o.default = l, e.exports = o.default;
    }, function(e, o) {
        function n(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        o.__esModule = !0;
        var i = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        }, r = [], s = [], a = void 0, u = [ "lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "OrangeRed", "crimson" ], c = function(t) {
            var e = 0;
            for (var o in t) e += t.charCodeAt(o) * o;
            return e %= u.length, u[e];
        }, p = function(t) {
            for (var e in r) if (r[e].test(t)) return !0;
            return !1;
        }, l = function() {
            var t = +new Date(), e = t - (a || t);
            return a = t, "+" + e + "ms";
        }, h = function(t, e, o) {
            o[0] = "%c" + t + " %c" + o[0] + "%c " + l();
            var n = "color: " + e;
            o.splice(1, 0, n, "color: inherit");
            var i = 0, r = 0;
            return o[0].replace(/%[a-zA-Z%]/g, function(t) {
                "%%" !== t && (i++, "%c" === t && (r = i));
            }), o.splice(r, 0, n), o;
        }, d = function() {
            function t(e) {
                n(this, t), this.name = e, this.colors = c(e), this.checkEnable();
            }
            return t.prototype.checkEnable = function() {
                this.enable = p(this.name);
            }, t.prototype.toggleLog = function(t) {
                for (var e, o = arguments.length, n = Array(o > 1 ? o - 1 : 0), r = 1; r < o; r++) n[r - 1] = arguments[r];
                if (this.enable) return n = h(this.name, this.colors, n), "object" === ("undefined" == typeof console ? "undefined" : i(console)) && console[t] && (e = console)[t].apply(e, n);
            }, t.prototype.log = function() {
                this.toggleLog.apply(this, [ "log" ].concat(Array.prototype.slice.call(arguments)));
            }, t.prototype.error = function() {
                this.toggleLog.apply(this, [ "error" ].concat(Array.prototype.slice.call(arguments)));
            }, t.prototype.warn = function() {
                this.toggleLog.apply(this, [ "warn" ].concat(Array.prototype.slice.call(arguments)));
            }, t;
        }();
        o.default = function(t) {
            var e = new d(t);
            return s.push(e), e;
        }, o.dev = function(t) {
            t || (t = !1 === t ? "" : "*"), t = t.split(/[\s,]+/), r = t.map(function(t) {
                return t = t.replace(/\*/g, ".*?"), new RegExp("^" + t + "$");
            }), s.map(function(t) {
                t.checkEnable();
            });
        };
    }, function(t, e) {
        e.__esModule = !0, e.default = {
            data: {},
            protocols: "dumb-increment-protocol",
            connectTime: 1e4,
            hbTime: 3e4,
            msgTime: 1e4,
            pollCycle: 6e3,
            reConnectMaxTimes: 3,
            url: "wss://imws.mogujie.com/",
            uuid: "test",
            biz_type: 1,
            reserved: "0",
            packageVersion: 300
        }, t.exports = e.default;
    }, function(t, e) {
        e.__esModule = !0, e.default = {
            noAckPush: [ "userKicked", "msgReaded", "cinfoNotify", "userStateNotify" ],
            request: {
                getAccessServer: "2#1",
                login: "2#3",
                logout: "2#5",
                syncTime: "2#8",
                getLoginState: "2#10",
                kickOther: "2#12",
                getConvList: "3#1",
                updateConv: "3#3",
                fetchConv: "3#5",
                createConv: "3#7",
                delConv: "3#9",
                operateConv: "3#11",
                getLastMsg: "3#15",
                getUnreadCnt: "3#17",
                getAllUnreadCnt: "3#19",
                createGroup: "4#1",
                delGroup: "4#3",
                updateGroup: "4#5",
                getGroupInfo: "4#7",
                addGroupMem: "4#9",
                delGroupMem: "4#11",
                getApplier: "4#13",
                operateApplier: "4#15",
                operateAdmin: "4#17",
                transferOwner: "4#31",
                getGroupSimple: "4#35",
                getGroupMember: "4#37",
                sendMsg: "5#1",
                getHistoryMsg: "5#5",
                msgRead: "5#7",
                modifyMsg: "5#9",
                sendP2pMsg: "6#1",
                p2pMsg: "6#3",
                getOnLineState: "7#2",
                setOnLineState: "7#4",
                getUserInfo: "7#6",
                monitorState: "7#8",
                unmonitorState: "7#10",
                getStateMonitor: "7#12",
                getCinfoCnt: "8#1",
                hb: "10#1",
                reportErr: "8#2",
                echo: "8#3",
                forward: "8#4",
                transmit: "12#1",
                getService: "14#1",
                switchService: "14#3",
                destroyService: "14#5",
                getLastService: "14#7",
                bizSwitchService: "17#1"
            },
            push: {
                "2#7": "userKicked",
                "2#14": "stateChanged",
                "3#13": "convUpdated",
                "4#19": "groupDeled",
                "4#21": "groupUpdated",
                "4#23": "memberAdded",
                "4#25": "memberDeled",
                "4#27": "adminChaned",
                "4#29": "applierOperated",
                "4#33": "ownerTransfered",
                "5#3": "message",
                "5#11": "msgReaded",
                "6#3": "getP2pMsg",
                "7#1": "userStateNotify",
                "8#3": "cinfoNotify",
                "12#3": "transmit"
            }
        }, t.exports = e.default;
    }, function(t, e, o) {
        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        e.__esModule = !0;
        var r = o(1), s = n(o(9)), a = (0, n(o(5)).default)("MSG"), u = function() {
            function t() {
                i(this, t), this.status = 0, this.drain = r.noop, this.store = new s.default();
            }
            return t.prototype.start = function() {
                a.log("queue start"), this.status = 1, this.process();
            }, t.prototype.process = function() {
                if (1 === this.status) {
                    if (this.store.length <= 0) return this.pause(), void (0, r.defer)(this.drain.bind(this));
                    this.store.shift().fn(), (0, r.defer)(this.process.bind(this));
                }
            }, t.prototype.stop = function() {
                a.log("queue stop"), this.status = 0;
            }, t.prototype.pause = function() {
                this.status = 2;
            }, t.prototype.push = function(t) {
                var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                t instanceof Array || (t = [ t ]);
                for (var o = this.store.head; o && e >= o.priority; ) o = o.next;
                for (var n = 0, i = t.length; n < i; n++) {
                    var s = {
                        fn: t[n],
                        priority: e
                    };
                    o ? this.store.insertBefore(o, s) : this.store.push(s);
                }
                2 === this.status && (0, r.defer)(this.start.bind(this));
            }, t;
        }();
        e.default = u, t.exports = e.default;
    }, function(t, e) {
        function o(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        function n(t, e) {
            t.length = 1, t.head = t.tail = e;
        }
        e.__esModule = !0;
        var i = function() {
            function t() {
                o(this, t), this.head = this.tail = null, this.length = 0;
            }
            return t.prototype.removeLink = function(t) {
                return t.prev ? t.prev.next = t.next : this.head = t.next, t.next ? t.next.prev = t.prev : this.tail = t.prev, 
                t.prev = t.next = null, this.length -= 1, t;
            }, t.prototype.insertAfter = function(t, e) {
                e.prev = t, e.next = t.next, t.next ? t.next.prev = e : this.tail = e, t.next = e, 
                this.length += 1;
            }, t.prototype.insertBefore = function(t, e) {
                e.prev = t.prev, e.next = t, t.prev ? t.prev.next = e : this.head = e, t.prev = e, 
                this.length += 1;
            }, t.prototype.unshift = function(t) {
                this.head ? this.insertBefore(this.head, t) : n(this, t);
            }, t.prototype.push = function(t) {
                this.tail ? this.insertAfter(this.tail, t) : n(this, t);
            }, t.prototype.shift = function() {
                return this.head && this.removeLink(this.head);
            }, t.prototype.pop = function() {
                return this.tail && this.removeLink(this.tail);
            }, t.prototype.empty = function() {
                this.head = this.tail = null, this.length = 0;
            }, t;
        }();
        e.default = i, t.exports = e.default;
    }, function(t, e, o) {
        function n(t) {
            return t && t.__esModule ? t : {
                default: t
            };
        }
        function i(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }
        e.__esModule = !0;
        var r = o(1), s = n(o(11)), a = n(o(12)), u = (0, r.now)(), c = 57, p = function() {
            function t(e) {
                i(this, t), this.v = e.v || 2, this.url = e.url || "";
                var o = (0, s.default)(this.url);
                this.uuid = e.uuid || "", this.uid = e.uid || "", this.host = e.url ? o.origin : e.host || "", 
                this.port = "" + (e.url ? o.port : e.port || 443), this.pf = e.pf || c, this.pushQueue = [];
            }
            return t.prototype.send = function() {
                var t = this, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                e = this.buildData(e), this.pushQueue.push(e);
                var o = this.pushQueue;
                if (o.length >= 3) {
                    this.pt = (0, r.now)(), this.data = o.join("\n");
                    var n = {
                        v: this.v,
                        pf: this.pf,
                        pt: this.pt,
                        data: this.data
                    };
                    setTimeout(function() {
                        t._doSend("https://log.mogujie.com/log?web=1", n), t.pushQueue = [];
                    });
                }
            }, t.prototype.buildData = function(t) {
                var e = [ 0, this.uuid, "s" ], o = (0, a.default)({
                    ver: "",
                    _channel: "",
                    deviceName: "",
                    os_ver: "",
                    root: 0,
                    provider: "",
                    launchTime: u,
                    time: (0, r.now)(),
                    network: 0,
                    new_did: this.uuid,
                    "tid-token": this.uuid,
                    uid: this.uid,
                    ext: {
                        requestPath: "",
                        requestCostTime: 0,
                        httpCode: 0,
                        error: "",
                        requestSize: 0,
                        responseSize: 0,
                        bizCode: "0",
                        apiver: "300",
                        port: this.port,
                        serverip: this.host,
                        session_key: "",
                        caller: "im",
                        feature: "mec"
                    }
                }, t);
                return e.push(JSON.stringify(o)), e = e.join("\t");
            }, t.prototype._doSend = function(t, e) {
                wx.request({
                    url: t,
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    data: e
                });
            }, t;
        }();
        e.default = p, t.exports = e.default;
    }, function(t, e) {
        e.__esModule = !0, e.default = function(t) {
            try {
                var e = document.createElement("a");
                return e.href = t, e;
            } catch (e) {
                var o = t.match(/^(([^:\/?#]+:)?(?:\/\/(([^\/?#:]*)(?::([^\/?#:]*))?)))?([^?#]*)(\?[^#]*)?(#.*)?$/), n = {
                    hash: o[8] || "",
                    host: o[3] || "",
                    hostname: o[4] || "",
                    href: o[0] || "",
                    origin: o[1] || "",
                    pathname: o[6] || (o[1] ? "/" : ""),
                    port: o[5] || "",
                    protocol: o[2] || "",
                    search: o[7] || ""
                };
                return 2 == n.protocol.length && (n.protocol = "file:///" + n.protocol.toUpperCase(), 
                n.origin = n.protocol + "//" + n.host), n.href = n.origin + n.pathname + n.search + n.hash, 
                o && n;
            }
        }, t.exports = e.default;
    }, function(t, e, o) {
        function n(t) {
            if (null === t || void 0 === t) throw new TypeError("Sources cannot be null or undefined");
            return Object(t);
        }
        function i(t, e, o) {
            var n = e[o];
            if (void 0 !== n && null !== n) {
                if (a.call(t, o) && (void 0 === t[o] || null === t[o])) throw new TypeError("Cannot convert undefined or null to object (" + o + ")");
                a.call(t, o) && s(n) ? t[o] = r(Object(t[o]), e[o]) : t[o] = n;
            }
        }
        function r(t, e) {
            if (t === e) return t;
            e = Object(e);
            for (var o in e) a.call(e, o) && i(t, e, o);
            if (Object.getOwnPropertySymbols) for (var n = Object.getOwnPropertySymbols(e), r = 0; r < n.length; r++) u.call(e, n[r]) && i(t, e, n[r]);
            return t;
        }
        var s = o(13), a = Object.prototype.hasOwnProperty, u = Object.prototype.propertyIsEnumerable;
        t.exports = function(t) {
            t = n(t);
            for (var e = 1; e < arguments.length; e++) r(t, arguments[e]);
            return t;
        };
    }, function(e, o) {
        e.exports = function(e) {
            var o = void 0 === e ? "undefined" : t(e);
            return null !== e && ("object" === o || "function" === o);
        };
    } ]);
});
function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var r = function() {
    function e(e, t) {
        for (var r = 0; r < t.length; r++) {
            var a = t[r];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(t, r, a) {
        return r && e(t.prototype, r), a && e(t, a), t;
    };
}(), a = e(require("../m.js")), n = e(require("../service/user")), o = a.default.MWP, i = a.default.fn.sendMsg, s = function() {
    function e(r, a, n) {
        t(this, e), this.$toast = r, this.$loading = a, this.$root = n, this.syncReminderData();
    }
    return r(e, [ {
        key: "addReminder",
        value: function(e) {
            var t = this;
            return new a.default.Promise(function(r) {
                t.$loading && t.$loading.show(), t.$root.$wrapper && t.$root.$wrapper.$emit("$loading.show"), 
                o.request("mwp.ferrari.addFollow", "1.0", {
                    rushId: e,
                    type: 2,
                    sourceType: 5
                }).then(o.filterResult).then(function() {
                    t.$toast && t.$toast.show("眼光很好哦看中这款！稍后留意微信通知哦~"), t.$root.$wrapper && t.$root.$wrapper.$emit("$toast.show", "眼光很好哦看中这款！稍后留意微信通知哦~");
                    var a = new Date().getTime();
                    t.renminderData[e] = a, t._saveReminderData(), t.$loading && t.$loading.hide(), 
                    t.$root.$wrapper && t.$root.$wrapper.$emit("$loading.hide"), r({
                        result: "success"
                    });
                }).catch(function(e) {
                    t._handleError(e), t.$loading && t.$loading.hide(), t.$root.$wrapper && t.$root.$wrapper.$emit("$loading.hide"), 
                    r({
                        result: "error"
                    });
                });
            });
        }
    }, {
        key: "removeReminder",
        value: function() {}
    }, {
        key: "isReminded",
        value: function(e) {
            return !!this.renminderData[e];
        }
    }, {
        key: "getReminderList",
        value: function(e) {
            var t = this, r = {};
            return e.forEach(function(e) {
                r[e] = !!t.renminderData[e];
            }), r;
        }
    }, {
        key: "syncReminderData",
        value: function() {
            try {
                this.renminderData = wx.getStorageSync("Reminder") || {}, this._resetReminderData();
            } catch (e) {
                this._handleError(e);
            }
        }
    }, {
        key: "_resetReminderData",
        value: function() {
            var e = new Date().getTime(), t = this.renminderData, r = !0, a = !1, n = void 0;
            try {
                for (var o, i = Object.keys(t)[Symbol.iterator](); !(r = (o = i.next()).done); r = !0) {
                    var s = o.value;
                    e - t[s] >= 1728e5 && this._removeReminderData(s);
                }
            } catch (e) {
                a = !0, n = e;
            } finally {
                try {
                    !r && i.return && i.return();
                } finally {
                    if (a) throw n;
                }
            }
            this._saveReminderData();
        }
    }, {
        key: "_removeReminderData",
        value: function(e) {
            delete this.renminderData[e];
        }
    }, {
        key: "_saveReminderData",
        value: function() {
            wx.setStorage({
                key: "Reminder",
                data: this.renminderData,
                fail: function(e) {
                    i(e, {
                        _author: "changsheng",
                        threshold: 1
                    });
                }
            });
        }
    }, {
        key: "_handleError",
        value: function(e) {
            console.log(e), i(e, {
                _author: "changsheng",
                threshold: 1
            }), n.default.showUserError(e) || (this.$toast && this.$toast.show(e.message), this.$root.$wrapper && this.$root.$wrapper.$emit("$toast.show", e.message));
        }
    } ]), e;
}();

exports.default = s;
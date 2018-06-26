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
}(), a = e(require("../m.js")), i = e(require("../service/user")), n = a.default.MWP, o = a.default.fn.sendMsg, s = function() {
    function e(r, a, i) {
        t(this, e), this.$toast = r, this.$loading = a, this.$root = i, this.syncReminderData();
    }
    return r(e, [ {
        key: "addReminder",
        value: function(e) {
            var t = this, r = e.eventId, i = e.itemId, o = e.scatter, s = e.time, d = e.startTime, u = e.activityIdNum, l = e.activityIdStr, c = e.channel, m = void 0 === c ? 300 : c;
            return new a.default.Promise(function(e) {
                var a = u || l || "", c = i + a;
                if (t.isReminded({
                    itemId: i,
                    activityId: a
                })) return t.$toast && t.$toast.show("已设置提醒"), t.$root.$wrapper && t.$root.$wrapper.$emit("$toast.show", "已设置提醒"), 
                void e({
                    result: "success"
                });
                if (!r || !i) return t._handleError(new Error("设置提醒缺少参数")), void e({
                    result: "error"
                });
                if (t.isLoaaidng) e({
                    result: "loading"
                }); else {
                    t.isLoaaidng = !0, t.$loading && t.$loading.show(), t.$root.$wrapper && t.$root.$wrapper.$emit("$loading.show");
                    var $ = {
                        eventId: r,
                        itemId: i,
                        scatter: o,
                        time: s,
                        startTime: d,
                        channel: m
                    };
                    l && ($.activityIdUrl = l), u && ($.activityId = u), n.request("mwp.walch.PushItemNoticeActionlet", "1.0", $).then(n.filterResult).then(function() {
                        t.$toast && t.$toast.show("眼光很好哦看中这款！稍后留意微信通知哦~"), t.$root.$wrapper && t.$root.$wrapper.$emit("$toast.show", "眼光很好哦看中这款！稍后留意微信通知哦~"), 
                        t.renminderData[c] = d, t._saveReminderData(), t.$loading && t.$loading.hide(), 
                        t.$root.$wrapper && t.$root.$wrapper.$emit("$loading.hide"), t.isLoaaidng = !1, 
                        e({
                            result: "success"
                        });
                    }).catch(function(r) {
                        r.message = "设置提醒失败", "FAIL_BIZ_4002" === r.code && (r.message = "请不要点太快"), "FAIL_BIZ_4006" === r.code ? (t.$toast && t.$toast.show("已设置提醒"), 
                        t.$root.$wrapper && t.$root.$wrapper.$emit("$toast.show", "已设置提醒"), t.renminderData[c] = d, 
                        t._saveReminderData(), e({
                            result: "success"
                        })) : (t._handleError(r), e({
                            result: "error"
                        })), t.isLoaaidng = !1, t.$loading && t.$loading.hide(), t.$root.$wrapper && t.$root.$wrapper.$emit("$loading.hide");
                    });
                }
            });
        }
    }, {
        key: "removeReminder",
        value: function() {}
    }, {
        key: "isReminded",
        value: function(e) {
            var t = e.itemId, r = void 0 === t ? "" : t, a = e.activityId, i = void 0 === a ? "" : a;
            return !!this.renminderData[r + i];
        }
    }, {
        key: "getReminderList",
        value: function(e) {
            var t = this, r = {};
            return e.forEach(function(e) {
                var a = e.itemId, i = void 0 === a ? "" : a, n = e.activityId, o = void 0 === n ? "" : n;
                r[i + o] = !!t.renminderData[i + o];
            }), r;
        }
    }, {
        key: "syncReminderData",
        value: function() {
            try {
                this.renminderData = wx.getStorageSync("ItemReminder") || {}, this._resetReminderData();
            } catch (e) {
                this._handleError(e);
            }
        }
    }, {
        key: "_resetReminderData",
        value: function() {
            var e = parseInt(new Date().getTime() / 1e3), t = this.renminderData, r = !0, a = !1, i = void 0;
            try {
                for (var n, o = Object.keys(t)[Symbol.iterator](); !(r = (n = o.next()).done); r = !0) {
                    var s = n.value;
                    e - t[s] >= 86400 && this._removeReminderData(s);
                }
            } catch (e) {
                a = !0, i = e;
            } finally {
                try {
                    !r && o.return && o.return();
                } finally {
                    if (a) throw i;
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
            wx.setStorageSync("ItemReminder", this.renminderData);
        }
    }, {
        key: "_handleError",
        value: function(e) {
            console.log(e), o(e, {
                _author: "changsheng",
                threshold: 1
            }), i.default.showUserError(e) || (this.$toast && this.$toast.show(e.message), this.$root.$wrapper && this.$root.$wrapper.$emit("$toast.show", e.message));
        }
    } ]), e;
}();

exports.default = s;
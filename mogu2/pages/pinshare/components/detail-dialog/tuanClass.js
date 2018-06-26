function t(t, n) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !n || "object" != typeof n && "function" != typeof n ? t : n;
}

function n(t, n) {
    if ("function" != typeof n && null !== n) throw new TypeError("Super expression must either be null or a function, not " + typeof n);
    t.prototype = Object.create(n && n.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), n && (Object.setPrototypeOf ? Object.setPrototypeOf(t, n) : t.__proto__ = n);
}

function i(t, n) {
    if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = function() {
    function t(t, n) {
        for (var i = 0; i < n.length; i++) {
            var o = n[i];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(t, o.key, o);
        }
    }
    return function(n, i, o) {
        return i && t(n.prototype, i), o && t(n, o), n;
    };
}(), e = exports.NormalTuan = function() {
    function t(n) {
        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        i(this, t), this.tuanInfo = n, this.obj = o, this.$countdown = this.obj.$countdown;
    }
    return o(t, [ {
        key: "tuaning_join",
        value: function() {
            return this.initCountdown(), {
                proInfo: {
                    leftText: "仅剩",
                    content: this.tuanInfo.remainNum,
                    rightText: "人，",
                    cls: "pin-dialog-red pin-dialog-big"
                },
                isCount: !0,
                butInfo: {
                    butType: "share"
                }
            };
        }
    }, {
        key: "tuaning_unJoin",
        value: function() {
            var t = {};
            if (this.initCountdown(), this.tuanInfo.isGoodsEmpty) {
                var n = this.initlinkMap().goodsEmpty;
                t = {
                    butType: "linkTo",
                    title: n.title,
                    link: n.link
                };
            } else t = {
                butType: "buy",
                title: "一键参团"
            };
            return {
                proInfo: {
                    leftText: "仅剩",
                    content: this.tuanInfo.remainNum,
                    rightText: "人，",
                    cls: "pin-dialog-red pin-dialog-big"
                },
                isCount: !0,
                butInfo: t
            };
        }
    }, {
        key: "waitPay_join",
        value: function() {
            var t = this.initlinkMap().checkOrder, n = t.title, i = t.link;
            return {
                proInfo: {
                    leftText: "已有" + this.tuanInfo.joinNum + "人参加，",
                    content: "等待团员完成付款",
                    rightText: "",
                    cls: "pin-dialog-green"
                },
                isCount: !1,
                butInfo: {
                    butType: "linkTo",
                    link: i,
                    title: n
                }
            };
        }
    }, {
        key: "waitPay_unJoin",
        value: function() {
            var t = this.unJoin(), n = t.title, i = t.link;
            return {
                proInfo: {
                    leftText: "已有" + this.tuanInfo.joinNum + "人参加，",
                    content: "等待团员完成付款",
                    rightText: "",
                    cls: "pin-dialog-green"
                },
                isCount: !1,
                butInfo: {
                    butType: "linkTo",
                    link: i,
                    title: n
                }
            };
        }
    }, {
        key: "tuanSuccess_join",
        value: function() {
            var t = this.initlinkMap().checkOrder, n = t.title, i = t.link;
            return {
                proInfo: {
                    leftText: "已有" + this.tuanInfo.joinNum + "人参加，",
                    content: "拼团成功",
                    rightText: "",
                    cls: "pin-dialog-green"
                },
                isCount: !1,
                butInfo: {
                    butType: "linkTo",
                    link: i,
                    title: n
                }
            };
        }
    }, {
        key: "tuanSuccess_unJoin",
        value: function() {
            var t = this.unJoin(), n = t.title, i = t.link;
            return {
                proInfo: {
                    leftText: "已有" + this.tuanInfo.joinNum + "人参加，",
                    content: "拼团成功",
                    rightText: "",
                    cls: "pin-dialog-green"
                },
                isCount: !1,
                butInfo: {
                    butType: "linkTo",
                    title: n,
                    link: i
                }
            };
        }
    }, {
        key: "tuanFailed_join",
        value: function() {
            var t = this.initlinkMap().checkmore;
            return {
                proInfo: {
                    leftText: "超过有效时间，",
                    content: "拼团失败",
                    rightText: "",
                    cls: "pin-dialog-red"
                },
                isCount: !1,
                butInfo: {
                    butType: "linkTo",
                    title: t.title,
                    link: t.link
                }
            };
        }
    }, {
        key: "tuanFailed_unJoin",
        value: function() {
            var t = this.unJoin();
            return {
                proInfo: {
                    leftText: "超过有效时间，",
                    content: "拼团失败",
                    rightText: "",
                    cls: "pin-dialog-red"
                },
                isCount: !1,
                butInfo: {
                    butType: "linkTo",
                    title: t.title,
                    link: t.link
                }
            };
        }
    }, {
        key: "unJoin",
        value: function() {
            var t = void 0, n = void 0;
            return this.tuanInfo.isActivityExpire ? (t = this.initlinkMap().checkmore.title, 
            n = this.initlinkMap().checkmore.link) : (t = this.initlinkMap().openNew.title, 
            n = this.initlinkMap().openNew.link), {
                title: t,
                link: n
            };
        }
    }, {
        key: "initlinkMap",
        value: function() {
            return {
                goodsEmpty: {
                    link: "/pages/pintuanIndex/index",
                    title: "哎呀商品太抢手卖光了，去逛逛其他拼团"
                },
                checkmore: {
                    link: "/pages/pintuanIndex/index",
                    title: "去逛逛其他拼团"
                },
                openNew: {
                    link: this.tuanInfo.itemInfo.link,
                    title: "我也来开这个团"
                },
                checkOrder: {
                    link: this.tuanInfo.orderLink,
                    title: "查看订单详情"
                },
                checkCoupon: {
                    link: "/pages/coupon/index",
                    title: "查看我的优惠券"
                },
                attendOther: {
                    link: "",
                    title: "去参加其他小伙伴的团"
                }
            };
        }
    }, {
        key: "initCountdown",
        value: function() {
            this.$countdown.init({
                format: "hh:mm:ss",
                countdown: this.tuanInfo.remainTime
            });
        }
    } ]), t;
}();

exports.NewTuan = function(u) {
    function r(n, o) {
        i(this, r);
        var e = t(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this));
        return e.tuanInfo = n, e.obj = o, e.$countdown = e.obj.$countdown, e;
    }
    return n(r, e), o(r, [ {
        key: "tuaning_join",
        value: function() {
            return this.initCountdown(), {
                proInfo: {
                    leftText: "仅剩",
                    content: this.tuanInfo.remainNum,
                    rightText: "位新人，",
                    cls: "pin-dialog-red pin-dialog-big"
                },
                isCount: !0,
                butInfo: {
                    butType: "share"
                }
            };
        }
    }, {
        key: "tuaning_unJoin",
        value: function() {
            var t = {};
            if (this.initCountdown(), this.tuanInfo.isGoodsEmpty) {
                var n = this.initlinkMap().goodsEmpty;
                t = {
                    butType: "linkTo",
                    title: n.title,
                    link: n.link
                };
            } else t = {
                butType: "buy",
                title: "新人一键参团"
            };
            return {
                proInfo: {
                    leftText: "仅剩",
                    content: this.tuanInfo.remainNum,
                    rightText: "位新人，",
                    cls: "pin-dialog-red pin-dialog-big"
                },
                isCount: !0,
                butInfo: t
            };
        }
    } ]), r;
}(), exports.CouponTuan = function(u) {
    function r(n, o) {
        i(this, r);
        var e = t(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this));
        return e.tuanInfo = n, e.obj = o, e.$countdown = e.obj.$countdown, e;
    }
    return n(r, e), o(r, [ {
        key: "tuanSuccess_join",
        value: function() {
            return {
                proInfo: {
                    leftText: "已有" + this.tuanInfo.joinNum + "人参加，",
                    content: "拼团成功",
                    rightText: "",
                    cls: "pin-dialog-green"
                },
                isCount: !1,
                butInfo: {
                    butType: "linkTo",
                    link: "/pages/coupon/index",
                    title: "查看我的优惠券"
                }
            };
        }
    } ]), r;
}(), exports.NewCouponTuan = function(u) {
    function r(n, o) {
        i(this, r);
        var e = t(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this));
        return e.tuanInfo = n, e.obj = o, e.$countdown = e.obj.$countdown, e;
    }
    return n(r, e), o(r, [ {
        key: "tuanSuccess_join",
        value: function() {
            return {
                proInfo: {
                    leftText: "已有" + this.tuanInfo.joinNum + "人参加，",
                    content: "拼团成功",
                    rightText: "",
                    cls: "pin-dialog-green"
                },
                isCount: !1,
                butInfo: {
                    butType: "linkTo",
                    link: "/pages/coupon/index",
                    title: "查看我的优惠券"
                }
            };
        }
    }, {
        key: "tuaning_join",
        value: function() {
            return this.initCountdown(), {
                proInfo: {
                    leftText: "仅剩",
                    content: this.tuanInfo.remainNum,
                    rightText: "位新人，",
                    cls: "pin-dialog-red pin-dialog-big"
                },
                isCount: !0,
                butInfo: {
                    butType: "share"
                }
            };
        }
    }, {
        key: "tuaning_unJoin",
        value: function() {
            var t = {};
            if (this.initCountdown(), this.tuanInfo.isGoodsEmpty) {
                var n = this.initlinkMap().goodsEmpty;
                t = {
                    butType: "linkTo",
                    title: n.title,
                    link: n.link
                };
            } else t = {
                butType: "buy",
                title: "新人一键参团"
            };
            return {
                proInfo: {
                    leftText: "仅剩",
                    content: this.tuanInfo.remainNum,
                    rightText: "位新人，",
                    cls: "pin-dialog-red pin-dialog-big"
                },
                isCount: !0,
                butInfo: t
            };
        }
    } ]), r;
}(), exports.LotteryTuan = function(u) {
    function r(n, o) {
        i(this, r);
        var e = t(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this));
        return e.tuanInfo = n, e.obj = o, e.$countdown = e.obj.$countdown, e;
    }
    return n(r, e), o(r, [ {
        key: "tuanSuccess_join",
        value: function() {
            return {
                proInfo: {
                    leftText: "已有" + this.tuanInfo.joinNum + "人参加，",
                    content: "拼团成功",
                    rightText: "",
                    cls: "pin-dialog-green"
                },
                isCount: !1,
                butInfo: {
                    butType: "wechat"
                }
            };
        }
    } ]), r;
}(), exports.LoopTuan = function(u) {
    function r(n, o) {
        i(this, r);
        var e = t(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this));
        return e.tuanInfo = n, e.obj = o, e.$countdown = e.obj.$countdown, e;
    }
    return n(r, e), o(r, [ {
        key: "unJoin",
        value: function() {
            var t = void 0, n = void 0;
            if (this.tuanInfo.isActivityExpire) n = "/pages/pintuanIndex/index", t = "去逛逛其他拼团"; else if (this.tuanInfo.isGoodsEmpty) {
                var i = this.initlinkMap().goodsEmpty;
                t = i.title, n = i.link;
            } else n = this.tuanInfo.joinLink, t = "去参加其他小伙伴的团";
            return {
                title: t,
                link: n
            };
        }
    } ]), r;
}();
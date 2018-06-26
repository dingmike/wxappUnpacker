function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function b(a) {
    return function() {
        var b = a.apply(this, arguments);
        return new Promise(function(c, d) {
            function f(a, e) {
                try {
                    var g = b[a](e), h = g.value;
                } catch (a) {
                    return void d(a);
                }
                return g.done ? void c(h) : Promise.resolve(h).then(function(a) {
                    f("next", a);
                }, function(a) {
                    f("throw", a);
                });
            }
            return f("next");
        });
    };
}

function c(a, b) {
    if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
}

function d(a, b) {
    if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return b && ("object" == typeof b || "function" == typeof b) ? b : a;
}

function f(a, b) {
    if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
    a.prototype = Object.create(b && b.prototype, {
        constructor: {
            value: a,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = void 0;

var g = Object.assign || function(b) {
    for (var c, d = 1; d < arguments.length; d++) for (var e in c = arguments[d], c) Object.prototype.hasOwnProperty.call(c, e) && (b[e] = c[e]);
    return b;
}, h = function() {
    function b(b, c) {
        for (var d, a = 0; a < c.length; a++) d = c[a], d.enumerable = d.enumerable || !1, 
        d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(b, d.key, d);
    }
    return function(c, d, e) {
        return d && b(c.prototype, d), e && b(c, e), c;
    };
}(), e = require("./../npm/wepy/lib/wepy.js"), j = a(e), i = require("./counter.js"), k = a(i), m = require("./../common/api.js"), l = require("./../common/global.js"), p = a(l), n = require("./wepy-com-toast.js"), q = a(n), o = require("./../common/da.js"), v = a(o), r = function(a) {
    function l() {
        var f, e, h, a;
        c(this, l);
        for (var i = arguments.length, o = Array(i), n = 0; n < i; n++) o[n] = arguments[n];
        return e = h = d(this, (f = l.__proto__ || Object.getPrototypeOf(l)).call.apply(f, [ this ].concat(o))), 
        h.$repeat = {}, h.$props = {
            counter: {
                "xmlns:v-bind": "",
                "v-bind:maxNumber.once": "sku_info.stock",
                "v-bind:num.once": "num",
                "v-bind:type.sync": "type",
                "v-bind:seckillLimit.once": "sku_info.seckillLimit"
            }
        }, h.$events = {}, h.components = {
            counter: k.default,
            toast: q.default
        }, h.props = {
            itemId: {},
            groupId: {},
            groupActivityId: {},
            type: {}
        }, h.data = {
            isShow: !1,
            itemInfo: {},
            num: 1,
            id: 0,
            netrst: "",
            sku_array: [],
            selectInfo: [],
            addCart: !1,
            isGroupon: !1,
            isSeckill: !1,
            activityType: 0,
            activity: {
                id: 0,
                type: 0
            },
            sku_info: {
                stock: "",
                price: "",
                ori_price: "",
                imgurl: "",
                seckillLimit: 0
            },
            disabled: !1,
            isIpx: p.default.isIPhoneX
        }, h.events = {
            "sku-broadcast": function(b, a, d, e, f) {
                var g = h;
                g.sku_array = [], g.selectInfo = [], g.addCart = e, g.id = b, g.activityType = f, 
                g.isGroupon = 1 === f, g.isSeckill = 2 === f;
                var k = 2 === f ? 0 : a;
                2 === f || parseInt(d), 2 === f && (g.activity = {
                    id: a,
                    type: d
                }), p.default.sku.cur_num = 1, p.default.sku.max_num = 1, g.$broadcast("num-broadcast", 1);
                var n = {
                    f_id: p.default.getFid() || 0
                }, l = g.isGroupon ? "item/getActivityItem" : "item/property";
                g.isGroupon ? n.activity_id = b : n.item_id = b, j.default.setStorageSync("item_info", n), 
                g.$emit("cart-emit", !0), (0, m.seeGet)(l, n, function(c) {
                    var d = c.data;
                    if (1 != d.result) return void j.default.showModal({
                        title: "提示",
                        confirmColor: "#FE3B2E",
                        content: d.msg,
                        showCancel: !1
                    }).then(function() {
                        return g.$emit("cart-emit", !1);
                    });
                    if (d) {
                        g.isShow = !0, g.itemInfo = d.data, g.sku_info.stock = g.itemInfo.stock, g.sku_info.seckillLimit = g.itemInfo.seckill_count_limit, 
                        g.sku_info.price = (0, m.currencyFormat)(g.itemInfo.price), g.sku_info.ori_price = (0, 
                        m.currencyFormat)(g.itemInfo.ori_price), g.sku_info.imgurl = g.itemInfo.item_imgurl, 
                        g.$broadcast("seckillLimitNum-broadcast", g.itemInfo.seckill_count_limit), k || (k = g.submitDefultSKU(g.itemInfo.sku_detail));
                        var e = !1;
                        for (var a in g.itemInfo.sku_detail) a == k && (e = !0);
                        if (k && e) g.sku_array = g.itemInfo.sku_detail[k].value_path.split(";"), g.sku_array.forEach(function(b, c) {
                            var d = b.split(":")[1];
                            g.itemInfo.sku_model.sku_props[c].values.forEach(function(e, a) {
                                if (e.value_id == d) {
                                    var f = {
                                        index: c,
                                        type_index: a,
                                        value: "" + b,
                                        checked: 0,
                                        sku_name: e.name
                                    };
                                    g.checkSuk(f);
                                }
                            });
                        }); else {
                            var f = !1, h = 0;
                            if (g.itemInfo.sku_model.sku_props.forEach(function(a, b) {
                                1 == a.values.length && (f = !0, h = b);
                            }), 0 < g.itemInfo.stock && f) {
                                var i = {
                                    index: h,
                                    type_index: 0,
                                    value: g.itemInfo.sku_model.sku_props[h].prop_id + ":" + g.itemInfo.sku_model.sku_props[h].values[0].value_id,
                                    checked: 0,
                                    sku_name: g.itemInfo.sku_model.sku_props[h].values[0].name
                                };
                                g.checkSuk(i);
                            }
                        }
                    }
                    g.filterInvalidSKU(), g.$apply(), v.default.report(132, 101, b, "", "", p.default.getFid());
                });
            }
        }, h.methods = {
            radioChange: function(a) {
                if (1 == a.currentTarget.dataset.disabled) return !1;
                var b = {
                    index: a.currentTarget.dataset.index,
                    type_index: a.currentTarget.dataset.type_index,
                    value: a.currentTarget.dataset.value,
                    checked: a.currentTarget.dataset.checked,
                    sku_name: a.currentTarget.dataset.sku_name
                };
                this.checkSuk(b);
            },
            formSubmit: function() {
                function a() {
                    return c.apply(this, arguments);
                }
                var c = b(regeneratorRuntime.mark(function b(d) {
                    var f, h, a, i, e, k, n, o, l, q = this;
                    return regeneratorRuntime.wrap(function(b) {
                        for (;;) switch (b.prev = b.next) {
                          case 0:
                            for (n in f = this, h = [], a = this.sku_array, i = this.itemInfo.sku_model.path_id_map, 
                            e = 0, k = this.itemInfo.sku_model.sku_props.length, a) a[n] && h.push(a[n]), e++;
                            h.pop(), o = {
                                sku_id: i[this.sku_array.join(";")],
                                buy_num: d.detail.value.buy_num,
                                f_id: p.default.getFid() || 0,
                                src_sku_id: i[this.sku_array.join(";")]
                            }, 2 === f.activityType && (o = g({}, o, {
                                activity_type: f.activity.type,
                                activity_id: f.activity.id
                            })), 0 == a.length || a.filter(function(a) {
                                return void 0 != a && null !== a && "" !== a;
                            }).length < k ? f.$invoke("toast", "show", {
                                title: "请勾选商品类型",
                                config: {
                                    type: "warn",
                                    size: 30,
                                    color: "white"
                                }
                            }) : f.addCart ? (0, m.seePost)("shop_cartv2/addToShopCart", o, function(a) {
                                return a.data.result ? void (v.default.report(132, 1, q.id, "", "", p.default.getFid()), 
                                wx.showToast({
                                    title: "加入购物车成功",
                                    icon: "success",
                                    duration: 800
                                }), f.$emit("cart-emit", !1), f.sku_array = [], f.itemInfo.sku_model.sku_props = [], 
                                f.selectInfo = []) : (wx.showModal({
                                    title: "提示",
                                    confirmColor: "#FE3B2E",
                                    content: a.data.msg,
                                    showCancel: !1
                                }), !1);
                            }) : (j.default.showToast({
                                title: "下单中...",
                                icon: "loading",
                                duration: 2e3
                            }), j.default.setStorageSync("sku_list", [ o ]), f.$emit("cart-emit", !1), f.sku_array = [], 
                            f.itemInfo.sku_model.sku_props = [], f.selectInfo = [], l = f.isGroupon ? "pay?gId=" + f.groupId + "&aId=" + f.id + "&_=" + new Date().getTime() : "pay?_=" + new Date().getTime(), 
                            "pages/grouponDetail" == getCurrentPages()[0].route ? wx.redirectTo({
                                url: l
                            }) : wx.navigateTo({
                                url: l
                            }), v.default.report(132, 109, this.id, "", "", p.default.getFid()));

                          case 11:
                          case "end":
                            return b.stop();
                        }
                    }, b, this);
                }));
                return a;
            }()
        }, a = e, d(h, a);
    }
    return f(l, a), h(l, [ {
        key: "onUnload",
        value: function() {
            this.sku_array = [], this.itemInfo.sku_model.sku_props = [], this.selectInfo = [];
        }
    }, {
        key: "filterInvalidSKU",
        value: function() {
            var b = this, c = [];
            for (var d in this.itemInfo.sku_detail) 0 == this.itemInfo.sku_detail[d].stock && c.push(this.itemInfo.sku_detail[d]);
            if (0 < c.length) if (1 === c[0].value_path.split(";").length) this.itemInfo.sku_model.sku_props[0].values.map(function(a) {
                return c.forEach(function(b) {
                    a.value_id == b.value_path.split(":")[1] && (a.is_disabled = !0);
                }), a;
            }); else {
                var f = [], a = [];
                c.forEach(function(b) {
                    f.push(b.value_path.split(";")[0]), a.push(b.value_path.split(";")[1]);
                });
                var e = f.reduce(function(a, b) {
                    return a[b]++ || (a[b] = 1), a;
                }, {}), g = a.reduce(function(a, b) {
                    return a[b]++ || (a[b] = 1), a;
                }, {});
                this.itemInfo.sku_model.sku_props[0].values.map(function(c) {
                    for (var d in e) e[d] === b.itemInfo.sku_model.sku_props[1].values.length && c.value_id == d.split(":")[1] && (c.is_disabled = !0, 
                    c.defultInvalidSKU = !0);
                    return c;
                }), this.itemInfo.sku_model.sku_props[1].values.map(function(c) {
                    for (var d in g) g[d] === b.itemInfo.sku_model.sku_props[0].values.length && c.value_id == d.split(":")[1] && (c.is_disabled = !0, 
                    c.defultInvalidSKU = !0);
                    return c;
                });
            }
        }
    }, {
        key: "submitDefultSKU",
        value: function(b) {
            var c = 0, d = 0, e = 0;
            for (var a in b) a && (d = b[a].stock, e = a, c++);
            return 1 == c && d ? e : 0;
        }
    }, {
        key: "checkSuk",
        value: function(b) {
            var e = this, f = "", g = [];
            p.default.sku.cur_num = 1;
            var h = b.index, j = b.type_index, k = this.itemInfo.sku_model.path_id_map, a = this.itemInfo.sku_detail;
            for (var i in this.sku_array[h] = b.value, k) if (0 <= i.indexOf(b.value)) {
                var n = a[k[i]], l = n.value_path.replace(b.value, "");
                0 == n.stock && g.push(l);
            }
            this.itemInfo.sku_model.sku_props.map(function(a, b) {
                h != b && a.values.map(function(a) {
                    delete a.is_disabled;
                });
            }), g.map(function(a) {
                a.split(";").map(function(c, d) {
                    if (c) {
                        var a = c.split(":")[1];
                        c != b.value && e.itemInfo.sku_model.sku_props[d].values.map(function(b) {
                            b.value_id == a && (b.is_disabled = !0);
                        });
                    }
                });
            }), f = k[this.sku_array.join(";")];
            var c = [];
            if (this.itemInfo.sku_model.sku_props.map(function(d, f) {
                d.values.map(function(a, g) {
                    c[f] = d.prop_id + ":" + a.value_id, c[h] = b.value, f == h ? a.checked = j === g ? (a.checked, 
                    e.sku_array[h] = a.checked ? "" : b.value) : 0 : k[c.join(";")] || (a.is_disabled = !0);
                });
            }), b.checked ? (this.selectInfo[h] = "", this.itemInfo.sku_model.sku_props.map(function(a, b) {
                h != b && a.values.map(function(a) {
                    a.is_disabled = !!a.defultInvalidSKU;
                });
            })) : this.selectInfo[h] = "已选择“" + b.sku_name + "”", f) {
                var o = a[f];
                this.sku_info.stock = o.stock, this.sku_info.price = (0, m.currencyFormat)(o.price), 
                this.sku_info.ori_price = (0, m.currencyFormat)(o.ori_price), this.sku_info.imgurl = o.imgurl || this.itemInfo.item_imgurl, 
                this.disabled = !+o.stock, p.default.sku.max_num = o.stock, this.$broadcast("num-broadcast", this.disabled || 0 != p.default.sku.cur_num ? p.default.sku.cur_num : 1), 
                this.$broadcast("maxNum-broadcast", o.stock);
            }
            p.default.sku.cur_num > p.default.sku.max_num && (p.default.sku.cur_num = p.default.sku.max_num, 
            this.$broadcast("num-broadcast", p.default.sku.cur_num)), this.$apply();
        }
    }, {
        key: "listenerConfirm",
        value: function() {
            this.setData({
                hiddenModal: !0
            });
        }
    } ]), l;
}(j.default.component);

exports.default = r;
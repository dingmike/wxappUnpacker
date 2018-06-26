function a(a) {
    return a && a.__esModule ? a : {
        default: a
    };
}

function b(a) {
    return function() {
        var b = a.apply(this, arguments);
        return new Promise(function(c, a) {
            function d(e, f) {
                try {
                    var g = b[e](f), h = g.value;
                } catch (b) {
                    return void a(b);
                }
                return g.done ? void c(h) : Promise.resolve(h).then(function(a) {
                    d("next", a);
                }, function(a) {
                    d("throw", a);
                });
            }
            return d("next");
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
});

var g = function() {
    function a(a, b) {
        for (var c, d = 0; d < b.length; d++) c = b[d], c.enumerable = c.enumerable || !1, 
        c.configurable = !0, "value" in c && (c.writable = !0), Object.defineProperty(a, c.key, c);
    }
    return function(b, c, d) {
        return c && a(b.prototype, c), d && a(b, d), b;
    };
}(), e = require("./../npm/wepy/lib/wepy.js"), h = a(e), j = require("./../common/api.js"), i = require("./../common/global.js"), k = a(i), l = function(a) {
    function l() {
        var f, e, g, i;
        c(this, l);
        for (var m = arguments.length, a = Array(m), n = 0; n < m; n++) a[n] = arguments[n];
        return e = g = d(this, (f = l.__proto__ || Object.getPrototypeOf(l)).call.apply(f, [ this ].concat(a))), 
        g.config = {
            enablePullDownRefresh: !1
        }, g.data = {
            listAllArea: [ "" ],
            arrayProvince: [ "请选择" ],
            arrayCity: [ "请选择" ],
            arrayCounty: [ "请选择" ],
            indexProvince: 0,
            indexCity: 0,
            indexCounty: 0,
            user_info_id: 0,
            listAddress: [],
            address_info: {},
            pageTitle: [ "添加地址", "编辑地址" ],
            isIpx: k.default.isIPhoneX
        }, g.methods = {
            bindChangeProvince: function(a) {
                this.indexProvince = a.detail.value, this.data.arrayProvince[this.indexProvince], 
                this.indexCity = 0, this.indexCounty = 0, this.setCity();
            },
            bindChangeCity: function(a) {
                this.indexCity = a.detail.value, this.data.arrayCity[this.indexCity], this.indexCounty = 0, 
                this.setArea();
            },
            bindChangeCounty: function(a) {
                this.indexCounty = a.detail.value, this.data.arrayCounty[this.indexCounty];
            },
            formSubmit: function() {
                function a() {
                    return c.apply(this, arguments);
                }
                var c = b(regeneratorRuntime.mark(function c(d) {
                    var f, g, e, i, a;
                    return regeneratorRuntime.wrap(function(c) {
                        for (;;) switch (c.prev = c.next) {
                          case 0:
                            if (f = this, d.detail.value.name && this.arrayProvince[this.indexProvince] && this.arrayCity[this.indexCity] && this.arrayCounty[this.indexCounty] && d.detail.value.detail_addr && d.detail.value.mobile) {
                                c.next = 4;
                                break;
                            }
                            return wx.showModal({
                                title: "提示",
                                confirmColor: "#FE3B2E",
                                content: "请把地址信息填写完整~",
                                showCancel: !1
                            }), c.abrupt("return");

                          case 4:
                            for (g = "", g = 0 >= f.user_info_id ? "addAddrInfo" : "updateAddrInfo", e = d, 
                            i = {
                                user_info_id: f.user_info_id || 0,
                                name: d.detail.value.name,
                                addr: this.arrayProvince[this.indexProvince] + " " + this.arrayCity[this.indexCity] + " " + this.arrayCounty[this.indexCounty],
                                detail_addr: d.detail.value.detail_addr,
                                mobile: d.detail.value.mobile,
                                idcard_front_imgurl: "",
                                idcard_back_imgurl: ""
                            }, a = 0; 3 > a; a++) i.addr = i.addr.replace("请选择", "");
                            h.default.showModal({
                                title: "提示",
                                confirmColor: "#FE3B2E",
                                content: "确认保存地址？"
                            }).then(function() {
                                var a = b(regeneratorRuntime.mark(function a(b) {
                                    var c;
                                    return regeneratorRuntime.wrap(function(a) {
                                        for (;;) switch (a.prev = a.next) {
                                          case 0:
                                            if (!b.confirm) {
                                                a.next = 5;
                                                break;
                                            }
                                            return a.next = 3, (0, j.seePost)("pay/" + g, i);

                                          case 3:
                                            c = a.sent, c && (0 == f.user_info_id && (k.default.config.user_info_id = c.data.user_info_id), 
                                            h.default.navigateBack());

                                          case 5:
                                          case "end":
                                            return a.stop();
                                        }
                                    }, a, this);
                                }));
                                return function() {
                                    return a.apply(this, arguments);
                                };
                            }());

                          case 10:
                          case "end":
                            return c.stop();
                        }
                    }, c, this);
                }));
                return a;
            }(),
            clickSetDefault: function() {
                function a() {
                    return c.apply(this, arguments);
                }
                var c = b(regeneratorRuntime.mark(function a() {
                    var b, c;
                    return regeneratorRuntime.wrap(function(a) {
                        for (;;) switch (a.prev = a.next) {
                          case 0:
                            if (b = this, !(0 >= b.user_info_id)) {
                                a.next = 3;
                                break;
                            }
                            return a.abrupt("return");

                          case 3:
                            return a.next = 5, (0, j.seePost)("pay/setDefaultAddr?user_info_id=" + b.user_info_id, {
                                user_info_id: b.user_info_id
                            });

                          case 5:
                            c = a.sent, c && h.default.showToast({
                                title: "设置成功",
                                icon: "success",
                                duration: 1500
                            });

                          case 7:
                          case "end":
                            return a.stop();
                        }
                    }, a, this);
                }));
                return a;
            }()
        }, i = e, d(g, i);
    }
    return f(l, a), g(l, [ {
        key: "onUnload",
        value: function() {
            this.listAllArea = [ "" ], this.arrayProvince = [ "请选择" ], this.arrayCity = [ "请选择" ], 
            this.arrayCounty = [ "请选择" ], this.indexProvince = 0, this.indexCity = 0, this.indexCounty = 0, 
            this.user_info_id = 0, this.listAddress = [], this.address_info = {}, this.pageTitle = [ "添加地址", "编辑地址" ];
        }
    }, {
        key: "onLoad",
        value: function() {
            function a() {
                return c.apply(this, arguments);
            }
            var c = b(regeneratorRuntime.mark(function b(f) {
                var g, k, m, n, a, e, o, p, l, d;
                return regeneratorRuntime.wrap(function(b) {
                    for (;;) switch (b.prev = b.next) {
                      case 0:
                        return g = this, g.user_info_id = f.user_info_id || 0, k = g.pageTitle[0], 0 < g.user_info_id && (k = g.pageTitle[1]), 
                        h.default.setNavigationBarTitle({
                            title: k
                        }), b.next = 7, (0, j.seePost)("common/getArea", {});

                      case 7:
                        if (m = b.sent, m && (this.listAllArea = m.data), !(0 < g.user_info_id)) {
                            b.next = 27;
                            break;
                        }
                        return b.next = 12, (0, j.seePost)("pay/getAddrList", {});

                      case 12:
                        if (!(n = b.sent)) {
                            b.next = 25;
                            break;
                        }
                        g.listAddress = n.data, a = 0;

                      case 16:
                        if (!(a < g.listAddress.length)) {
                            b.next = 25;
                            break;
                        }
                        if (g.listAddress[a].user_info_id != g.user_info_id) {
                            b.next = 22;
                            break;
                        }
                        return g.address_info = g.listAddress[a], g.address_info.addr = g.address_info.addr.replace("-|-", " "), 
                        g.address_info.addr = g.address_info.addr.replace("-|-", " "), b.abrupt("break", 25);

                      case 22:
                        a++, b.next = 16;
                        break;

                      case 25:
                        b.next = 28;
                        break;

                      case 27:
                        g.address_info = {
                            user_info_id: 0,
                            name: "",
                            addr: "",
                            detail_addr: "",
                            mobile: "",
                            idcard_no: "",
                            idcard_front_imgurl: "",
                            idcard_back_imgurl: ""
                        };

                      case 28:
                        for (this.arrayProvince = [ "请选择" ], this.arrayCity = [ "请选择" ], this.arrayCounty = [ "请选择" ], 
                        this.indexCounty = this.indexCity = this.indexProvince = 0, e = 0; e < this.listAllArea.length; e++) o = this.listAllArea[e], 
                        this.arrayProvince.push(o.name);
                        if (p = [], !g.address_info.addr) {
                            b.next = 44;
                            break;
                        }
                        p = g.address_info.addr.split(" "), l = 0;

                      case 37:
                        if (!(3 > l)) {
                            b.next = 44;
                            break;
                        }
                        if (!(l < p.length)) {
                            b.next = 40;
                            break;
                        }
                        return b.abrupt("continue", 41);

                      case 40:
                        p[l] = "";

                      case 41:
                        l++, b.next = 37;
                        break;

                      case 44:
                        if (0 < p.length) {
                            if (3 <= p.length) for (d = 3; d < p.length; d++) p[2] += p[d];
                            for (p[0] = p[0].replace("省", ""), p[0] = p[0].replace("市", ""), 2 <= p.length && (p[1] = p[1].replace("市", "")), 
                            d = 0; d < p.length; d++) p[d] = p[d].replace(" ", ""), p[d] = p[d].replace(" ", "");
                            for (e = 0; e < this.arrayProvince.length; e++) this.arrayProvince[e] == p[0] && (this.indexProvince = e);
                            for (this.setCity(), e = 0; e < this.arrayCity.length; e++) this.arrayCity[e] == p[1] && (this.indexCity = e);
                            for (this.setArea(), e = 0; e < this.arrayCounty.length; e++) this.arrayCounty[e] == p[2] && (this.indexCounty = e);
                        }
                        this.$apply();

                      case 46:
                      case "end":
                        return b.stop();
                    }
                }, b, this);
            }));
            return a;
        }()
    }, {
        key: "setCity",
        value: function() {
            this.arrayCity = [ "请选择" ];
            for (var a, b = 0; b < this.listAllArea.length; b++) if (a = this.listAllArea[b], 
            a.name == this.arrayProvince[this.indexProvince]) {
                for (var c = 0; c < a.city.length; c++) this.arrayCity.push(a.city[c].name);
                break;
            }
            for (var b = 0; b < this.arrayCity.length; b++) this.arrayCity[b] = this.arrayCity[b].replace(" ", ""), 
            this.arrayCity[b] = this.arrayCity[b].replace(" ", "");
        }
    }, {
        key: "setArea",
        value: function() {
            this.arrayCounty = [ "请选择" ];
            for (var a, b = 0; b < this.listAllArea.length; b++) if (a = this.listAllArea[b], 
            a.name == this.arrayProvince[this.indexProvince]) {
                for (var c, d = 0; d < a.city.length; d++) if (c = a.city[d], c.name == this.arrayCity[this.indexCity]) {
                    for (var e = 0; e < c.area.length; e++) this.arrayCounty.push(c.area[e]);
                    break;
                }
                break;
            }
            for (var b = 0; b < this.arrayCounty.length; b++) this.arrayCounty[b] = this.arrayCounty[b].replace(" ", ""), 
            this.arrayCounty[b] = this.arrayCounty[b].replace(" ", "");
        }
    }, {
        key: "onPullDownRefresh",
        value: function() {
            var a = b(regeneratorRuntime.mark(function a() {
                return regeneratorRuntime.wrap(function(a) {
                    for (;;) switch (a.prev = a.next) {
                      case 0:
                        h.default.stopPullDownRefresh();

                      case 1:
                      case "end":
                        return a.stop();
                    }
                }, a, this);
            }));
            return function() {
                return a.apply(this, arguments);
            };
        }()
    }, {
        key: "onShareAppMessage",
        value: function() {
            return k.default.getShareDefault();
        }
    } ]), l;
}(h.default.page);

Page(require("./../npm/wepy/lib/wepy.js").default.$createPage(l, "pages/addressAdd"));
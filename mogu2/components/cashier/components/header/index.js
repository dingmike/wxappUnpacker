Object.defineProperty(exports, "__esModule", {
    value: !0
});

var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var r = arguments[e];
        for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a]);
    }
    return t;
}, e = {
    home: {
        title: "选择支付方式",
        leftIcon: "close"
    },
    installment: {
        title: "选择分期方案",
        leftIcon: "arrow-left"
    },
    pwd: {
        title: "输入支付密码",
        leftIcon: "arrow-left"
    },
    message: {
        title: "短信验证",
        leftIcon: "arrow-left"
    },
    result: {
        title: "支付结果",
        leftIcon: "arrow-left"
    }
};

exports.default = {
    name: "header",
    data: function() {
        return {
            page: "home",
            title: "选择支付方式",
            extraTitle: "",
            leftIcon: "close",
            rightIcon: ""
        };
    },
    methods: {
        setTitle: function(r, a) {
            a ? this.setData(t({
                page: r
            }, e[r], {
                extraTitle: a
            })) : this.setData(t({
                page: r
            }, e[r]));
        },
        leftTap: function() {
            "arrow-left" === this.data.leftIcon ? this.$parent.routeGo(-1) : this.$parent.hide();
        }
    }
};
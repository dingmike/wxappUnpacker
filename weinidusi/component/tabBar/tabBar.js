var n = require("../../utils/util.js");

Component({
    properties: {
        target: String,
        mt: Boolean
    },
    data: {
        tabBar: [ {
            normal_icon: "http://wuhoucdn.oss-cn-hangzhou.aliyuncs.com/read_poem/img/home_normal.png",
            highlight_icon: "http://wuhoucdn.oss-cn-hangzhou.aliyuncs.com/read_poem/img/home_highlight.png",
            text: "首页",
            id: "index",
            url: "../../pages/index/index",
            navtype: "reLaunch"
        }, {
            normal_icon: "http://wuhoucdn.oss-cn-hangzhou.aliyuncs.com/read_poem/img/rank_normal.png",
            highlight_icon: "http://wuhoucdn.oss-cn-hangzhou.aliyuncs.com/read_poem/img/rank_highlight.png",
            text: "排行榜",
            id: "rank",
            url: "../../pages/rank/rank",
            navtype: "reLaunch"
        }, {
            normal_icon: "http://wuhoucdn.oss-cn-hangzhou.aliyuncs.com/read_poem/img/my_normal.png",
            highlight_icon: "http://wuhoucdn.oss-cn-hangzhou.aliyuncs.com/read_poem/img/my_highlight.png",
            text: "我的",
            id: "my",
            url: "../../pages/my/my?type=record",
            navtype: "reLaunch"
        } ],
        is_ipx: !1
    },
    attached: function() {
        var n = this;
        wx.getSystemInfo({
            success: function(o) {
                console.log(o.model);
                o.model.indexOf("iPhone X") > -1 && n.setData({
                    is_ipx: !0
                });
            }
        });
    },
    methods: {
        navigateTo: function(o) {
            n.navigateTo(o);
        },
        sub: function(o) {
            console.log(o);
            var i = {
                form_id: o.detail.formId
            };
            n.request_post("https://fudai.i-meihao.shop/index.php?m=Mini&c=Poetry&a=save_form_id", i, function() {});
        }
    }
});
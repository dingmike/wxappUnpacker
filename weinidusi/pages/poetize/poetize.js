var t = getApp(), e = require("../../utils/util.js");

Page({
    data: {
        userInfo: "",
        poem: "",
        formId: "",
        getPhone: !1
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        var o = this.getData;
        e.checkSession(o), this.setData({
            userInfo: t.globalData.userInfo
        }), console.log(t.globalData.userInfo);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    formSubmit: function(t) {
        0 != t.detail.value.title.length ? 0 != t.detail.value.author.length ? 0 != t.detail.value.content.length ? (this.setData({
            "poem.title": t.detail.value.title,
            "poem.content": t.detail.value.content,
            "poem.author": t.detail.value.author,
            formId: t.detail.formId
        }), wx.showLoading({
            title: "上传中"
        }), this.data.getPhone && this.hasPhone()) : wx.showToast({
            title: "请填写内容",
            icon: "none"
        }) : wx.showToast({
            title: "请填写作者",
            icon: "none"
        }) : wx.showToast({
            title: "请填写标题",
            icon: "none"
        });
    },
    getPhoneNumber: function(t) {
        if (t.detail.iv && t.detail.encryptedData) {
            var o = {
                poetry_name: this.data.poem.title,
                poetry_content: this.data.poem.content,
                author: this.data.poem.author,
                iv: t.detail.iv,
                encryptedData: t.detail.encryptedData,
                form_id: this.data.formId
            };
            e.request_post("https://fudai.i-meihao.shop/index.php?m=Mini&c=Poetry&a=poetry_add", o, function(t) {
                wx.hideLoading();
                var o = {
                    currentTarget: {
                        dataset: {
                            url: "../my/my?type=write",
                            navtype: "redirectTo"
                        }
                    }
                };
                t.data.code > 0 && e.navigateTo(o);
            });
        } else wx.showToast({
            title: "要验证手机号后才能上传诗哦",
            icon: "none"
        }), wx.hideLoading();
    },
    getData: function() {
        var t = this;
        e.request_post("https://fudai.i-meihao.shop/index.php?m=Mini&c=Poetry&a=check_phone", {}, function(e) {
            e.data.code > 0 && t.setData({
                getPhone: !0
            });
        });
    },
    hasPhone: function() {
        var t = {
            poetry_name: this.data.poem.title,
            poetry_content: this.data.poem.content,
            author: this.data.poem.author,
            form_id: this.data.formId
        };
        e.request_post("https://fudai.i-meihao.shop/index.php?m=Mini&c=Poetry&a=poetry_add", t, function(t) {
            wx.hideLoading();
            var o = {
                currentTarget: {
                    dataset: {
                        url: "../my/my?type=write",
                        navtype: "redirectTo"
                    }
                }
            };
            t.data.code > 0 && e.navigateTo(o);
        });
    }
});
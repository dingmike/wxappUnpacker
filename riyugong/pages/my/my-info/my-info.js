var e = getApp();

Page({
    data: {
        array: [ "男", "女", "保密", "未填写" ],
        index: 0,
        disabled: !0,
        pigyemian: !1
    },
    onLoad: function(a) {
        var t = this, o = e.globalData.userInfo;
        console.log(o), o ? (console.log(o), t.setData({
            pigyemian: !0,
            userInfo: o
        })) : wx.showModal({
            title: "提示",
            content: "获取登录态失败！是否重新获取",
            success: function(e) {
                e.confirm ? wx.openSetting({
                    success: function(e) {
                        console.log(e), wx.reLaunch({
                            url: "/pages/my/my"
                        });
                    }
                }) : e.cancel && wx.navigateBack({
                    delta: 1
                });
            }
        });
        var n = wx.getStorageSync("openid");
        console.log(n), wx.request({
            url: e.globalData.url + "api/user/getUserInfo",
            data: {
                uid: n,
                nickName: o.nickName
            },
            success: function(e) {
                console.log(e.data), t.setData({
                    getUser: e.data,
                    index: e.data.sex
                });
            }
        });
    },
    bindPickerChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value), this.setData({
            index: e.detail.value,
            disabled: !1
        });
    },
    modifyStyle: function() {
        this.setData({
            disabled: !1
        });
    },
    formSubmit: function(a) {
        console.log("form发生了submit事件，携带数据为：", a.detail.value);
        var t = wx.getStorageSync("openid");
        console.log(t), wx.request({
            url: e.globalData.url + "api/user/addViuser",
            data: {
                name: a.detail.value.name,
                phone: a.detail.value.phone,
                weixin: a.detail.value.weixin,
                sex: a.detail.value.sex,
                uid: t
            },
            success: function(e) {
                console.log(e.data), e.data ? wx.showModal({
                    title: "提示",
                    content: "修改成功！",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && wx.navigateBack({
                            delta: 1
                        });
                    }
                }) : wx.showModal({
                    title: "提示",
                    content: "没有信息被修改",
                    showCancel: !1,
                    success: function(e) {}
                });
            }
        });
    },
    getPhoneNumber: function(e) {
        wx.login({
            success: function(e) {
                console.log(e);
            }
        });
        var a = e.detail.encryptedData, t = e.detail.iv;
        this.getEncryptionData(a, t);
    },
    getEncryptionData: function(e, a) {
        var t = this;
        wx.login({
            success: function(o) {
                console.log("调用登录接口成功"), wx.request({
                    url: "https://riyubao.net/code3.php",
                    data: {
                        code: o.code
                    },
                    success: function(o) {
                        wx.request({
                            url: "https://riyubao.net/oralproject/PHP/demo.php",
                            data: {
                                enData: e,
                                ivData: a,
                                sessionKey: o.data.session_key
                            },
                            success: function(e) {
                                if (console.log(e), 200 == e.statusCode) {
                                    var a = e.data.substring(22, 33);
                                    console.log(a);
                                    var o = t.data.getUser;
                                    o.phone = a, console.log(o), t.setData({
                                        getUser: o,
                                        disabled: !1
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });
    }
});
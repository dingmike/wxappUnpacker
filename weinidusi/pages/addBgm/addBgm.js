var t = getApp(), a = require("../../utils/util.js");

Page({
    data: {
        bgm_list: "",
        bgm_src: "",
        bgm_sclected: -1,
        poem_id: "",
        bgm_path: "",
        bgm_id: "",
        share: "",
        bgm: "",
        uid: "",
        current_poem_url: "",
        formId: "",
        getPhone: !1
    },
    onLoad: function(t) {
        t.id ? this.setData({
            poem_id: t.id
        }) : this.setData({
            poem_id: ""
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this.getData;
        a.checkSession(t);
    },
    onHide: function() {},
    onUnload: function() {
        t.globalData.backgroundAudioManager.stop();
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    getData: function() {
        var e = this, i = t.globalData.url + "/index.php?m=Mini&c=Poetry&a=music_list", o = {};
        a.request_post(i, o, function(t) {
            e.setData({
                bgm_list: t.data.list,
                share: t.data.share
            }), t.data.check_phone > 0 && e.setData({
                getPhone: !0
            });
        }, 0);
    },
    select_bgm: function(t) {
        var e = this;
        wx.showLoading({
            title: "加载中"
        });
        var i = "https://ydn.fudai.wuhouweixin.com/index.php?m=Mini&c=Poetry&a=listen&id=" + t.currentTarget.dataset.id;
        a.request_post(i, {}, function(a) {
            var i = {
                poetry_name: "为你读诗",
                epname: "为你读诗",
                singer: "为你读诗",
                coverImgUrl: "111.png",
                src: a.data.file
            };
            e.setData({
                bgm_src: a.data.file,
                bgm_path: a.data.url,
                bgm_id: t.currentTarget.dataset.id,
                current_poem_url: a.data.file,
                bgm: i
            });
        }), this.setData({
            bgm_sclected: t.currentTarget.dataset.index
        });
    },
    navigateTo: function(t) {
        a.navigateTo(t);
    },
    confirm: function(e) {
        var i = this;
        if (e.detail.iv && e.detail.encryptedData) if (0 !== this.data.bgm_path.length) {
            t.globalData.backgroundAudioManager.stop();
            var o = {
                poetry_id: this.data.poem_id,
                url: this.data.bgm_path,
                music_id: this.data.bgm_id,
                iv: e.detail.iv,
                encryptedData: e.detail.encryptedData,
                form_id: this.data.formId
            };
            a.request_post("https://ydn.fudai.wuhouweixin.com/index.php?m=Mini&c=Poetry&a=record_add", o, function(t) {
                var a = {
                    currentTarget: {
                        dataset: {
                            url: "../poem/poem?type=record&id=" + t.data.id,
                            navtype: "redirectTo"
                        }
                    }
                };
                Number(t.data.code) > 0 && i.navigateTo(a), t.data.code < 0 && wx.showToast({
                    title: t.data.msg,
                    icon: "none"
                });
            });
        } else wx.showToast({
            title: "请选择背景音乐",
            icon: "none"
        }); else wx.showToast({
            title: "要验证手机号码才能上传哦",
            icon: "none"
        });
    },
    getFormId: function(t) {
        this.setData({
            formId: t.detail.formId
        }), this.data.getPhone && this.hasPhone();
    },
    hasPhone: function() {
        var e = this;
        if (0 !== this.data.bgm_path.length) {
            t.globalData.backgroundAudioManager.stop();
            var i = {
                poetry_id: this.data.poem_id,
                url: this.data.bgm_path,
                music_id: this.data.bgm_id,
                form_id: this.data.formId
            };
            a.request_post("https://ydn.fudai.wuhouweixin.com/index.php?m=Mini&c=Poetry&a=record_add", i, function(t) {
                var a = {
                    currentTarget: {
                        dataset: {
                            url: "../poem/poem?type=record&id=" + t.data.id,
                            navtype: "redirectTo"
                        }
                    }
                };
                Number(t.data.code) > 0 && e.navigateTo(a), t.data.code < 0 && wx.showToast({
                    title: t.data.msg,
                    icon: "none"
                });
            });
        } else wx.showToast({
            title: "请选择背景音乐",
            icon: "none"
        });
    }
});
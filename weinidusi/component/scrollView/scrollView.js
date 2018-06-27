Component({
    properties: {
        poem: {
            type: Object,
            value: "",
            observer: function(t, a) {
                console.log("newVal:", t, "oldVal:", a);
            }
        },
        show_avatar: {
            type: Boolean,
            value: !0
        }
    },
    data: {
        s_distance: "",
        m_distance: "",
        init: !0,
        s_1px_distance: "",
        m_1px_distance: "",
        svHeight: "",
        ratio: ""
    },
    attached: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                t.setData({
                    ratio: a.windowWidth / 750,
                    s_distance: 0
                });
            }
        });
    },
    methods: {
        scroll: function(t) {
            this.data.init && this.setData({
                s_1px_distance: Number((t.detail.scrollHeight / (490 * this.data.ratio - 25 * this.data.ratio)).toFixed(1)),
                m_1px_distance: Number(((490 * this.data.ratio - 25 * this.data.ratio) / t.detail.scrollHeight).toFixed(1))
            }), this.data.init || "scroll" !== t.type || this.setData({
                m_distance: Math.ceil(this.data.m_1px_distance * t.detail.scrollTop * 2)
            }), this.setData({
                init: !1
            });
        },
        move: function(t) {
            "touch" === t.detail.source && (this.setData({
                s_distance: Math.ceil(this.data.s_1px_distance * t.detail.y * 2)
            }), console.log(this.data.s_distance, t));
        },
        scroll_touch: function(t) {
            console.log("scroll_touch", t);
        }
    }
});
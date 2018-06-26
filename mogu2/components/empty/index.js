Object.defineProperty(exports, "__esModule", {
    value: !0
});

var p = [ "https://s10.mogucdn.com/p2/161213/upload_3bd517df2kgkclkhgl71bg4b37dcc_514x260.png", "https://s10.mogucdn.com/p2/161213/upload_27e7gegi3f9acl5e05f3951if5855_514x260.png", "https://s10.mogucdn.com/p2/161213/upload_61ech6ihe399d85abhjhcigd38444_514x260.png", "https://s10.mogucdn.com/p2/161213/upload_2ie7eb3ae0khl20g0g1glgb852e5i_514x260.png", "https://s10.mogucdn.com/p2/161213/upload_8acll7f4b4j2ljf8i164d5h7bl78g_514x260.png", "https://s10.mogucdn.com/p2/161213/upload_3gh3bj6dk8k46783c78e414aeh7g0_514x260.png", "https://s10.mogucdn.com/p2/161213/upload_74hhee883cbf190e3di6cljk23679_514x260.png", "https://s10.mogucdn.com/p2/161213/upload_76h1c5hjc8heecjehlfgekjdl2ki0_514x260.png", "https://s10.mogucdn.com/p2/161213/upload_21f4ij449lb4h67k0afjic82d0f31_514x260.png", "https://s10.mogucdn.com/p2/161213/upload_682e8fg28d8lk27b9l95jecghd4jl_514x260.png", "https://s10.mogucdn.com/p2/161213/upload_7b01ig2ih5egggj85l1gd8d38790f_514x260.png", "https://s10.mogucdn.com/p2/161213/upload_1h082815bh50k99dajicd53ll1dhl_514x260.png", "https://s10.mogucdn.com/p2/161213/upload_3c4d952gd6k9809gj4g8eg974lk14_514x260.png", "https://s10.mogucdn.com/mlcdn/c45406/170607_52khi3193g9ba5e023l7a6ecee326_514x258.png" ];

exports.default = {
    data: function() {
        return {
            _images: p,
            type: 0,
            text: "糟糕，页面被外星人绑架了",
            tip: null,
            button: null,
            callback: function() {}
        };
    },
    methods: {
        handleClick: function(p) {
            this.data.callback(p);
        }
    }
};
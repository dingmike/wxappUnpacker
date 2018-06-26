Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = {
    name: "common-origin-price",
    props: [ "priceNum", "styleConfig" ],
    data: function() {
        return {
            classData: this.styleConfig && this.styleConfig.class ? this.styleConfig.class + " price-original" : "price-original"
        };
    },
    computed: {
        originPrice: function() {
            var e = this.priceNum;
            return e >= 0 ? this.getData(e) : null;
        }
    },
    methods: {
        getData: function(e) {
            var t = e = Number(e);
            if (e < 1e3) parseFloat(t); else if (e < 1e4) {
                var r = e.toFixed(0);
                t > r && (r = parseFloat(r) + 1), t = parseFloat(r);
            } else {
                var i = (e / 1e4).toFixed(2);
                t > 1e4 * i && (i = parseFloat(i) + .01), t = i = parseFloat(i) + "万";
            }
            return t;
        }
    }
};

exports.default = {
    componentOptions: e,
    renderComponentsFunc: function(e) {}
};
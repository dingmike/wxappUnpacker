function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = t(require("../../../../components/base/color")), i = t(require("../../../../../../common/m")), s = t(require("../../../../../../components/toast/index")), h = i.default.MWP;

exports.default = {
    data: function() {
        return {
            headTitle: "",
            sizeArray: [],
            pointArray: [],
            value: [ 0, 0 ]
        };
    },
    components: {
        color: e.default,
        toast: s.default
    },
    onLoad: function() {},
    methods: {
        switchHandler: function(t) {
            var e = t.currentTarget.dataset.type, i = "", s = [], h = "", a = this.pointArray, r = [], n = {};
            switch (e) {
              case "height":
                i = "身高", s = this.heightArray, h = this.height;
                break;

              case "weight":
                i = "体重", s = this.weightArray, h = this.weight;
                break;

              case "chest":
                i = "胸围", s = this.measureArray, h = this.chest;
                break;

              case "waist":
                i = "腰围", s = this.measureArray, h = this.waist;
                break;

              case "hipline":
                i = "臀围", s = this.measureArray, h = this.hipline;
            }
            h && (n = this.getDetailInfo(h), r = [ this.getRangeIndex(s, n.size), this.getRangeIndex(a, n.unit) ]), 
            this.setData({
                selectShow: !0,
                headTitle: i,
                sizeArray: s,
                pointArray: a,
                value: r
            });
        },
        changeHandler: function(t) {
            var e = t.currentTarget.dataset.type, i = t.detail.value, s = void 0 === i ? [ 0, 0 ] : i;
            switch (e) {
              case "身高":
                this.heightSize = "" + this.heightArray[s[0]] + this.pointArray[s[1]];
                break;

              case "体重":
                this.weightSize = "" + this.weightArray[s[0]] + this.pointArray[s[1]];
                break;

              case "胸围":
                this.chestSize = "" + this.measureArray[s[0]] + this.pointArray[s[1]];
                break;

              case "腰围":
                this.waistSize = "" + this.measureArray[s[0]] + this.pointArray[s[1]];
                break;

              case "臀围":
                this.hiplineSize = "" + this.measureArray[s[0]] + this.pointArray[s[1]];
            }
        },
        cancelHandler: function(t) {
            switch (t.currentTarget.dataset.type) {
              case "身高":
                this.heightSize = "";
                break;

              case "体重":
                this.weightSize = "";
                break;

              case "胸围":
                this.chestSize = "";
                break;

              case "腰围":
                this.waistSize = "";
                break;

              case "臀围":
                this.hiplineSize = "";
            }
            this.setData({
                selectShow: !1
            });
        },
        okHandler: function(t) {
            switch (t.currentTarget.dataset.type) {
              case "身高":
                this.height = this.heightSize || this.height || "130.0";
                break;

              case "体重":
                this.weight = this.weightSize || this.weight || "35.0";
                break;

              case "胸围":
                this.chest = this.chestSize || this.chest || "50.0";
                break;

              case "腰围":
                this.waist = this.waistSize || this.waist || "50.0";
                break;

              case "臀围":
                this.hipline = this.hiplineSize || this.hipline || "50.0";
            }
            this.setData({
                selectShow: !1,
                height: this.height,
                weight: this.weight,
                chest: this.chest,
                waist: this.waist,
                hipline: this.hipline
            });
        },
        formClick: function() {
            var t = this;
            this.height && this.weight && this.$root.$mwp("mwp.laura.editUserSizeInfo", "1", {
                userInfoId: this.userInfoId,
                height: String(this.height),
                weight: String(this.weight),
                waist: String(this.waist),
                hipline: String(this.hipline),
                chest: String(this.chest)
            }).then(h.filterResult).then(function() {
                wx.navigateBack();
            }, function(e) {
                t.$toast.show(e.msg);
            }).catch(function(e) {
                t.$toast.show(e.msg || "接口出错啦,请稍后再试");
            });
        },
        getDetailInfo: function(t) {
            var e = {};
            if (t) return e.size = String(t).split(".")[0], e.unit = "." + (String(t).split(".")[1] || "0"), 
            e;
        },
        getRangeIndex: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], e = arguments[1];
            e = /^[\d]+$/.test(e) ? Number(e) || 0 : e;
            for (var i = 0; i < t.length; i++) if (t[i] === e) return i;
            return 0;
        },
        init: function(t) {
            this.userInfoId = t.userInfoId || 0;
            var e = this.height = t.height && parseFloat(t.height).toFixed(1) || "", i = this.weight = t.weight && parseFloat(t.weight).toFixed(1) || "", s = this.chest = t.chest && parseFloat(t.chest).toFixed(1) || "", h = this.waist = t.waist && parseFloat(t.waist).toFixed(1) || "", a = this.hipline = t.hipline && parseFloat(t.hipline).toFixed(1) || "";
            this.heightArray = [], this.weightArray = [], this.measureArray = [], this.pointArray = [];
            for (var r = [ 0, 0 ], n = 130; n < 191; n++) this.heightArray.push(n);
            for (var o = 35; o < 101; o++) this.weightArray.push(o);
            for (var c = 50; c < 151; c++) this.measureArray.push(c);
            for (var g = 0; g < 10; g++) this.pointArray.push("." + g);
            this.setData({
                selectShow: !1,
                value: r,
                height: e,
                weight: i,
                chest: s,
                waist: h,
                hipline: a
            });
        }
    }
};
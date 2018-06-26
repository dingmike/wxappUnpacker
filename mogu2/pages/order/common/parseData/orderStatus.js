Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.default = function(a, e, _) {
    console.log(_);
    var s = a.split("&&"), c = s[0], t = "";
    switch (c) {
      case "ORDER_CREATED":
        t = "待付款";
        break;

      case "ORDER_PAID":
        t = "待发货";
        break;

      case "ORDER_SHIPPED":
        t = _.indexOf("BEAUTYCLINIC") >= 0 ? "待使用" : "待收货";
        break;

      case "ORDER_COMPLETED":
      case "ORDER_RECEIVED":
        t = "交易完成";
        break;

      case "ORDER_CLOSED":
      case "ORDER_CANCELLED":
        t = "交易关闭";
        break;

      case "tuan_notPay":
        t = "待付款";
        break;

      case "tuan_cancle":
        t = "交易关闭";
        break;

      case "PIN_TUAN_AFTER_PAID":
      case "tuan_tuaning":
        t = "拼团中", +s[1] && (t += "，还差" + s[1] + "人成团");
        break;

      case "tuan_waitPay":
        t = "拼团中，等待团员完成付款";
        break;

      case "PIN_TUAN_SUCCESS_AFTER_PAID":
      case "tuan_tuanSuccess":
        t = "拼团成功";
        break;

      case "PIN_TUAN_LOCKED":
      case "tuan_lotterying":
      case "tuan_notLottery":
        t = "拼团成功，待开奖";
        break;

      case "tuan_prize":
      case "PIN_TUAN_SUCCESS_AFTER_LOCK":
        t = "拼团成功，恭喜中奖";
        break;

      case "PIN_TUAN_FAILED_AFTER_LOCK":
      case "tuan_coupon":
        t = "未中奖";
        break;

      case "tuan_tuanFailed":
      case "PIN_TUAN_FAILED":
        t = "拼团失败";
    }
    if ("ORDER_CREATED" === c && e) switch (e.stageStatus) {
      case "UN_PRE_PAY":
        t = "待付定金";
        break;

      case "WAITING_TAIL_PAY_OPEN":
        t = "已付定金";
        break;

      case "UN_TAIL_PAY":
        t = "待付尾款";
    }
    return t;
};
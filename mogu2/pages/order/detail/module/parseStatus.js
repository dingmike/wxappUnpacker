Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports.default = function(e, a, _) {
    var s = e.split("&&"), E = s[0], c = "", t = "", A = "";
    switch (E) {
      case "ORDER_CREATED":
        c = "等待买家付款", A = "后自动取消订单";
        break;

      case "ORDER_PAID":
        c = "待发货";
        break;

      case "ORDER_SHIPPED":
        c = _.indexOf("BEAUTYCLINIC") >= 0 ? "待使用" : "卖家已发货", A = _.indexOf("BEAUTYCLINIC") >= 0 ? "" : "后自动确认收货";
        break;

      case "ORDER_COMPLETED":
      case "ORDER_RECEIVED":
        c = "交易完成";
        break;

      case "ORDER_CANCELLED":
      case "ORDER_CLOSED":
        c = "交易关闭";
        break;

      case "tuan_notPay":
        c = "待付款";
        break;

      case "tuan_cancle":
        c = "交易关闭";
        break;

      case "PIN_TUAN_AFTER_PAID":
      case "tuan_tuaning":
        c = "拼团中", +s[1] && (c += "，还差" + s[1] + "人成团"), t = "还剩";
        break;

      case "tuan_waitPay":
        c = "拼团中，等待团员完成付款", t = "还剩";
        break;

      case "PIN_TUAN_SUCCESS_AFTER_PAID":
      case "tuan_tuanSuccess":
        c = "拼团成功，等待卖家发货";
        break;

      case "PIN_TUAN_LOCKED":
        c = "拼团成功，待开奖";
        break;

      case "PIN_TUAN_SUCCESS_AFTER_LOCK":
        c = "拼团成功，恭喜中奖";
        break;

      case "PIN_TUAN_FAILED_AFTER_LOCK":
        c = "未中奖";
        break;

      case "tuan_tuanFailed":
      case "PIN_TUAN_FAILED":
        c = "拼团失败";
    }
    if ("ORDER_CREATED" === E && a) switch (a.stageStatus) {
      case "UN_PRE_PAY":
        c = "等待买家付定金", A = "自动取消订单";
        break;

      case "WAITING_TAIL_PAY_OPEN":
      case "UN_TAIL_PAY":
        c = "定金已付，等待支付尾款", A = "";
        break;

      case "TAIL_PAY_SUCCESS":
        c = "尾款已付，等待发货", A = "";
    }
    return {
        statusTitle: c,
        prevTimeText: t,
        timeText: A
    };
};
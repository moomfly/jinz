import request from "@/utils/request";
//查询分红代发
export function fhStatWait(data) {
    return request({
        url: "/api/user/fhStatWait",
        method: "get",
        loading:false,
        params:data,
    });
}
//获取微信头像和昵称
export function wxUserInfo(data) {
    return request({
        url: "/api/user/wxUserInfo",
        method: "get",
        loading:false,
        params:data,
    });
}
//修改个人资料
export function editUserInfo(query) {
    return request({
        url: "/api/user/editInfo",
        method: "post",
        data:query,
    });
}
//验证码-绑定手机
export function sendCode(data) {
    return request({
        url: "/api/com/sendCode",
        method: "get",
        params:data,
    });
}
//绑定手机号
export function bindPhone(query) {
    return request({
        url: "/api/user/bindPhone",
        method: "post",
        data:query,
    });
}

//收款码列表
export function deviceList(query) {
    return request({
        url: "/api/device/list",
        method: "get",
        params:query,
    });
}
//收款码图片
export function deviceCodeUrl(query) {
    return request({
        url: "/api/device/codeUrl",
        method: "get",
        params:query,
    });
}

//新增收款码
export function deviceAdd(query) {
    return request({
        url: "/api/device/add",
        method: "post",
        data:query,
    });
}
//编辑收款码
export function deviceEdit(query) {
    return request({
        url: "/api/device/edit",
        method: "post",
        data:query,
    });
}
//扫码支付订单(收款记录)
export function orderScanList(query) {
    return request({
        url: "/api/merchant/orderScanList",
        method: "get",
        params:query,
    });
}
//扫码订单-退款记录
export function smRefundList(query) {
    return request({
        url: "/api/order/smRefundList",
        method: "get",
        params:query,
    });
}
//申请退单
export function deviceRefund(query) {
    return request({
        url: "/api/order/refund",
        method: "post",
        data:query,
    });
}
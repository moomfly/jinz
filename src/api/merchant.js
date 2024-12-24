
// 获取商家列表
import request from "@/utils/request";
//查询商家列表
export function merchantList(data) {
    return request({
        url: "/api/merchant/list",
        method: "get",
        params:data,
    });
}
//查询商家基本详情
export function merchantDetail(data) {
    return request({
        url: "/api/merchant/detail",
        method: "get",
        params:data,
    });
}
//查询商家入驻详情
export function merchantApplyDetail(data) {
    return request({
        url: "/api/merchant/applyDetail",
        method: "get",
        params:data,
    });
}
//查询商家图片
export function merchantImg(data) {
    return request({
        url: "/api/merchant/img",
        method: "get",
        params:data,
    });
}
//申请商家入驻
export function merchantApply(data) {
    return request({
        url: "/api/merchant/apply",
        method: "post",
        data,
    });
}
//修改申请商家入驻（未审核通过前）
export function merchantApplyEdit(data) {
    return request({
        url: "/api/merchant/applyEdit",
        method: "post",
        data,
    });
}
//修改申请商家入驻（已审核通过）
export function merchantEdit(data) {
    return request({
        url: "/api/merchant/edit",
        method: "post",
        data,
    });
}
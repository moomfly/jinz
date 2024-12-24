
import request from "@/utils/request";

//获取余额流水
export function balanceRecord(data) {
    return request({
        url: "/api/user/balanceRecord",
        method: "get",
        params:data,
    });
}
//获取提现记录
export function cashRecord(data) {
    return request({
        url: "/api/user/cashRecord",
        method: "get",
        params:data,
    });
}
//获取银行列表
export function bankList(data) {
    return request({
        url: "/api/bank/list",
        method: "get",
        params:data,
    });
}
//获取用户余额提现初始化信息
export function balanceCashInfo(data) {
    return request({
        url: "/api/cash/balanceCashInfo",
        method: "get",
        params:data,
    });
}
//获取获取提现信息缓存
export function cacheInfo(data) {
    return request({
        url: "/api/cash/cache",
        method: "get",
        params:data,
    });
}
//申请余额提现
export function applyCash(data) {
    return request({
        url: "/api/user/applyCash",
        method: "post",
        data,
    });
}
//获取消费分红统计
export function userFhStat(data) {
    return request({
        url: "/api/user/fhStat",
        method: "get",
        params:data,
    });
}
//获取消费分红列表
export function userFhList(data) {
    return request({
        url: "/api/user/fhList",
        method: "get",
        params:data,
    });
}
//获取积分流水列表
export function scoreRecord(data) {
    return request({
        url: "/api/user/scoreRecord",
        method: "get",
        params:data,
    });
}
//获取佣金流水列表
export function incomeRecord(data) {
    return request({
        url: "/api/user/incomeRecord",
        method: "get",
        params:data,
    });
}
//申请佣金提现
export function incomeCash(data) {
    return request({
        url: "/api/user/incomeCash",
        method: "post",
        data,
    });
}
//用户佣金提现初始化信息
export function incomeCashInfo(data) {
    return request({
        url: "/api/cash/incomeCashInfo",
        method: "get",
        params:data,
    });
}
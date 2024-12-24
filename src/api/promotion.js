

import request from "@/utils/request";

//根据手机号-查询客户名称
export function userInfoByMobile(data) {
    return request({
        url: "/api/agent/userInfoByMobile",
        method: "get",
        params:data,
    });
}


//软件码流水
export function activateRecord(data) {
    return request({
        url: "/api/agent/activateRecord",
        method: "get",
        params:data,
    });
}


//软件码购买列表
export function buyList(data) {
    return request({
        url: "/api/activate/buyList",
        method: "get",
        params:data,
    });
}


//使用软件库存
export function useActivate(data) {
    return request({
        url: "/api/agent/useActivate",
        method: "post",
        data,
    });
}

//下单软件库存
export function activateSetOrder(data) {
    return request({
        url: "/api/activate/setOrder",
        method: "post",
        data,
    });
}


//粉丝统计
export function agentTeamNum(data) {
    return request({
        url: "/api/agent/teamNum",
        method: "get",
        params:data,
    });
}
//我的粉丝
export function agentTeamList(data) {
    return request({
        url: "/api/agent/teamList",
        method: "get",
        params:data,
    });
}

//海报示例轮播图
export function posterBanner(data) {
    return request({
        url: "/api/agent/posterBanner",
        method: "get",
        params:data,
    });
}

//生成专属海报
export function posterQrcode(data) {
    return request({
        url: "/api/agent/posterQrcode",
        method: "get",
        params:data,
    });
}



//生成纯二维码
export function promotionQrcode(data) {
    return request({
        url: "/api/agent/promotionQrcode",
        method: "get",
        params:data,
    });
}


//生成推广链接
export function promotionLink(data) {
    return request({
        url: "/api/agent/promotionLink",
        method: "get",
        params:data,
    });
}


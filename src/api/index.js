import request from "@/utils/request.js";
// 上传附件
export function uploadFile(data) {
    return request({
        url: "/api/com/uploadFile",
        method: "post",
        data,
    });
}
// 上传日志
export function uploadLog(data) {
    return request({
        url: "/api/com/uploadLog",
        method: "post",
        data,
    });
}

// 上报坐标
export function reportLocation(data) {
    return request({
        url: "/api/user/reportLocation",
        method: "post",
        data,
    });
}
// 上报坐标
export function uploadFid(data) {
    return request({
        url: "/api/user/uploadFid",
        method: "post",
        data,
    });
}

// 获取微信sdk
export function getWxJsapiParams(data) {
    return request({
        url: "/api/com/getWxJsapiParams",
        method: "get",
        loading:false,
        params:data,
    });
}

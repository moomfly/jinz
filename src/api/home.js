import request from "@/utils/request.js";

// 获取轮播图
export function bannerList(data) {
    return request({
        url: "/api/banner/list",
        method: "get",
        params:data,
    });
}
// 获取父级分类（不含有子级）
export function homeCateAll(data) {
    return request({
        url: "/api/Merchant/homeCate",
        method: "get",
        params:data,
    });
}
// 获取全部分类（含有子级）
export function homeCateChild(data) {
    return request({
        url: "/api/merchant/cateList",
        method: "get",
        params:data,
    });
}


// 获取文章详情数据
export function articleDetail(data) {
    return request({
        url: "/api/article/detail",
        method: "get",
        params:data,
    });
}


import request from "@/utils/request.js";

// 账号密码登录
export function login(data) {
  return request({
    url: "/api/user/login",
    method: "post",
    data,
    retry: 3,
  });
}
// 微信登录
export function wxlogin(data) {
  return request({
    url: "/api/user/wxLogin",
    method: "post",
    data,
  });
}

// 支付宝登录
export function zfbLogin(data) {
  return request({
    url: "/api/user/zfbLogin",
    method: "post",
    data,
  });
}

// 获取用户信息
export function userInfo() {
  return request({
    url: "/api/user/baseInfo",
    method: "get",
    loading:false,
    data: { roleName: "33", menuIds: [4] },
    // params: { b: 2 },
    retry: 3,
  });
}

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const TabBar = () => import("@/components/TabBar");

export const tabBarRoutes = [
  {
    path: "/",
    // 命名视图 @see: https://v3.router.vuejs.org/zh/guide/essentials/named-views.html#%E5%91%BD%E5%90%8D%E8%A7%86%E5%9B%BE
    components: {
      default: () => import("@/views/home"),
      TabBar,
    },
    meta: {
      title: "首页",
      icon: "wap-home",
    },
  },
  {
    path: "/merchant",
    name:'Merchant',
    components: {
      default: () => import("@/views/merchant"),
      TabBar,
    },
    meta: {
      title: "商家",
      icon: "friends-o",
    },
  },
  {
    path: "/pointsShop",
    components: {
      default: () => import("@/views/pointsShop"),
      TabBar,
    },
    meta: {
      title: "积分商城",
      icon: "points",
    },
  },
  {
    path: "/user",
    components: {
      default: () => import("@/views/user"),
      TabBar,
    },
    meta: {
      title: "我的",
      icon: "user-o",
    },
  },
];

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/404",
    component: () => import("@/views/error/404"),
  },
  {
    path: "/merchantDetail",
    component: () => import("@/views/merchantDetail/index.vue"),
    meta: {
      title: "商家详情",
    },
  },
  {
    path: "/mapNav",
    component: () => import("@/views/merchantDetail/mapNav.vue"),
    meta: {
      title: "商家导航",
    },
  },
  {
    path: "/editUserInfo",
    component: () => import("@/views/user/editUserInfo.vue"),
    meta: {
      title: "会员中心",
    },
  },
  {
    path: "/bindPhone",
    component: () => import("@/views/user/bindPhone.vue"),
    meta: {
      title: "晋展",
    },
  },
  {
    path: "/merchantJoin",
    name:'MerchantJoin',
    component: () => import("@/views/merchantJoin/index.vue"),
    meta: {
      title: "晋展",
      keepAlive:true,// 缓存
    }
  },
  {
    path: "/merchantMap",
    component: () => import("@/views/merchantJoin/merchantMap.vue"),
    meta: {
      title: "晋展",
    },
  },
  {
    path: "/balanceList",
    component: () => import("@/views/wallet/balanceList.vue"),
    meta: {
      title: "晋展",
    },
  },
  {
    path: "/withdrawalBalance",
    component: () => import("@/views/wallet/withdrawalBalance.vue"),
    meta: {
      title: "晋展",
    },
  },
  {
    path: "/dividendList",
    component: () => import("@/views/wallet/dividendList.vue"),
    meta: {
      title: "晋展",
    },
  },
  {
    path: "/pointsList",
    component: () => import("@/views/wallet/pointsList.vue"),
    meta: {
      title: "晋展",
    },
  },
  {
    path: "/incomeList",
    component: () => import("@/views/wallet/incomeList.vue"),
    meta: {
      title: "晋展",
    },
  },
  {
    path: "/withdrawalIncome",
    component: () => import("@/views/wallet/withdrawalIncome.vue"),
    meta: {
      title: "晋展",
    },
  },
  {
    path: "/softwareCore",
    component: () => import("@/views/promotion/softwareCore.vue"),
    meta: {
      title: "晋展",
    },
  },
  {
    path: "/softwareInventory",
    component: () => import("@/views/promotion/softwareInventory.vue"),
    meta: {
      title: "晋展",
    },
  },
  {
    path: "/softwareAdd",
    component: () => import("@/views/promotion/softwareAdd.vue"),
    meta: {
      title: "晋展",
    },
  },
  {
    path: "/fansList",
    component: () => import("@/views/promotion/fansList.vue"),
    meta: {
      title: "晋展",
    },
  },
  {
    path: "/inviteFans",
    component: () => import("@/views/promotion/inviteFans.vue"),
    meta: {
      title: "晋展",
    },
  },
  {
    path: "/aboutAs",
    component: () => import("@/views/user/aboutAs.vue"),
    meta: {
      title: "晋展",
    },
  },
  {
    path: "/aboutBz",
    component: () => import("@/views/user/about/bz.vue"),
    meta: {
      title: "晋展",
    },
  },
  {
    path: "/aboutDispute",
    component: () => import("@/views/user/about/dispute.vue"),
    meta: {
      title: "晋展",
    },
  },
  {
    path: "/aboutMerchant",
    component: () => import("@/views/user/about/merchant.vue"),
    meta: {
      title: "晋展",
    },
  },
  {
    path: "/aboutService",
    component: () => import("@/views/user/about/service.vue"),
    meta: {
      title: "晋展",
    },
  },
  {
    path: "/paymentCode",
    component: () => import("@/views/paymentCode/index.vue"),
    meta: {
      title: "晋展",
    },
  },
  {
    path: "/addPayment",
    component: () => import("@/views/paymentCode/addPayment.vue"),
    meta: {
      title: "晋展",
    },
  },
  {
    path: "/paymentList",
    component: () => import("@/views/paymentCode/paymentList.vue"),
    meta: {
      title: "晋展",
    },
  },
  {
    path: "/buyAgreement",
    component: () => import("@/views/promotion/buyAgreement.vue"),
    meta: {
      title: "晋展",
    },
  },
  {
    path: "/merchantEdit",
    name:'MerchantEdit',
    component: () => import("@/views/merchantJoin/merchantEdit.vue"),
    meta: {
      title: "晋展",
    },
  },
  {
    path: "/articleDetail",
    component: () => import("@/views/home/articleDetail.vue"),
    meta: {
      title: "晋展",
    },
  },
  { path: "*", redirect: "404" },
];

export default new Router({
  mode: "history",
  base: "/web/",
  routes: tabBarRoutes.concat(routes),
});

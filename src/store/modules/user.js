import {login, logout, userInfo} from "@/api/login";
import { setToken, removeToken } from "@/utils/auth";
const user = {
  namespaced: true,
  state: {
    token: "",
    userInfo:  JSON.parse(localStorage.getItem('userInfo')) || null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      setToken(token);
    },
    SET_USERINFO(state, userInfo){
      state.userInfo = userInfo;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      //在其他页面取值的时候 this.$store.state.user.userInfo
    }
  },
  actions: {
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then((res) => {
            setToken(res.data.token)
            resolve(res);
          }).catch((err) => {
            reject(err);
          });
      });
    },
    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit("SET_TOKEN", "");
        commit('SET_USERINFO', '')
        removeToken();
        resolve();
      });
    },
    GetInfo({ commit, state }){
      return new Promise((resolve, reject) => {
        userInfo().then(res=>{
          commit('SET_USERINFO', res.data)
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    }
  },
};

export default user;

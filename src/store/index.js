import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import getters from "./getters";
Vue.use(Vuex);

// https://webpack.js.org/guides/dependency-management/ 中的#requirecontext
const modulesFiles = require.context("./modules", true, /\.js$/);

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // './user.js' => 'user'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const store = new Vuex.Store({
  state: {
    merchantId: null,
  },
  mutations: {
    setMerchantId(state, id) {
      state.merchantId = id;
    },
  },
  actions: {
    updateMerchantId({ commit }, id) {
      commit('setMerchantId', id);
    },
  },
  modules,
  getters,
  plugins: [
    createPersistedState({
      key: "TOKEN",
      storage: window.localStorage,
      reducer: (state) => state.user.token,
    },{
      key: "MerchantId",
      storage: window.localStorage,
      reducer: (state) => state.merchantId,
    }),
  ],
});

export default store;

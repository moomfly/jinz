import installVantPlugin from "./vant";
// import vConsolePlugin from "./vConsole";

const production = process.env.NODE_ENV === "production";

export default {
  install(Vue, option) {
    installVantPlugin(Vue);
    // !production && vConsolePlugin(Vue); // 生产禁用
    // 缓存对象
  },
};

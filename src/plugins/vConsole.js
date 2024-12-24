import VConsole from "vconsole";

const vConsole = new VConsole();
export default (Vue) => {
  Vue.use(vConsole);
};

const path = require("path");

const postcssPxToViewport = require("postcss-px-to-viewport");

module.exports = ({ file }) => {
  const viewportWidth = file.dirname.includes(path.join("node_modules", "vant")) ? 375 : 375; // 设计稿的视口宽度
  return {
    plugins: [
      postcssPxToViewport({
        unitToConvert: "px", // 需要转换的单位，默认为"px"
        viewportWidth,
        // viewportHeight: 1080,// 视窗的高度，对应的是我们设计稿的高度
        propList: ["*"], // 能转化为vw的属性列表
        viewportUnit: "vw", // 希望使用的视口单位
        fontViewportUnit: "vw", // 字体使用的视口单位
        selectorBlackList: ["ignore"], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
        minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
        mediaQuery: false, // 媒体查询里的单位是否需要转换单位
        replace: true, // 是否直接更换属性值，而不添加备用属性
        // exclude: /(\/|\\)(node_modules)(\/|\\)/, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
      }),
    ],
  };
};

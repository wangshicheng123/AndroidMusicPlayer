/*
 * @Author: wangshicheng
 * @Date: 2021-04-04 10:44:20
 * @LastEditTime: 2021-04-18 15:27:57
 * @LastEditors: Please set LastEditors
 * @Description: babel相关配置
 * @FilePath: /MusicProject/babel.config.js
 */
module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        alias: {
          tests: ["./tests/"],
          "@/components": ["./src/components"],
          "@/pages": ["./src/pages"],
          "@/reducers": ["./src/reducers"],
          "@/router": ["./src/router"],
          "@/utils": ["./src/utils"],
          "@/store": ["./src/store"],
          "@/assets": ["./src/assets"],
          "@/api": ["./src/api"],
          "@/config": ["./src/config"],
          "@/interface": ["./src/interface"],
        },
      },
    ],
  ],
};

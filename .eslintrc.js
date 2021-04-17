/*
 * @Author: wangshicheng
 * @Date: 2021-04-17 13:05:52
 * @LastEditTime: 2021-04-17 18:27:55
 * @LastEditors: Please set LastEditors
 * @Description: 项目中的eslint配置和vscode中的eslint配置不同
 * ==> 项目中的配置用于代码的打包构建时进行自动修复或者是语法检查，如果存在问题，停止打包构建流程，并且输出错误位置
 * ==> vscode中的配置只是在编辑器中可以可视化【标红】的看到代码是否存在语法错误或者不规范的的代码格式
 * @FilePath: /MusicProject/.eslintrc.js
 */
module.exports = {
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  // rules: {},
};

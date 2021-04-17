/*
 * @Author: wangshicheng
 * @Date: 2021-04-04 10:44:20
 * @LastEditTime: 2021-04-17 17:16:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/index.js
 */
/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./src/App.tsx";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);

/*
 * @Author: wangshicheng
 * @Date: 2021-04-08 09:24:31
 * @LastEditTime: 2021-04-26 17:16:20
 * @LastEditors: Please set LastEditors
 * @Description: app路由集合
 * @FilePath: /MusicProject/src/router/index.ts
 */

import React from "react";
/* app的导航栈【屏幕切换】，注意和stack的区别 */
import { createNativeStackNavigator } from "react-native-screens/native-stack";
/* APP初始化加载状态控制 */
// import RNBootSplash from 'react-native-bootsplash';
import { useTheme } from "react-native-paper";
import { SafeAreaView, StyleSheet } from "react-native";

/* 页面集合 */
import LaunchScreen from "@/pages/Launch/index";
import IntroductionScreen from "@/pages/Introduction/index";

/* HOME页面底部导航 */
import BottomNavigator from "./BottomNavigator";

/* 导航区展示组件 */
import Notification from "@/components/Notification/index";

const NativeStack = createNativeStackNavigator();

/**
 * @description: APP初次加载的权限相关授权路由
 * @param {*}
 * @return {*}
 */
const AuthStack = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Launch"
    >
      {/* APP初始化 */}
      <NativeStack.Screen name="Launch" component={LaunchScreen} />
      {/* APP介绍展示 */}
      <NativeStack.Screen name="Intro" component={IntroductionScreen} />
      {/* APP正式内容 */}
      <NativeStack.Screen name="App" component={BottomNavigator} />
    </NativeStack.Navigator>
  );
};

const AppNavigator = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={{ backgroundColor: colors.surface, ...styles.container }}
    >
      <Notification />
      <AuthStack />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitleStyle: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: 28,
  },
});

export default AppNavigator;

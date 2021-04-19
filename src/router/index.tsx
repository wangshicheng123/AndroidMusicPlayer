/*
 * @Author: wangshicheng
 * @Date: 2021-04-08 09:24:31
 * @LastEditTime: 2021-04-19 15:55:38
 * @LastEditors: Please set LastEditors
 * @Description: app路由集合
 * @FilePath: /MusicProject/src/router/index.ts
 */

import React from "react";
/* app的导航栈【屏幕切换】，注意和stack的区别 */
import { createNativeStackNavigator } from "react-native-screens/native-stack";
/* app的导航栈 */
import { createStackNavigator } from "@react-navigation/stack";
/* APP初始化加载状态控制 */
// import RNBootSplash from 'react-native-bootsplash';
import { useTheme } from "react-native-paper";
import { SafeAreaView, StyleSheet } from "react-native";
// import {useNavigation} from '@react-navigation/native';

/* 导航集合 */
import BottomNavigator from "./BottomNavigator";
import FindNavigator from "./FindNavigator";
import PlayerNavigator from "./PlayerNavigator";

/* 初始化相关导航页面 */
import LaunchScreen from "@/pages/Launch/index";
import IntroductionScreen from "@/pages/Introduction/index";
import Notification from "@/components/Notification/index";

const Stack = createStackNavigator();
const NativeStack = createNativeStackNavigator();

/**
 * @description: APP内部导航容器
 * @param {*}
 * @return {*}
 */
const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={BottomNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Find"
        component={FindNavigator}
        initialParams={{}}
        // options={{
        //   header: ({navigation}) => (
        //     <Header>
        //   )}
        // }}
      />
      <Stack.Screen
        name="Player"
        component={PlayerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

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
      <NativeStack.Screen name="App" component={AppStack} />
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
});

export default AppNavigator;

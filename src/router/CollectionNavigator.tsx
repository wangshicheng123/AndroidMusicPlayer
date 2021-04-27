/*
 * @Author: your name
 * @Date: 2021-04-27 17:41:13
 * @LastEditTime: 2021-04-27 17:49:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/router/CollectionNavigator.tsx
 */

import React from "react";
import { useTheme } from "react-native-paper";
/* app的导航栈 */
import { createStackNavigator } from "@react-navigation/stack";
/* 页面集合 */
import CollectionScreen from "@/pages/Collection/index";
const Stack = createStackNavigator();

/**
 * @description: APP内部导航容器
 * @param {*}
 * @return {*}
 */
const AppStack = () => {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="CollectionList"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
        safeAreaInsets: { top: 0, bottom: 0 },
      }}
    >
      <Stack.Screen
        name="CollectionList"
        component={CollectionScreen}
        options={() => {
          return {
            headerTitle: "CollectionList",
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

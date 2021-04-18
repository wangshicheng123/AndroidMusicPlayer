/*
 * @Author: wangshicheng
 * @Date: 2021-04-14 21:11:15
 * @LastEditTime: 2021-04-18 23:29:32
 * @LastEditors: Please set LastEditors
 * @Description: 音乐播放页面导航
 * @FilePath: /MusicProject/src/router/PlayerNavigator.ts
 */
import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { useTheme } from "react-native-paper";
import PlayScreen from "@/pages/Player/index";

const QueueScreen = () => {
  return (
    <View>
      <Text>QueueScreen component</Text>
    </View>
  );
};

const NativeStack = createNativeStackNavigator();
const PlayerNavigator = () => {
  const { colors } = useTheme();
  return (
    <NativeStack.Navigator
      initialRouteName="Active"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
        headerTopInsetEnabled: false,
      }}
    >
      <NativeStack.Screen
        name="Active"
        component={PlayScreen}
        options={{ headerShown: false }}
      />
      <NativeStack.Screen name="Queue" component={QueueScreen} />
    </NativeStack.Navigator>
  );
};

export default PlayerNavigator;

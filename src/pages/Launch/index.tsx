/*
 * @Author: wangshicheng
 * @Date: 2021-04-14 21:37:27
 * @LastEditTime: 2021-04-18 23:17:22
 * @LastEditors: Please set LastEditors
 * @Description: APP 初始化页面
 * @FilePath: /MusicProject/src/pages/Launch/index.tsx
 */
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const Launch = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { googleAccessAuthorization } = useSelector((state: any) => state.user);

  /**
   * @description: 判断用户是否已经登陆
   * @param {*}
   * @return {*}
   */
  const isSignedIn = () => {
    if (googleAccessAuthorization) {
      navigation.navigate("App");
    } else {
      navigation.navigate("Intro");
    }
  };

  useEffect(() => {
    isSignedIn();
  });
  return (
    <View style={{ backgroundColor: colors.background, ...styles.container }} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Launch;

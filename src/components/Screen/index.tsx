/*
 * @Author: wangshicheng
 * @Date: 2021-04-15 11:10:08
 * @LastEditTime: 2021-04-17 18:32:23
 * @LastEditors: Please set LastEditors
 * @Description: 自定义手机头部状态样式
 * @FilePath: /MusicProject/src/components/Screen/index.tsx
 */
import React, { ReactNode } from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { useTheme } from "react-native-paper";

interface IProps {
  children: ReactNode;
}

const Screen = (props: IProps) => {
  const { children } = props;
  const { colors, dark } = useTheme();
  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background, ...styles.container }}
    >
      <StatusBar
        barStyle={dark ? "light-content" : "dark-content"}
        backgroundColor={colors.surface}
      />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Screen;

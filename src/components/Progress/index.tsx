/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 17:34:15
 * @LastEditTime: 2021-04-20 11:51:27
 * @LastEditors: Please set LastEditors
 * @Description: 播放进度条
 * @FilePath: /MusicProject/src/components/Progress/index.tsx
 */
import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { ProgressBar } from "react-track-player";

const Progress = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <ProgressBar
        style={styles.bar}
        thumbTintColor={colors.primary}
        // trackTintColor="red"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 40,
    width: "100%",
  },
  bar: {
    height: 30,
    width: "100%",
  },
});

export default Progress;

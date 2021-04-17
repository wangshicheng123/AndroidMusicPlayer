/*
 * @Author: wangshicheng
 * @Date: 2021-04-09 20:15:39
 * @LastEditTime: 2021-04-17 18:32:14
 * @LastEditors: Please set LastEditors
 * @Description: 自定义分割线组件
 * @FilePath: /MusicProject/src/components/CustomDivider/index.tsx
 */

import React from "react";
import { View, StyleSheet } from "react-native";

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    width: "100%",
    backgroundColor: "#49afcd",
    height: StyleSheet.hairlineWidth,
  },
});

export default Divider;

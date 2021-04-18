/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 12:42:52
 * @LastEditTime: 2021-04-18 23:57:59
 * @LastEditors: Please set LastEditors
 * @Description: 默认展示的图片
 * @FilePath: /MusicProject/src/components/DefaultImage/index.tsx
 */

import React from "react";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomIcon from "../CustomIcon/index";

interface StyleProps {
  height: number;
}

interface DefaultImageProps {
  style: StyleProps;
}

const DefaultImage = ({ style }: DefaultImageProps) => {
  return (
    <LinearGradient
      colors={["#C9D6FF", "#E2E2E2"]}
      style={[style, styles.container]}
    >
      <CustomIcon
        name="music-outline"
        color="#ffffff"
        size={style.height < 200 ? style.height - 10 : 100}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DefaultImage;

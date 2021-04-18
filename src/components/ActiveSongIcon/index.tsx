/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 15:33:14
 * @LastEditTime: 2021-04-18 22:32:20
 * @LastEditors: Please set LastEditors
 * @Description: 表示音乐播放状态的图标
 * @FilePath: /MusicProject/src/components/ActiveTrackIcon/index.tsx
 */
import React, { useRef, useEffect } from "react";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import Animations from "@/assets/Animations";
import { IAppState } from "@/reducers/index";

interface ActiveSongIconProps {
  style: any;
}

const ActiveSongIcon = ({ style }: ActiveSongIconProps) => {
  const animatedRef = useRef(null);
  const { colors } = useTheme();
  const playingStatus = useSelector(
    (state: IAppState) => state.song.playingStatus
  );

  useEffect(() => {
    if (playingStatus === "playing") {
      animatedRef?.current?.play();
    } else {
      animatedRef?.current?.pause();
    }
  }, [playingStatus]);

  return (
    <View style={[style, styles.container]}>
      <LottieView
        ref={animatedRef}
        source={Animations.playerAnimation}
        colorFilters={[
          {
            keypath: "Shape",
            color: colors.primary,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ActiveSongIcon;

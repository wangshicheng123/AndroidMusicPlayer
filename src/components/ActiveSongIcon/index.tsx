/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 15:33:14
 * @LastEditTime: 2021-04-21 11:14:38
 * @LastEditors: Please set LastEditors
 * @Description: 表示音乐播放状态的图标
 * @FilePath: /MusicProject/src/components/ActiveTrackIcon/index.tsx
 */
import React, { useRef, useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { useTheme } from "react-native-paper";
import Animations from "@/assets/Animations";
import { IAppState } from "@/reducers/index";

interface ActiveSongIconProps {
  style: any;
}

const ActiveSongIcon = ({ style }: ActiveSongIconProps) => {
  let animatedRef: any = useRef(null);
  const [speed, setSpeed] = useState(0);
  const { colors } = useTheme();
  const playingStatus = useSelector(
    (state: IAppState) => state.song.playingStatus
  );

  console.log("==>playingStatus", playingStatus);

  useEffect(() => {
    if (playingStatus === "playing") {
      animatedRef?.current?.play();
      setSpeed(1);
    } else {
      setSpeed(0);
    }
  }, [playingStatus]);

  return (
    <View style={[style, styles.container]}>
      <LottieView
        ref={animatedRef}
        speed={speed}
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

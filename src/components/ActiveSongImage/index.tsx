/*
 * @Author: your name
 * @Date: 2021-04-18 17:37:59
 * @LastEditTime: 2021-04-20 11:22:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/components/ActiveTrackImage/index.tsx
 */
import React, { useRef, useEffect } from "react";
import LinearGradient from "react-native-linear-gradient";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";
import { ViewStyle, StyleSheet } from "react-native";
import Animations from "@/assets/Animations";
import { IAppState } from "@/reducers/index";

interface ActiveSongImageProps {
  style: ViewStyle;
}

const ActiveSongImage = ({ style }: ActiveSongImageProps) => {
  const animatedRef: any = useRef(null);
  const playingStatus = useSelector(
    (state: IAppState) => state.song.playingStatus
  );

  useEffect(() => {
    if (playingStatus === "playing") {
      animatedRef.current.play();
    } else {
      animatedRef.current.pause();
    }
  }, [playingStatus]);

  return (
    <LinearGradient
      colors={["#8360c3", "#2ebf91"]}
      style={[style, styles.container]}
    >
      <LottieView ref={animatedRef} source={Animations.playerAnimation} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ActiveSongImage;

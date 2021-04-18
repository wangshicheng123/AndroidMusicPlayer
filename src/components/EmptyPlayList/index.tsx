/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 15:19:39
 * @LastEditTime: 2021-04-19 00:00:18
 * @LastEditors: Please set LastEditors
 * @Description: 空白音乐列表填充
 * @FilePath: /MusicProject/src/components/EmptyPlayList/index.tsx
 */
import React from "react";
import { Headline } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import Screen from "../Screen/index";
import Animations from "@/assets/Animations";

const EmptyPlaylist = () => {
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.LottieViewStyle}>
          <LottieView
            source={Animations.emptyPlaylistAnimation}
            autoPlay
            loop
          />
        </View>
        <Headline style={styles.headlineStyle}>Empty playlists</Headline>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 24,
  },
  LottieViewStyle: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    width: "100%",
  },
  headlineStyle: {
    textAlign: "center",
  },
});

export default EmptyPlaylist;

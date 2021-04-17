/*
 * @Author: wangshicheng
 * @Date: 2021-04-11 16:18:17
 * @LastEditTime: 2021-04-17 14:16:55
 * @LastEditors: Please set LastEditors
 * @Description: 歌曲播放页面
 * @FilePath: /MusicProject/src/pages/SongPlaying/index.tsx
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface IProps {}

const SongPlayingDetail = (props: IProps) => {
  console.log(props);
  return (
    <View style={styles.container}>
      <Text>playing music</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default SongPlayingDetail;

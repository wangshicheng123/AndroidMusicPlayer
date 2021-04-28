/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 17:36:56
 * @LastEditTime: 2021-04-28 12:01:23
 * @LastEditors: Please set LastEditors
 * @Description: 播放详情
 * @FilePath: /MusicProject/src/components/ActiveSongDetails/index.tsx
 */
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import FastImage from "react-native-fast-image";
import { Subheading, Text } from "react-native-paper";
import { ISongItem } from "@/interface/index";
import ActiveSongImage from "../ActiveSongImage/index";

interface Props {
  songData: ISongItem;
}

const ActiveSongDetails = (props: Props) => {
  const { songData } = props;
  return (
    <View>
      <View style={styles.centerContainer}>
        {songData.song_cover ? (
          <FastImage
            source={{ uri: songData.song_cover }}
            style={[styles.artCover]}
            resizeMode="contain"
          />
        ) : (
          <ActiveSongImage style={styles.artCover} />
        )}
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.titleStyle} numberOfLines={1}>
          {songData.song_title}
        </Text>
        <Subheading numberOfLines={1}>{songData.song_artist}</Subheading>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  artCover: {
    borderRadius: 12,
    elevation: 4,
    height: Dimensions.get("window").width - 80,
    maxHeight: 300,
    maxWidth: 300,
    width: Dimensions.get("window").width - 50,
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginVertical: 8,
  },
  titleStyle: {
    fontFamily: "Nunito-Bold",
    fontSize: 20,
  },
});

export default ActiveSongDetails;

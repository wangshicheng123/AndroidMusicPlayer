/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 17:36:56
 * @LastEditTime: 2021-04-18 23:58:51
 * @LastEditors: Please set LastEditors
 * @Description: 播放详情
 * @FilePath: /MusicProject/src/components/ActiveTrackDetails/index.tsx
 */
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import FastImage from "react-native-fast-image";
import { Subheading, Text, Title } from "react-native-paper";
import { ISongItem } from "@/interface/index";
import ActiveTrackImage from "../ActiveTrackImage/index";

interface Props {
  track: ISongItem;
}

const ActiveTrackDetails = ({ track }: Props) => {
  return (
    <View>
      <View style={styles.centerContainer}>
        {track.cover ? (
          <FastImage
            source={{ uri: track.cover }}
            style={[styles.artCover]}
            resizeMode="contain"
          />
        ) : (
          <ActiveTrackImage style={styles.artCover} />
        )}
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.titleStyle} numberOfLines={1}>
          {track.title}
        </Text>
        <Subheading numberOfLines={1}>
          {track.artist ? track.artist : track.album}
        </Subheading>
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

export default ActiveTrackDetails;

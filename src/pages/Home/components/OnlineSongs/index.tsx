/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 12:12:28
 * @LastEditTime: 2021-04-27 16:22:49
 * @LastEditors: Please set LastEditors
 * @Description: 在线歌单
 * @FilePath: /MusicProject/src/pages/Home/components/OnlineSongs/index.tsx
 */

import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useNetInfo } from "@react-native-community/netinfo";
import HorizontalScrollView from "@/components/HorizontalScrollView/index";
import Headline from "@/components/HeadLine/index";
import { ICollectionListItem } from "@/interface/index";
import { IAppState } from "@/reducers/index";
import { getSongByCollection } from "@/api/index";

const OnlineSongsContainer = () => {
  const netInfo = useNetInfo(); // 当前网络状态信息
  const navigation = useNavigation();
  const systemCollections = useSelector(
    (state: IAppState) => state.collectionList.systemCollections
  );

  if (!netInfo.isConnected) {
    return null;
  }

  /**
   * @description: 导航至歌单列表页面
   * @param {any} playlist
   * @return {*}
   */
  const handleNavigateToPlaylist = (playlist: ICollectionListItem) => {
    navigation.navigate("Playlist", {
      playlistMetadata: playlist,
      requestApi: getSongByCollection,
    });
  };
  return (
    <View>
      <View style={styles.container}>
        <Headline>Online Songs</Headline>
      </View>
      <HorizontalScrollView
        playLists={systemCollections}
        handleNavigateToPlaylist={handleNavigateToPlaylist}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
});

export default OnlineSongsContainer;

/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 12:12:28
 * @LastEditTime: 2021-04-26 22:33:16
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
import { IPlayListItem } from "@/interface/index";
import { IAppState } from "@/reducers/index";

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
  const handleNavigateToPlaylist = (playlist: IPlayListItem) => {
    const playlistMetadata = {
      id: "online-playlist--000002",
      name: playlist.title,
      owner: "Serenity",
      cover: playlist.cover,
    };
    navigation.navigate("Playlist", {
      playlistMetadata: playlistMetadata,
      songs: playlist.children,
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

/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 12:09:11
 * @LastEditTime: 2021-04-27 16:24:22
 * @LastEditors: Please set LastEditors
 * @Description: 快捷操作
 * @FilePath: /MusicProject/src/pages/Home/components/ShortcutContainer/index.tsx
 */

import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { Avatar, Caption } from "react-native-paper";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { IAppState } from "@/reducers/index";
import { getMostPlaySongs, getFavSongByUser } from "@/api/index";
import { ICollectionListItem } from "@/interface/index";

const ShortCutContainer = () => {
  const navigation = useNavigation();
  const { historyQueue, likingSongQueue } = useSelector(
    (state: IAppState) => state.queue
  );

  const navigateToHistory = React.useMemo(
    () => () => {
      const playlistMetadata: ICollectionListItem = {
        id: -3,
        collection_id: -3,
        collection_name: "Recently Played Songs",
        user_id: "1",
        user_name: "System",
        collection_cover: "",
        collection_like_count: 0,
        songs: [],
      };
      navigation.navigate("Playlist", {
        playlistMetadata: playlistMetadata,
        songs: historyQueue,
      });
    },
    [navigation, historyQueue]
  );

  const navigateToFavorite = React.useMemo(
    () => () => {
      const playlistMetadata: ICollectionListItem = {
        id: -1,
        collection_id: -1,
        collection_name: "Liked Songs",
        user_id: "1",
        user_name: "System",
        collection_cover: "",
        collection_like_count: 0,
        songs: [],
      };
      navigation.navigate("Playlist", {
        playlistMetadata: playlistMetadata,
        requestApi: getFavSongByUser,
      });
    },
    [navigation, likingSongQueue]
  );

  const navigateToMostPlayed = React.useMemo(
    () => () => {
      const playlistMetadata: ICollectionListItem = {
        id: -2,
        collection_id: -2,
        collection_name: "Most Played Songs",
        user_id: "1",
        user_name: "System",
        collection_cover: "",
        collection_like_count: 0,
        songs: [],
      };
      navigation.navigate("Playlist", {
        playlistMetadata: playlistMetadata,
        requestApi: getMostPlaySongs,
      });
    },
    [navigation]
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.shortcutBtnStyle}
        onPress={navigateToHistory}
      >
        <Avatar.Icon
          icon="bar-chart-outline"
          color="#46b3e6"
          style={{ backgroundColor: "#46b3e650" }}
        />
        <Caption>History</Caption>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.shortcutBtnStyle}
        onPress={navigateToFavorite}
      >
        <Avatar.Icon
          icon="heart-outline"
          color="#c70d3a"
          style={{ backgroundColor: "#c70d3a50" }}
        />
        <Caption>Favorite</Caption>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.shortcutBtnStyle}
        onPress={navigateToMostPlayed}
      >
        <Avatar.Icon
          icon="trending-up-outline"
          color="#4a47a3"
          style={{ backgroundColor: "#4a47a350" }}
        />
        <Caption>Most Played</Caption>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 16,
  },
  shortcutBtnStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ShortCutContainer;

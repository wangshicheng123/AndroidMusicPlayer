/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 12:09:11
 * @LastEditTime: 2021-04-18 12:27:54
 * @LastEditors: Please set LastEditors
 * @Description: 快捷操作
 * @FilePath: /MusicProject/src/pages/Home/components/ShortcutContainer/index.tsx
 */

import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar, Caption } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";

// import { getPlayedSongs, getFavoriteSongs } from '../actions/realmAction';
// import { startRadio } from '../actions/playerState';
// import { mostPlayedSongs } from '../actions/mediaStore';

const ShortCutContainer = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const mostPlayed = () => {
  //   return mostPlayedSongs(getPlayedSongs());
  // };

  const navigateToHistory = React.useMemo(
    () => () => {
      const playlist = {
        id: "user-playlist--000001",
        name: "Recently Played Songs",
        owner: "Serenity",
      };
      navigation.navigate("Playlist", {
        playlist,
        // songs: getPlayedSongs(),
        songs: [],
      });
    },
    [navigation]
  );

  const navigateToFavorite = React.useMemo(
    () => () => {
      const playlist = {
        id: "user-playlist--000002",
        name: "Liked Songs",
        owner: "Serenity",
      };
      navigation.navigate("Playlist", {
        playlist,
        // songs: getFavoriteSongs(),
        songs: [],
      });
    },
    [navigation]
  );

  const navigateToMostPlayed = React.useMemo(
    () => () => {
      const playlist = {
        id: "user-playlist--000002",
        name: "Most Played Songs",
        owner: "Serenity",
      };
      navigation.navigate("Playlist", {
        playlist,
        // songs: mostPlayed(),
        songs: [],
      });
    },
    [navigation]
  );

  // const startSongs = () => {
  // dispatch(startRadio());
  // };

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
      {/* <TouchableOpacity
        style={{ justifyContent: "center", alignItems: "center" }}
        onPress={startSongs}
      >
        <Avatar.Icon
          icon="radio-outline"
          color="#0c9463"
          style={{ backgroundColor: "#0c946350" }}
        />
        <Caption>Radio</Caption>
      </TouchableOpacity> */}
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

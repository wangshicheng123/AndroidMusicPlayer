/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 15:17:59
 * @LastEditTime: 2021-04-19 18:42:38
 * @LastEditors: Please set LastEditors
 * @Description: 音乐播放列表页面
 * @FilePath: /MusicProject/src/pages/SongPlayList/index.tsx
 */
import React, { useState } from "react";
import { Title, Button, Divider, Subheading } from "react-native-paper";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { useDispatch } from "react-redux";
import isEmpty from "lodash/isEmpty";
import values from "lodash/values";
import FastImage from "react-native-fast-image";
// import { addToQueue } from '../../actions/playerState';
import SongContainer from "@/components/SongContainer/index";
import DefaultImage from "@/components/DefaultImage";
import Screen from "@/components/Screen";
import EmptyPlaylist from "@/components/EmptyPlayList/index";

import { IPlayListItem } from "@/interface/index";

const SongsList = ({ route }) => {
  console.log(route);
  const { playlist, songs } = route.params;
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const addSongToQueue = () => {
    // dispatch(addToQueue(values(songs)));
  };

  const onRefresh = () => {
    setRefreshing(false);
  };

  return (
    <Screen>
      {isEmpty(songs) ? (
        <EmptyPlaylist />
      ) : (
        <FlatList
          ListHeaderComponent={() => (
            <View style={{ margin: 12 }}>
              <View style={styles.coverContainer}>
                {playlist.cover ? (
                  <FastImage
                    source={{ uri: playlist.cover }}
                    style={styles.artCover}
                  />
                ) : (
                  <DefaultImage style={styles.artCover} />
                )}
              </View>
              <View style={styles.titleContainer}>
                <Title>{playlist.name}</Title>
                <Subheading>{`by ${playlist.owner}`}</Subheading>
              </View>
              <View style={styles.buttonContainer}>
                <Button mode="contained" onPress={addSongToQueue}>
                  Play All
                </Button>
              </View>
            </View>
          )}
          data={songs}
          renderItem={({ item }: { item: IPlayListItem }) => (
            <SongContainer songData={item} />
          )}
          ItemSeparatorComponent={() => <Divider inset />}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={() => <View style={{ height: 100 }} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coverContainer: {
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  artCover: { width: 200, height: 200, elevation: 4, borderRadius: 12 },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
});

export default SongsList;

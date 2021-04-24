/*
 * @Author: wangshicheng
 * @Date: 2021-04-22 18:30:50
 * @LastEditTime: 2021-04-24 10:14:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/components/SwipeList/index.tsx
 */
import React, { useState } from "react";
import { Surface, IconButton, Divider } from "react-native-paper";
import { View, StyleSheet, RefreshControl } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

import SongContainer from "../SongContainer/index";
import ListSongHeader from "../ListSongHeader/index";
import { ISongItem } from "@/interface/index";

interface IProps {
  title: string;
  cover: string;
  songDatas: ISongItem[];
  fetchData: () => void;
  showModal: (songData: ISongItem) => void;
  addToQueue: (songs: ISongItem[]) => void;
}

const SwipeList = (props: IProps) => {
  const { title, cover, addToQueue, songDatas, showModal, fetchData } = props;
  const [refreshing, setRefreshing] = useState(false);

  /**
   * @description: 刷新数据
   * @param {*} async
   * @return {*}
   */
  const refreshData = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <SwipeListView
      data={songDatas}
      ListHeaderComponent={() => (
        <ListSongHeader
          title={title}
          cover={cover}
          addSongsToQueue={() => addToQueue(songDatas)}
        />
      )}
      ListFooterComponent={() => <View style={styles.listFooterStyle} />}
      ItemSeparatorComponent={() => <Divider inset />}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }: { item: ISongItem }) => (
        <SongContainer songData={item} />
      )}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refreshData}
          colors={["#12c2e9", "#c471ed", "#f64f59"]}
        />
      }
      renderHiddenItem={({ item }) => (
        <Surface style={styles.rowBack}>
          {/* 当前歌曲添加到播放队列中 */}
          <IconButton icon="playlist-play" onPress={() => addToQueue([item])} />
          {/* 添加歌曲到指定歌集中 */}
          <IconButton icon="playlist-plus" onPress={() => showModal(item)} />
        </Surface>
      )}
      leftOpenValue={75}
      rightOpenValue={-75}
    />
  );
};

const styles = StyleSheet.create({
  rowBack: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
  },
  listFooterStyle: {
    height: 100,
  },
});

export default SwipeList;

/*
 * @Author: wangshicheng
 * @Date: 2021-04-22 18:30:50
 * @LastEditTime: 2021-04-29 10:58:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/components/SwipeList/index.tsx
 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Surface, IconButton, Divider } from "react-native-paper";
import { View, StyleSheet, RefreshControl } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import EmptyPlaylist from "@/components/EmptyPlayList/index";

import SongContainer from "../SongContainer/index";
import ListSongHeader from "../ListSongHeader/index";
import { ISongItem } from "@/interface/index";
import { IAppState } from "@/reducers/index";
import { fetchSearchDataById } from "@/reducers/searchSlice";

interface IProps {
  genreInfo: {
    title: string;
    cover: string;
    id: number;
  };

  showModal: (songData: ISongItem) => void;
  addToQueue: (songs: ISongItem[]) => void;
}

const SwipeList = (props: IProps) => {
  const {
    genreInfo: { title, cover, id },
    addToQueue,
    showModal,
  } = props;
  const dispatch = useDispatch();
  const { songDatas, loading } = useSelector(
    (state: IAppState) => state.search
  );
  const [page, setPage] = useState<number>(0);

  /**
   * @description: 刷新数据
   * @param {*}
   * @return {*}
   */
  const refreshData = () => {
    dispatch(
      fetchSearchDataById({
        collectionId: id,
        pageNumber: page,
      })
    );
    setPage((previous: number) => {
      return previous + 1;
    });
  };

  if (!songDatas.length) {
    return <EmptyPlaylist />;
  }

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
          refreshing={loading}
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

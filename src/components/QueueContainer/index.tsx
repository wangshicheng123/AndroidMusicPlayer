/*
 * @Author: wangshicheng
 * @Date: 2021-04-22 09:17:48
 * @LastEditTime: 2021-04-22 14:15:08
 * @LastEditors: Please set LastEditors
 * @Description: 歌曲队列容器组件
 * @FilePath: /MusicProject/src/components/QueueContainer/index.tsx
 */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SwipeListView } from "react-native-swipe-list-view";
import { Surface, Title, IconButton, Divider } from "react-native-paper";
import { View, StyleSheet } from "react-native";

import { FavContainer } from "../FavContainer/index";
import SongContainer from "../SongContainer/index";
import { removeSongFromPlayingQueue } from "@/reducers/queueSlice";
import { ISongItem } from "@/interface/index";
import { IAppState } from "@/reducers/index";

const QueueContainer = () => {
  const dispatch = useDispatch();
  const { playingQueue } = useSelector((state: IAppState) => state.queue);

  /**
   * @description: 删除播放队列中指定的歌曲
   * @param {ISongItem} songData
   * @return {*}
   */
  const removeSongFromQueue = (songData: ISongItem) => {
    dispatch(removeSongFromPlayingQueue(songData));
  };

  if (!playingQueue.length) {
    return (
      <View style={styles.container}>
        <Title>No Songs in the queue</Title>
      </View>
    );
  }
  return (
    <View>
      <SwipeListView
        data={playingQueue}
        renderItem={({ item }: { item: ISongItem }) => (
          <SongContainer songData={item} />
        )}
        ItemSeparatorComponent={() => <Divider inset />}
        keyExtractor={(item, index) => index.toString()}
        renderHiddenItem={({ item }) => (
          <Surface style={styles.rowBack}>
            <IconButton
              icon="trash-outline"
              color="#dd1818"
              onPress={() => removeSongFromQueue(item)}
            />
            <FavContainer likeType="song" favData={item} />
          </Surface>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
        closeOnRowPress
        closeOnRowOpen
        useNativeDriver
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  rowBack: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default QueueContainer;

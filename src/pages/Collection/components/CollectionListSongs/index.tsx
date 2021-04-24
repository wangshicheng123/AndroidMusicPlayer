/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 15:17:59
 * @LastEditTime: 2021-04-24 19:07:27
 * @LastEditors: Please set LastEditors
 * @Description: 音乐播放列表页面
 * @FilePath: /MusicProject/src/pages/SongPlayList/index.tsx
 */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FastImage from "react-native-fast-image";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { Title, Button, Divider, Subheading } from "react-native-paper";

import isEmpty from "lodash/isEmpty";
import SongContainer from "@/components/SongContainer/index";
import DefaultImage from "@/components/DefaultImage";
import Screen from "@/components/Screen";
import EmptyPlaylist from "@/components/EmptyPlayList/index";
import { IPlayListItem } from "@/interface/index";
import { addToPlayingQueue, excutePlayingQueue } from "@/reducers/queueSlice";

interface IProps {
  route: any;
}

const CollectionListSongs = (props: IProps) => {
  const dispatch = useDispatch();
  const { route } = props;
  const { collecetionListMetadata, songs } = route.params;
  const [refreshing, setRefreshing] = useState(false);

  /**
   * @description: 播放所有歌曲，添加到播放队列
   * @param {*}
   * @return {*}
   */
  const handlePlayAll = () => {
    /* 添加歌单到播放任务队列 */
    dispatch(addToPlayingQueue(songs));
    /* 执行当前任务队列中的第一首歌 */
    dispatch(excutePlayingQueue());
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
                {collecetionListMetadata.cover ? (
                  <FastImage
                    source={{ uri: collecetionListMetadata.cover }}
                    style={styles.artCover}
                  />
                ) : (
                  <DefaultImage style={styles.artCover} />
                )}
              </View>
              <View style={styles.titleContainer}>
                <Title>{collecetionListMetadata.name}</Title>
                <Subheading>{`by ${collecetionListMetadata.owner}`}</Subheading>
              </View>
              <View style={styles.buttonContainer}>
                <Button mode="contained" onPress={handlePlayAll}>
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

export default CollectionListSongs;

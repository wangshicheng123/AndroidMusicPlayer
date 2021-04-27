/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 15:17:59
 * @LastEditTime: 2021-04-27 16:23:22
 * @LastEditors: Please set LastEditors
 * @Description: 音乐播放列表页面
 * @FilePath: /MusicProject/src/pages/SongPlayList/index.tsx
 */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FastImage from "react-native-fast-image";
import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import { Title, Button, Divider, Subheading } from "react-native-paper";

import isEmpty from "lodash/isEmpty";
import SongContainer from "@/components/SongContainer/index";
import DefaultImage from "@/components/DefaultImage";
import Screen from "@/components/Screen";
import EmptyPlaylist from "@/components/EmptyPlayList/index";
import { ICollectionListItem, ISongItem } from "@/interface/index";
import { addToPlayingQueue, excutePlayingQueue } from "@/reducers/queueSlice";
import { request, IRequest } from "@/utils/fetch";

interface IProps {
  route: any;
}

const SongsList = (props: IProps) => {
  const [songDatas, setSongDatas] = useState<ISongItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const { route } = props;
  const {
    playlistMetadata,
    requestApi,
  }: {
    playlistMetadata: ICollectionListItem;
    requestApi: IRequest;
  } = route.params;

  /**
   * @description: 请求歌曲列表数据
   * @param {*}
   * @return {*}
   */
  const requestSongs = (params: { pageNumber: number }) => {
    const { pageNumber = 0 } = params;
    return request(requestApi, {
      pageNumber: pageNumber,
      collectionId: playlistMetadata.collection_id || -1,
    });
  };

  useEffect(() => {
    setSongDatas([]);
    requestSongs({ pageNumber: 0 })
      ?.then((songRes: { msg: string; data: ISongItem[] }) => {
        const { data } = songRes;
        console.log("songRes", songRes);
        setSongDatas((previous: ISongItem[]) => {
          return [...previous, ...data];
        });
      })
      ?.catch((error) => {
        console.log(error);
      });
  }, [playlistMetadata]);

  /**
   * @description: 播放所有歌曲，添加到播放队列
   * @param {*}
   * @return {*}
   */
  const handlePlayAll = () => {
    /* 添加歌单到播放任务队列 */
    dispatch(addToPlayingQueue(songDatas));
    /* 执行当前任务队列中的第一首歌 */
    dispatch(excutePlayingQueue());
  };

  const onRefresh = () => {
    setRefreshing(false);
  };

  return (
    <Screen>
      {isEmpty(songDatas) ? (
        <EmptyPlaylist />
      ) : (
        <FlatList
          ListHeaderComponent={() => (
            <View style={{ margin: 12 }}>
              <View style={styles.coverContainer}>
                {playlistMetadata.collection_cover ? (
                  <FastImage
                    source={{ uri: playlistMetadata.collection_cover }}
                    style={styles.artCover}
                  />
                ) : (
                  <DefaultImage style={styles.artCover} />
                )}
              </View>
              <View style={styles.titleContainer}>
                <Title>{playlistMetadata.collection_name}</Title>
                <Subheading>{`by ${playlistMetadata.user_name}`}</Subheading>
              </View>
              <View style={styles.buttonContainer}>
                <Button mode="contained" onPress={handlePlayAll}>
                  Play All
                </Button>
              </View>
            </View>
          )}
          data={songDatas}
          renderItem={({ item }: { item: ISongItem }) => (
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

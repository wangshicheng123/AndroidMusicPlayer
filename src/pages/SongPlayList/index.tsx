/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 15:17:59
 * @LastEditTime: 2021-04-29 18:07:59
 * @LastEditors: Please set LastEditors
 * @Description: 音乐播放列表页面
 * @FilePath: /MusicProject/src/pages/SongPlayList/index.tsx
 */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { IAppState } from "@/reducers/index";

interface IProps {
  route: any;
}

const SongsList = (props: IProps) => {
  const { route } = props;
  const {
    playlistMetadata,
    requestApi,
  }: {
    playlistMetadata: ICollectionListItem;
    requestApi: IRequest;
  } = route.params;
  const [page, setPage] = useState<number>(0);
  const [songDatas, setSongDatas] = useState<ISongItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { id: userId } = useSelector((state: IAppState) => state.user.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    setSongDatas([]);
    requestSongDatas({ pageNumber: 0 });
  }, [playlistMetadata]);

  /**
   * @description: 请求歌曲列表数据
   * @param {*}
   * @return {*}
   */
  const requestSongDatas = async (params: { pageNumber: number }) => {
    const { pageNumber = 0 } = params;
    await request(requestApi, {
      pageNumber: pageNumber,
      collectionId: playlistMetadata.collection_id || -1,
      user_id: userId,
    })
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
  };

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

  const onRefresh = async () => {
    setRefreshing(true);
    await requestSongDatas({ pageNumber: page + 1 });
    setRefreshing(false);
    setPage((previous) => {
      return previous + 1;
    });
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

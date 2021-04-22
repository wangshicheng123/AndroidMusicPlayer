/*
 * @Author: your name
 * @Date: 2021-04-18 17:49:05
 * @LastEditTime: 2021-04-22 10:47:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/pages/Queue/index.tsx
 */

import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Chip } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import AlertDialog from "@/components/AlertDialog/index";
import Screen from "@/components/Screen/index";
import Title from "@/components/Title/index";
import Song from "@/components/Song/index";
import QueueContainer from "@/components/QueueContainer/index";
import { IAppState } from "@/reducers/index";
import { clearPlayingQueue } from "@/reducers/queueSlice";

const QueueScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [dialogVisible, setDialogVisible] = useState(false);
  const { playingStatus, currentSong } = useSelector(
    (state: IAppState) => state.song
  );

  /**
   * @description: 关闭歌曲队列页面，跳转到播放列表页面
   * @param {*}
   * @return {*}
   */
  const closQueueScreen = () => {
    navigation.navigate("Home");
  };

  /**
   * @description: 打开歌曲播放队列页面
   * @param {*}
   * @return {*}
   */
  const handleOpenAlert = () => {
    setDialogVisible(true);
  };

  /**
   * @description: 清除歌曲队列中的歌曲数据
   * @param {*}
   * @return {*}
   */
  const clearQueueSongs = () => {
    dispatch(clearPlayingQueue());
    closQueueScreen();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Chip icon="trash-outline" mode="outlined" onPress={handleOpenAlert}>
          Clear Queue
        </Chip>
      ),
    });
  }, [navigation]);

  return (
    <Screen>
      <AlertDialog
        visible={dialogVisible}
        hideDialog={() => setDialogVisible(false)}
        action={clearQueueSongs}
        title="Clear Queue"
        message="Clear queue would redirect playingList page"
      />
      <Title style={styles.titleStyle}>Now Playing</Title>
      <Song
        songData={currentSong}
        handelSongPlay={() => navigation.goBack()} // 点击当前播放歌曲，直接返回播放页面即可
        active={playingStatus === "playing"}
      />
      <Title style={styles.titleStyle}>Next in Queue</Title>
      <QueueContainer />
      <View style={styles.paddingBox} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    margin: 8,
  },
  paddingBox: {
    height: 100,
  },
});

export default QueueScreen;

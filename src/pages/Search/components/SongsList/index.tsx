/*
 * @Author: your name
 * @Date: 2021-04-22 17:43:59
 * @LastEditTime: 2021-04-28 10:08:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/pages/Search/components/SongsList/index.tsx
 */
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import PlaylistDialog from "@/components/PlaylistDialog/index";
import SwipeList from "@/components/SwipeList/index";
import { ISongItem } from "@/interface/index";

interface IProps {
  songDatas: ISongItem[];
  title: string;
  cover: string;
  addToCollectionList: (song: ISongItem, playlistId?: number) => void;
  addToQueue: (songs: ISongItem[]) => void;
  fetchData(): void;
}

const SongList = (props: IProps) => {
  const {
    songDatas,
    title,
    cover,
    addToQueue,
    addToCollectionList,
    fetchData,
  } = props;
  const [visible, setVisibility] = useState(false);
  const [song, setSong] = useState<ISongItem>({});

  /**
   * @description: 展示modal
   * @param {ISongItem} songData
   * @return {*}
   */
  const showModal = (songData: ISongItem) => {
    setVisibility(true);
    setSong(songData);
  };

  /**
   * @description: 隐藏modal
   * @param {*}
   * @return {*}
   */
  const hideModal = () => {
    setVisibility(false);
  };

  /**
   * @description: 添加歌曲到指定歌单
   * @param {string} playlistId
   * @return {*}
   */
  const addSongToCollectionList = (playlistId?: number) => {
    addToCollectionList(song, playlistId);
    hideModal();
  };

  return (
    <View style={styles.container}>
      <PlaylistDialog
        visible={visible}
        hideModal={hideModal}
        addSongToCollectionList={addSongToCollectionList}
      />
      <SwipeList
        songDatas={songDatas}
        title={title}
        cover={cover}
        addToQueue={addToQueue}
        fetchData={fetchData}
        showModal={showModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SongList;

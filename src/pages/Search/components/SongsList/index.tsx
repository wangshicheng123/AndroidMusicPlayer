/*
 * @Author: your name
 * @Date: 2021-04-22 17:43:59
 * @LastEditTime: 2021-04-24 10:22:00
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
  addToPlaylist: (playlistId: string, song: ISongItem) => void;
  addToQueue: (songs: ISongItem[]) => void;
  fetchData(): void;
}

const SongList = (props: IProps) => {
  const {
    songDatas,
    title,
    cover,
    addToQueue,
    addToPlaylist,
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
  const addSongToPlaylist = (playlistId: string) => {
    addToPlaylist(playlistId, song);
    hideModal();
  };

  return (
    <View style={styles.container}>
      <PlaylistDialog
        visible={visible}
        hideModal={hideModal}
        addToPlaylist={addSongToPlaylist}
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

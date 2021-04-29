/*
 * @Author: your name
 * @Date: 2021-04-22 17:43:59
 * @LastEditTime: 2021-04-29 12:43:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/pages/Search/components/SongsList/index.tsx
 */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, StyleSheet } from "react-native";
import PlaylistDialog from "@/components/PlaylistDialog/index";
import SwipeList from "@/components/SwipeList/index";
import { ISongItem } from "@/interface/index";
import { request } from "@/utils/fetch";
import { addSongToCollection } from "@/api/index";
import { addToPlayingQueue } from "@/reducers/queueSlice";

interface IProps {
  genreInfo: {
    title: string;
    cover: string;
    id: number;
  };
}

const SongList = (props: IProps) => {
  const { genreInfo } = props;
  const dispatch = useDispatch();
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
   * @description: 添加歌曲到播放队列
   * @param {ISongItem} songs
   * @return {*}
   */
  const addSongsToQueue = (songs: ISongItem[]) => {
    console.log("songs", songs);
    // dispatch(addToPlayingQueue(songs));
  };

  /**
   * @description: 添加歌曲到指定歌单
   * @param {string} playlistId
   * @return {*}
   */
  const addSongToCollectionList = async (collectionId?: number) => {
    const { song_id } = song;
    await request(addSongToCollection, {
      collection_id: collectionId,
      song_id: song_id,
    });
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
        genreInfo={genreInfo}
        addToQueue={addSongsToQueue}
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

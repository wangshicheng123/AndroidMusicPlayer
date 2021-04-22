/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 15:31:48
 * @LastEditTime: 2021-04-22 10:04:46
 * @LastEditors: Please set LastEditors
 * @Description: 歌曲列表中的item
 * @FilePath: /MusicProject/src/components/SongContainer/index.tsx
 */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import isEqual from "lodash/isEqual";

import Song from "@/components/Song/index";
import { IPlayListItem, ISongItem } from "@/interface/index";
import { IAppState } from "@/reducers/index";
import { cacheLoadSong, downloadSong } from "@/reducers/songSlice";

interface IProps {
  songData: IPlayListItem | ISongItem;
  goBack?: () => void;
}

const SongContainer = ({ songData, goBack }: IProps) => {
  /* 记录【当前】此歌曲的播放状态 */
  const [isActive, setActive] = useState(false);
  const dispatch = useDispatch();

  /* 当前正在播放的歌曲 */
  const { currentSong } = useSelector((state: IAppState) => state.song);

  useEffect(() => {
    /* 点击的歌曲是否是当前正在播放的歌曲 */
    if (currentSong.id && songData.id) {
      setActive(isEqual(currentSong.id, songData.id));
    }
  }, [currentSong, songData]);

  const handleCheckLibraryAccessAthorization = () => {};
  /**
   * @description: 处理歌曲下载
   * @param {*}
   * @return {*}
   */
  const handleSongDownload = () => {
    // 点击下载之前需要校验下载权限
    handleCheckLibraryAccessAthorization();
    dispatch(downloadSong({ songData: songData }));
  };

  /**
   * @description: 处理歌曲播放操作
   * @param {*}
   * @return {*}
   */
  const handelSongPlay = () => {
    if (isActive) return;
    dispatch(cacheLoadSong({ songData: songData }));
    if (goBack) {
      goBack();
    }
  };

  return (
    <Song
      songData={songData}
      handelSongPlay={handelSongPlay}
      active={isActive}
      handleSongDownload={handleSongDownload}
    />
  );
};

export default SongContainer;

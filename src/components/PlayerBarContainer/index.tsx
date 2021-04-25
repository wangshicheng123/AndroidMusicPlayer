/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 17:09:32
 * @LastEditTime: 2021-04-25 10:29:42
 * @LastEditors: Please set LastEditors
 * @Description: 音乐播放条外部容器组件
 * @FilePath: /MusicProject/src/components/PlayerBarContainer/index.tsx
 */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { IAppState } from "@/reducers/index";
import PlayerBar from "@/components/PlayerBar/index";
import {
  play,
  pause,
  initializeTrackPlayer,
  destroyTrackPlayer,
  cacheLoadSong,
} from "@/reducers/songSlice";

const PlayerBarContainer = () => {
  const navigation = useNavigation();
  const { currentSong = {}, playingStatus } = useSelector(
    (state: IAppState) => state.song
  );
  const dispatch = useDispatch();

  useEffect(() => {
    /* 初始化播放条 */
    dispatch(initializeTrackPlayer());
    if (currentSong.id) {
      /* 歌曲预加载【不播放】*/
      dispatch(cacheLoadSong({ playingOnLoad: false, songData: currentSong }));
    }
    return () => {
      dispatch(destroyTrackPlayer());
    };
  }, []);

  /**
   * @description: 处理播放/暂停的切换事件
   * @param {*}
   * @return {*}
   */
  const handelTogglePlayStatus = () => {
    if (playingStatus === "playing") {
      dispatch(pause());
    } else {
      dispatch(play());
    }
  };

  /**
   * @description: 导航至播放详情页面
   * @param {*}
   * @return {*}
   */
  const navigateToPlayer = React.useMemo(
    () => () =>
      // navigation.navigate("Player", {
      //   screen: "Active",
      //   params: { songData: currentSong },
      // }),
      navigation.navigate("Active", {
        songData: currentSong,
      }),
    [navigation, currentSong]
  );

  if (!currentSong.id) {
    return null;
  }
  return (
    <PlayerBar
      songData={currentSong}
      playingStatus={playingStatus}
      handelTogglePlayStatus={handelTogglePlayStatus}
      navigateToPlayer={navigateToPlayer}
    />
  );
};

export default PlayerBarContainer;

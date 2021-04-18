/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 17:09:32
 * @LastEditTime: 2021-04-18 23:40:18
 * @LastEditors: Please set LastEditors
 * @Description: 音乐播放条外部容器组件
 * @FilePath: /MusicProject/src/components/PlayerBarContainer/index.tsx
 */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/core";

// import {
//   playTrack,
//   pauseTrack,
//   loadTrack,
//   destroyTrackPlayer,
//   setUpTrackPlayer,
// } from '../actions/playerState';
import PlayerBar from "@/components/PlayerBar/index";

const PlayerBarContainer = () => {
  const navigation = useNavigation();
  // const active = useSelector((state: any) => state.playerState.active);
  // const status = useSelector((state: any) => state.playerState.status);
  // const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(setUpTrackPlayer());
    // if (active !== {} && !isEmpty(active)) {
    // dispatch(loadTrack(active, false));
    // }
    return () => {
      // dispatch(destroyTrackPlayer());
    };
  }, []);

  const togglePlayback = () => {
    // if (status === 'playing') {
    // pauseTrack();
    // } else {
    // playTrack();
    // }
  };

  const navigateToPlayer = React.useMemo(
    () => () => navigation.navigate("Player"),
    [navigation]
  );

  // if (Object.keys(active).length === 0 && active.constructor === Object) {
  //   return null;
  // }
  const data = {
    id: "1",
    cover:
      "https://dl.dropboxusercontent.com/s/cmzkdk7lxsxvnnb/ni-sanihake-bandare.jpg?dl=0",
    title: "Ni Sanihake bandare",
    path:
      "https://dl.dropboxusercontent.com/s/o4djrulrcic6zjb/Nee%20Sanihake%20Bandre.mp3?dl=0",
    artist: "Sonu Nigam",
    type: "online",
  };
  return (
    <PlayerBar
      active={data}
      status={"playing"}
      togglePlayback={togglePlayback}
      navigateToPlayer={navigateToPlayer}
    />
  );
};

export default PlayerBarContainer;

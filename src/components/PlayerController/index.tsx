/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 17:32:00
 * @LastEditTime: 2021-04-22 09:02:53
 * @LastEditors: Please set LastEditors
 * @Description: 播放进度控制条
 * @FilePath: /MusicProject/src/components/PlayerController/index.tsx
 */
import React from "react";
import { View, StyleSheet } from "react-native";
import { IconButton, FAB, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "@/reducers/index";
import { play, pause, skipToNext, skipToPrevious } from "@/reducers/songSlice";
import { ISongItem } from "@/interface/index";

interface IProps {
  songData: ISongItem;
}

const PlayerController = (props: IProps) => {
  const { songData } = props;
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const playingStatus = useSelector(
    (state: IAppState) => state.song.playingStatus
  );

  /**
   * @description: 跳到上一首歌曲播放
   * @param {*}
   * @return {*}
   */
  const handleSkipToPrevious = () => {
    dispatch(skipToPrevious());
  };

  /**
   * @description: 跳到下一首歌曲播放
   * @param {*}
   * @return {*}
   */
  const handleSkipToNext = () => {
    dispatch(skipToNext());
  };

  const handleTogglePlayStatus = () => {
    if (playingStatus === "playing") {
      requestAnimationFrame(() => {
        dispatch(pause());
      });
    } else {
      requestAnimationFrame(() => {
        dispatch(play());
      });
    }
  };
  return (
    <View style={styles.playerToolbox}>
      <IconButton
        icon="skip-back-outline"
        size={40}
        onPress={handleSkipToPrevious}
      />
      <FAB
        icon={playingStatus === "playing" ? "pause" : "play"}
        onPress={handleTogglePlayStatus}
        // loading={status === 'loading'}
        loading={false}
        style={{ backgroundColor: colors.onSurface }}
      />
      <IconButton
        icon="skip-forward-outline"
        size={40}
        onPress={handleSkipToNext}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  playerToolbox: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 2,
  },
});

export default PlayerController;

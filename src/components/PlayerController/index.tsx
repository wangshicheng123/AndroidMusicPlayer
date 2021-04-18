/*
 * @Author: your name
 * @Date: 2021-04-18 17:32:00
 * @LastEditTime: 2021-04-18 17:33:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/components/PlayerController/index.tsx
 */
import React from "react";
import { View, StyleSheet } from "react-native";
import { IconButton, FAB, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

// import {
//   playTrack,
//   skipToNext,
//   skipToPrevious,
//   pauseTrack,
// } from '../actions/playerState';
// import { RootReducerType } from '../reducers';

const PlayerController = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  // const status = useSelector(
  //   (state: RootReducerType) => state.playerState.status,
  // );

  const previous = () => {
    // dispatch(skipToPrevious());
  };

  const next = () => {
    // dispatch(skipToNext());
  };

  const togglePlayback = () => {
    // if (status === 'playing') {
    //   requestAnimationFrame(() => {
    //     pauseTrack();
    //   });
    // } else {
    //   requestAnimationFrame(() => {
    //     playTrack();
    //   });
    // }
  };
  return (
    <View style={styles.playerToolbox}>
      <IconButton icon="skip-back-outline" size={40} onPress={previous} />
      <FAB
        // icon={status === 'playing' ? 'pause' : 'play'}
        icon={"pause"}
        onPress={togglePlayback}
        // loading={status === 'loading'}
        loading={false}
        style={{ backgroundColor: colors.onSurface }}
      />
      <IconButton icon="skip-forward-outline" size={40} onPress={next} />
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

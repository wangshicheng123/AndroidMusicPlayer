/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 17:28:38
 * @LastEditTime: 2021-04-19 00:15:38
 * @LastEditors: Please set LastEditors
 * @Description: 歌曲播放重复模式容器组件
 * @FilePath: /MusicProject/src/components/RepeatContainer/index.tsx
 */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet } from "react-native";
import RepeatIcon from "../RepeatIcon/index";
// import { repeatSongs } from '../actions/playerState';
// import { RootReducerType } from '../reducers';

const RepeatContainer = () => {
  // const repeat = useSelector((state: RootReducerType) => state.config.repeat);
  // const dispatch = useDispatch();

  const updateRepeatType = () => {
    // if (repeat === 'repeat-all') {
    //   dispatch(repeatSongs('repeat-one'));
    // } else if (repeat === 'repeat-one') {
    //   dispatch(repeatSongs('repeat-off'));
    // } else {
    //   dispatch(repeatSongs('repeat-all'));
    // }
  };

  return (
    <View style={styles.container}>
      {/* repeat={repeat}  */}
      <RepeatIcon repeat={"repeat-one"} updateRepeatType={updateRepeatType} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default RepeatContainer;

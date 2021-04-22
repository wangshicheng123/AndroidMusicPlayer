/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 17:28:38
 * @LastEditTime: 2021-04-22 07:54:26
 * @LastEditors: Please set LastEditors
 * @Description: 歌曲播放重复模式容器组件
 * @FilePath: /MusicProject/src/components/RepeatContainer/index.tsx
 */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet } from "react-native";
import RepeatIcon from "../RepeatIcon/index";
import { changeRepeatStatus } from "@/reducers/configSlice";
import { IAppState } from "@/reducers/index";

const RepeatContainer = () => {
  const repeatStatus = useSelector(
    (state: IAppState) => state.config.repeatStatus
  );
  const dispatch = useDispatch();

  const updateRepeatType = () => {
    if (repeatStatus === "repeat-all") {
      dispatch(changeRepeatStatus("repeat-one"));
    } else if (repeatStatus === "repeat-one") {
      dispatch(changeRepeatStatus("repeat-off"));
    } else {
      dispatch(changeRepeatStatus("repeat-all"));
    }
  };

  return (
    <View style={styles.container}>
      <RepeatIcon repeat={repeatStatus} updateRepeatType={updateRepeatType} />
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

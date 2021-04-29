/*
 * @Author: wangshicheng
 * @Date: 2021-04-14 20:09:18
 * @LastEditTime: 2021-04-29 16:45:17
 * @LastEditors: Please set LastEditors
 * @Description: 全局配置reducer
 * @FilePath: /MusicProject/src/reducers/configSlice.ts
 */
import { createSlice } from "@reduxjs/toolkit";
import { Appearance } from "react-native";

/**
 * repeat-off: 不循环，播放当前歌曲然后停止
 * repeat-one: 循环播放当前歌曲
 * repeat-all: 循环播放【播放队列中的歌曲】
 */
type TRepeatStatus = "repeat-off" | "repeat-one" | "repeat-all";
export type TThemeType = "light" | "dark";
export interface IInitialConfigState {
  themeType?: TThemeType;
  repeatStatus: TRepeatStatus;
}
const initialState: IInitialConfigState = {
  themeType: "light",
  repeatStatus: "repeat-all", // 默认循环播放播放队列中的歌曲
};

const configSlice = createSlice({
  name: "config",
  initialState: initialState,
  reducers: {
    changeRepeatStatus: (
      state: IInitialConfigState,
      action: {
        type: string;
        payload: TRepeatStatus;
      }
    ) => {
      state.repeatStatus = action.payload;
    },
    updateThemeType: (
      state: IInitialConfigState,
      action: {
        type: string;
        payload: TThemeType;
      }
    ) => {
      state.themeType = action.payload;
    },
  },
});

export const { changeRepeatStatus, updateThemeType } = configSlice.actions;

export default configSlice.reducer;

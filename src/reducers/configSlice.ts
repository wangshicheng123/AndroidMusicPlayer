/*
 * @Author: wangshicheng
 * @Date: 2021-04-14 20:09:18
 * @LastEditTime: 2021-04-22 15:47:46
 * @LastEditors: Please set LastEditors
 * @Description: 全局配置reducer
 * @FilePath: /MusicProject/src/reducers/configSlice.ts
 */
import { createSlice } from "@reduxjs/toolkit";
import { Appearance } from "react-native";

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

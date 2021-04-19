/*
 * @Author: wangshicheng
 * @Date: 2021-04-15 21:50:15
 * @LastEditTime: 2021-04-19 15:31:06
 * @LastEditors: Please set LastEditors
 * @Description: reducer集合
 * @FilePath: /MusicProject/src/reducers/index.ts
 */
import { combineReducers } from "redux";
import homeSlice from "../pages/Home/homeSlice";
import configSlice, { IInitialConfigState } from "./configSlice";
import userSlice, { IInitialUserState } from "./userSlice";
import songSlice, { IInitialSongState } from "./songSlice";
import notifySlice, { IInitialNotifyState } from "./notifySlice";

export interface IAppState {
  home: Array<number>;
  config: IInitialConfigState;
  user: IInitialUserState;
  song: IInitialSongState;
  notify: IInitialNotifyState;
}

export const reducers = combineReducers({
  home: homeSlice,
  config: configSlice,
  user: userSlice,
  song: songSlice,
  notify: notifySlice,
});

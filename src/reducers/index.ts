/*
 * @Author: wangshicheng
 * @Date: 2021-04-15 21:50:15
 * @LastEditTime: 2021-04-15 21:59:28
 * @LastEditors: Please set LastEditors
 * @Description: reducer集合
 * @FilePath: /MusicProject/src/reducers/index.ts
 */
import { combineReducers } from "redux";
import homeSlice from "../pages/Home/homeSlice";
import configSlice, { IInitialConfigState } from "../reducers/configSlice";
import userSlice, { IInitialUserState } from "../reducers/userSlice";

export interface IAppState {
  home: Array<number>;
  config: IInitialConfigState;
  user: IInitialUserState;
}

export const reducers = combineReducers({
  home: homeSlice,
  config: configSlice,
  user: userSlice,
});

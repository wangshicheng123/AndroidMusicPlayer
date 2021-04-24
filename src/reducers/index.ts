/*
 * @Author: wangshicheng
 * @Date: 2021-04-15 21:50:15
 * @LastEditTime: 2021-04-24 16:34:20
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
import queueSlice, { IInitialQueueState } from "./queueSlice";
import collectionListSlice, {
  IInitialCollectionListState,
} from "./collectionListSlice";
import searchSlice, { IInitialSearchState } from "./searchSlice";

export interface IAppState {
  home: Array<number>;
  config: IInitialConfigState;
  user: IInitialUserState;
  song: IInitialSongState;
  notify: IInitialNotifyState;
  queue: IInitialQueueState;
  collectionList: IInitialCollectionListState;
  search: IInitialSearchState;
}

export const reducers = combineReducers({
  home: homeSlice,
  config: configSlice,
  user: userSlice,
  song: songSlice,
  notify: notifySlice,
  queue: queueSlice,
  collectionList: collectionListSlice,
  search: searchSlice,
});

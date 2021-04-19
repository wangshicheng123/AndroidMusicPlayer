/*
 * @Author: wangshichengn
 * @Date: 2021-04-19 21:54:58
 * @LastEditTime: 2021-04-19 23:25:56
 * @LastEditors: Please set LastEditors
 * @Description: 歌曲的队列 状态集合
 * @FilePath: /MusicProject/src/reducers/queueSlice.ts
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISongItem } from "@/interface/index";
import { cacheLoadSong } from "./songSlice";

export interface IInitialQueueState {
  playingQueue: ISongItem[];
  historyQueue: ISongItem[];
}

const initialState: IInitialQueueState = {
  playingQueue: [
    {
      id: "15",
      cover:
        "https://dl.dropboxusercontent.com/s/3a5o701zlpujpr9/Dont-Worry-2019.jpg?dl=0",
      title: " Don't Worry",
      path:
        "https://dl.dropboxusercontent.com/s/evzyrlnrtyovho6/Don%27t%20Worry.mp3?dl=0",
      artist: "Allok",
      type: "online",
    },
  ],
  historyQueue: [
    {
      id: "15",
      cover:
        "https://dl.dropboxusercontent.com/s/3a5o701zlpujpr9/Dont-Worry-2019.jpg?dl=0",
      title: " Don't Worry",
      path:
        "https://dl.dropboxusercontent.com/s/evzyrlnrtyovho6/Don%27t%20Worry.mp3?dl=0",
      artist: "Allok",
      type: "online",
    },
  ],
};

/**
 * @description: 执行播放音乐的任务队列
 * @param {*}
 * @return {*}
 */
export const excutePlayingQueue = createAsyncThunk(
  "queue/excutePlayingQueue",
  async (params, thunkAPI) => {
    try {
      const appState: any = thunkAPI.getState();
      const {
        queue: { playingQueue },
      } = appState;
      if (!playingQueue.length) return;
      thunkAPI.dispatch(cacheLoadSong({ songData: playingQueue[0] }));
    } catch (error) {
      console.log(error);
    }
  }
);

const queueSlice = createSlice({
  name: "queue",
  initialState: initialState,
  reducers: {
    addToPlayingQueue: (
      state: IInitialQueueState,
      action: {
        type: string;
        payload: ISongItem[];
      }
    ) => {
      state.playingQueue = [...action.payload, ...state.playingQueue];
    },
    addToHistoryQueue: (
      state: IInitialQueueState,
      action: {
        type: string;
        payload: ISongItem[];
      }
    ) => {
      state.historyQueue = [...action.payload, ...state.historyQueue];
    },
  },
});

export const { addToPlayingQueue, addToHistoryQueue } = queueSlice.actions;

export default queueSlice.reducer;

/*
 * @Author: wangshichengn
 * @Date: 2021-04-19 21:54:58
 * @LastEditTime: 2021-04-22 16:11:39
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
  likingSongQueue: ISongItem[];
  mostPlatQueue: ISongItem[];
}

const initialState: IInitialQueueState = {
  playingQueue: [],
  historyQueue: [],
  likingSongQueue: [],
  mostPlatQueue: [],
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
    removeSongFromPlayingQueue: (
      state: IInitialQueueState,
      action: {
        type: string;
        payload: ISongItem;
      }
    ) => {
      const songData = action.payload;
      state.playingQueue = state.playingQueue.filter((song: ISongItem) => {
        return song.id !== songData.id;
      });
    },
    clearPlayingQueue: (state: IInitialQueueState) => {
      state.playingQueue = [];
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
    clearHistoryQueue: (state: IInitialQueueState) => {
      state.historyQueue = [];
    },
    addToLikeSongQueue: (
      state: IInitialQueueState,
      action: {
        type: string;
        payload: ISongItem[];
      }
    ) => {
      state.likingSongQueue = [...action.payload, ...state.likingSongQueue];
    },
    removeToLikeSongQueue: (
      state: IInitialQueueState,
      action: {
        type: string;
        payload: ISongItem[];
      }
    ) => {
      state.likingSongQueue = state.likingSongQueue.filter(
        (song: ISongItem) => {
          return !action.payload.some((item) => item.id === song.id);
        }
      );
    },
  },
});

export const {
  addToPlayingQueue,
  removeSongFromPlayingQueue,
  clearPlayingQueue,
  addToHistoryQueue,
  clearHistoryQueue,
  addToLikeSongQueue,
  removeToLikeSongQueue,
} = queueSlice.actions;

export default queueSlice.reducer;

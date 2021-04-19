/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 18:35:24
 * @LastEditTime: 2021-04-19 18:37:45
 * @LastEditors: Please set LastEditors
 * @Description: 歌曲的播放状态集合
 * @FilePath: /MusicProject/src/pages/SongPlayList/songSlice.ts
 */
import { DeviceEventEmitter, EmitterSubscription } from "react-native";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TrackPlayer } from "react-track-player";
import { ISongItem } from "@/interface/index";
import RNFS from "react-native-fs";
import { checkFolderPath, download } from "@/utils/downloadSong";
import { showNotify } from "@/reducers/notifySlice";
import { State } from "react-native-gesture-handler";

type TPlayingStatus = "init" | "playing" | "paused";
let subscription: EmitterSubscription;
export interface IInitialSongState {
  currentSong: ISongItem;
  playingStatus: TPlayingStatus; // 音乐播放的状态
}

interface ICacheLoadSong {
  playingOnLoad?: boolean;
  songData: ISongItem;
}

const initialState: IInitialSongState = {
  currentSong: {},
  playingStatus: "init",
};

/**
 * @description: 缓存加载歌曲，不一定立即播放
 * @param {*}
 * @return {*}
 */
export const cacheLoadSong = createAsyncThunk(
  "song/cacheLoadSong",
  async (params: ICacheLoadSong) => {
    const { playingOnLoad = true, songData } = params;
    const { path } = songData;
    if (!path) return;

    try {
      await TrackPlayer.load(path);
      return {
        playingOnLoad: playingOnLoad,
        songData: songData,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

/**
 * @description: 歌曲下载
 * @param {*}
 * @return {*}
 */
export const downloadSong = createAsyncThunk(
  "song/downloadSong",
  async (params: { songData: ISongItem }, thunkAPI) => {
    const { songData } = params;
    const { path, title } = songData;
    // console.log(songData);
    if (!path) return;

    try {
      const folderPath = `${RNFS.ExternalStorageDirectoryPath}/Music`;
      // console.log(folderPath);
      /* 校验文件夹路径是否合法 */
      await checkFolderPath(folderPath);

      /* 自定义下载文件名称 */
      const filePath = `${folderPath}/${title}.mp3`;
      // console.log(filePath);
      await download(path, filePath);
      /* todo: 后期增加服务端的时候，这个下载的歌曲信息需要入库 */
      // songData.path = filePath;
      thunkAPI.dispatch(showNotify({ content: "下载成功" }));
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(showNotify({ content: "下载失败" }));
    }
  }
);

/**
 * @description: 初始化歌曲的播放状态【订阅播放事件/初始化播放状态】
 * @param {*}
 * @return {*}
 */
export const initializeTrackPlayer = createAsyncThunk(
  "song/initializeTrackPlayer",
  async (params, thunkAPI) => {
    try {
      /* 可以监听设备的前进后退事件 */
      subscription = DeviceEventEmitter.addListener("media", function (event) {
        if (event == "skip_to_next") {
          // dispatch(skipToNext());
          console.log("skip_to_next");
          thunkAPI.dispatch(pause());
        } else if (event == "skip_to_previous") {
          // dispatch(skipToPrevious());
          console.log("skip_to_previous");
          thunkAPI.dispatch(pause());
        } else if (event == "completed") {
          // dispatch(skipToNext());
          console.log("completed");
          thunkAPI.dispatch(pause());
        } else {
        }
      });
      thunkAPI.dispatch(pause());
    } catch (error) {
      console.log(error);
    }
  }
);

/**
 * @description: 销毁播放条
 * @param {*} createAsyncThunk
 * @return {*}
 */
export const destroyTrackPlayer = createAsyncThunk(
  "song/destroyTrackPlayer",
  async (params, thunkAPI) => {
    try {
      TrackPlayer.destroy();
      subscription.remove();
      thunkAPI.dispatch(pause());
    } catch (error) {
      console.log(error);
    }
  }
);

const songSlice = createSlice({
  name: "song",
  initialState: initialState,
  reducers: {
    play: (state: IInitialSongState) => {
      state.playingStatus = "playing";
      TrackPlayer.play();
    },
    pause: (state: IInitialSongState) => {
      state.playingStatus = "paused";
      TrackPlayer.pause();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      cacheLoadSong.fulfilled,
      (state: IInitialSongState, action: { type: string; payload: any }) => {
        const {
          payload: { playingOnLoad, songData },
        } = action;
        state.currentSong = songData;
        /* 判断歌曲是否在加载时同时播放，然后更新播放状态 */
        if (playingOnLoad) {
          TrackPlayer.play();
          state.playingStatus = "playing";
        } else {
          state.playingStatus = "paused";
        }
      }
    );
    builder.addCase(cacheLoadSong.rejected, (state) => {
      console.log("歌曲加载失败");
    });
  },
});

export default songSlice.reducer;
export const { play, pause } = songSlice.actions;

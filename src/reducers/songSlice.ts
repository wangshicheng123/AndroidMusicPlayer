/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 18:35:24
 * @LastEditTime: 2021-04-28 09:22:13
 * @LastEditors: Please set LastEditors
 * @Description: 歌曲的播放状态集合
 * @FilePath: /MusicProject/src/pages/SongPlayList/songSlice.ts
 */
import { DeviceEventEmitter, EmitterSubscription } from "react-native";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TrackPlayer } from "react-track-player";
import RNFS from "react-native-fs";
import { checkFolderPath, download } from "@/utils/downloadSong";
import { showNotify } from "./notifySlice";
import { addToHistoryQueue } from "./queueSlice";
import { ISongItem } from "@/interface/index";
import { request } from "@/utils/fetch";
import { playMusicOpenApi } from "@/api/index";

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
  async (params: ICacheLoadSong, thunkAPI) => {
    const { playingOnLoad = true, songData } = params;
    const { song_id } = songData;
    if (!song_id) return;

    try {
      const songPalyData = await request({
        url: playMusicOpenApi + song_id,
        config: {
          method: "GET",
        },
      });
      const song_path: string = songPalyData?.data[0]?.url || "";
      if (!song_path) {
        return;
      }
      await TrackPlayer.load(song_path);
      thunkAPI.dispatch(addToHistoryQueue([songData]));
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
    const { song_id, song_title } = songData;
    if (!song_id) return;

    try {
      const folderPath = `${RNFS.ExternalStorageDirectoryPath}/Music`;
      /* 校验文件夹路径是否合法 */
      await checkFolderPath(folderPath);

      /* 自定义下载文件名称 */
      const filePath = `${folderPath}/${song_title}.mp3`;

      /* 根据歌曲ID获取歌曲path */
      const songPalyData = await request({
        url: playMusicOpenApi + song_id,
        config: {
          method: "GET",
        },
      });
      const song_path: string = songPalyData?.data[0]?.url || "";
      if (!song_path) {
        return;
      }
      await download(song_path, filePath);
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
          thunkAPI.dispatch(skipToNext());
        } else if (event == "skip_to_previous") {
          thunkAPI.dispatch(skipToPrevious());
        } else if (event == "completed") {
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

/**
 * @description: 跳到下一首歌进行播放【首先需要判断播放模式，单曲循环等】
 * @param {*} createAsyncThunk
 * @return {*}
 */
export const skipToNext = createAsyncThunk(
  "song/skipToNext",
  async (params, thunkAPI) => {
    try {
      const {
        queue: { playingQueue },
        song: { currentSong },
      }: any = thunkAPI.getState();
      let nextPlaySongIndex = -1;

      /* 队列中是否有歌 */
      if (playingQueue.length <= 1) {
        thunkAPI.dispatch(pause());
        return;
      }

      playingQueue.map((song: ISongItem, index: number) => {
        /* 是否是最后一首歌 */
        if (song.id === currentSong.id && index + 1 < playingQueue.length) {
          nextPlaySongIndex = index + 1;
        }
      });

      /* 当前歌曲在队列中，找到其位置播放下一首， 不再队列中，默认播放第一首 */
      if (nextPlaySongIndex !== -1) {
        thunkAPI.dispatch(
          cacheLoadSong({ songData: playingQueue[nextPlaySongIndex] })
        );
      } else {
        thunkAPI.dispatch(cacheLoadSong({ songData: playingQueue[0] }));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const skipToPrevious = createAsyncThunk(
  "song/skipToPrevious",
  async (params, thunkAPI) => {
    try {
      const {
        queue: { playingQueue },
        song: { currentSong },
      }: any = thunkAPI.getState();
      let previousPlaySongIndex = -1;

      /* 队列中是否有歌 */
      if (playingQueue.length <= 1) {
        thunkAPI.dispatch(pause());
        return;
      }

      playingQueue.map((song: ISongItem, index: number) => {
        /* 是否是最后一首歌 */
        if (song.id === currentSong.id && index) {
          previousPlaySongIndex = index - 1;
        }
      });

      /* 当前歌曲在队列中，找到其位置播放下一首， 不再队列中，默认播放第一首 */
      if (previousPlaySongIndex !== -1) {
        thunkAPI.dispatch(
          cacheLoadSong({ songData: playingQueue[previousPlaySongIndex] })
        );
      } else {
        thunkAPI.dispatch(cacheLoadSong({ songData: playingQueue[0] }));
      }
    } catch (error) {
      console.error(error);
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
        const { payload } = action;
        if (!payload) {
          return;
        }
        const { playingOnLoad, songData } = payload;
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

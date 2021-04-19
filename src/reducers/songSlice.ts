/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 18:35:24
 * @LastEditTime: 2021-04-19 16:29:54
 * @LastEditors: Please set LastEditors
 * @Description: 歌曲的播放状态集合
 * @FilePath: /MusicProject/src/pages/SongPlayList/songSlice.ts
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TrackPlayer } from "react-track-player";
import { ISongItem } from "@/interface/index";
import RNFS from "react-native-fs";
import { checkFolderPath, download } from "@/utils/downloadSong";
import { showNotify } from "@/reducers/notifySlice";

type TPlayingStatus = "init" | "playing" | "paused";
export interface IInitialSongState {
  currentSong: ISongItem;
  playingStatus: TPlayingStatus; // 音乐播放的状态
}

interface IPlayingSong {
  playingOnLoad?: boolean;
  songData: ISongItem;
}

const initialState: IInitialSongState = {
  currentSong: {},
  playingStatus: "init",
};

/**
 * @description: 歌曲播放
 * @param {*}
 * @return {*}
 */
export const playingSong = createAsyncThunk(
  "song/playingSong",
  async (params: IPlayingSong) => {
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

const songSlice = createSlice({
  name: "song",
  initialState: initialState,
  reducers: {
    updatePlayingStatus: (
      state: IInitialSongState,
      action: {
        payload: {
          playingStatus: TPlayingStatus;
        };
        type: string;
      }
    ) => {
      const {
        payload: { playingStatus },
      } = action;
      state.playingStatus = playingStatus;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      playingSong.fulfilled,
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
    builder.addCase(playingSong.rejected, (state) => {
      console.log("歌曲加载失败");
    });
  },
});

export default songSlice.reducer;
export const { updatePlayingStatus } = songSlice.actions;

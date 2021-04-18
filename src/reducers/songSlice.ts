/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 18:35:24
 * @LastEditTime: 2021-04-18 22:26:55
 * @LastEditors: Please set LastEditors
 * @Description: 歌曲的播放状态集合
 * @FilePath: /MusicProject/src/pages/SongPlayList/songSlice.ts
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TrackPlayer } from "react-track-player";
import { ISongItem } from "@/interface/index";

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
      // return;
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

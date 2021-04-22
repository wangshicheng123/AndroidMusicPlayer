/*
 * @Author: wangshicheng
 * @Date: 2021-04-22 14:18:32
 * @LastEditTime: 2021-04-22 14:59:23
 * @LastEditors: Please set LastEditors
 * @Description: 自定义歌曲集合
 * @FilePath: /MusicProject/src/reducers/playlistSlice.ts
 */
import { createSlice } from "@reduxjs/toolkit";
import { IPlaylist, ISongItem } from "@/interface/index";

export type IInitialPlaylistState = IPlaylist[];
const initialState: IInitialPlaylistState = [
  {
    id: "1",
    name: "Default",
    owner: "system",
    cover:
      "http://p3.music.126.net/FM_0Ewfb-9Fp0Hm9TeMZAA==/18806046882899500.jpg?param=200y200",
    songs: [],
  },
  {
    id: "2",
    name: "Test",
    owner: "system",
    cover:
      "http://p3.music.126.net/FM_0Ewfb-9Fp0Hm9TeMZAA==/18806046882899500.jpg?param=200y200",
    songs: [],
  },
];

const playlistSlice = createSlice({
  name: "playlist",
  initialState: initialState,
  reducers: {
    createPlaylist: (
      state: IInitialPlaylistState,
      action: {
        type: string;
        payload: IPlaylist;
      }
    ) => {
      state.push(action.payload);
    },
    addSongToPlaylist: (
      state: IInitialPlaylistState,
      action: {
        type: string;
        payload: {
          playlistId: string;
          songData: ISongItem;
        };
      }
    ) => {
      const { playlistId, songData } = action.payload;
      state.map((playlist: IPlaylist) => {
        if (playlist.id === playlistId) {
          playlist.songs.push(songData);
        }
      });
    },
  },
});

export const { createPlaylist, addSongToPlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;

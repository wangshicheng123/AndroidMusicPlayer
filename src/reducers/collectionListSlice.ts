/*
 * @Author: wangshicheng
 * @Date: 2021-04-22 14:18:32
 * @LastEditTime: 2021-04-24 23:18:47
 * @LastEditors: Please set LastEditors
 * @Description: 自定义歌曲集合
 * @FilePath: /MusicProject/src/reducers/playlistSlice.ts
 */
import { createSlice } from "@reduxjs/toolkit";
import { ICollectionListItem, ISongItem } from "@/interface/index";

export type IInitialCollectionListState = ICollectionListItem[];
const initialState: IInitialCollectionListState = [
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

const collectionListSlice = createSlice({
  name: "collectionList",
  initialState: initialState,
  reducers: {
    createCollectionList: (
      state: IInitialCollectionListState,
      action: {
        type: string;
        payload: ICollectionListItem;
      }
    ) => {
      state.push(action.payload);
    },
    addSongToCollectionList: (
      state: IInitialCollectionListState,
      action: {
        type: string;
        payload: {
          collectionListId: string;
          songData: ISongItem;
        };
      }
    ) => {
      const { collectionListId, songData } = action.payload;
      state.map((collectionList: ICollectionListItem) => {
        if (collectionList.id === collectionListId) {
          collectionList.songs.push(songData);
        }
      });
    },
    modifyCollectionListItem: (
      state: IInitialCollectionListState,
      action: {
        type: string;
        payload: {
          collectionId: string;
          collectionName: string;
        };
      }
    ) => {
      const collectionId = action.payload.collectionId;
      const collectionName = action.payload.collectionName;
      state.map((collection: ICollectionListItem) => {
        if (collection.id === collectionId) {
          collection.name = collectionName;
        }
        return collection;
      });
    },
    deleteCollectionitem: (
      state: IInitialCollectionListState,
      action: {
        type: string;
        payload: {
          collectionId: string;
        };
      }
    ) => {
      const collectionId = action.payload.collectionId;
      return state.filter((collection: ICollectionListItem) => {
        return collection.id !== collectionId;
      });
    },
  },
});

export const {
  createCollectionList,
  addSongToCollectionList,
  modifyCollectionListItem,
  deleteCollectionitem,
} = collectionListSlice.actions;

export default collectionListSlice.reducer;

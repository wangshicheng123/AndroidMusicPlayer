/*
 * @Author: wangshicheng
 * @Date: 2021-04-22 14:18:32
 * @LastEditTime: 2021-04-26 22:27:33
 * @LastEditors: Please set LastEditors
 * @Description: 自定义歌曲集合
 * @FilePath: /MusicProject/src/reducers/playlistSlice.ts
 */
import { createSlice } from "@reduxjs/toolkit";
import { ICollectionListItem, ISongItem } from "@/interface/index";

export type IInitialCollectionListState = {
  systemCollections: ICollectionListItem[];
  userCollections: ICollectionListItem[];
};
const initialState: IInitialCollectionListState = {
  systemCollections: [
    {
      id: 3778678,
      name: "音乐热歌榜",
      owner: "System",
      cover:
        "https://p2.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg",
      songs: [],
    },
    {
      id: 3779629,
      name: "音乐新歌榜",
      owner: "System",
      cover:
        "https://p1.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg",
      songs: [],
    },
    {
      id: 19723756,
      name: "音乐飙升榜",
      owner: "System",
      cover:
        "https://p2.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg",
      songs: [],
    },
    {
      id: 2147483647,
      name: "抖音排行榜",
      owner: "System",
      cover:
        "https://p1.music.126.net/8sRm2fQNh_KZeWmJ1sRhQQ==/109951165611408950.jpg",
      songs: [],
    },
  ],
  userCollections: [
    {
      id: 1,
      name: "Default",
      owner: "system",
      cover:
        "http://p3.music.126.net/FM_0Ewfb-9Fp0Hm9TeMZAA==/18806046882899500.jpg?param=200y200",
      songs: [],
    },
    {
      id: 2,
      name: "Test",
      owner: "system",
      cover:
        "http://p3.music.126.net/FM_0Ewfb-9Fp0Hm9TeMZAA==/18806046882899500.jpg?param=200y200",
      songs: [],
    },
  ],
};

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
      state.userCollections.push(action.payload);
    },
    createSystemCollectionList: (
      state: IInitialCollectionListState,
      action: {
        type: string;
        payload: ICollectionListItem[];
      }
    ) => {
      state.systemCollections.push(...action.payload);
    },
    addSongToCollectionList: (
      state: IInitialCollectionListState,
      action: {
        type: string;
        payload: {
          collectionListId: number;
          songData: ISongItem;
        };
      }
    ) => {
      const { collectionListId, songData } = action.payload;
      state.userCollections.map((collectionList: ICollectionListItem) => {
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
          collectionId: number;
          collectionName: string;
        };
      }
    ) => {
      const collectionId = action.payload.collectionId;
      const collectionName = action.payload.collectionName;
      state.userCollections.map((collection: ICollectionListItem) => {
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
          collectionId: number;
        };
      }
    ) => {
      const collectionId = action.payload.collectionId;
      state.userCollections = state.userCollections.filter(
        (collection: ICollectionListItem) => {
          return collection.id !== collectionId;
        }
      );
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

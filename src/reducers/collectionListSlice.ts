/*
 * @Author: wangshicheng
 * @Date: 2021-04-22 14:18:32
 * @LastEditTime: 2021-04-27 13:47:01
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
      collection_id: 3778678,
      collection_name: "音乐热歌榜",
      user_id: 1,
      user_name: "System",
      collection_cover:
        "https://p2.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg",
      songs: [],
    },
    {
      collection_id: 3779629,
      collection_name: "音乐新歌榜",
      user_id: 1,
      user_name: "System",
      collection_cover:
        "https://p1.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg",
      songs: [],
    },
    {
      collection_id: 19723756,
      collection_name: "音乐飙升榜",
      user_id: 1,
      user_name: "System",
      collection_cover:
        "https://p2.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg",
      songs: [],
    },
    {
      collection_id: 2250011882,
      collection_name: "抖音排行榜",
      user_id: 1,
      user_name: "System",
      collection_cover:
        "https://p1.music.126.net/8sRm2fQNh_KZeWmJ1sRhQQ==/109951165611408950.jpg",
      songs: [],
    },
  ],
  userCollections: [
    {
      collection_id: 1,
      collection_name: "Default",
      user_id: 1,
      user_name: "Default",
      collection_cover:
        "http://p3.music.126.net/FM_0Ewfb-9Fp0Hm9TeMZAA==/18806046882899500.jpg?param=200y200",
      songs: [],
    },
    {
      collection_id: 2,
      collection_name: "Test",
      user_id: 1,
      user_name: "Test",
      collection_cover:
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
        if (collectionList.collection_id === collectionListId) {
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
        if (collection.collection_id === collectionId) {
          collection.collection_name = collectionName;
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
          return collection.collection_id !== collectionId;
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

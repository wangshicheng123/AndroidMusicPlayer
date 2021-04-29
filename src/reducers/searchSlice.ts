/*
 * @Author: wangshicheng
 * @Date: 2021-04-23 11:40:55
 * @LastEditTime: 2021-04-29 19:09:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/reducers/seachSlice.ts
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ISongItem } from "@/interface/index";
import { request } from "@/utils/fetch";
import { getSongByCollection, getSongByKeyword } from "@/api/index";
import { IRequest } from "@/utils/fetch";

export interface IInitialSearchState {
  songDatas: ISongItem[];
  loading: boolean;
}

const initialSearchState: IInitialSearchState = {
  songDatas: [],
  loading: false,
};

/**
 * @description: 根据分类ID搜索歌曲
 * @param {*}
 * @return {*}
 */
interface IParams {
  collectionId?: number;
  pageNumber?: number;
  user_id?: string;
  requestApi: IRequest;
}

/**
 * @description: 根据歌曲分类搜索歌曲
 * @param {*}
 * @return {*}
 */
export const fetchSearchDataById = createAsyncThunk(
  "search/fetchSearchResult",
  async (params: IParams, thunkAPI) => {
    const { requestApi, collectionId, pageNumber, user_id } = params;
    thunkAPI.dispatch(changeSearchLoadingStatus(true));
    /* 初次加载先把之前的搜索结果状态清除 */
    if (!pageNumber) {
      thunkAPI.dispatch(clearSearchSongs());
    }
    const searchRes = await request(requestApi, {
      collectionId: collectionId,
      pageNumber: pageNumber,
      user_id: user_id,
    });
    const searchSongDatas: ISongItem[] = searchRes.data;
    console.log("searchSongDatas", searchSongDatas);
    return searchSongDatas;
  }
);

/**
 * @description: 根据关键字搜索歌曲
 * @param {*}
 * @return {*}
 */
export const searchSongByKeyword = createAsyncThunk(
  "search/searchSongByKeyword",
  async (
    params: {
      keyWord?: string;
    },
    thunkAPI
  ) => {
    const { keyWord } = params;
    thunkAPI.dispatch(changeSearchLoadingStatus(true));
    /* 初次加载先把之前的搜索结果状态清除 */
    thunkAPI.dispatch(clearSearchSongs());
    const searchRes = await request(getSongByKeyword, {
      keyWord: keyWord,
    });
    const searchSongDatas: ISongItem[] = searchRes.data;
    return searchSongDatas;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: initialSearchState,
  reducers: {
    changeSearchLoadingStatus: (
      state: IInitialSearchState,
      action: {
        type: string;
        payload: boolean;
      }
    ) => {
      state.loading = action.payload;
    },
    clearSearchSongs: (state: IInitialSearchState) => {
      state.songDatas = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchSearchDataById.fulfilled,
      (
        state: IInitialSearchState,
        action: {
          type: string;
          payload: ISongItem[];
        }
      ) => {
        state.songDatas = [...action.payload, ...state.songDatas];
        state.loading = false;
      }
    );
    builder.addCase(
      fetchSearchDataById.rejected,
      (state: IInitialSearchState) => {
        state.songDatas = [];
        state.loading = false;
      }
    );
    builder.addCase(
      searchSongByKeyword.fulfilled,
      (
        state: IInitialSearchState,
        action: {
          type: string;
          payload: ISongItem[];
        }
      ) => {
        state.songDatas = [...action.payload, ...state.songDatas];
        state.loading = false;
      }
    );
    builder.addCase(
      searchSongByKeyword.rejected,
      (state: IInitialSearchState) => {
        state.songDatas = [];
        state.loading = false;
      }
    );
  },
});

export const {
  changeSearchLoadingStatus,
  clearSearchSongs,
} = searchSlice.actions;

export default searchSlice.reducer;

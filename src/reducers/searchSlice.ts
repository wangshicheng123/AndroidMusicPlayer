/*
 * @Author: wangshicheng
 * @Date: 2021-04-23 11:40:55
 * @LastEditTime: 2021-04-24 10:52:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/reducers/seachSlice.ts
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ISongItem } from "@/interface/index";

export interface IInitialSearchState {
  songDatas: ISongItem[];
}

const initialSearchState: IInitialSearchState = {
  songDatas: [],
};

export const fetchSearchResult = createAsyncThunk(
  "search/fetchSearchResult",
  async (
    params: {
      searchText: string;
    },
    thunkAPI
  ) => {
    const { searchText } = params;
    console.log("searchText", searchText);
    const songDatas = await new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "100",
            cover:
              "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
            title: "星辰大海",
            path:
              "https://m801.music.126.net/20210422143424/4287c6c3c2c5c2ced5b25a96de46c9a4/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/5755656025/233c/ef92/f555/0024c2275511d3e826ca70a7e0a0d0fc.mp3",
            artist: "黄霄雲",
            type: "online",
          },
          {
            id: "101",
            cover:
              "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
            title: "四季予你",
            path:
              "https://m701.music.126.net/20210422143451/817e292d98fa1252e5e2a9bcc12f2f94/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/5473403102/c3b6/7f9c/c169/2e612af8a75f1b5dc4dce24e7000e21f.mp3",
            artist: "程响",
            type: "online",
          },
        ]);
      }, 2000);
    });
    return songDatas;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: initialSearchState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchSearchResult.fulfilled,
      (state: IInitialSearchState, action: any) => {
        state.songDatas = action.payload;
      }
    );
    builder.addCase(
      fetchSearchResult.rejected,
      (state: IInitialSearchState) => {
        state.songDatas = [];
      }
    );
  },
});

// export const {} = searchSlice.actions;

export default searchSlice.reducer;

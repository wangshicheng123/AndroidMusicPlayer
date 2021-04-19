/*
 * @Author: wangshicheng
 * @Date: 2021-04-19 15:25:27
 * @LastEditTime: 2021-04-19 16:28:34
 * @LastEditors: Please set LastEditors
 * @Description: 提示信息状态集合
 * @FilePath: /MusicProject/src/reducers/notificationSlice.ts
 */

import { createSlice } from "@reduxjs/toolkit";

export interface IInitialNotifyState {
  visible?: boolean;
  content: string;
}
const initialState: IInitialNotifyState = {
  visible: false,
  content: "",
};

const notifySlice = createSlice({
  name: "notify",
  initialState: initialState,
  reducers: {
    showNotify: (
      state: IInitialNotifyState,
      action: {
        type: string;
        payload: IInitialNotifyState;
      }
    ) => {
      const { visible = true, content } = action.payload;
      state.visible = visible;
      state.content = content;
    },
    hiddenNotify: (state: IInitialNotifyState) => {
      state.visible = false;
      state.content = "";
    },
  },
});

export const { showNotify, hiddenNotify } = notifySlice.actions;

export default notifySlice.reducer;

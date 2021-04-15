/*
 * @Author: wangshicheng
 * @Date: 2021-04-14 21:42:43
 * @LastEditTime: 2021-04-14 21:44:57
 * @LastEditors: Please set LastEditors
 * @Description: 用户信息状态管理
 * @FilePath: /MusicProject/src/reducers/userSlice.ts
 */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: {},
  googleAccessGiven: false,
  offlineAccessGiven: false,
  introSlidesShown: false,
};

const userReducer = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
});

export default userReducer.reducer;

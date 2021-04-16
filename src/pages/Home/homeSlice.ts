/*
 * @Author: your name
 * @Date: 2021-04-13 17:04:45
 * @LastEditTime: 2021-04-15 21:54:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/pages/Home/homeSlice.ts
 */

import {createSlice} from '@reduxjs/toolkit';

const initialState: Array<number> = [1, 2];

const homeSlice: any = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
});

export default homeSlice.reducer;

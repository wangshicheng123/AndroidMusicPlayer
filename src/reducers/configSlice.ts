/*
 * @Author: your name
 * @Date: 2021-04-14 20:09:18
 * @LastEditTime: 2021-04-14 20:38:58
 * @LastEditors: Please set LastEditors
 * @Description: 全局配置reducer
 * @FilePath: /MusicProject/src/reducers/configSlice.ts
 */
import {createSlice} from '@reduxjs/toolkit';
import {Appearance} from 'react-native';

const initialState = {
  themeType: Appearance.getColorScheme(),
};

const configSlice = createSlice({
  name: 'config',
  initialState: initialState,
  reducers: {},
});

export default configSlice.reducer;

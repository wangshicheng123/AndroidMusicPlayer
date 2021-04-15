/*
 * @Author: your name
 * @Date: 2021-04-13 16:23:46
 * @LastEditTime: 2021-04-14 21:45:41
 * @LastEditors: Please set LastEditors
 * @Description: APP状态容器
 * @FilePath: /MusicProject/src/store/index.ts
 */

import {createStore, applyMiddleware, combineReducers} from 'redux';
/* 处理reducer中可能存在异步操作 */
import thunk from 'redux-thunk';
/* 异步存储【只能存储字符串】 */
import AsyncStorage from '@react-native-async-storage/async-storage';
/* redux状态发生变化的时候，能够持久化存储 */
import {persistStore, persistReducer} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';
import homeReducer from '../pages/Home/homeSlice';
import configReducer from '../reducers/configSlice';
import userReducer from '../reducers/userSlice';

const reducers = combineReducers({
  home: homeReducer,
  config: configReducer,
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const middleware = [thunk];
const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  console.log(process.env);
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware)),
  );
  const persistor = persistStore(store);
  return {store, persistor};
};

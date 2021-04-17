/*
 * @Author: your name
 * @Date: 2021-04-13 16:23:46
 * @LastEditTime: 2021-04-15 21:52:10
 * @LastEditors: Please set LastEditors
 * @Description: APP状态容器
 * @FilePath: /MusicProject/src/store/index.ts
 */

import { createStore, applyMiddleware } from "redux";
/* 处理reducer中可能存在异步操作 */
import thunk from "redux-thunk";
/* 异步存储【只能存储字符串】 */
import AsyncStorage from "@react-native-async-storage/async-storage";
/* redux状态发生变化的时候，能够持久化存储 */
import { persistStore, persistReducer } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducers } from "../reducers/index";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const middleware = [thunk];
const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  console.log(process.env);
  const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  const persistor = persistStore(store);
  return { store, persistor };
};

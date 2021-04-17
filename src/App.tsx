/*
 * @Author: wangshicheng
 * @Date: 2021-04-04 10:44:20
 * @LastEditTime: 2021-04-17 18:30:20
 * @LastEditors: Please set LastEditors
 * @Description: APP 外部容器
 * @FilePath: /MusicProject/App.tsx
 */
/**
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native-paper";

import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { Provider } from "react-redux";
/* 延迟渲染应用程序的UI，直到持久化状态已经被找到并且保存到redux中 */
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./store/index";
import Root from "./Root";

const { store, persistor } = configureStore();
const App = () => {
  useEffect(() => {
    GoogleSignin.configure();
  }, []);
  const renderActivityIndicator = () => {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  };
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={renderActivityIndicator()} persistor={persistor}>
          <Root />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
});

export default App;

/*
 * @Author: wangshicheng
 * @Date: 2021-04-08 09:24:31
 * @LastEditTime: 2021-04-25 11:23:30
 * @LastEditors: Please set LastEditors
 * @Description: app路由集合
 * @FilePath: /MusicProject/src/router/index.ts
 */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
/* app的导航栈【屏幕切换】，注意和stack的区别 */
import { createNativeStackNavigator } from "react-native-screens/native-stack";
/* app的导航栈 */
import { createStackNavigator } from "@react-navigation/stack";
/* APP初始化加载状态控制 */
// import RNBootSplash from 'react-native-bootsplash';
import { useTheme, IconButton } from "react-native-paper";
import { SafeAreaView, StyleSheet } from "react-native";
import { addToPlayingQueue, excutePlayingQueue } from "@/reducers/queueSlice";
import { IAppState } from "@/reducers/index";

/* 页面集合 */
import LaunchScreen from "@/pages/Launch/index";
import IntroductionScreen from "@/pages/Introduction/index";
import PlayScreen from "@/pages/Player/index";
import QueueScreen from "@/pages/Queue/index";
import FindScreen from "@/pages/Find/index";
import CollectionScreen from "@/pages/Collection/index";
import CollectionListSongsScreen from "@/pages/Collection/components/CollectionListSongs/index";
import FilterScreen from "@/pages/Search/components/Filter/index";
import SearchScreen from "@/pages/Search/index";
import SettingScreen from "@/pages/SettingScreen/index";
import SongPlayListScreen from "@/pages/SongPlayList/index";

/* HOME页面底部导航 */
import BottomNavigator from "./BottomNavigator";

/* 导航区展示组件 */
import { getGreetingTime } from "@/utils/greeting";
import Notification from "@/components/Notification/index";
import SearchHeader from "@/components/SearchHeader/index";
import CollectionListOptions from "@/components/CollectionListOptions/index";

const Stack = createStackNavigator();
const NativeStack = createNativeStackNavigator();

/**
 * @description: APP内部导航容器
 * @param {*}
 * @return {*}
 */
const AppStack = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const searchData = useSelector((state: IAppState) => state.search.songDatas);
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
        safeAreaInsets: { top: 0, bottom: 0 },
      }}
    >
      <Stack.Screen
        name="Home"
        component={BottomNavigator}
        options={({ navigation }) => {
          return {
            headerTitle: getGreetingTime(),
            headerTitleStyle: { fontFamily: "Nunito-ExtraBold", fontSize: 24 },
            headerRight: () => (
              <IconButton
                icon="settings-outline"
                onPress={() => navigation.navigate("Settings")}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={
          {
            // headerTitleStyle: styles.headerTitleStyle,
          }
        }
      />
      <Stack.Screen
        name="CollectionList"
        component={CollectionScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Playlist"
        component={SongPlayListScreen}
        options={({ route }: { route: any }) => {
          const {
            params: { playlistMetadata, songs },
          } = route;
          return {
            headerTitle: playlistMetadata.name,
            headerRight: () => (
              <IconButton
                icon="play-circle-outline"
                onPress={() => {
                  dispatch(addToPlayingQueue(songs));
                  dispatch(excutePlayingQueue());
                }}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerTitle: "Settings",
        }}
      />
      <Stack.Screen
        name="Find"
        component={FindScreen}
        // initialParams={{ type: 'all' }}
        initialParams={{}}
        options={{
          header: ({ navigation }) => (
            <SearchHeader goBack={navigation.goBack} />
          ),
        }}
      />
      <NativeStack.Screen
        name="Active"
        component={PlayScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.text,
          headerTopInsetEnabled: false,
        }}
      />
      <NativeStack.Screen name="Queue" component={QueueScreen} />
      <Stack.Screen
        name="CollectionListSongs"
        component={CollectionListSongsScreen}
        options={({ route, navigation }: { route: any; navigation: any }) => {
          const { collecetionListMetadata } = route.params;
          return {
            headerTitle: collecetionListMetadata.name,
            headerRight: () => (
              <CollectionListOptions route={route} navigation={navigation} />
            ),
          };
        }}
      />
      <Stack.Screen
        name="Filter"
        component={FilterScreen}
        options={({ route }: { route: any }) => {
          const { title } = route.params;
          return {
            headerTitle: title,
            headerRight: () => (
              <IconButton
                icon="play-circle-outline"
                onPress={() => dispatch(addToPlayingQueue(searchData))}
              />
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

/**
 * @description: APP初次加载的权限相关授权路由
 * @param {*}
 * @return {*}
 */
const AuthStack = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Launch"
    >
      {/* APP初始化 */}
      <NativeStack.Screen name="Launch" component={LaunchScreen} />
      {/* APP介绍展示 */}
      <NativeStack.Screen name="Intro" component={IntroductionScreen} />
      {/* APP正式内容 */}
      <NativeStack.Screen name="App" component={AppStack} />
    </NativeStack.Navigator>
  );
};

const AppNavigator = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={{ backgroundColor: colors.surface, ...styles.container }}
    >
      <Notification />
      <AuthStack />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitleStyle: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: 28,
  },
});

export default AppNavigator;

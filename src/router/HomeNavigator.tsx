/*
 * @Author: your name
 * @Date: 2021-04-26 17:03:44
 * @LastEditTime: 2021-04-27 12:44:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/router/HomeNavigator.tsx
 */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme, IconButton } from "react-native-paper";

/* app的导航栈【屏幕切换】，注意和stack的区别 */
import { createNativeStackNavigator } from "react-native-screens/native-stack";
/* app的导航栈 */
import { createStackNavigator } from "@react-navigation/stack";

import { addToPlayingQueue, excutePlayingQueue } from "@/reducers/queueSlice";
import { IAppState } from "@/reducers/index";

/* 页面集合 */
import PlayScreen from "@/pages/Player/index";
import QueueScreen from "@/pages/Queue/index";
import FindScreen from "@/pages/Find/index";
import CollectionScreen from "@/pages/Collection/index";
import CollectionListSongsScreen from "@/pages/Collection/components/CollectionListSongs/index";
import FilterScreen from "@/pages/Search/components/Filter/index";
import SearchScreen from "@/pages/Search/index";
import SettingScreen from "@/pages/SettingScreen/index";
import SongPlayListScreen from "@/pages/SongPlayList/index";
import HomeScreen from "@/pages/Home/index";

/* 导航区展示组件 */
import { getGreetingTime } from "@/utils/greeting";
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
        component={HomeScreen}
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
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="CollectionList" component={CollectionScreen} />
      <Stack.Screen
        name="Playlist"
        component={SongPlayListScreen}
        options={({ route }: { route: any }) => {
          const {
            params: { playlistMetadata, songs = [] },
          } = route;
          return {
            headerTitle: playlistMetadata.collection_name,
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

export default AppStack;

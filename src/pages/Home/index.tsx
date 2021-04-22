/*
 * @Author: your name
 * @Date: 2021-04-13 17:03:23
 * @LastEditTime: 2021-04-22 15:37:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/pages/Home/index.tsx
 */

import React from "react";
import { useDispatch } from "react-redux";
import { useTheme, IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { getGreetingTime } from "@/utils/greeting";
import HomeScreen from "./Home";
import SongPlayListScreen from "../SongPlayList/index";
import { addToPlayingQueue, excutePlayingQueue } from "@/reducers/queueSlice";
import SettingScreen from "@/pages/SettingScreen/index";

const Stack = createStackNavigator();

const Home = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  return (
    <Stack.Navigator
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
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          headerTitle: "Settings",
        }}
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
    </Stack.Navigator>
  );
};

export default Home;

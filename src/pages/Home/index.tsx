/*
 * @Author: your name
 * @Date: 2021-04-13 17:03:23
 * @LastEditTime: 2021-04-18 16:03:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/pages/Home/index.tsx
 */

import React from "react";
import { View, Text } from "react-native";
import { useTheme, IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { getGreetingTime } from "@/utils/greeting";
import HomeScreen from "./Home";
import SongPlayListScreen from "../SongPlayList/index";
// import {useDispatch, useSelector} from 'react-redux';

const SettingScreen = () => {
  return (
    <View>
      <Text>Main</Text>
    </View>
  );
};
const Stack = createStackNavigator();

const Home = () => {
  const { colors } = useTheme();
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
        options={({ route }) => {
          const playlist = route?.params?.playlist;
          // const { addToQueue } = route.params;
          // console.log("===>>>", route);
          return {
            headerTitle: playlist.name,
            headerRight: () => (
              <IconButton
                icon="play-circle-outline"
                // onPress={() => addToQueue()}
                onPress={() => {
                  console.log("addToQueen");
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

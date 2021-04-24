/*
 * @Author: wangshicheng
 * @Date: 2021-04-22 17:06:13
 * @LastEditTime: 2021-04-24 10:04:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/pages/Search/index.tsx
 */
import React from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme, IconButton } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import FilterScreen from "./components/Filter/index";
import SearchScreen from "./components/Search/index";
import { addToPlayingQueue } from "@/reducers/queueSlice";
import { IAppState } from "@/reducers/index";

const Stack = createStackNavigator();

const SearchStack = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const searchData = useSelector((state: IAppState) => state.search.songDatas);

  const { colors } = theme;
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
        safeAreaInsets: { top: 0, bottom: 0 },
      }}
    >
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTitleStyle: styles.headerTitleStyle,
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

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: 28,
  },
});

export default SearchStack;

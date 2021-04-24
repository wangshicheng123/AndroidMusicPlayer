/*
 * @Author: wangshicheng
 * @Date: 2021-04-24 11:01:19
 * @LastEditTime: 2021-04-24 19:05:58
 * @LastEditors: Please set LastEditors
 * @Description: 歌集
 * @FilePath: /MusicProject/src/pages/Collection/index.tsx
 */
import React from "react";
import { useTheme } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CollectionScreen from "./components/CollectionList/index";
import CollectionListOptions from "@/components/CollectionListOptions/index";
import CollectionListSongs from "./components/CollectionListSongs/index";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.text,
        style: {
          backgroundColor: colors.surface,
        },
        indicatorStyle: {
          backgroundColor: colors.primary,
        },
        labelStyle: {
          fontFamily: "Nunito-ExtraBold",
          fontSize: 16,
          textTransform: "none",
        },
      }}
    >
      <Tab.Screen name="CollectionList" component={CollectionScreen} />
    </Tab.Navigator>
  );
};

const CollectionStack = () => {
  const theme = useTheme();
  const { colors } = theme;
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
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CollectionListSongs"
        component={CollectionListSongs}
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
    </Stack.Navigator>
  );
};

export default CollectionStack;

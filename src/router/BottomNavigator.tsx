/*
 * @Author: wangshicheng
 * @Date: 2021-04-14 21:10:16
 * @LastEditTime: 2021-04-27 17:51:12
 * @LastEditors: Please set LastEditors
 * @Description: 底部Tab导航集合
 * @FilePath: /MusicProject/src/router/BottomNavigator.ts
 */
import React from "react";
import { useTheme, IconButton } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabBar from "@/components/BottomTabBar/index";
import HomeNavigator from "./HomeNavigator";
import CollectionNavigator from "./CollectionNavigator";
import SearchNavigator from "./SearchNavigator";
interface ITabbarIcon {
  focused: boolean;
  icon: {
    focusedIcon: string;
    disFocusedIcon: string;
  };
}

const Tab = createBottomTabNavigator();
const BottomNavigator = () => {
  const { colors } = useTheme();
  const activeTintColor = colors.primary;
  const inactiveTintColor = "#808080";

  /**
   * @description: 渲染tabbar的不同的ICON状态
   * @param {ITabbarIcon} params
   * @return {*}
   */
  const renderTabbarIcon = (params: ITabbarIcon) => {
    const {
      focused,
      icon: { focusedIcon, disFocusedIcon },
    } = params;
    return (
      <IconButton
        icon={focused ? focusedIcon : disFocusedIcon}
        color={focused ? activeTintColor : inactiveTintColor}
        style={{ padding: 0, margin: 0 }}
      />
    );
  };

  return (
    <Tab.Navigator
      tabBar={(props) => {
        return <BottomTabBar {...props} backgroundColor={colors.surface} />;
      }}
      tabBarOptions={{
        style: { backgroundColor: colors.surface },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return renderTabbarIcon({
              focused,
              icon: {
                focusedIcon: "home",
                disFocusedIcon: "home-outline",
              },
            });
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return renderTabbarIcon({
              focused,
              icon: {
                focusedIcon: "search",
                disFocusedIcon: "search-outline",
              },
            });
          },
        }}
      />
      <Tab.Screen
        name="CollectionList"
        component={CollectionNavigator}
        options={{
          tabBarLabel: "CollectionList",
          tabBarIcon: ({ focused }) => {
            return renderTabbarIcon({
              focused,
              icon: {
                focusedIcon: "browser",
                disFocusedIcon: "browser-outline",
              },
            });
          },
        }}
      />
      {/* <Tab.Screen
        name="Offline"
        component={OfflineScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return renderTabbarIcon({
              focused,
              icon: {
                focusedIcon: "save",
                disFocusedIcon: "save-outline",
              },
            });
          },
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default BottomNavigator;

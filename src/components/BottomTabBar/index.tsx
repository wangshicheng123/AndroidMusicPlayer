/*
 * @Author: wangshicheng
 * @Date: 2021-04-17 23:53:23
 * @LastEditTime: 2021-04-18 17:52:46
 * @LastEditors: Please set LastEditors
 * @Description: 自定义底部tabbar
 * @FilePath: /MusicProject/src/components/BottomTabBar/index.tsx
 */
import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableRipple, Divider, Text } from "react-native-paper";
import { NavigationState } from "@react-navigation/core";
import PlayerBarContainer from "@/components/PlayerBarContainer/index";

interface IProps {
  state: NavigationState;
  descriptors: any;
  navigation: any;
  backgroundColor: string;
}

function BottomTabBar(props: IProps) {
  const { state, descriptors, navigation, backgroundColor } = props;
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ elevation: 4, backgroundColor }}>
      <PlayerBarContainer />
      <Divider />
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableRipple
              key={route.key}
              style={styles.tabButton}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              <View style={styles.labelContainer}>
                {options.tabBarIcon({ focused: isFocused })}
                <Text style={styles.labelStyle}>{label}</Text>
              </View>
            </TouchableRipple>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 4,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    margin: 0,
    padding: 0,
    alignItems: "center",
  },
  labelContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  labelStyle: {
    includeFontPadding: false,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 10,
    letterSpacing: 0.4,
    marginBottom: 4,
    padding: 0,
  },
});

export default BottomTabBar;

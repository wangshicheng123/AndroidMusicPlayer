/*
 * @Author: wangshicheng
 * @Date: 2021-04-22 17:34:52
 * @LastEditTime: 2021-04-28 22:12:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/pages/Search/components/Search/index.tsx
 */
import React, { useRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";
import { useDispatch } from "react-redux";
import { useTheme, Text, IconButton, Surface } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import { useScrollToTop, useNavigation } from "@react-navigation/native";
import { useCollapsibleHeader } from "react-navigation-collapsible";

import Genre from "@/assets/genre.json";
import Screen from "@/components/Screen/index";
import Headline from "@/components/HeadLine/index";
import Title from "@/components/Title/index";
import { fetchSearchResult } from "@/reducers/searchSlice";

interface IGenreProps {
  image: string;
  title: string;
  colors: [];
  id: number;
}

const SearchScreen = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const { colors, roundness } = useTheme();
  const navigation = useNavigation();
  useScrollToTop(ref);

  const {
    onScroll,
    containerPaddingTop,
    scrollIndicatorInsetTop,
    translateY,
  } = useCollapsibleHeader({
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.background,
        height: 10,
      },
    },
  });

  const stickyHeaderHeight = 60;

  /**
   * @description: 点击renderItem项触发
   * @param {object} item
   * @return {*}
   */
  const handleRenderItemPress = (item: IGenreProps) => {
    dispatch(fetchSearchResult({ searchText: "test" }));
    navigation.navigate("Filter", item);
  };

  return (
    <Screen>
      <Animated.FlatList
        onScroll={onScroll}
        contentContainerStyle={{
          paddingTop: containerPaddingTop + stickyHeaderHeight,
        }}
        scrollIndicatorInsets={{
          top: scrollIndicatorInsetTop + stickyHeaderHeight,
        }}
        ref={ref}
        key="Genre"
        data={Genre}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        ListHeaderComponent={() => (
          <Headline style={styles.headline}>All Moods & Genres</Headline>
        )}
        renderItem={({ item }: { item: any }) => (
          <TouchableOpacity
            style={styles.touchableOpacityStyle}
            onPress={() => handleRenderItemPress(item)}
          >
            <LinearGradient
              colors={item.colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.item}
            >
              <Title style={styles.itemTitleStyle}>{item.title}</Title>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />

      <Animated.View
        style={{
          transform: [{ translateY: translateY }],
          position: "absolute",
          backgroundColor: colors.background,
          top: containerPaddingTop,
          height: stickyHeaderHeight,
          width: "100%",
        }}
      >
        <Pressable onPress={() => navigation.navigate("Find")}>
          <Surface
            style={[styles.searchBarContainer, { borderRadius: roundness }]}
          >
            <IconButton icon="search-outline" />
            <Text
              style={[
                styles.searchBarPlaceholder,
                { color: colors.placeholder },
              ]}
            >
              Songs
            </Text>
          </Surface>
        </Pressable>
      </Animated.View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    marginHorizontal: 10,
    marginVertical: 6,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    elevation: 4,
  },
  searchBarPlaceholder: { fontSize: 18, paddingLeft: 8 },
  touchableOpacityStyle: {
    flex: 1,
  },
  item: {
    borderRadius: 4,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    margin: 4,
    elevation: 8,
  },
  itemTitleStyle: {
    color: "white",
  },
  headline: {
    textAlign: "center",
    marginVertical: 4,
  },
});

export default SearchScreen;

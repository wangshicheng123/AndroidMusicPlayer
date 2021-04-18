/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 12:36:26
 * @LastEditTime: 2021-04-18 16:05:59
 * @LastEditors: Please set LastEditors
 * @Description: 横向滚动组件
 * @FilePath: /MusicProject/src/components/HorizontalScrollVIew/index.tsx
 */
import React from "react";
import { Text } from "react-native-paper";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import FastImage from "react-native-fast-image";
import DefaultImage from "../DefaultImage/index";
import { IPlayListItem } from "@/interface/index";

interface IProps {
  handleNavigateToPlaylist: any;
  playLists: IPlayListItem[];
  containerStyle?: ViewStyle;
  imageStyle?: {};
}

const HorizontalScrollView = (props: IProps) => {
  const {
    playLists,
    containerStyle = {},
    imageStyle = {},
    handleNavigateToPlaylist,
  } = props;

  return (
    <FlatList
      horizontal
      data={playLists}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.item, containerStyle]}
          onPress={() => handleNavigateToPlaylist(item)}
        >
          {item.cover ? (
            <FastImage
              source={{
                uri: item.cover,
              }}
              style={[styles.photo, imageStyle]}
            />
          ) : (
            <DefaultImage style={styles.photo} />
          )}

          <Text numberOfLines={2} style={styles.title}>
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    marginBottom: 4,
    marginLeft: 12,
    width: 120,
  },
  title: {
    fontSize: 12,
    marginTop: 8,
    padding: 0,
    fontFamily: "Nunito-Bold",
    includeFontPadding: false,
  },
  photo: {
    borderRadius: 12,
    elevation: 4,
    height: 120,
    width: 120,
  },
});

export default HorizontalScrollView;

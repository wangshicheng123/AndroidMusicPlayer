/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 17:25:30
 * @LastEditTime: 2021-04-19 00:06:27
 * @LastEditors: Please set LastEditors
 * @Description: 收藏组件
 * @FilePath: /MusicProject/src/components/Follow/index.tsx
 */
import React from "react";
import { View, ViewProps, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";

interface IProps {
  style: ViewProps;
  liked: boolean;
  addToFavorite(): void;
  removeFromFavorite(): void;
}

const Follow = (props: IProps) => {
  const { style, liked, addToFavorite, removeFromFavorite } = props;
  return (
    <View style={[style, styles.container]}>
      {liked ? (
        <Chip mode="outlined" onPress={removeFromFavorite}>
          Following
        </Chip>
      ) : (
        <Chip icon="plus" mode="outlined" onPress={addToFavorite}>
          Follow
        </Chip>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Follow;

/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 17:24:19
 * @LastEditTime: 2021-04-19 00:03:16
 * @LastEditors: Please set LastEditors
 * @Description: Like 组件
 * @FilePath: /MusicProject/src/components/Fav/index.tsx
 */
import React from "react";
import { View, ViewProps, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

interface IProps {
  style?: ViewProps;
  liked: boolean;
  addToFavorite: () => void;
  removeFromFavorite: () => void;
}

const Fav = (props: IProps) => {
  const { style, liked, addToFavorite, removeFromFavorite } = props;
  return (
    <View style={[style, styles.container]}>
      {liked ? (
        <IconButton
          animated
          icon="heart"
          onPress={removeFromFavorite}
          color="#f64f59"
        />
      ) : (
        <IconButton animated icon="heart-outline" onPress={addToFavorite} />
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

export default Fav;

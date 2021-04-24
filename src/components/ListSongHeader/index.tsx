/*
 * @Author: wangshicheng
 * @Date: 2021-04-22 18:32:29
 * @LastEditTime: 2021-04-24 10:19:41
 * @LastEditors: Please set LastEditors
 * @Description: 搜索歌曲结果歌曲列表头部组件
 * @FilePath: /MusicProject/src/components/ListSongHeader/index.tsx
 */
import React from "react";
import { View, StyleSheet } from "react-native";
import { Title, Button } from "react-native-paper";
import FastImage from "react-native-fast-image";
import DefaultImage from "@/components/DefaultImage/index";

interface IProps {
  title: string;
  cover: string;
  addSongsToQueue(): void;
}

const ListSongHeader = (props: IProps) => {
  const { title, cover, addSongsToQueue } = props;
  return (
    <>
      <View style={styles.coverContainer}>
        {cover ? (
          <FastImage source={{ uri: cover }} style={styles.artCover} />
        ) : (
          <DefaultImage style={styles.artCover} />
        )}
      </View>
      <View style={styles.titleContainer}>
        <Title>{title}</Title>
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={addSongsToQueue}>
          Play All
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  coverContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    margin: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  artCover: { width: 200, height: 200, elevation: 4, borderRadius: 12 },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
  },
  fillContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListSongHeader;

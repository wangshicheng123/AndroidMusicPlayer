/*
 * @Author: wangshicheng
 * @Date: 2021-04-23 10:55:46
 * @LastEditTime: 2021-04-24 10:20:27
 * @LastEditors: Please set LastEditors
 * @Description: 搜索结果页面
 * @FilePath: /MusicProject/src/pages/Find/index.tsx
 */
import React from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Screen from "@/components/Screen/index";
import SongContainer from "@/components/SongContainer/index";
import { ISongItem } from "@/interface/index";
import { IAppState } from "@/reducers/index";

const FindScreen = () => {
  const navigation = useNavigation();
  const { songDatas = [] } = useSelector((state: IAppState) => state.search);
  return (
    <Screen>
      {songDatas.length ? (
        <FlatList
          data={[...songDatas]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: { item: ISongItem }) => (
            <SongContainer songData={item} goBack={navigation.goBack} />
          )}
        />
      ) : (
        <View style={styles.container}>
          <Text>No songs found</Text>
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FindScreen;

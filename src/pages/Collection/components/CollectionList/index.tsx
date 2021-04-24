/*
 * @Author: wangshicheng
 * @Date: 2021-04-24 11:03:32
 * @LastEditTime: 2021-04-24 19:08:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/pages/Collection/components/Playlist/index.tsx
 */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { List, useTheme, Chip } from "react-native-paper";
import { RefreshControl, SectionList, StyleSheet, View } from "react-native";
import FastImage from "react-native-fast-image";
import Screen from "@/components/Screen/index";
import Title from "@/components/Title/index";
import CreateCollectionDialog from "../CreateCollection/index";
import { IAppState } from "@/reducers/index";
import { ICollectionListItem } from "@/interface/index";

const CollectionListScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const collectionList = useSelector(
    (state: IAppState) => state.collectionList
  );

  /**
   * @description: 跳转至指定歌集详情页面
   * @param {string} collectionListId
   * @return {*}
   */
  const navigateToCollection = (collectionListItem: ICollectionListItem) => {
    navigation.navigate("CollectionListSongs", {
      collecetionListMetadata: collectionListItem,
      songs: collectionListItem.songs,
    });
  };

  /**
   * @description: 展示创建歌集dialog
   * @param {*}
   * @return {*}
   */
  const showDialog = () => {
    setDialogVisible(true);
  };

  /**
   * @description: 隐藏创建歌集dialog
   * @param {*}
   * @return {*}
   */
  const hideDialog = () => {
    setDialogVisible(false);
  };

  /**
   * @description: 刷新歌集列表
   * @param {string}
   * @return {*}
   */
  const refreshCollectionList = () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  return (
    <Screen>
      <CreateCollectionDialog visible={dialogVisible} hideDialog={hideDialog} />
      <SectionList
        ListHeaderComponent={() => (
          <List.Item
            title="Create Collection"
            titleStyle={{ color: colors.primary, fontFamily: "Nunito-Bold" }}
            left={(props) => (
              <List.Icon {...props} icon="plus" color={colors.primary} />
            )}
            onPress={showDialog}
          />
        )}
        ListFooterComponent={() => <View style={styles.listFooterStyle} />}
        sections={[{ title: "Collections", data: collectionList }]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: { item: any }) => (
          <List.Item
            title={item.name}
            description={`by ${item.owner}`}
            left={(props) =>
              item.cover ? (
                <FastImage
                  source={{ uri: item.cover }}
                  style={[styles.artwork, { backgroundColor: colors.surface }]}
                  resizeMode="cover"
                />
              ) : (
                <List.Icon {...props} icon="folder" />
              )
            }
            onPress={() => navigateToCollection(item)}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshCollectionList}
          />
        }
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Title>{title}</Title>
            <Chip
              icon="refresh-outline"
              disabled={refreshing}
              onPress={() => refreshCollectionList()}
            >
              Refresh
            </Chip>
          </View>
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 8,
  },
  artwork: {
    backgroundColor: "#d7d1c9",
    borderRadius: 4,
    height: 50,
    width: 50,
  },
  listFooterStyle: {
    height: 100,
  },
});

export default CollectionListScreen;

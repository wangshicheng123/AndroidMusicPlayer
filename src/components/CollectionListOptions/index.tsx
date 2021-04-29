/*
 * @Author: wangshicheng
 * @Date: 2021-04-24 11:09:34
 * @LastEditTime: 2021-04-29 15:53:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/components/PlaylistOptions/index.tsx
 */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import {
  Title,
  List,
  Portal,
  Subheading,
  useTheme,
  IconButton,
} from "react-native-paper";
import DefaultImage from "@/components/DefaultImage/index";
import RenamePlaylistDailog from "@/components/RenameCollectionLstDailog/index";
import AlertDialog from "@/components/AlertDialog/index";
import {
  modifyCollectionListItem,
  deleteCollectionitem,
} from "@/reducers/collectionListSlice";
import { showNotify } from "@/reducers/notifySlice";
import { ICollectionListItem } from "@/interface/index";
import { request } from "@/utils/fetch";
import { modifyCollection, deleteCollection } from "@/api/index";
import { IAppState } from "@/reducers/index";

interface IProps {
  route: any;
  navigation: any;
}

const CollectionListOptions = (props: IProps) => {
  const { route, navigation } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id: userId } = useSelector((state: IAppState) => state.user.userInfo);

  const [renameDialogVisible, setRenameDialogVisible] = useState<boolean>(
    false
  );
  const [deleteDialogVisible, setDeleteDialogVisible] = useState<boolean>(
    false
  );
  const [showRenderInner, setRenderInner] = useState<boolean>(false);

  const { colors } = theme;
  const {
    collecetionListMetadata,
  }: {
    collecetionListMetadata: ICollectionListItem;
  } = route.params;

  /**
   * @description: 关闭修改歌集名称dialog
   * @param {*}
   * @return {*}
   */
  const handleHideRenameDialog = () => {
    setRenameDialogVisible(false);
  };

  /**
   * @description: 展示修改歌集名称dialog
   * @param {*}
   * @return {*}
   */
  const handleOpenRenameDialog = () => {
    setRenameDialogVisible(true);
  };

  /**
   * @description: 关闭删除歌集alert
   * @param {*}
   * @return {*}
   */
  const handleHideDeleteDialog = () => {
    closeBottomSheet();
    setDeleteDialogVisible(false);
  };

  /**
   * @description: 展示删除歌集alert
   * @param {*}
   * @return {*}
   */
  const handleOpenDeleteDialog = () => {
    setDeleteDialogVisible(true);
  };

  /**
   * @description: 处理删除歌集逻辑
   * @param {*}
   * @return {*}
   */
  const handleDeleteCollection = async () => {
    const { collection_id } = collecetionListMetadata;
    await request(deleteCollection, {
      collection_id: collection_id,
      user_id: userId,
    })
      ?.then(() => {
        dispatch(
          deleteCollectionitem({
            collectionId: collection_id,
          })
        );
        dispatch(showNotify({ content: "修改成功" }));
      })
      .catch(() => {
        dispatch(showNotify({ content: "修改失败" }));
      });
    handleHideDeleteDialog();
    navigation.navigate("CollectionList");
  };

  /**
   * @description: 修改歌集名称
   * @param {string} playlistName
   * @return {*}
   */
  const handleRenameCollection = async (collectionListName?: string) => {
    const { collection_id } = collecetionListMetadata;
    handleHideRenameDialog();
    const moidifyRes = await request(modifyCollection, {
      collection_id: collection_id,
      collection_name: collectionListName,
    })
      ?.then(() => {
        dispatch(
          modifyCollectionListItem({
            collectionId: collection_id,
            collectionName: collectionListName,
          })
        );
        dispatch(showNotify({ content: "成功修改歌集名称" }));
      })
      .catch(() => {
        dispatch(showNotify({ content: "修改歌集名称失败" }));
      });
    closeBottomSheet();
    navigation.navigate("CollectionList");
  };

  /**
   * @description: 打开底部dialog
   * @param {*}
   * @return {*}
   */
  const openBottomSheet = () => {
    setRenderInner(true);
  };

  /**
   * @description: 关闭底部dialog
   * @param {*}
   * @return {*}
   */
  const closeBottomSheet = () => {
    setRenderInner(false);
  };

  const renderInner = () => {
    const { collection_name, user_name } = collecetionListMetadata;
    return (
      <View style={styles.container}>
        <View
          style={{ backgroundColor: colors.surface, ...styles.dialogContainer }}
        >
          <View style={styles.dialogStyle}>
            <View
              style={{
                backgroundColor: colors.surface,
                ...styles.closeBtnStyle,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  closeBottomSheet();
                }}
              >
                <IconButton icon="close" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={closeBottomSheet}
              style={styles.collectionInfoStyle}
            >
              <>
                <DefaultImage style={styles.artCover} />
                <Title>{collection_name}</Title>
                <Subheading>{`by ${user_name}`}</Subheading>
              </>
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: colors.surface }}>
            {/* <TouchableOpacity
              onPress={() => dispatch(addToLikeSongQueue(songs))}
            >
              <List.Item
                title="like"
                left={(props) => <List.Icon {...props} icon="heart" />}
              />
            </TouchableOpacity> */}
            <TouchableOpacity onPress={handleOpenDeleteDialog}>
              <List.Item
                title="Delete Playlist"
                left={(props) => <List.Icon {...props} icon="trash-outline" />}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOpenRenameDialog}>
              <List.Item
                title="Rename Playlist"
                left={(props) => <List.Icon {...props} icon="edit-outline" />}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Portal>{showRenderInner ? renderInner() : null}</Portal>
      <RenamePlaylistDailog
        renameDialogVisible={renameDialogVisible}
        hideDialog={handleHideRenameDialog}
        collectionListName={collecetionListMetadata.collection_name}
        handleRenameCollection={handleRenameCollection}
      />
      <AlertDialog
        visible={deleteDialogVisible}
        title="Delete playlist"
        message={`Are you sure you want to delete ${collecetionListMetadata.collection_name}`}
        action={handleDeleteCollection}
        hideDialog={handleHideDeleteDialog}
      />
      <IconButton
        icon="more-vertical-outline"
        onPress={() => {
          openBottomSheet();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  artCover: { width: 200, height: 200, elevation: 4, borderRadius: 12 },
  container: {
    height: "100%",
    justifyContent: "flex-end",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1000,
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
  },
  dialogContainer: {
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
  },
  dialogStyle: {
    justifyContent: "center",
    alignItems: "center",
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
    zIndex: 1500,
  },
  closeBtnStyle: {
    justifyContent: "center",
    alignItems: "flex-end",
    width: "100%",
    height: 50,
    marginBottom: 16,
    elevation: 2,
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
  },
  collectionInfoStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
  },
});

export default CollectionListOptions;

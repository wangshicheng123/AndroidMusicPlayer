/*
 * @Author: wangshicheng
 * @Date: 2021-04-24 11:09:34
 * @LastEditTime: 2021-04-24 23:19:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/components/PlaylistOptions/index.tsx
 */
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
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
import { addToPlayingQueue, addToLikeSongQueue } from "@/reducers/queueSlice";

interface IProps {
  route: any;
  navigation: any;
}

const CollectionListOptions = (props: IProps) => {
  const { route, navigation } = props;
  const theme = useTheme();
  const dispatch = useDispatch();

  const [renameDialogVisible, setRenameDialogVisible] = useState<boolean>(
    false
  );
  const [deleteDialogVisible, setDeleteDialogVisible] = useState<boolean>(
    false
  );
  const [showRenderInner, setRenderInner] = useState<boolean>(false);

  const { colors } = theme;
  const { collecetionListMetadata, songs } = route.params;

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
    closeBottomSheet();
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
  const handleDeleteCollectionItem = () => {
    dispatch(
      deleteCollectionitem({
        collectionId: collecetionListMetadata.id,
      })
    );
    navigation.goBack();
  };

  /**
   * @description: 修改歌集名称
   * @param {string} playlistName
   * @return {*}
   */
  const handleRename = (collectionListName: string) => {
    const { id } = collecetionListMetadata;
    handleHideRenameDialog();
    dispatch(
      modifyCollectionListItem({
        collectionId: id,
        collectionName: collectionListName,
      })
    );
    navigation.goBack();
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

  /**
   * @description: 添加到播放队列
   * @param {*}
   * @return {*}
   */
  const addSongToQueue = () => {
    dispatch(addToPlayingQueue(songs));
  };

  const renderInner = () => {
    const { name, owner } = collecetionListMetadata;
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
                  console.log("aaa");
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
                <Title>{name}</Title>
                <Subheading>{`by ${owner}`}</Subheading>
              </>
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: colors.surface }}>
            <TouchableOpacity onPress={addSongToQueue}>
              <List.Item
                title="Play All"
                left={(props) => (
                  <List.Icon {...props} icon="play-circle-outline" />
                )}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch(addToLikeSongQueue(songs))}
            >
              <List.Item
                title="like"
                left={(props) => <List.Icon {...props} icon="heart" />}
              />
            </TouchableOpacity>
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
        visible={renameDialogVisible}
        hideDialog={handleHideRenameDialog}
        collectionListName={collecetionListMetadata.name}
        handleRename={handleRename}
      />
      <AlertDialog
        visible={deleteDialogVisible}
        title="Delete playlist"
        message={`Are you sure you want to delete ${collecetionListMetadata.name}`}
        action={handleDeleteCollectionItem}
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

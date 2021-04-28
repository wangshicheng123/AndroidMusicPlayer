/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 17:40:21
 * @LastEditTime: 2021-04-28 09:57:43
 * @LastEditors: Please set LastEditors
 * @Description: 收藏歌曲到歌集
 * @FilePath: /MusicProject/src/components/PlaylistDialog/index.tsx
 */
import React from "react";
import { List, Dialog, Portal, Button } from "react-native-paper";
import { FlatList, StyleSheet } from "react-native";
import { ICollectionListItem } from "@/interface/index";
import { useSelector } from "react-redux";
import { IAppState } from "@/reducers/index";

interface Props {
  visible: boolean;
  hideModal(): void;
  addSongToCollectionList(collectionId?: number): void;
}

const PlaylistDialog = (props: Props) => {
  const { visible, hideModal, addSongToCollectionList } = props;
  const collectionList = useSelector(
    (state: IAppState) => state.collectionList.userCollections
  );
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideModal}>
        <Dialog.Title style={styles.dialogTextStyle}>
          {collectionList.length ? "Add to Playlist" : "No playlists found"}
        </Dialog.Title>

        <Dialog.ScrollArea>
          <FlatList
            data={collectionList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }: { item: ICollectionListItem }) => (
              <List.Item
                title={item.collection_name}
                description={`by ${item.user_name}`}
                left={(props) => <List.Icon {...props} icon="folder-outline" />}
                onPress={() => addSongToCollectionList(item.collection_id)}
              />
            )}
          />
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button mode="contained" onPress={() => hideModal()}>
            Close
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialogTextStyle: {
    textAlign: "center",
  },
});

export default PlaylistDialog;

/*
 * @Author: your name
 * @Date: 2021-04-18 17:40:21
 * @LastEditTime: 2021-04-19 00:11:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/components/PlaylistDialog/index.tsx
 */
import React from "react";
import { List, Dialog, Portal, Button } from "react-native-paper";
import { FlatList, StyleSheet } from "react-native";
// import { getUserPlaylists } from '../actions/realmAction';

interface Props {
  visible: boolean;
  hideModal(): void;
  addToPlaylist(id: string): void;
}

interface PlaylistProps {
  id: string;
  name: string;
  owner: string;
}

const PlaylistDialog = ({ visible, hideModal, addToPlaylist }: Props) => {
  // const data = getUserPlaylists();
  const data: any = [];
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideModal}>
        <Dialog.Title style={styles.dialogTextStyle}>
          {data.length ? "Add to Playlist" : "No playlists found"}
        </Dialog.Title>

        <Dialog.ScrollArea>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }: { item: PlaylistProps }) => (
              <List.Item
                title={item.name}
                description={`by ${item.owner}`}
                left={(props) => <List.Icon {...props} icon="folder-outline" />}
                onPress={() => addToPlaylist(item.id)}
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

/*
 * @Author: wangshicheng
 * @Date: 2021-04-24 11:11:01
 * @LastEditTime: 2021-04-27 21:29:27
 * @LastEditors: Please set LastEditors
 * @Description: 编辑歌集名称
 * @FilePath: /MusicProject/src/components/RenamePlaylistDailog/index.tsx
 */
import React, { useState } from "react";
import { Dialog, Portal, Button, TextInput } from "react-native-paper";

interface IProps {
  renameDialogVisible: boolean;
  collectionListName?: string;
  hideDialog: () => void;
  handleRenameCollection: (collectionName?: string) => void;
}

const RenameCollectionLstDailog = (props: IProps) => {
  const {
    renameDialogVisible,
    collectionListName,
    hideDialog,
    handleRenameCollection,
  } = props;
  const [collectionName, setCollectionName] = useState(collectionListName);

  /**
   * @description: 获取新歌集名称
   * @param {string} value
   * @return {*}
   */
  const onChangeText = (value: string) => {
    setCollectionName(value);
  };

  /**
   * @description: 修改歌集名称
   * @param {*}
   * @return {*}
   */
  const handleSubmit = () => {
    handleRenameCollection(collectionName);
  };

  return (
    <Portal>
      <Dialog visible={renameDialogVisible} onDismiss={hideDialog}>
        <Dialog.Title>Renaming</Dialog.Title>
        <Dialog.Content>
          <TextInput
            mode="outlined"
            label="Playlist Name"
            value={collectionName}
            onChangeText={onChangeText}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button onPress={handleSubmit}>Rename</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default RenameCollectionLstDailog;

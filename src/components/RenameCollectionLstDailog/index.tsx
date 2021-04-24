/*
 * @Author: wangshicheng
 * @Date: 2021-04-24 11:11:01
 * @LastEditTime: 2021-04-24 22:49:57
 * @LastEditors: Please set LastEditors
 * @Description: 编辑歌集名称
 * @FilePath: /MusicProject/src/components/RenamePlaylistDailog/index.tsx
 */
import React, { useState } from "react";
import { Dialog, Portal, Button, TextInput } from "react-native-paper";

interface IProps {
  visible: boolean;
  collectionListName: string;
  hideDialog: () => void;
  handleRename: (name: string) => void;
}

const RenameCollectionLstDailog = (props: IProps) => {
  const { visible, collectionListName, hideDialog, handleRename } = props;
  const [name, setName] = useState(collectionListName);

  /**
   * @description: 获取新歌集名称
   * @param {string} value
   * @return {*}
   */
  const onChangeText = (value: string) => {
    setName(value);
  };

  /**
   * @description: 修改歌集名称
   * @param {*}
   * @return {*}
   */
  const handleSubmit = () => {
    handleRename(name);
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Renaming</Dialog.Title>
        <Dialog.Content>
          <TextInput
            mode="outlined"
            label="Playlist Name"
            value={name}
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

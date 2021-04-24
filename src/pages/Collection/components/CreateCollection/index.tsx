/*
 * @Author: wangshicheng
 * @Date: 2021-04-24 15:19:59
 * @LastEditTime: 2021-04-24 17:42:10
 * @LastEditors: Please set LastEditors
 * @Description: 创建歌集dialog
 * @FilePath: /MusicProject/src/pages/Collection/components/CreateCollection/index.tsx
 */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Portal, Dialog, TextInput, Button } from "react-native-paper";
import { createCollectionList } from "@/reducers/collectionListSlice";

interface IProps {
  visible: boolean;
  hideDialog: () => void;
}

const CreateCollection = (props: IProps) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");
  const { visible, hideDialog } = props;
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Enter your playlist name</Dialog.Title>
        <Dialog.Content>
          <TextInput
            mode="outlined"
            label="Playlist Name"
            value={value}
            onChangeText={(val: string) => {
              setValue(val);
            }}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              setValue("");
              hideDialog();
            }}
          >
            Cancel
          </Button>
          <Button
            onPress={() => {
              dispatch(
                createCollectionList({
                  id: Math.random().toString(),
                  name: value,
                  owner: "system",
                  cover: "",
                  songs: [],
                })
              );
              hideDialog();
            }}
          >
            Create
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CreateCollection;

/*
 * @Author: wangshicheng
 * @Date: 2021-04-24 15:19:59
 * @LastEditTime: 2021-04-27 18:46:32
 * @LastEditors: Please set LastEditors
 * @Description: 创建歌集dialog
 * @FilePath: /MusicProject/src/pages/Collection/components/CreateCollection/index.tsx
 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Portal, Dialog, TextInput, Button } from "react-native-paper";
import { createCollectionList } from "@/reducers/collectionListSlice";
import { showNotify } from "@/reducers/notifySlice";
import { request } from "@/utils/fetch";
import { createCollection, findCollection } from "@/api/index";
import { IAppState } from "@/reducers/index";

interface IProps {
  visible: boolean;
  hideDialog: () => void;
}

const CreateCollection = (props: IProps) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>("");
  const { id: userId } = useSelector((state: IAppState) => state.user.userInfo);
  const { visible, hideDialog } = props;

  /**
   * @description: 创建歌集，然后刷新歌集列表数据
   * @param {*} async
   * @return {*}
   */
  const handleCreateCollection = async () => {
    /* 先插入数据 */
    await request(createCollection, {
      collection_name: value,
      collection_cover: "",
      user_id: userId,
    });
    /* 然后查询数据 */
    const collectionDatas = await request(findCollection, {
      user_id: userId,
    });
    /* 更新数据 */
    dispatch(createCollectionList(collectionDatas.data || []));
    dispatch(showNotify({ content: "创建成功" }));
    hideDialog();
  };

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
          <Button onPress={handleCreateCollection}>Create</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CreateCollection;

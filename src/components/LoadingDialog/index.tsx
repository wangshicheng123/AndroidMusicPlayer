/*
 * @Author: your name
 * @Date: 2021-04-22 15:17:28
 * @LastEditTime: 2021-04-22 15:17:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/components/LoadingDialog/index.tsx
 */
import React from "react";
import { Dialog, Portal, ActivityIndicator } from "react-native-paper";

interface LoadingProps {
  visible: boolean;
  title: string;
}

const LoadingDialog = ({ visible, title }: LoadingProps) => {
  return (
    <Portal>
      <Dialog visible={visible}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <ActivityIndicator />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default LoadingDialog;

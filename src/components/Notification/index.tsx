/*
 * @Author: wangshicheng
 * @Date: 2021-04-19 15:42:07
 * @LastEditTime: 2021-04-19 16:26:13
 * @LastEditors: Please set LastEditors
 * @Description: 状态信息提示
 * @FilePath: /MusicProject/src/components/Notify/index.tsx
 */
import React from "react";
import { StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { IAppState } from "@/reducers/index";
import { hiddenNotify } from "@/reducers/notifySlice";

const Notification = () => {
  const dispatch = useDispatch();
  const { content, visible } = useSelector((state: IAppState) => state.notify);
  return (
    <Snackbar
      style={styles.container}
      visible={visible}
      onDismiss={() => dispatch(hiddenNotify())}
      duration={1000}
      action={{
        label: "Dismiss",
        onPress: () => dispatch(hiddenNotify()),
      }}
    >
      {content}
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 120,
    zIndex: 10,
  },
});

export default Notification;

/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 12:01:12
 * @LastEditTime: 2021-04-18 12:07:12
 * @LastEditors: Please set LastEditors
 * @Description: 网络异常提示
 * @FilePath: /MusicProject/src/components/NetNotify/index.tsx
 */

import React from "react";
import { Banner, IconButton } from "react-native-paper";
import { useNetInfo } from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/core";

const NetNotify = () => {
  const netInfo = useNetInfo();
  const navigation = useNavigation();

  return (
    <Banner
      visible={!netInfo.isConnected}
      actions={[
        {
          label: "Go offline",
          onPress: () => navigation.navigate("Offline"),
        },
      ]}
      icon={({ size }: { size: number }) => (
        <IconButton icon="wifi-off-outline" size={size} />
      )}
    >
      Your network is unavailable. Check your data or wifi connection.
    </Banner>
  );
};

export default NetNotify;

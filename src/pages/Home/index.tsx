/*
 * @Author: your name
 * @Date: 2021-04-13 17:03:23
 * @LastEditTime: 2021-04-29 19:19:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/pages/Home/index.tsx
 */

import React, { useRef } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { useScrollToTop } from "@react-navigation/native";
import Screen from "@/components/Screen";
import NetNotify from "@/components/NetNotify";
import ShortcutNavigate from "./components/ShortcutNavigate/index";
import OnlineSongs from "./components/OnlineSongs/index";
const Divider = () => <View style={{ marginVertical: 8 }} />;
const Home = () => {
  const ref = useRef(null);
  useScrollToTop(ref);

  return (
    <Screen>
      <ScrollView ref={ref}>
        <NetNotify />
        <ShortcutNavigate />
        <OnlineSongs />
        <Divider />

        {/* <View>
          <Text>测试</Text>
        </View> */}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;

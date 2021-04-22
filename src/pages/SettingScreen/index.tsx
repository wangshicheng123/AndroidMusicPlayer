/*
 * @Author: your name
 * @Date: 2021-04-22 15:16:35
 * @LastEditTime: 2021-04-22 16:47:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/pages/SettingScreen/index.tsx
 */
import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import {
  Text,
  Switch,
  Drawer,
  TouchableRipple,
  useTheme,
  List,
  Avatar,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackScreenProps } from "@react-navigation/stack";
import Screen from "@/components/Screen/index";
// import { updateTheme, changeRadioMode } from '../../actions';
// import { clearHistory } from '../../actions/playerState';
import AlertDialog from "@/components/AlertDialog/index";
// import { googleSignIn, removeUserInfo } from '../../actions/userState';
// import { log } from '../../utils/logging';
import LoadingDialog from "@/components/LoadingDialog";
import DiagnoseDialog from "@/components/DiagnoseDialog/index";
import { updateThemeType, TThemeType } from "@/reducers/configSlice";
import { clearHistoryQueue } from "@/reducers/queueSlice";
import {
  getGoogleAccessAuthorization,
  clearUserInfo,
} from "@/reducers/userSlice";
import { IAppState } from "@/reducers/index";

const SettingScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const themeType = useSelector((state: IAppState) => state.config.themeType);
  const { googleAccessAuthorization, userInfo } = useSelector(
    (state: IAppState) => state.user
  );

  const [isDark, setIsDark] = useState(themeType === "dark");
  const [loading, setLoading] = useState(false);
  const [clearHistoryALertVisible, setClearHistoryALertVisible] = useState(
    false
  );
  // const [diagnoseDialog, setDiagnoseDialog] = useState(false);

  /**
   * @description: 切换APP主题色
   * @param {boolean} isDark
   * @return {*}
   */
  const handleToggleTheme = (value: boolean) => {
    setIsDark(value);
    let themeType: TThemeType = "light";
    if (value) {
      themeType = "dark";
    }
    dispatch(updateThemeType(themeType));
  };

  /**
   * @description: 退出登陆
   * @param {*} async
   * @return {*}
   */
  const signOut = async () => {
    try {
      setLoading(true);
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await AsyncStorage.clear();
      dispatch(clearUserInfo());
      setLoading(false);
      navigation.navigate("Intro");
    } catch (error) {
      console.log(error);
      setLoading(false);
      navigation.navigate("Intro");
    }
  };

  /**
   * @description: 重新登陆
   * @param {*} async
   * @return {*}
   */
  const signIn = async () => {
    try {
      dispatch(getGoogleAccessAuthorization());
    } catch (error) {
      console.log(error);
    }
  };

  const handelClearData = () => {
    dispatch(clearHistoryQueue());
    setClearHistoryALertVisible(false);
  };

  return (
    <Screen>
      <AlertDialog
        visible={clearHistoryALertVisible}
        title="Clear History"
        message="Do you want to clear all your songs history ?"
        action={handelClearData}
        hideDialog={() => setClearHistoryALertVisible(false)}
      />
      {/* <DiagnoseDialog
        visible={diagnoseDialog}
        hideDialog={() => setDiagnoseDialog(false)}
      /> */}
      <LoadingDialog visible={loading} title="Logging you out" />
      <ScrollView>
        {!userInfo.name && (
          <List.Item
            title={userInfo.name}
            description={userInfo.email}
            left={(props) =>
              userInfo.photo ? (
                <Avatar.Image {...props} source={{ uri: userInfo.photo }} />
              ) : (
                <List.Icon {...props} icon="person-outline" />
              )
            }
          />
        )}
        <Drawer.Section title="Preferences">
          <View style={styles.preference}>
            <Text>Dark Theme</Text>
            <View>
              <Switch onValueChange={handleToggleTheme} value={isDark} />
            </View>
          </View>
        </Drawer.Section>
        <Drawer.Section title="Data">
          {/* <Drawer.Item
            onPress={() => setDiagnoseDialog(true)}
            label="Diagnostics"
            icon="alert-circle-outline"
          /> */}
          <Drawer.Item
            onPress={() => setClearHistoryALertVisible(true)}
            label="Clear history"
            icon="trash-outline"
          />
          {!googleAccessAuthorization || !userInfo.name ? (
            <Drawer.Item
              onPress={signIn}
              label="Sign In"
              icon="log-in-outline"
            />
          ) : (
            <Drawer.Item
              onPress={signOut}
              label="Sign Out"
              icon="log-out-outline"
            />
          )}
        </Drawer.Section>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default SettingScreen;

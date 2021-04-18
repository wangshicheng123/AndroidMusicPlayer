/*
 * @Author: wangshicheng
 * @Date: 2021-04-14 21:42:43
 * @LastEditTime: 2021-04-18 23:09:46
 * @LastEditors: Please set LastEditors
 * @Description: 用户信息状态管理
 * @FilePath: /MusicProject/src/reducers/userSlice.ts
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PermissionsAndroid } from "react-native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";

type userInfo = {
  photo?: string | null;
  email?: string;
  familyName?: string | null;
  givenName?: string | null;
  name?: string | null;
};
export interface IInitialUserState {
  userInfo: userInfo;
  googleAccessAuthorization: boolean;
  localLibraryAccessAuthorization: boolean;
  introductionVisited: boolean; // 是否已经访问过初始化介绍页面
}

const initialState: IInitialUserState = {
  userInfo: {},
  googleAccessAuthorization: false,
  localLibraryAccessAuthorization: false,
  introductionVisited: false,
};

/**
 * @description: 获取用户本地资源的访问权限
 * @param {*}
 * @return {*}
 */
export const getLocalLiraryAccessAuthorition = createAsyncThunk(
  "user/getLocalLiraryAccessAuthorition",
  async () => {
    const accessAuthorition = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE &&
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "Grant Access",
        message:
          "Serenity App needs access to your EXTERNAL_STORAGE " +
          "so you can take play offline songs.",
        buttonNeutral: "Ask Me Later",
        buttonPositive: "OK",
      }
    );
    return accessAuthorition;
  }
);

/**
 * @description: Google Login
 * @param {*}
 * @return {*}
 */
export const getGoogleAccessAuthorization = createAsyncThunk(
  "user/getGoogleAccessAuthorization",
  async () => {
    let userInfo: userInfo = {};
    try {
      GoogleSignin.configure({
        offlineAccess: false,
      });
      await GoogleSignin.hasPlayServices();
      const sighInUserInfo = await GoogleSignin.signIn();
      userInfo = sighInUserInfo.user;

      const token = await GoogleSignin.getTokens();
      await AsyncStorage.setItem("@token", token.accessToken);
      // console.log('wahgkagefk', userInfo, token.accessToken);
    } catch (error) {
      // console.log('error', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
    return userInfo;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    visitIntroductionPage: (
      state: IInitialUserState,
      action: {
        type: string;
        payload: boolean;
      }
    ) => {
      const isVisited = action.payload;
      state.introductionVisited = isVisited;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getLocalLiraryAccessAuthorition.fulfilled,
      (state: IInitialUserState, action) => {
        const granted = action.payload;
        if (PermissionsAndroid.RESULTS.GRANTED === granted) {
          state.localLibraryAccessAuthorization = true;
        } else {
          state.localLibraryAccessAuthorization = false;
        }
      }
    );
    builder.addCase(
      getLocalLiraryAccessAuthorition.rejected,
      (state: IInitialUserState) => {
        state.localLibraryAccessAuthorization = false;
      }
    );
    builder.addCase(
      getGoogleAccessAuthorization.fulfilled,
      (
        state: IInitialUserState,
        action: {
          type: string;
          payload: userInfo;
        }
      ) => {
        state.userInfo = action.payload;
        state.googleAccessAuthorization = true;
      }
    );
    builder.addCase(
      getGoogleAccessAuthorization.rejected,
      (state: IInitialUserState) => {
        state.userInfo = {};
        state.googleAccessAuthorization = false;
      }
    );
  },
});

export const { visitIntroductionPage } = userSlice.actions;

export default userSlice.reducer;

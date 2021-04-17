/*
 * @Author: wangshicheng
 * @Date: 2021-04-15 21:12:19
 * @LastEditTime: 2021-04-17 18:37:35
 * @LastEditors: Please set LastEditors
 * @Description: 授权可以访问用户本地的额外资源
 * @FilePath: /MusicProject/src/pages/Introduction/components/LocalLibraryAccess/index.tsx
 */
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { IAppState } from "@/reducers/index";
import { Button } from "react-native-paper";
import { getLocalLiraryAccessAuthorition } from "@/reducers/userSlice";

interface IProps {
  color: string;
  handleNavigate2nextPage: () => void;
}

const LocalLibraryAccess = (props: IProps) => {
  const { color, handleNavigate2nextPage } = props;
  const dispatch = useDispatch();
  const localLibraryAccessAuthorization = useSelector(
    (state: IAppState) => state.user.localLibraryAccessAuthorization
  );
  // console.log(
  //   '==>>>>>localLibraryAccessGiven',
  //   localLibraryAccessAuthorization,
  // );
  useEffect(() => {
    // 触发获取最新的外部资源访问权限，同时更新redux状态，同步UI展示
    // dispatch(getLocalLiraryAccessAuthorition());
  }, [dispatch]);

  const handleBtnPress = () => {
    dispatch(getLocalLiraryAccessAuthorition());
    // handleNavigate2nextPage();
  };

  if (localLibraryAccessAuthorization) {
    return (
      <Button
        mode="contained"
        icon="done-all"
        color={color}
        onPress={handleNavigate2nextPage}
      >
        Done
      </Button>
    );
  }

  return (
    <Button
      mode="contained"
      icon="unlock-outline"
      color={color}
      onPress={handleBtnPress}
    >
      Allow Access
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LocalLibraryAccess;

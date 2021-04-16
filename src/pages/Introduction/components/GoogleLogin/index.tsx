/*
 * @Author: wangshicheng
 * @Date: 2021-04-15 21:17:46
 * @LastEditTime: 2021-04-16 23:28:26
 * @LastEditors: Please set LastEditors
 * @Description: 使用Google登陆
 * @FilePath: /MusicProject/src/pages/Introduction/components/GoogleLogin/index.tsx
 */

import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {IAppState} from '../../../../reducers/index';
import {getGoogleAccessAuthorization} from '../../../../reducers/userSlice';

interface IProps {
  color: string;
  handleNavigate2nextPage: () => void;
}
const GoogleLogin = (props: IProps) => {
  const {color, handleNavigate2nextPage} = props;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // 用户信息现在还没有使用到
  const {googleAccessAuthorization, userInfo} = useSelector(
    (state: IAppState) => state.user,
  );

  useEffect(() => {
    if (googleAccessAuthorization) {
      navigation.navigate('App');
    }
  }, [googleAccessAuthorization, navigation]);

  /**
   * @description: 处理点击第三方Google登陆操作
   * @param {*}
   * @return {*}
   */
  const handleSignIn = () => {
    dispatch(getGoogleAccessAuthorization());
  };

  // 这段代码应该没有作用了
  if (googleAccessAuthorization) {
    return (
      <Button
        mode="contained"
        icon="done-all"
        color={color}
        onPress={handleNavigate2nextPage}>
        Done
      </Button>
    );
  }
  return (
    <GoogleSigninButton
      style={styles.googleLoginBtn}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={handleSignIn}
      disabled={googleAccessAuthorization}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  googleLoginBtn: {
    width: 192,
    height: 48,
  },
});

export default GoogleLogin;

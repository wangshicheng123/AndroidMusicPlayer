/*
 * @Author: wangshicheng
 * @Date: 2021-04-08 10:18:19
 * @LastEditTime: 2021-04-11 16:35:03
 * @LastEditors: Please set LastEditors
 * @Description: 登陆页面
 * @FilePath: /MusicProject/src/pages/Login/index.tsx
 */

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {Formik} from 'formik';

interface IProps {
  navigation: any;
}
interface IUserInfo {
  email?: string;
  password?: string;
}

const Login = (props: IProps) => {
  const [errMsgs, setErrMsgs] = useState<{
    email?: string;
    password?: string;
  }>({
    email: '',
    password: '',
  });
  const {navigation} = props;

  /**
   * @description: 校验登陆用户信息
   * @param {IUserInfo} userInfo
   * @return {*}
   */
  const checkValidUserInfo = (userInfo: IUserInfo): boolean => {
    const {email, password} = userInfo;
    if (!email || !password) {
      setErrMsgs({
        email: email ? '' : 'Enter a valid message',
        password: password ? '' : 'Enter a valid message',
      });
      return false;
    }
    return true;
  };

  /**
   * @description: 提交登陆用户信息
   * @param {IUserInfo} userInfo
   * @return {*}
   */
  const handleLogin = (userInfo: IUserInfo) => {
    const isValid = checkValidUserInfo(userInfo);
    if (!isValid) {
      return;
    }
    /*
      调用数据库查询是否存在此用户信息，
      如果存在则直接跳转到首页
      否则提示未注册，先进行注册
    */
    navigation.navigate('Home');
  };

  return (
    <Formik initialValues={{email: '', password: ''}} onSubmit={handleLogin}>
      {({handleChange, handleSubmit, values}) => (
        <View style={styles.container}>
          <Input
            placeholder="Email"
            errorStyle={styles.errorInputStyle}
            errorMessage={errMsgs.email}
            leftIcon={{type: 'ionicon', name: 'mail-outline'}}
            onChangeText={handleChange('email')}
            value={values.email}
          />
          <Input
            placeholder="Password"
            errorStyle={styles.errorInputStyle}
            errorMessage={errMsgs.password}
            leftIcon={{type: 'ionicon', name: 'lock-closed-outline'}}
            onChangeText={handleChange('password')}
            value={values.password}
          />
          <View style={styles.btnRegister}>
            <Button title="Login" onPress={handleSubmit} />
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnRegister: {
    width: '80%',
    marginTop: 20,
  },
  errorInputStyle: {
    color: 'red',
  },
});

export default Login;

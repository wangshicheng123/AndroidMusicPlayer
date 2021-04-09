/*
 * @Author: wangshicheng
 * @Date: 2021-04-08 10:18:26
 * @LastEditTime: 2021-04-09 15:20:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/pages/Register/index.tsx
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
  confirmPassword?: string;
}

const Register = (props: IProps) => {
  const [errMsgs, setErrMsgs] = useState<IUserInfo>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const {navigation} = props;

  /**
   * @description: 用户信息校验
   * @param {IUserInfo} userInfo
   * @return {*}
   */
  const checkValidUserInfo = (userInfo: IUserInfo): boolean => {
    const {email, password, confirmPassword} = userInfo;
    if (!email || !password || !confirmPassword) {
      setErrMsgs({
        email: email ? '' : 'Enter a valid message',
        password: password ? '' : 'Enter a valid message',
        confirmPassword: confirmPassword ? '' : 'Enter a valid message',
      });
      return false;
    }
    return true;
  };

  /**
   * @description: 提交注册用户信息
   * @param {*}
   * @return {*}
   */
  const handleRegister = (userInfo: IUserInfo) => {
    const isValid = checkValidUserInfo(userInfo);
    if (!isValid) {
      return;
    }
    if (userInfo.password !== userInfo.confirmPassword) {
      setErrMsgs({
        confirmPassword: 'The two passwords are not the same',
      });
      return;
    }
    /*
      提交注册用户信息到数据库中进行存储
      成功之后跳转到登陆页面进行登陆操作
    */
    navigation.navigate('Home');
  };

  return (
    <Formik
      initialValues={{email: '', password: '', confirmPassword: ''}}
      onSubmit={handleRegister}>
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
          <Input
            placeholder="Confirm Password"
            errorStyle={styles.errorInputStyle}
            errorMessage={errMsgs.confirmPassword}
            leftIcon={{type: 'ionicon', name: 'lock-closed-outline'}}
            onChangeText={handleChange('confirmPassword')}
            value={values.confirmPassword}
          />
          <View style={styles.btnRegister}>
            <Button title="Register" onPress={handleSubmit} />
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

export default Register;

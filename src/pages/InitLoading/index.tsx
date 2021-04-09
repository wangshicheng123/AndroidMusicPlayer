/*
 * @Author: wangshicheng
 * @Date: 2021-04-08 09:57:02
 * @LastEditTime: 2021-04-08 19:14:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/pages/InitLoading/index.tsx
 */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

interface IProps {
  navigation: any;
}

const InitLoading = (props: IProps) => {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <View style={styles.btnLogin}>
        <Button
          title="SIGN IN"
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
      </View>
      <View style={styles.btnRegister}>
        <Button
          title="SIGN UP"
          onPress={() => {
            navigation.navigate('Register');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLogin: {
    width: 200,
    marginBottom: 50,
  },
  btnRegister: {
    width: 200,
  },
});

export default InitLoading;

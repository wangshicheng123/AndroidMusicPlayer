/*
 * @Author: wangshicheng
 * @Date: 2021-04-14 21:37:27
 * @LastEditTime: 2021-04-15 21:46:10
 * @LastEditors: Please set LastEditors
 * @Description: APP 初始化页面
 * @FilePath: /MusicProject/src/pages/Launch/index.tsx
 */
import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Launch = () => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {introductionVisited} = useSelector((state: any) => state.user);

  /**
   * @description: 判断用户是否已经登陆
   * @param {*} async
   * @return {*}
   */
  const isSignedIn = async () => {
    if (introductionVisited) {
      navigation.navigate('App');
    } else {
      navigation.navigate('Intro');
    }
  };

  useEffect(() => {
    isSignedIn();
  });
  return (
    <View style={{backgroundColor: colors.background, ...styles.container}} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Launch;

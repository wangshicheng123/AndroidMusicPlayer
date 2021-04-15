/*
 * @Author: your name
 * @Date: 2021-04-13 16:13:35
 * @LastEditTime: 2021-04-15 18:42:17
 * @LastEditors: Please set LastEditors
 * @Description: app全局的配置管理【主题/APP初始化配置】
 * @FilePath: /MusicProject/Root.tsx
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {DarkTheme, DefaultTheme} from './utils/theme';
import AppNavigator from './router/index';
import CustomIcon from './components/CustomIcon/index';

const Root = () => {
  const themeType = useSelector((state: any) => state.config.themeType);

  /**
   * @description: 获取APP主题样式
   * @param {string} type
   * @return {*}
   */
  const getAppTheme = (type: string) => {
    if (type === 'dark') {
      return DarkTheme;
    }
    return DefaultTheme;
  };

  const appTheme = getAppTheme(themeType);
  return (
    <NavigationContainer theme={appTheme}>
      <PaperProvider
        settings={{
          icon: props => <CustomIcon {...props} />,
        }}
        theme={appTheme}>
        <AppNavigator />
      </PaperProvider>
    </NavigationContainer>
  );
};
export default Root;

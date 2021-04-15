/*
 * @Author: wangshicheng
 * @Date: 2021-04-14 21:10:16
 * @LastEditTime: 2021-04-14 21:17:50
 * @LastEditors: Please set LastEditors
 * @Description: 底部Tab导航集合
 * @FilePath: /MusicProject/src/router/BottomNavigator.ts
 */
import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen component</Text>
    </View>
  );
};

const SettingScreen = () => {
  return (
    <View>
      <Text>SettingScreen component</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();
const BottomNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

/*
 * @Author: your name
 * @Date: 2021-04-08 09:35:41
 * @LastEditTime: 2021-04-08 09:36:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/pages/Home/index.tsx
 */

import React from 'react';
import {Text, View, Button} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Detail"
        onPress={() => {
          navigation.navigate('Detail', {
            itemId: '1234',
            otherParams: 'this is other params',
          });
        }}
      />
    </View>
  );
};

export default Home;

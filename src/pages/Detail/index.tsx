/*
 * @Author: your name
 * @Date: 2021-04-08 09:35:11
 * @LastEditTime: 2021-04-08 09:39:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/pages/Detail/index.tsx
 */

import React from 'react';
import {Text, View, Button} from 'react-native';

const Detail = ({route, navigation}) => {
  const {itemId, otherParams} = route.params;
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Text>
        {itemId}: {otherParams}
      </Text>
      <Button
        title="Change Title"
        onPress={() => {
          navigation.setOptions({title: '详情'});
        }}
      />
      <Button
        title="Go back"
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default Detail;

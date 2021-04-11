/*
 * @Author: wangshicheng
 * @Date: 2021-04-09 16:17:18
 * @LastEditTime: 2021-04-11 16:32:59
 * @LastEditors: Please set LastEditors
 * @Description: 自定义输入框组件
 * @FilePath: /MusicProject/src/components/CustomInput/index.tsx
 */

import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

interface IProps {
  loading?: boolean;
}
const CustomInput = (props: IProps) => {
  const {loading} = props;
  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Input some keywords"
        style={[styles.textInput, styles.border]}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Search"
          loading={loading}
          icon={{
            type: 'ionicon',
            name: 'search-outline',
            size: 15,
            color: 'white',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: '#49afcd',
    borderRadius: 3,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  //搜索框
  searchContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  textInput: {
    flex: 6,
    fontSize: 16,
    padding: 0,
    paddingLeft: 8,
    color: '#49afcd',
  },

  buttonContainer: {
    width: 100,
    position: 'relative',
    left: -1,
  },
});

export default CustomInput;

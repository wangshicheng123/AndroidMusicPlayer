/*
 * @Author: wangshicheng
 * @Date: 2021-04-11 09:47:08
 * @LastEditTime: 2021-04-12 00:26:40
 * @LastEditors: Please set LastEditors
 * @Description: 歌曲列表单项组件
 * @FilePath: /MusicProject/src/components/SongListItem/index.tsx
 */

import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Icon} from 'react-native-elements';

interface IProps {
  id: number;
  index: number;
  name: string;
  artistsName: string;
  albumName: string;
  handlePressSonglistItem: any;
}

const SongListItem = (props: IProps) => {
  const {
    index,
    name,
    artistsName,
    albumName,
    id,
    handlePressSonglistItem,
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.songIndex}>
        <Text>{index + 1}</Text>
      </View>
      <View style={styles.songInfo}>
        <View style={styles.songBody}>
          <View>
            <Text>{name}</Text>
          </View>
          <View>
            <Text style={styles.songUsers} numberOfLines={1}>
              {artistsName}-{albumName}
            </Text>
          </View>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            handlePressSonglistItem(id);
          }}>
          <View style={styles.songOperation}>
            <Icon name="play-circle-outline" type="ionicon" color="#49afcd" />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    marginBottom: 8,
  },
  songIndex: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  songInfo: {
    flex: 1,
    flexDirection: 'row',
    borderColor: '#49afcd',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  songBody: {
    flex: 0.8,
    justifyContent: 'center',
    marginLeft: 4,
  },
  songUsers: {
    marginTop: 3,
    fontSize: 12,
    color: '#666',
  },
  songOperation: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SongListItem;

/*
 * @Author: wangshicheng
 * @Date: 2021-04-10 18:52:34
 * @LastEditTime: 2021-04-11 16:32:39
 * @LastEditors: Please set LastEditors
 * @Description: 歌单卡片组件
 * @FilePath: /MusicProject/src/components/SongCollectionCard/index.tsx
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import {Image} from 'react-native-elements';

interface IProps {
  id: string;
  name: string;
  playCount: number;
  coverImgUrl: string;
  handlePressCollectionItem: (id: string | number) => {};
}

const SongCollectionItem = (props: IProps) => {
  const {name, coverImgUrl, handlePressCollectionItem, id} = props;
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        handlePressCollectionItem(id);
      }}>
      <View style={styles.container}>
        <View style={styles.songInfoContainer}>
          <View style={styles.songPlayCountView}>
            <Text style={styles.songPlayCount}>11万</Text>
          </View>
          <Image
            source={{uri: coverImgUrl}}
            style={styles.songBgUrl}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View style={styles.describeContainer}>
          <Text style={styles.describeText} numberOfLines={2}>
            {name}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  songInfoContainer: {
    position: 'relative',
  },
  songPlayCountView: {
    position: 'absolute',
    zIndex: 1,
    right: 3,
    top: 3,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: '#333',
    opacity: 0.5,
  },
  songPlayCount: {
    fontSize: 12,
    color: '#fff',
  },

  songBgUrl: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },

  describeContainer: {
    width: 100,
    marginTop: 4,
  },
  describeText: {
    fontSize: 12,
    color: '#222',
  },
});

export default SongCollectionItem;

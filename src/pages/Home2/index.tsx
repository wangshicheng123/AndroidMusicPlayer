/*
 * @Author: wangshicheng
 * @Date: 2021-04-08 09:35:41
 * @LastEditTime: 2021-04-12 00:37:56
 * @LastEditors: Please set LastEditors
 * @Description: 首页
 * @FilePath: /MusicProject/src/pages/Home/index.tsx
 */

import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, RefreshControl} from 'react-native';
import CustomSearch from '../../components/CustomInput/index';
import Divider from '../../components/CustomDivider/index';
import SongCollectionItem from '../../components/SongCollectionItem';
import SongListItem from '../../components/SongListItem/index';

interface IProps {
  navigation: any;
}

const DATA = [
  {
    id: '914087134',
    name: '这些声音里藏着故事（粤语男声篇）',
    playCount: 1655732,
    coverImgUrl:
      'http://p3.music.126.net/Eq48ldWWhHgbpq6RWFwAnA==/109951163022545586.jpg',
  },
  {
    id: '3191867342',
    name: '全网最全：老干妈配什么最好吃？',
    playCount: 2896795,
    coverImgUrl:
      'http://p3.music.126.net/PJKPUyr18ZVnpFoEuCKvhA==/109951165104489226.jpg',
  },
  {
    id: '3222869790',
    name: '国产纯音集 | 八百位音乐人，一人一曲',
    playCount: 1162828,
    coverImgUrl:
      'http://p4.music.126.net/zA3f-Brv5WP5-1V4g-6t7Q==/109951164666312667.jpg',
  },
  {
    id: '914087131',
    name: '这些声音里藏着故事（粤语男声篇）',
    playCount: 16557310,
    coverImgUrl:
      'http://p3.music.126.net/Eq48ldWWhHgbpq6RWFwAnA==/109951163022545586.jpg',
  },
];

export const SONG_LIST = [
  {
    id: 298317,
    name: '屋顶',
    artists: [
      {
        id: 9612,
        name: '温岚',
      },
      {
        id: 6452,
        name: '周杰伦',
      },
    ],
    album: {
      id: 29597,
      name: '有点野',
    },
  },
  {
    id: 255020,
    name: '刀马旦',
    artists: [
      {
        id: 8331,
        name: '李玟',
      },
      {
        id: 6452,
        name: '周杰伦',
      },
    ],
    album: {
      id: 25475,
      name: 'Promise',
    },
  },
  {
    id: 5257138,
    name: '屋顶',
    artists: [
      {
        id: 9612,
        name: '温岚',
      },
      {
        id: 6452,
        name: '周杰伦',
      },
    ],
    album: {
      id: 512175,
      name: '男女情歌对唱冠军全记录',
    },
  },
  {
    id: 2983171,
    name: '屋顶',
    artists: [
      {
        id: 9612,
        name: '温岚',
      },
      {
        id: 6452,
        name: '周杰伦',
      },
    ],
    album: {
      id: 29597,
      name: '有点野',
    },
  },
  {
    id: 2550201,
    name: '刀马旦',
    artists: [
      {
        id: 8331,
        name: '李玟',
      },
      {
        id: 6452,
        name: '周杰伦',
      },
    ],
    album: {
      id: 25475,
      name: 'Promise',
    },
  },
  {
    id: 52571381,
    name: '屋顶',
    artists: [
      {
        id: 9612,
        name: '温岚',
      },
      {
        id: 6452,
        name: '周杰伦',
      },
    ],
    album: {
      id: 512175,
      name: '男女情歌对唱冠军全记录',
    },
  },
  {
    id: 2983172,
    name: '屋顶',
    artists: [
      {
        id: 9612,
        name: '温岚',
      },
      {
        id: 6452,
        name: '周杰伦',
      },
    ],
    album: {
      id: 29597,
      name: '有点野',
    },
  },
  {
    id: 2550202,
    name: '刀马旦',
    artists: [
      {
        id: 8331,
        name: '李玟',
      },
      {
        id: 6452,
        name: '周杰伦',
      },
    ],
    album: {
      id: 25475,
      name: 'Promise',
    },
  },
  {
    id: 52571382,
    name: '屋顶',
    artists: [
      {
        id: 9612,
        name: '温岚',
      },
      {
        id: 6452,
        name: '周杰伦',
      },
    ],
    album: {
      id: 512175,
      name: '男女情歌对唱冠军全记录',
    },
  },
];

const Home = (props: IProps) => {
  const [refreshing, setRefreshing] = useState(false);
  // const [searchValue, setSearchValue] = useState<string>();
  const {navigation} = props;

  /**
   * @description: 首页音乐搜索处理
   * @param {string} value
   * @return {*}
   */
  const handleSearchChange = (value: string) => {
    console.log(value);
    // setSearchValue(value);
  };

  /**
   * @description: 首页歌曲列表下拉刷新处理
   * @param {*}
   * @return {*}
   */
  const handleSonglistRefreshing = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  /**
   * @description: 导航至歌集详情列表
   * @param {string} id
   * @return {*}
   */
  const handlePressCollectionItem = (id: string | number) => {
    console.log(id);
    navigation.navigate('SongCollectionDetail', {
      id: id,
    });
  };

  /**
   * @description: 导航至歌曲播放详情页面
   * @param {string} id
   * @return {*}
   */
  const handlePressSonglistItem = (id: string | number) => {
    console.log(id);
    navigation.navigate('SongPlayingDetail', {
      id: id,
    });
  };

  /**
   * @description: 渲染歌集列表
   * @param {object} param1
   * @return {*}
   */
  const renderSongCollectionItem = (params: any) => {
    const {item} = params;
    return (
      <SongCollectionItem
        handlePressCollectionItem={handlePressCollectionItem}
        {...item}
      />
    );
  };

  /**
   * @description: 渲染歌曲列表
   * @param {any} params
   * @return {*}
   */
  const renderSongListItem = (params: any) => {
    const {item = {}, index}: {item: any; index: number} = params;
    const {name, artists, album, id} = item;
    const artistsName = artists.map((artist: any) => artist.name).join('/');
    return (
      <SongListItem
        index={index}
        name={name}
        id={id}
        artistsName={artistsName}
        albumName={album.name}
        handlePressSonglistItem={handlePressSonglistItem}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <CustomSearch />
      </View>
      <View style={styles.dividerContainer}>
        <Divider />
      </View>
      <View style={styles.recommendContainer}>
        <Text style={styles.recommendText}>RECOMMEND</Text>
        <View style={styles.flatListContainer}>
          <FlatList
            data={DATA}
            horizontal
            renderItem={renderSongCollectionItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
      <View style={styles.dividerContainer}>
        <Divider />
      </View>
      <View style={styles.songListContainer}>
        <FlatList
          data={SONG_LIST}
          renderItem={renderSongListItem}
          keyExtractor={item => item.id + ''}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleSonglistRefreshing}
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    width: '95%',
    marginTop: 10,
    marginLeft: '2.5%',
  },
  dividerContainer: {
    width: '100%',
    marginTop: 10,
  },
  recommendContainer: {
    paddingHorizontal: 8,
    marginTop: 8,
  },
  recommendText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  flatListContainer: {},
  songListContainer: {
    flex: 1,
    marginTop: 8,
  },
});

export default Home;

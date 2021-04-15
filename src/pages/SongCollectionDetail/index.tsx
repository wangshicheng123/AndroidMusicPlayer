/*
 * @Author: wangshicheng
 * @Date: 2021-04-11 15:41:31
 * @LastEditTime: 2021-04-13 17:02:58
 * @LastEditors: Please set LastEditors
 * @Description: 歌单详情页面
 * @FilePath: /MusicProject/src/pages/Songlist/index.tsx
 */

import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Image, Icon} from 'react-native-elements';
import SongListItem from '../../components/SongListItem/index';
import {SONG_LIST} from '../Home2/index';

interface IProps {
  navigation: any;
}

const CollectionDetailData = {
  id: 6678233267,
  userId: 341030416,
  playCount: 634341,
  commentCount: 54,
  createTime: 1616662981476,
  tags: ['欧美', '治愈', '爵士'],
  name: '温暖爵士｜咖啡与猫，治愈周末时光',
  coverImgUrl:
    'https://p2.music.126.net/ybw7-ePjz1AfFnmZuJjgGQ==/109951165832891814.jpg',
  description:
    '太快没有故事，太急没有人生。\n在繁华中自律，在落魄中自愈。\n\n星星与月，流光相皎洁，将天空喷绘成斑斓的绮梦。咖啡与猫相伴，周末假期小憩一会儿，唯有温暖慰藉人心的爵士与我共缠绵。\n\n关键词：温暖男声、治愈、Jazz Pop 、smooth Jazz\n\n封面：Limduey',
};

const SongCollectionDetail = (props: IProps) => {
  const {navigation} = props;

  /**
   * @description: 导航至歌曲播放详情页面
   * @param {string} id
   * @return {*}
   */
  const handlePressSonglistItem = (id: string | number) => {
    navigation.navigate('SongPlayingDetail', {
      id: id,
    });
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
      <View style={styles.collectionListInfoHeader}>
        <View style={styles.collectionImgContainer}>
          <View style={styles.collectionPlayCountView}>
            <Text style={styles.collectionPlayCount}>11万</Text>
          </View>
          <Image
            source={{uri: CollectionDetailData.coverImgUrl}}
            style={styles.collectionImg}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>
        <View style={styles.collectionBaseInfo}>
          <View>
            <Text style={styles.collectionName} numberOfLines={1}>
              {CollectionDetailData.name}
            </Text>
          </View>
          <View>
            <Text style={styles.collectionTags} numberOfLines={1}>
              标签: {CollectionDetailData.tags.join('/')}
            </Text>
          </View>
          <View>
            <Text numberOfLines={2} style={styles.collectionDesc}>
              描述: {CollectionDetailData.description}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.collectionOperateContainer}>
        <View style={styles.collectionOperate}>
          <View style={styles.collectionOperateLikeView}>
            <Icon
              name="heart-outline"
              type="ionicon"
              color="#49afcd"
              size={19}
            />
            <Text style={styles.collectionOperateLike}>Like</Text>
          </View>
          <View style={styles.verticalDividerLine} />
          <View style={styles.collectionOperateCommentView}>
            <Icon
              name="chatbubble-ellipses-outline"
              type="ionicon"
              color="#49afcd"
              size={18}
            />
            <Text style={styles.collectionOperateComment}>Comment</Text>
          </View>
        </View>
      </View>
      <View style={styles.songListContainer}>
        <FlatList
          data={SONG_LIST}
          renderItem={renderSongListItem}
          keyExtractor={item => item.id + ''}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    marginTop: 4,
  },
  /* 歌单头部信息样式 */
  collectionListInfoHeader: {
    flexDirection: 'row',
  },
  collectionImgContainer: {
    position: 'relative',
  },
  collectionPlayCountView: {
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
  collectionPlayCount: {
    fontSize: 12,
    color: '#fff',
  },
  collectionImg: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  collectionBaseInfo: {
    flex: 1,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  collectionName: {
    color: '#333',
  },
  collectionTags: {
    fontSize: 12,
    marginTop: 8,
    color: '#666',
  },
  collectionDesc: {
    fontSize: 12,
    marginTop: 8,
    color: '#666',
  },
  /* 歌单操作项 */
  collectionOperateContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  collectionOperate: {
    width: '90%',
    height: 30,
    borderRadius: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#49afcd',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  collectionOperateLikeView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  collectionOperateLike: {
    color: '#49afcd',
    marginLeft: 6,
  },
  verticalDividerLine: {
    height: '70%',
    backgroundColor: '#49afcd',
    width: StyleSheet.hairlineWidth,
  },
  collectionOperateCommentView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  collectionOperateComment: {
    color: '#49afcd',
    marginLeft: 6,
  },

  /* 歌单分割线 */
  dividerContainer: {
    marginTop: 10,
  },
  /* 歌单列表数据 */
  songListContainer: {
    flex: 1,
    marginTop: 8,
  },
});

export default SongCollectionDetail;

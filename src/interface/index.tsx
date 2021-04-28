/*
 * @Author: your name
 * @Date: 2021-04-18 15:26:26
 * @LastEditTime: 2021-04-28 09:01:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/interface/index.tsx
 */

export interface ISongItem {
  id?: number;
  song_title?: string;
  song_cover?: string;
  song_artist?: string;
  song_id?: number;
  song_play_count?: number;
}

export interface ICollectionListItem {
  id?: number;
  collection_id?: number;
  collection_name?: string;
  user_id?: string;
  user_name?: string;
  collection_cover?: string;
  collection_like_count?: number;
  songs: ISongItem[];
}

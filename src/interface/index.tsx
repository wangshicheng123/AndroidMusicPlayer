/*
 * @Author: your name
 * @Date: 2021-04-18 15:26:26
 * @LastEditTime: 2021-04-27 11:39:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/interface/index.tsx
 */

export interface ISongItem {
  id?: number;
  song_title?: string;
  song_cover?: string;
  song_artist?: string;
  song_id?: string;
  song_play_count?: number;
}

export interface IPlayListItem {
  id: string;
  cover: string;
  title: string;
  artist?: string;
  type?: string;
  subtitle?: string;
  genre: string;
  children: ISongItem[];
}

export interface ICollectionListItem {
  id: number;
  name: string;
  owner: string;
  songs: ISongItem[];
  cover?: string;
}

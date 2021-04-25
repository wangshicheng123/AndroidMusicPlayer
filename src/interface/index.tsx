/*
 * @Author: your name
 * @Date: 2021-04-18 15:26:26
 * @LastEditTime: 2021-04-25 12:03:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/interface/index.tsx
 */

export interface ISongItem {
  id?: string;
  cover?: string;
  title?: string;
  path?: string;
  artist?: string;
  type?: string;
  album?: string;
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
  id: string;
  name: string;
  owner: string;
  songs: ISongItem[];
  cover?: string;
}

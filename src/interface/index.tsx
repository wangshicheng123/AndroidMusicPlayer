/*
 * @Author: your name
 * @Date: 2021-04-18 15:26:26
 * @LastEditTime: 2021-04-18 20:54:29
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

export interface AlbumProps {
  album?: string;
  artist?: string;
  author?: string;
  cover?: string;
  id: string;
  name?: string;
  numberOfSongs?: number;
}

export interface ArtistProps {
  artist?: string;
  cover?: string;
  id: string;
  name: string;
}

export interface PlaylistProps {
  id: string;
  name: string;
  owner: string;
  songs?: ISongItem;
  cover?: string;
}

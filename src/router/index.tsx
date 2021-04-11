/*
 * @Author: wangshicheng
 * @Date: 2021-04-08 09:24:31
 * @LastEditTime: 2021-04-11 16:41:13
 * @LastEditors: Please set LastEditors
 * @Description: app路由集合
 * @FilePath: /MusicProject/src/router/index.ts
 */
import Home from '../pages/Home/index';
import Detail from '../pages/Detail/index';
import Launch from '../pages/Launch/index';
import Register from '../pages/Register/index';
import Login from '../pages/Login';
import SongCollectionDetail from '../pages/SongCollectionDetail';
import SongPlayingDetail from '../pages/SongPlayingDetail';

export default [
  {
    name: 'Home',
    component: Home,
  },
  {
    name: 'Launch',
    component: Launch,
    options: {
      title: 'Music Player',
    },
  },
  {
    name: 'Register',
    component: Register,
  },
  {
    name: 'Login',
    component: Login,
  },
  {
    name: 'SongCollectionDetail',
    component: SongCollectionDetail,
  },
  {
    name: 'SongPlayingDetail',
    component: SongPlayingDetail,
  },
  {
    name: 'Detail',
    component: Detail,
    options: ({route}: {route: any}) => {
      return {
        title: route?.params?.itemId,
      };
    },
  },
];

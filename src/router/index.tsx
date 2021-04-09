/*
 * @Author: wangshicheng
 * @Date: 2021-04-08 09:24:31
 * @LastEditTime: 2021-04-09 15:18:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/router/index.ts
 */
import Home from '../pages/Home/index';
import Detail from '../pages/Detail/index';
import InitLoading from '../pages/InitLoading/index';
import Register from '../pages/Register/index';
import Login from '../pages/Login';

export default [
  {
    name: 'InitLoading',
    component: InitLoading,
    options: {
      title: 'Music Player',
    },
  },
  {
    name: 'Home',
    component: Home,
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
    name: 'Detail',
    component: Detail,
    options: ({route}: {route: any}) => {
      return {
        title: route?.params?.itemId,
      };
    },
  },
];

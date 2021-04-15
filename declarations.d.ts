/*
 * @Author: your name
 * @Date: 2021-04-15 18:34:54
 * @LastEditTime: 2021-04-15 18:35:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/declarations.d.js
 */
declare module '*.svg' {
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

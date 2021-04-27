/*
 * @Author: your name
 * @Date: 2021-04-26 18:14:11
 * @LastEditTime: 2021-04-27 12:34:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/api/index.ts
 */
import { dev_api_prefix } from "@/config/index";
import { IRequest } from "@/utils/fetch";

export const userLogin: IRequest = {
  url: dev_api_prefix + "/user/insert",
  config: {
    method: "POST",
  },
};
export const getMostPlaySongs: IRequest = {
  url: dev_api_prefix + "/song/mostPlay",
  config: {
    method: "POST",
  },
};

export const getFavSongByUser: IRequest = {
  url: dev_api_prefix + "/song/fav",
  config: {
    method: "POST",
  },
};

export const getSongByCollection: IRequest = {
  url: dev_api_prefix + "/song/get",
  config: {
    method: "POST",
  },
};

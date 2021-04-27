/*
 * @Author: your name
 * @Date: 2021-04-26 18:14:11
 * @LastEditTime: 2021-04-27 21:51:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/api/index.ts
 */
import { dev_api_prefix } from "@/config/index";
import { IRequest } from "@/utils/fetch";

/* User */
export const userLogin: IRequest = {
  url: dev_api_prefix + "/user/insert",
  config: {
    method: "POST",
  },
};

/* Song */
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

/* Collection */
export const findCollection: IRequest = {
  url: dev_api_prefix + "/collection/get",
  config: {
    method: "POST",
  },
};
export const createCollection: IRequest = {
  url: dev_api_prefix + "/collection/create",
  config: {
    method: "POST",
  },
};
export const modifyCollection: IRequest = {
  url: dev_api_prefix + "/collection/modify",
  config: {
    method: "POST",
  },
};
export const deleteCollection: IRequest = {
  url: dev_api_prefix + "/collection/delete",
  config: {
    method: "POST",
  },
};

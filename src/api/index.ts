/*
 * @Author: your name
 * @Date: 2021-04-26 18:14:11
 * @LastEditTime: 2021-04-27 11:17:24
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

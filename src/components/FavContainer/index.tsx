/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 17:21:30
 * @LastEditTime: 2021-04-28 09:45:57
 * @LastEditors: Please set LastEditors
 * @Description: Like组件容器
 * @FilePath: /MusicProject/src/components/FavContainer/index.tsx
 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ISongItem } from "@/interface/index";
import {
  addToLikeSongQueue,
  removeToLikeSongQueue,
} from "@/reducers/queueSlice";
import { IAppState } from "@/reducers/index";
import Fav from "../Fav/index";
import { request } from "@/utils/fetch";
import { insertFavSong, deleteFavSong } from "@/api/index";

interface IProps {
  likeType: "song" | "album";
  style?: any;
  favData: ISongItem;
}

export const FavContainer = (props: IProps) => {
  const { likeType = "song", style, favData } = props;
  const likingSongQueue = useSelector(
    (state: IAppState) => state.queue.likingSongQueue
  );
  const { id: userId } = useSelector((state: IAppState) => state.user.userInfo);
  const [liked, setLiked] = useState(
    likingSongQueue.some((item) => item.id === favData.id)
  );
  const dispatch = useDispatch();

  /**
   * @description: 添加用户的喜欢歌曲
   * @param {*} async
   * @return {*}
   */
  const addToFavorite = async () => {
    if (likeType === "song") {
      const { song_id } = favData;
      const insertRes = await request(insertFavSong, {
        song_id: song_id,
        user_id: userId,
      });
      if (!insertRes) {
        return;
      }
      dispatch(addToLikeSongQueue([favData]));
    } else if (likeType === "album") {
    }
    setLiked(true);
  };

  /**
   * @description: 删除用户喜欢的歌曲
   * @param {*} async
   * @return {*}
   */
  const removeFromFavorite = async () => {
    if (likeType === "song") {
      const { song_id } = favData;
      const deleteRes = await request(deleteFavSong, {
        song_id: song_id,
        user_id: userId,
      });
      if (!deleteRes) {
        return;
      }
      dispatch(removeToLikeSongQueue([favData]));
    } else if (likeType === "album") {
    }
    setLiked(false);
  };

  return (
    <Fav
      liked={liked}
      style={style}
      addToFavorite={addToFavorite}
      removeFromFavorite={removeFromFavorite}
    />
  );
};

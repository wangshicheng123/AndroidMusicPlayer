/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 17:21:30
 * @LastEditTime: 2021-04-25 12:03:58
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
  const [liked, setLiked] = useState(
    likingSongQueue.some((item) => item.id === favData.id)
  );
  const dispatch = useDispatch();

  const addToFavorite = () => {
    if (likeType === "song") {
      dispatch(addToLikeSongQueue([favData]));
    } else if (likeType === "album") {
    }

    setLiked(true);
  };

  const removeFromFavorite = () => {
    if (likeType === "song") {
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

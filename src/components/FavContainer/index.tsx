/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 17:21:30
 * @LastEditTime: 2021-04-21 09:46:21
 * @LastEditors: Please set LastEditors
 * @Description: Like组件容器
 * @FilePath: /MusicProject/src/components/FavContainer/index.tsx
 */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ViewStyle } from "react-native";
import Fav from "../Fav/index";
// import Follow from "../Follow/index";
import { AlbumProps, ArtistProps, ISongItem } from "@/interface/index";
import {
  addToLikeSongQueue,
  removeToLikeSongQueue,
} from "@/reducers/queueSlice";
import { IAppState } from "@/reducers/index";

interface IProps {
  likeType: "song" | "album";
  style?: any;
  favData: AlbumProps | ArtistProps | ISongItem;
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

  useEffect(() => {
    // if (type === 'album' && item) {
    //   if (isAlbumPresent(item.id)) {
    //     setLiked(true);
    //   }
    // } else if (type === 'artist' && item) {
    //   if (isArtistPresent(item.id)) {
    //     setLiked(true);
    //   }
    // } else if (isSongPresent(item.id)) {
    //   setLiked(true);
    // } else {
    //   setLiked(false);
    // }
  }, [likeType, favData]);

  const addToFavorite = () => {
    if (likeType === "song") {
      dispatch(addToLikeSongQueue([favData]));
    } else if (likeType === "album") {
      console.log("add like album");
      // dispatch(addAlbumToFavorite(item));
    }

    setLiked(true);
  };

  const removeFromFavorite = () => {
    if (likeType === "song") {
      dispatch(removeToLikeSongQueue([favData]));
    } else if (likeType === "album") {
      console.log("add like album");
      // dispatch(addAlbumToFavorite(item));
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

/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 17:21:30
 * @LastEditTime: 2021-04-19 00:04:34
 * @LastEditors: Please set LastEditors
 * @Description: Like组件容器
 * @FilePath: /MusicProject/src/components/FavContainer/index.tsx
 */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ViewStyle } from "react-native";

// import {
//   addSongToFavorite,
//   addAlbumToFavorite,
//   removeAlbumFromFavorite,
// } from '../actions/playerState';
// import {
//   isAlbumPresent,
//   isArtistPresent,
//   isSongPresent,
//   addArtist,
//   removeArtist,
// } from '../actions/realmAction';
import Fav from "../Fav/index";
import Follow from "../Follow/index";
import { AlbumProps, ArtistProps, ISongItem } from "@/interface/index";

interface IProps {
  type: string;
  style?: any;
  item: AlbumProps | ArtistProps | ISongItem;
}

export const FavContainer = (props: IProps) => {
  const { type = "song", style, item } = props;
  const [liked, setLiked] = useState(false);
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
  }, [type, item]);

  const addArtistToFavorite = () => {
    // addArtist(item);
    setLiked(true);
  };

  const removeArtistFromFav = () => {
    // removeArtist(item.id);
    setLiked(false);
  };

  const addToFavorite = () => {
    if (type === "song") {
      // dispatch(addSongToFavorite(item));
    } else if (type === "album") {
      // dispatch(addAlbumToFavorite(item));
    }

    setLiked(true);
  };

  const removeFromFavorite = () => {
    if (type === "album") {
      // dispatch(removeAlbumFromFavorite(item));
    }
    setLiked(false);
  };

  if (type === "artist") {
    return (
      <Follow
        liked={liked}
        style={style}
        addToFavorite={addArtistToFavorite}
        removeFromFavorite={removeArtistFromFav}
      />
    );
  }
  return (
    <Fav
      liked={liked}
      style={style}
      addToFavorite={addToFavorite}
      removeFromFavorite={removeFromFavorite}
    />
  );
};

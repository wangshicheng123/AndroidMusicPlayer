/*
 * @Author: your name
 * @Date: 2021-04-20 12:16:23
 * @LastEditTime: 2021-04-20 12:16:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/components/FollowContainer/index.tsx
 */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ViewStyle } from "react-native";
import Fav from "../Fav/index";
import Follow from "../Follow/index";
import { AlbumProps, ArtistProps, ISongItem } from "@/interface/index";

interface IProps {
  type: string;
  style?: any;
  favData: AlbumProps | ArtistProps | ISongItem;
}

const FollowContainer = (props: IProps) => {
  const { type = "song", style, favData } = props;
  const [liked, setLiked] = useState(false);

  const addArtistToFavorite = () => {
    // addArtist(item);
    setLiked(true);
  };

  const removeArtistFromFav = () => {
    // removeArtist(item.id);
    setLiked(false);
  };

  return (
    <Follow
      liked={liked}
      style={style}
      addToFavorite={addArtistToFavorite}
      removeFromFavorite={removeArtistFromFav}
    />
  );
};

export default FollowContainer;

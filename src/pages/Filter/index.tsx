/*
 * @Author: wangshicheng
 * @Date: 2021-04-22 17:32:29
 * @LastEditTime: 2021-04-29 12:36:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/pages/Search/components/Filter/index.tsx
 */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";
import SongList from "@/pages/Search/components/SongsList/index";
import Screen from "@/components/Screen/index";
import { fetchSearchDataById } from "@/reducers/searchSlice";

const FilterScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();

  const { title, image, id }: any = route.params;

  useEffect(() => {
    const collectionId: number = id;
    dispatch(
      fetchSearchDataById({
        collectionId: collectionId,
        pageNumber: 0,
      })
    );
  }, []);

  return (
    <Screen>
      <SongList genreInfo={{ title: title, cover: image, id: id }} />
    </Screen>
  );
};

export default FilterScreen;

/*
 * @Author: wangshicheng
 * @Date: 2021-04-22 17:32:29
 * @LastEditTime: 2021-04-23 12:08:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/pages/Search/components/Filter/index.tsx
 */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SongListContainer } from "../SongListContainer/index";
import Screen from "@/components/Screen/index";
import EmptyPlaylist from "@/components/EmptyPlayList/index";
import { IAppState } from "@/reducers/index";
import { fetchSearchResult } from "@/reducers/searchSlice";

const FilterScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { songDatas } = useSelector((state: IAppState) => state.search);

  const { title: genreTitle, image: genreImg }: any = route.params;

  /**
   * @description: 根绝分类参数获取搜索数据
   * @param {*} async
   * @return {*}
   */
  const fetchData = async () => {
    dispatch(fetchSearchResult());
  };

  if (!songDatas.length) {
    return <EmptyPlaylist />;
  }

  return (
    <Screen>
      <SongListContainer
        songDatas={songDatas}
        fetchData={fetchData}
        title={genreTitle}
        cover={genreImg}
      />
    </Screen>
  );
};

export default FilterScreen;

/*
 * @Author: wangshicheng
 * @Date: 2021-04-23 12:14:26
 * @LastEditTime: 2021-04-29 16:20:40
 * @LastEditors: Please set LastEditors
 * @Description: 搜索输入框组件
 * @FilePath: /MusicProject/src/components/SearchHeader/index.tsx
 */
import React, { useEffect, useState } from "react";
import { Searchbar, useTheme } from "react-native-paper";
import { Keyboard, View, ViewStyle, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import useDebounce from "../../hooks/useDebounce/index";
import { searchSongByKeyword } from "@/reducers/searchSlice";

interface IProps {
  containerStyle?: ViewStyle;
  goBack?: () => void;
}

const SearchHeader = (props: IProps) => {
  const { containerStyle = {}, goBack } = props;
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useDispatch();
  const theme = useTheme();
  const { colors } = theme;

  const searchText = useDebounce(inputValue, 2000);

  useEffect(() => {
    dispatch(searchSongByKeyword({ keyWord: searchText }));
  }, [searchText]);

  /**
   * @description: 处理输入框搜索
   * @param {string} text
   * @return {*}
   */
  const handleChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <View style={[{ backgroundColor: colors.surface }, containerStyle]}>
      <Searchbar
        style={styles.searchbarStyle}
        placeholder="songs"
        onChangeText={handleChange}
        value={inputValue}
        icon={goBack ? "arrow-back-outline" : "search-outline"}
        onIconPress={() => (goBack ? goBack() : Keyboard.dismiss())}
        clearIcon="close-outline"
        autoFocus
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchbarStyle: {
    borderRadius: 0,
  },
});

export default SearchHeader;

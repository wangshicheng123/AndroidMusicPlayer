/*
 * @Author: wangshicheng
 * @Date: 2021-04-18 17:28:59
 * @LastEditTime: 2021-04-19 00:16:07
 * @LastEditors: Please set LastEditors
 * @Description: 歌曲重复播放ICON组件
 * @FilePath: /MusicProject/src/components/RepeatIcon/index.tsx
 */
import React from "react";
import { IconButton } from "react-native-paper";

interface IProps {
  repeat: string;
  updateRepeatType(): void;
}

const RepeatIcon = (props: IProps) => {
  const { repeat, updateRepeatType } = props;
  let iconName = null;
  switch (repeat) {
    case "repeat-all":
      iconName = "repeat";
      break;
    case "repeat-one":
      iconName = "repeat-once";
      break;
    case "repeat-off":
      iconName = "repeat-off";
      break;
    default:
      iconName = "repeat";
      break;
  }

  return <IconButton animated icon={iconName} onPress={updateRepeatType} />;
};
export default RepeatIcon;

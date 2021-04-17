/*
 * @Author: wangshicheng
 * @Date: 2021-04-15 17:48:34
 * @LastEditTime: 2021-04-15 18:49:02
 * @LastEditors: Please set LastEditors
 * @Description: APP自定义的ICON
 * @FilePath: /MusicProject/src/components/CustomIcon/index.tsx
 */

import React from "react";
import { ICONS } from "../../assets/Icons/index";

interface Iprops {
  name: string;
  size?: number;
  color?: string;
  direction?: "rtl" | "ltr";
  allowFontScaling?: boolean | undefined;
}

const CustomIcon = (props: Iprops) => {
  const { name, size = 40, color = "#000", ...rest } = props;
  const IconImplement = ICONS[name];
  if (!IconImplement) {
    return null;
  }
  return <IconImplement width={size} height={size} color={color} {...rest} />;
};

export default CustomIcon;

/*
 * @Author: your name
 * @Date: 2021-04-18 12:13:55
 * @LastEditTime: 2021-04-18 12:22:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/components/HeadLine/index.tsx
 */

import React from "react";
import { TextStyle, Text } from "react-native";
import { useTheme } from "react-native-paper";

export interface HeadlineProps {
  children: string;
  style?: TextStyle;
}

const HeadLine = ({ children, style }: HeadlineProps) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[
        { fontFamily: "Nunito-ExtraBold", color: colors.text, fontSize: 24 },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default HeadLine;

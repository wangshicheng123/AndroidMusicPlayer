/*
 * @Author: your name
 * @Date: 2021-04-22 09:15:50
 * @LastEditTime: 2021-04-22 09:16:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/components/Title/index.tsx
 */
import React from "react";
import { TextStyle, Text } from "react-native";
import { useTheme } from "react-native-paper";

export interface TitleProps {
  children: string;
  style?: TextStyle;
}

const Title = ({ children, style }: TitleProps) => {
  const { colors } = useTheme();
  return (
    <Text
      style={[
        { fontFamily: "Nunito-ExtraBold", color: colors.text, fontSize: 16 },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default Title;

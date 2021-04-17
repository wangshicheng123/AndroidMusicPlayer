/*
 * @Author: your name
 * @Date: 2021-04-15 15:48:42
 * @LastEditTime: 2021-04-17 18:31:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/pages/Introduction/components/IntroTitle/index.tsx
 */
import React from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { scrollConfig } from "../../config";

const TITLE_HEIGHT = 40;

interface IIntroTitle {
  scrollOffsetAnimatedValue: Animated.Value;
  positionAnimatedValue: Animated.Value;
}
const IntroTitle = (props: IIntroTitle) => {
  const { scrollOffsetAnimatedValue, positionAnimatedValue } = props;

  const inputRange = [0, scrollConfig.length];
  const translateY = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  ).interpolate({
    inputRange,
    outputRange: [0, scrollConfig.length * -TITLE_HEIGHT],
  });
  return (
    <View style={styles.titleContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {scrollConfig.map(({ type }, index) => {
          return (
            <Text key={index} style={styles.titleText}>
              {type}
            </Text>
          );
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    overflow: "hidden",
    height: TITLE_HEIGHT,
  },
  titleText: {
    fontSize: TITLE_HEIGHT - 4,
    fontFamily: "Nunito-Black",
    lineHeight: TITLE_HEIGHT,
    textTransform: "uppercase",
  },
});

export default IntroTitle;

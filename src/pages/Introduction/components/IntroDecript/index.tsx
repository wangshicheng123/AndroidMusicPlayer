/*
 * @Author: your name
 * @Date: 2021-04-15 15:48:36
 * @LastEditTime: 2021-04-15 15:52:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/src/pages/Introduction/components/IntroDecript/index.tsx
 */

import React from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';
import {scrollConfig} from '../../config';

const {width} = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.6;

const IntroDecript = ({scrollOffsetAnimatedValue}) => {
  return (
    <View style={styles.introDescriptContainer}>
      {scrollConfig.map(({color}, index) => {
        const inputRange = [0, 0.5, 0.99];
        const inputRangeOpacity = [0, 0.5, 0.99];
        const scale = scrollOffsetAnimatedValue.interpolate({
          inputRange,
          outputRange: [1, 0, 1],
          extrapolate: 'clamp',
        });

        const opacity = scrollOffsetAnimatedValue.interpolate({
          inputRange: inputRangeOpacity,
          outputRange: [0.2, 0, 0.2],
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.circle,
              {
                backgroundColor: color,
                opacity,
                transform: [{scale}],
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  introDescriptContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    top: '15%',
  },
});

export default IntroDecript;

/*
 * @Author: wangshicheng
 * @Date: 2021-04-15 15:48:55
 * @LastEditTime: 2021-04-15 22:14:16
 * @LastEditors: Please set LastEditors
 * @Description: 初始化页面的分页组件
 * @FilePath: /MusicProject/src/pages/Introduction/components/IntroPagination/index.tsx
 */
import React from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import {scrollConfig} from '../../config';

const DOT_SIZE = 40;

interface IIntroPagination {
  scrollOffsetAnimatedValue: Animated.Value;
  positionAnimatedValue: Animated.Value;
}
const IntroPagination = (props: IIntroPagination) => {
  const {scrollOffsetAnimatedValue, positionAnimatedValue} = props;

  const inputRange = [0, scrollConfig.length];
  const translateX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
  ).interpolate({
    inputRange,
    outputRange: [0, scrollConfig.length * DOT_SIZE],
  });

  return (
    <View style={[styles.pagination]}>
      <Animated.View
        style={[
          styles.paginationIndicator,
          {
            position: 'absolute',
            transform: [{translateX}],
          },
        ]}
      />
      {scrollConfig.map(item => {
        return (
          <View key={item.key} style={styles.paginationDotContainer}>
            <View
              style={[styles.paginationDot, {backgroundColor: item.color}]}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    flexDirection: 'row',
    height: DOT_SIZE,
  },
  paginationDot: {
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE * 0.3,
    borderRadius: DOT_SIZE * 0.15,
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    borderColor: '#ddd',
  },
});

export default IntroPagination;

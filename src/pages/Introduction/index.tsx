/*
 * @Author: wangshicheng
 * @Date: 2021-04-14 21:54:35
 * @LastEditTime: 2021-04-17 18:31:16
 * @LastEditors: Please set LastEditors
 * @Description: 用户第一次进入APP时候的展示页面【包括注册/登陆/授权等操作】
 * @FilePath: /MusicProject/src/pages/introduction/index.tsx
 */
import React, { useRef, useState } from "react";
import { View, StyleSheet, Animated } from "react-native";
import Screen from "../../components/Screen/index";
import PagerView, {
  PagerViewOnPageScrollEventData,
} from "react-native-pager-view";
import IntroDescript from "./components/IntroDescript/index";
import IntroTitle from "./components/IntroTitle/index";
import IntroPagination from "./components/IntroPagination/index";
import IntroContent from "./components/IntroContent/index";
import { scrollConfig } from "./config";

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
const Introduction = () => {
  const ref = useRef(null);
  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = useRef(new Animated.Value(0)).current;
  const [page, setPage] = useState(0);

  const handleNavigate2nextPage = () => {
    const nextPageIndex = page + 1;
    ref.current?.setPage(nextPageIndex);
  };
  return (
    <Screen>
      <IntroTitle
        scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
        positionAnimatedValue={positionAnimatedValue}
      />
      <IntroDescript scrollOffsetAnimatedValue={scrollOffsetAnimatedValue} />
      <AnimatedPagerView
        ref={ref}
        initialPage={page}
        style={styles.animatedPagerView}
        onPageScroll={Animated.event<PagerViewOnPageScrollEventData>(
          [
            {
              nativeEvent: {
                offset: scrollOffsetAnimatedValue,
                position: positionAnimatedValue,
              },
            },
          ],
          {
            listener: ({ nativeEvent: { offset, position } }) => {
              setPage(position);
            },
            useNativeDriver: true,
          }
        )}
      >
        {scrollConfig.map((item, index) => (
          <View collapsable={false} key={index}>
            <IntroContent
              {...item}
              handleNavigate2nextPage={handleNavigate2nextPage}
              scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
            />
          </View>
        ))}
      </AnimatedPagerView>
      <IntroPagination
        scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
        positionAnimatedValue={positionAnimatedValue}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  animatedPagerView: {
    width: "100%",
    height: "100%",
  },
});

export default Introduction;

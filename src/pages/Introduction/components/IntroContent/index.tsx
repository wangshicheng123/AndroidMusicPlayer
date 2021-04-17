/*
 * @Author: wangshicheng
 * @Date: 2021-04-15 15:49:08
 * @LastEditTime: 2021-04-17 13:38:00
 * @LastEditors: Please set LastEditors
 * @Description: 操作登陆/授权等组件集合
 * @FilePath: /MusicProject/src/pages/Introduction/components/IntroContent/index.tsx
 */
import React from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
  ImageRequireSource,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTheme, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import LocalLibraryAccess from '../LocalLibraryAccess/index';
import GoogleLogin from '../GoogleLogin/index';
import {visitIntroductionPage} from '../../../../reducers/userSlice';

const {width, height} = Dimensions.get('window');
const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;

interface IIntroContentProps {
  type: string;
  imageUri: ImageRequireSource;
  description: string;
  heading: string;
  scrollOffsetAnimatedValue: Animated.Value;
  color: string;
  handleNavigate2nextPage: () => void;
}

const IntroContent = (props: IIntroContentProps) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const {
    type,
    imageUri,
    heading,
    description,
    scrollOffsetAnimatedValue,
    color,
    handleNavigate2nextPage,
  } = props;
  const inputRange = [0, 0.5, 0.99];
  const inputRangeOpacity = [0, 0.5, 0.99];
  const scale = scrollOffsetAnimatedValue.interpolate({
    inputRange,
    outputRange: [1, 0, 1],
  });

  const opacity = scrollOffsetAnimatedValue.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [1, 0, 1],
  });

  /**
   * @description: 记录APP初始化的授权/登陆成功的状态，用于下一次i进入APP直接进入首页
   * @param {*}
   * @return {*}
   */
  const handleLaunchApp = () => {
    dispatch(visitIntroductionPage(true));
    navigation.navigate('App');
  };

  /**
   * @description: 根据当前用户的状态执行不同的动作
   * @param {*}
   * @return {*}
   */
  const renderUserActions = () => {
    switch (type) {
      case 'Welcome':
        return (
          <Button
            mode="contained"
            icon="arrow-forward"
            color={color}
            onPress={handleNavigate2nextPage}>
            Start
          </Button>
        );
      case 'Grant Access':
        return (
          <LocalLibraryAccess
            color={color}
            handleNavigate2nextPage={handleNavigate2nextPage}
          />
        );
      case 'Google':
        return (
          <GoogleLogin
            handleNavigate2nextPage={handleNavigate2nextPage}
            color={color}
          />
        );
      default:
        return (
          <Button
            mode="contained"
            icon="home"
            color={color}
            onPress={handleLaunchApp}>
            Go to Home
          </Button>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Animated.Image
          source={imageUri}
          style={[
            styles.imageStyle,
            {
              transform: [{scale}],
            },
          ]}
        />
      </View>
      <View style={styles.operationContainer}>
        <View style={styles.descripTextStyle}>
          <Animated.Text
            style={[
              styles.heading,
              {
                opacity,
                color: colors.text,
              },
            ]}>
            {heading}
          </Animated.Text>
          <Animated.Text
            style={[
              styles.description,
              {
                opacity,
                color: colors.text,
              },
            ]}>
            {description}
          </Animated.Text>
        </View>
        <View style={styles.btnStyle}>{renderUserActions()}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    marginTop: 8,
    width: width * 0.75,
    height: width * 0.75,
    resizeMode: 'contain',
  },

  operationContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1,
  },
  descripTextStyle: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1,
  },
  btnStyle: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },

  heading: {
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: '800',
    fontFamily: 'Nunito-Bold',
    letterSpacing: 2,
    marginBottom: 5,
    textAlign: 'right',
  },
  description: {
    fontWeight: '600',
    textAlign: 'right',
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
    fontFamily: 'Nunito-Light',
  },
  logo: {
    opacity: 0.9,
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    resizeMode: 'contain',
    position: 'absolute',
    left: 10,
    bottom: 10,
    transform: [
      {translateX: -LOGO_WIDTH / 2},
      {translateY: -LOGO_HEIGHT / 2},
      {rotateZ: '-90deg'},
      {translateX: LOGO_WIDTH / 2},
      {translateY: LOGO_HEIGHT / 2},
    ],
  },
});

export default IntroContent;

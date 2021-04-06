/* eslint-disable react-native/no-inline-styles */
/*
 * @Author: wangshicheng
 * @Date: 2021-04-04 10:44:20
 * @LastEditTime: 2021-04-06 17:18:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/App.tsx
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  Alert,
  Image,
  Button,
  Switch,
  Modal,
  StatusBar,
  ScrollView,
  Animated,
  Dimensions,
  StyleSheet,
  TextInput,
  // FlatList,
  TouchableHighlight,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

// const FlatListData: {title: String; key: String}[] = [
//   {
//     title: '标题1',
//     key: '1',
//   },
//   {
//     title: '标题2',
//     key: '2',
//   },
//   {
//     title: '标题3',
//     key: '3',
//   },
// ];
// const FlatListItem = ({
//   onPress,
//   style,
//   itemData,
// }: {
//   onPress: any;
//   style: Object;
//   itemData: any;
// }) => {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       style={[
//         {
//           backgroundColor: '#f9c2ff',
//           padding: 20,
//           marginVertical: 8,
//           marginHorizontal: 16,
//         },
//         style,
//       ]}>
//       <Text>{itemData?.title}</Text>
//     </TouchableOpacity>
//   );
// };
// const CustomFlatList = () => {
//   const [selectItem, setSelectItem] = useState(null);
//   const renderItem = ({item}: any) => {
//     console.log('刷新来');
//     const backgroundColor = selectItem === item.key ? 'blue' : 'pink';
//     return (
//       <FlatListItem
//         onPress={() => {
//           setSelectItem(item.key);
//         }}
//         style={{backgroundColor}}
//         itemData={item}
//       />
//     );
//   };
//   return (
//     <View style={{flex: 1}}>
//       {/*
//            注意FlatList组件的是一个PureComponent，其props的变化是浅比较，只会比较props中第一层属性是否发生来变化
//         */}
//       <FlatList
//         data={FlatListData}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => JSON.stringify(item) + index}
//         // extraData={selectItem}
//       />
//     </View>
//   );
// };

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');
const App = () => {
  const [switchValue, setSwitchValue] = useState(false);
  const [dimensions, setDimensions] = useState({window, screen});
  const [modalVisible, setModalVisible] = useState(false);
  const [visibleStatusBar, setVisibleStatusBar] = useState(true);
  const fadeAnima = useRef(new Animated.Value(0)).current;
  const handleDimensionsChange = ({
    window,
    screen,
  }: {
    window: any;
    screen: any;
  }) => {
    setDimensions({window, screen});
  };
  useEffect(() => {
    Dimensions.addEventListener('change', handleDimensionsChange);
    return () => {
      Dimensions.removeEventListener('change', handleDimensionsChange);
    };
  });

  console.log(dimensions);
  const handleChangeText = (inputValue: string) => {
    console.log(inputValue);
  };
  const handleBlur = (inputValue: any) => {
    console.log(inputValue);
  };
  return (
    <ScrollView>
      <View style={{height: 200, flexDirection: 'row'}}>
        <View style={{flex: 0.3, backgroundColor: 'blue'}} />
        <View style={{flex: 0.7, backgroundColor: 'red'}} />
        <Text>22222</Text>
      </View>
      <View>
        <Text style={{fontSize: 28}}>
          aaaa
          {/* 注意文本Text节点存在一些样式属性可以进行继承 */}
          <Text style={{fontSize: 18}}>wangshicheng</Text>
          {/* Text组件内部不能嵌套View组件 */}
          {/* <View>
             wangshicheng
           </View> */}
        </Text>
      </View>
      {/*
         cover: 大于等于设置的宽高，区域中不留空白，保持图片缩放的比例
         contain： 小于等于设置的宽高，保持图片缩放的比例
         stretch： 按照设置的宽高进行拉扯，会充满设置的容器区域，但是会造成图片缩放比例失调
         repeat： 不改变原有图片的尺寸，如若设置的区域过大，则直接进行重复平铺
         center： 不改变原有图片的尺寸，如设置的区域尺寸过大，则会进行剧中展示
        */}
      <Image
        style={{width: 50, height: 100, resizeMode: 'contain'}}
        source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
      />
      <TextInput
        editable
        textAlign="center"
        maxLength={10}
        defaultValue="wangshicheng"
        placeholder="请输入密码"
        onBlur={handleBlur}
        onChangeText={handleChangeText}
        style={{
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
        }}
      />
      <View>
        <View>
          <Text style={{textAlign: 'center', marginVertical: 8}}>
            这是一段文字，这是一段问题，这是一段问题，这是一段文字，这是一段问题
          </Text>
          <Button
            onPress={() => {
              Alert.alert(
                'Tip',
                'hello world',
                [
                  {
                    text: 'Ask me later',
                    onPress: () => {
                      console.log('ask me later');
                    },
                  },
                  {
                    text: 'Confirm',
                    onPress: () => {
                      console.log('Confirm');
                    },
                  },
                  {
                    text: 'Cancel',
                    onPress: () => {
                      console.log('Cancel');
                    },
                  },
                ],
                {
                  cancelable: true,
                  onDismiss: () => {
                    console.log(
                      'click alert outside to close this Alert Componnet',
                    );
                  },
                },
              );
            }}
            title="primary Btn"
            color="#f194ff"
            disabled={false}
          />
          <View
            style={{
              marginVertical: 8,
              borderBottomColor: '737373',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
        </View>
      </View>
      <View>
        {/* 注意开关必须是一个受控组件，否则无法使用 */}
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}} // 开关轨道颜色
          thumbColor={switchValue ? '#f5dd4b' : '#f4f3f4'} // 开关前面的小球颜色
          value={switchValue}
          onValueChange={() =>
            setSwitchValue((preSwitchValue: Boolean) => !preSwitchValue)
          }
        />
      </View>
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <ActivityIndicator color="red" />
        <ActivityIndicator size="large" color="red" animating />
        <ActivityIndicator size="small" color="#0000ff" />
        <ActivityIndicator size="large" color="#00ff00" />
      </View>

      <View style={{height: 100}}>
        <Animated.View
          style={[
            {flex: 1},
            {
              opacity: fadeAnima,
            },
          ]}>
          <View style={{width: 150, height: 40}}>
            <Text>aaaaaaaaa</Text>
          </View>
        </Animated.View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Button
            title="fadeIn"
            onPress={() => {
              Animated.timing(fadeAnima, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
              }).start();
            }}
          />
          <Button
            title="fadeOut"
            onPress={() => {
              Animated.timing(fadeAnima, {
                toValue: 0,
                duration: 2000,
                useNativeDriver: true,
              }).start();
            }}
          />
        </View>
      </View>
      <View
        style={{
          height: 200,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Modal
          visible={modalVisible}
          animationType="fade"
          transparent={true}
          hardwareAccelerated={true}
          onRequestClose={() => {
            Alert.alert('the modal will close, are you sure');
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                width: 300,
                height: 300,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                shadowColor: '#000',
                backgroundColor: 'white',
                shadowOpacity: 0.25,
                shadowRadius: 0.84,
              }}>
              <Text>ceshi modal</Text>
              <TouchableHighlight
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: 'pink',
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}>
                <Text>Open Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <TouchableHighlight
          onPress={() => setModalVisible(true)}
          style={{
            backgroundColor: 'pink',
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}>
          <Text>Open Modal</Text>
        </TouchableHighlight>
      </View>
      <View>
        <StatusBar
          backgroundColor="pink"
          barStyle="default"
          hidden={visibleStatusBar}
        />
        <TouchableOpacity
          style={{backgroundColor: 'blue'}}
          onPress={() => setVisibleStatusBar(!visibleStatusBar)}>
          <Text>StatusBar</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={{height: 300}}>
         <CustomFlatList />
       </View> */}
    </ScrollView>
  );
};

// const styles = StyleSheet.create({});

export default App;

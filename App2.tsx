/*
 * @Author: wangshicheng
 * @Date: 2021-04-04 10:44:20
 * @LastEditTime: 2021-04-09 15:20:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MusicProject/App.tsx
 */
/**
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ThemeProvider} from 'react-native-elements';
import Routes from './src/router/index';

const Stack = createStackNavigator();

const theme = {
  colors: {
    primary: '#49afcd',
  },
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: styles.headerStyle,
            headerTintColor: '#fff',
            headerTitleStyle: styles.headerTitleStyle,
          }}>
          {Routes.map(routeProps => {
            return <Stack.Screen key={routeProps.name} {...routeProps} />;
          })}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#49afcd',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  },
});

export default App;

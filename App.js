import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

import ListScreen from './src/pages/main/list.js';
import ServerScreen from './src/pages/server/server.js';

const noHeaderNavigationOptions = {
  header: null,
  headerMode: 'none'
}

const AppStack = createStackNavigator(
  {
    HomePage: { screen: ListScreen, navigationOptions: noHeaderNavigationOptions },
    ServerPage: { screen: ServerScreen, navigationOptions: noHeaderNavigationOptions },
  },
  {
    initialRouteName: 'HomePage',
  }
);

const AppContainer = createAppContainer(AppStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
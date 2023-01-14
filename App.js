
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as React from 'react';


import * as NavigationBar from 'expo-navigation-bar';

import Login from "./.app/public/auth/login.js" //devrlogin
import BottomNav from "./.app/public/navigator/navbar.js"

const AppNavigator = createStackNavigator(
  {
    // Test: Test,
    Login: Login,
    Main: BottomNav,
  },
  {
    headerMode: "none"
  },
   NavigationBar.setVisibilityAsync("hidden"),
   NavigationBar.setBehaviorAsync('overlay-swipe'),
   NavigationBar.setButtonStyleAsync("light"),
  );

export default createAppContainer(AppNavigator);
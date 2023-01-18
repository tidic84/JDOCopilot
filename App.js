
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as React from 'react';
import {DEFAULT} from "./.app/public/themes/variables"

import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';

import * as NavigationBar from 'expo-navigation-bar';
import * as StatusBar from 'expo-status-bar';

import Login from "./.app/public/auth/login.js" //devlogin
import BottomNav from "./.app/public/navigator/navbar.js"
import LoginWithoutFastCo from "./.app/public/auth/loginwofc.js"


  const AppNavigator = createStackNavigator(
    {
      // Test: Test,
      Login: Login,
      Main: BottomNav,
      Reload: LoginWithoutFastCo,
    },
    {
      headerMode: "none",
    },
    NavigationBar.setBackgroundColorAsync(DEFAULT.primary),
    NavigationBar.setButtonStyleAsync("light"),
    StatusBar.setStatusBarHidden(true)
  );

  export default createAppContainer(AppNavigator);




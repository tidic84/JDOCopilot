import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as React from 'react';


import * as NavigationBar from 'expo-navigation-bar';

import Login from "./screens/login.js"
import BottomNav from "./screens/navigator/navbar.js"
// import Test from "./screens/testmodal.js";



const AppNavigator = createStackNavigator(
  {
    // Test: Test,
    Login: Login,
    Navigator: BottomNav,
  },
  {
    headerMode: "none"
  },
   NavigationBar.setVisibilityAsync("hidden"),
   NavigationBar.setBehaviorAsync('overlay-swipe'),
   NavigationBar.setButtonStyleAsync("light"),
  );

export default createAppContainer(AppNavigator);
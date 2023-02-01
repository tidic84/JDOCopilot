import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React, { useState, useEffect } from 'react';
import {DEFAULT} from "./.app/public/themes/variables"
import AsyncStorage from '@react-native-async-storage/async-storage'; // -> necessaire pour le onboarding

import * as NavigationBar from 'expo-navigation-bar';

import Login from "./.app/public/auth/login.js" //devlogin
import BottomNav from "./.app/public/navigator/navbar.js"
import LoginWithoutFastCo from "./.app/public/auth/loginwofc.js"
import OnboardingScreen1 from './.app/public/components/onboarding/1.js';



export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    const checkOnboardingShown = async () => {
        const hasShownOnboarding = await AsyncStorage.getItem('hasShownOnboarding');
        if (hasShownOnboarding) {
            setShowOnboarding(false);
        } else {
            await AsyncStorage.setItem('hasShownOnboarding', 'true');
        }
    };
    checkOnboardingShown();
}, []);

  const AppNavigator = createStackNavigator(
    {
      // Test: Test,
      Login: Login,
      Main: BottomNav,
      Reload: LoginWithoutFastCo,
      Onboarding1: OnboardingScreen1,
    },
    {
      headerMode: "none",
      initialRouteName: showOnboarding ? 'Onboarding1' : 'Login', //dev: => 'Onboarding1', //
    },
    NavigationBar.setBackgroundColorAsync(DEFAULT.primary),
    NavigationBar.setButtonStyleAsync("light")

    
    
  );
  
  const AppContainer = createAppContainer(AppNavigator);

  return (
    <AppContainer />
  );

}
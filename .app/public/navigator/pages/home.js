import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { Ionicons } from '@expo/vector-icons'
import { View, Text } from "react-native";

import Edt from "../homepages/edt.js"
import As from "../homepages/as.js"
import Map from "../homepages/map.js"

import {DEFAULT} from "../../themes/variables"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Dimensions } from 'react-native';
const width = Dimensions.get('window').width;

const TopBar = createMaterialTopTabNavigator();

export default class TopNav extends React.Component {

  render() {

      return(
    <View style={{ flex: 1, backgroundColor: DEFAULT.primary }}>
      <NavigationContainer independent={true}>
        <TopBar.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarIndicatorStyle: {
                  backgroundColor: DEFAULT.accent,
                  height: 3,
                  borderRadius: 10,
                  width: width / 3,
                },
                tabBarStyle: {
                    backgroundColor: DEFAULT.secondary,
                    borderBottomColor: DEFAULT.accent,
                    borderTopWidth: 1,
                    height: 60,
                    paddingTop: 5,
                    paddingBottom: 5,
                    borderBottomRightRadius: 20,
                    borderBottomLeftRadius: 20,
                
                },
                
                tabBarIcon: ({ focused, size, color }) => {
                    let iconName;
                    let iconColor;

                    if (route.name === "EDT") {
                        iconName = focused ? "albums-outline" : "albums-outline";
                        iconColor = focused ? '#C87327' : 'grey';
                    } else if (route.name === "AS") {
                        iconName = focused ? "folder-open-outline" : "folder-open-outline";
                        iconColor = focused ? '#C87327' : 'grey';
                    } else if (route.name === "PLAN") {
                        iconName = focused ? "map-outline" : "map-outline";
                        iconColor = focused ? '#C87327' : 'grey';
                    }
                    return <Ionicons name={iconName} size={25} color='white' />
                },
                
                
            })}
        >
        
          <TopBar.Screen name="EDT" component={Edt} options={{headerShown: false}} />
          <TopBar.Screen name="AS" component={As} options={{headerShown: false, }} />
          <TopBar.Screen name="PLAN" component={Map} options={{headerShown: false, }} />
        </TopBar.Navigator>
      </NavigationContainer>
    </View>
    
  )
  } 
}
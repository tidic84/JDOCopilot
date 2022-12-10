import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { Ionicons } from '@expo/vector-icons'
import { View, Text } from "react-native";
import * as NavigationBar from 'expo-navigation-bar';
import {defaultCSS} from "../../stylesheets/_default/home.js"
import { timeDifference } from "../../util/relativeDays";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Edt from "../homepages/edt.js"
import As from "../homepages/as.js"
import Map from "../homepages/map.js"


import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const TopBar = createMaterialTopTabNavigator();

export default class TopNav extends React.Component {

  state = {
    franck: ""
  }
  getFranck = async () => {
    const franck = Object(JSON.parse(await AsyncStorage.getItem("franck"))) // get the timetable from the storage
    this.setState({ franck: franck.timetable})
  }
    
  render() {
    this.getFranck()
    if (this.state.franck != "") {
      console.log("franck is full")
      return(
    <View style={{ flex: 1, backgroundColor: '#8F5FC7' }}>
      <NavigationContainer independent={true}>
        <TopBar.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarIndicator: () => {'white'},
                tabBarStyle: {
                    backgroundColor: "#4C3575",
                    borderTopColor: "#4C3575",
                    borderTopWidth: 1,
                    height: 60,
                    paddingTop: 5,
                    paddingBottom: 5,
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                
                },
                
                tabBarIcon: ({ focused, size, colour }) => {
                    let iconName;

                    if (route.name === "EDT") {
                        iconName = focused ? "albums" : "albums-outline";
                    } else if (route.name === "AS") {
                        iconName = focused ? "basketball" : "basketball-outline";
                    } else if (route.name === "PLAN") {
                        iconName = focused ? "map" : "map-outline";
                    }
                    return <Ionicons name={iconName} size={25} colour='#a128' />
                },
                
                
            })}
        >
        
          <TopBar.Screen name="EDT" component={Edt} options={{headerShown: false}} />
          <TopBar.Screen name="AS" component={As} options={{headerShown: false, }} />
          <TopBar.Screen name="PLAN" component={Map} options={{headerShown: false, }} />
        </TopBar.Navigator>
      </NavigationContainer>

      <View style={defaultCSS.container}>
        <Text style={defaultCSS.text}>Cours: {this.state.franck[0].subject}</Text>
        <Text style={defaultCSS.text}>Classe: {this.state.franck[0].room}</Text>
        <Text style={defaultCSS.text}>{timeDifference(Date.now() + 3600000, Date.parse(this.state.franck[0].from))}</Text>
      </View>
      
    </View>
    
      )
    }
    else if (this.state.franck == "") {
      return(
        <View style={defaultCSS.container}>
          <Text>Fetching data, it may take a while</Text>
        </View>
      );
    }
  }
}
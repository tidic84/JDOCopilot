import React from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Button } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {DEFAULT} from "../themes/variables"
//import tabs
import Home from "./pages/home"
import News from "./pages/news.js"
import Chat from "./pages/chat.js"
import Year from "./pages/year.js"
import Param from "./pages/param.js"


const BottomBar = createBottomTabNavigator();


export default class BottomNav extends React.Component {

  state = {
    name: ""
  }

  
  render() {
    return(
    <View style={{ flex: 1, backgroundColor: DEFAULT.primary }}>
      <NavigationContainer >
        <BottomBar.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "#83698c",
                tabBarStyle: {
                    backgroundColor: DEFAULT.secondary,
                    borderTopColor: DEFAULT.accent,
                    borderTopWidth: 1,
                    height: 60,
                    paddingTop: 5,
                    paddingBottom: 5,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                
                },
                
                tabBarIcon: ({ focused, size, color }) => {
                    let iconName;
                    let iconColor;

                    //set focused Icon color to DEFAULT.accent
                    if (route.name === "Accueil") {
                        iconName = focused ? "home" : "home-outline";
                        iconColor = focused ? '#C87327' : 'grey';
                    // } else if (route.name === "News") {
                    //     iconName = focused ? "book" : "book-outline";
                    //     iconColor = focused ? '#C87327' : 'grey';
                    // } else if (route.name === "Chat") {
                    //     iconName = focused ? "chatbox" : "chatbox-outline";
                    //     iconColor = focused ? '#C87327' : 'grey';
                    } else if (route.name === "Year") {
                        iconName = focused ? "calendar" : "calendar-outline";
                        iconColor = focused ? '#C87327' : 'grey';
                    } else if (route.name === "Params") {
                        iconName = focused ? "settings" : "settings-outline";
                        iconColor = focused ? '#C87327' : 'grey';
                    }
                    return <Ionicons name={iconName} size={25} color={iconColor} />
                },
                
                
            })}
        >
        
          <BottomBar.Screen name="Accueil" component={Home} options={{ title: 'Accueil', headerShown: false}} />
          {/* <BottomBar.Screen name="News" component={News} options={{ title: 'Agenda', headerShown: false }} />
          <BottomBar.Screen name="Chat" component={Chat} options={{ title: 'Chat', headerShown: false }} /> */}
          <BottomBar.Screen name="Year" component={Year} options={{ title: 'Année', headerShown: false }} />
          <BottomBar.Screen name="Params" component={Param} options={{ title: 'Paramètres', headerShown: false }} />
        </BottomBar.Navigator>
      </NavigationContainer>
    </View>
    );
  }
  
}
import React from "react"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Button } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"


//import tabs
import Home from "../navbarPages/home"
import News from "../navbarPages/news.js"
import Chat from "../navbarPages/chat.js"
import Year from "../navbarPages/year.js"
import Param from "../navbarPages/param.js"

const BottomBar = createBottomTabNavigator();


export default class BottomNav extends React.Component {

  state = {
    name: ""
  }

  
  render() {
    return(
    <View style={{ flex: 1, backgroundColor: '#8F5FC7' }}>
      <NavigationContainer >
        <BottomBar.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "#83698c",
                tabBarStyle: {
                    backgroundColor: "#4C3575",
                    borderTopColor: "#4C3575",
                    borderTopWidth: 1,
                    height: 60,
                    paddingTop: 5,
                    paddingBottom: 5,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                
                },
                
                tabBarIcon: ({ focused, size, colour }) => {
                    let iconName;

                    if (route.name === "Accueil") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "News") {
                        iconName = focused ? "book" : "book-outline";
                    } else if (route.name === "Chat") {
                        iconName = focused ? "chatbox" : "chatbox-outline";
                    } else if (route.name === "Year") {
                        iconName = focused ? "calendar" : "calendar-outline";
                    } else if (route.name === "Params") {
                        iconName = focused ? "settings" : "settings-outline";
                    }
                    return <Ionicons name={iconName} size={25} colour='#a128' />
                },
                
                
            })}
        >
        
          <BottomBar.Screen name="Accueil" component={Home} options={{ title: 'Accueil', headerShown: false}} />
          <BottomBar.Screen name="News" component={News} options={{ title: 'Agenda', headerShown: false }} />
          <BottomBar.Screen name="Chat" component={Chat} options={{ tabBarBadge: 3, tabBarBadgeStyle: { backgroundColor: '#d9be07', maxWidth: 10, maxHeight: 10, fontSize: 8 }, headerShown: false }} />
          <BottomBar.Screen name="Year" component={Year} options={{ title: 'Année', headerShown: false }} />
          <BottomBar.Screen name="Params" component={Param} options={{ title: 'Paramètres', headerShown: false }} />
        </BottomBar.Navigator>
      </NavigationContainer>
    </View>
    );
  }
  
}
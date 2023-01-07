//import modules
import React, { useState } from 'react';
import { ToastAndroid, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Pressable, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { Dimensions } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { encrypt, decrypt } from "../../util/crypto";
import * as d3 from 'd3';
import { Svg, SvgUri } from 'react-native-svg';

import {defaultCSS} from "../../stylesheets/_default/map.js"; //first theme
// import oceanLogin from "../stylesheets/login/ocean";


//import assets/utils

const logo = require('../../assets/images/logoRond.png')
import LyceePlan from "../../assets/plan/lycee-plan.svg"

//init bottomPopup
// import BottomPopup from '../components/bottomPopup.js'
// const popupList = [
//   { id: 1, name: 'Task' },
//   { id: 2, name: 'Message' },
//   { id: 3, name: 'Note' }
// ]


export default class Map extends React.Component {
  state = {
    name: ""
  }

  handlePress = (event) => {
    const element = d3.select(event.target);
    const name = element.attr('inkscape:label');
    if (name && name.includes('Salle')) {
      console.log('Element salle survolé : ', name);
    }
  };

  render() {
    return (
      <View style={defaultCSS.container}>
        <Text>Test</Text>
        
        <Svg style={defaultCSS.svg}>
          <LyceePlan style={defaultCSS.lyceeplan} width="90%"/>
        </Svg>
      </View>
    );
  }
}
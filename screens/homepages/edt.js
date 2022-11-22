//import modules
import React, {  } from 'react';
import { ToastAndroid, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Pressable, Keyboard, TouchableWithoutFeedback } from "react-native";


import stylesA from "../../stylesheets/login/purple"; //first theme
// import oceanLogin from "../stylesheets/login/ocean";


//import assets/utils

const logo = require('../../assets/icon/logoRond.png')


//init bottomPopup
// import BottomPopup from '../components/bottomPopup.js'
// const popupList = [
//   { id: 1, name: 'Task' },
//   { id: 2, name: 'Message' },
//   { id: 3, name: 'Note' }
// ]


export default class Edt extends React.Component {
  state = {
    name: ""
  }
render() {
    return (

      <>
        <View style={stylesA.container}>
          <Text>EDT</Text>
          
        </View>
    </>
    );
  }
}
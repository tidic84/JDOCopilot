//import modules
import React, { useState } from 'react';
import { ToastAndroid, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Pressable, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { Dimensions } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { encrypt, decrypt } from "../util/crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import Loader from "../components/loader.js"; //<Loader />

import stylesA from "../stylesheets/login/purple"; //first theme
// import oceanLogin from "../stylesheets/login/ocean";

//import assets/utils

const logo = require('../assets/icon/logoRond.png')
let dataReady = false;


//init bottomPopup
// import BottomPopup from '../components/bottomPopup.js'
// const popupList = [
//   { id: 1, name: 'Task' },
//   { id: 2, name: 'Message' },
//   { id: 3, name: 'Note' }
// ]


export default class Login extends React.Component {

  // Définition de la fonction errorMessage qui renvoie un message d'erreur sur android ou sur iOS
  errorMessage = (err) => {
    if (Platform.OS === 'android') { // Si l'OS est android
      ToastAndroid.show(err, ToastAndroid.SHORT) // Affiche un message d'erreur sur android
    } else if (Platform.OS === "ios") { // Sinon si l'OS est iOS
      AlertIOS.alert(err); // Affiche une alerte sur iOS
    } else {
      alert(err); // Sinon affiche une alerte
    }
  }

  state = {
    keptName: "",
    keptPassword: "",
  }

  continue = async () => {
    if ( this.state.name == "" || this.state.pwd == "" || this.state.name == undefined || this.state.pwd == undefined) { 
      if (await AsyncStorage.getItem("username") != "" || await AsyncStorage.getItem("username") != undefined || await AsyncStorage.getItem("password") != "" || await AsyncStorage.getItem("password")!= undefined) {
        this.state.name = decrypt(await AsyncStorage.getItem("username"));
        this.state.pwd = decrypt(await AsyncStorage.getItem("password"));
      }
      else return this.errorMessage("Identifiant ou Mot de passe vide !") 
    } 
    console.log("Connecté !! " + this.state.name)

    const username = await encrypt(this.state.name); // On encrypte le nom d'utilisateur
    const password = await encrypt(this.state.pwd); // On encrypte le mot de passe
    await AsyncStorage.setItem("username", username);
    await AsyncStorage.setItem("password", password);

    try {
      const response = await fetch(`https://jdocopilot-api.herokuapp.com/?username=${username}=&password=${password}`); // On récupère les données de pronote
      const franck = await response.json(); // On récupère les données de pronote
      await AsyncStorage.setItem("franck", JSON.stringify(franck));
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("password", password);

      console.log(await AsyncStorage.getItem("franck")); 
      this.props.navigation.navigate("Main"); // On navigue vers la page principale
      console.log("Switch page");
    } catch {
      return this.errorMessage("Identifiant ou Mot de passe incorrect !"); // Si l'identifiant ou le mot de passe est incorrect, on affiche un message d'erreur
    }
  }

  getID = async () => {
    if ( dataReady == false ){
      try {
        const keptName = await decrypt(await AsyncStorage.getItem("username"));
        const keptPassword = await decrypt(await AsyncStorage.getItem("password"));
        console.log( "Name exist: "+keptName)
        this.setState({ keptName: keptName });
        this.setState({ keptPassword: keptPassword });
        dataReady = true;

      } catch {
        const keptName = "";
        const keptPassword = "";
        console.log( "Name does not exist: "+keptName)
        this.setState({ keptName: keptName });
        this.setState({ keptPassword: keptPassword });
        dataReady = true;
      }
      
    }
  }

  //keyboard listeners
  UNSAFE_componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  UNSAFE_componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  // _keyboardDidShow () {
  //   alert('Keyboard Shown');
  // }

  _keyboardDidHide() {
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync('overlay-swipe');
    NavigationBar.setButtonStyleAsync("light");
  }

  render() {
    this.getID()

    //checkbox 'se souvenir de moi'
    function CheckBox() {
      const [checked, onChange] = useState(false);

      function onCheckmarkPress() {
        onChange(!checked);
      }

      return (
        <Pressable
          style={[stylesA.checkboxBase, checked && stylesA.checkboxChecked]}
          onPress={onCheckmarkPress}>
          {checked && <Ionicons style={stylesA.check} name="checkmark" size={24} color="white" />}
        </Pressable>
      );
    }

    // let popupRef = React.createRef();

    // const onShowPopup = () => {
    //   popupRef.show();
    // }

    // const onClosePopup = () => {
    //   popupRef.close();
    // }
    if (dataReady)  {
      return (
        <>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
          enabled={true} style={stylesA.container} >
          <View style={stylesA.container}>
            <View style={stylesA.circle} />

            {/*theme selector*/}
            {/* <View >
              <TouchableWithoutFeedback onPress={onShowPopup}>
                <Ionicons name="color-palette-outline" size={24} color='#FFF' style={stylesA.themeSelector}/>
              </TouchableWithoutFeedback>
              <BottomPopup 
                title="Demo Popup"
                ref={(target) => popupRef = target}
                onTouchOutside={onClosePopup}
                data={popupList}
              />
            </View> */}
                      


            <View style={{ marginTop: 64 }}>
              <Image source={logo}
                style={{ width: 100, height: 100, alignSelf: "center" }} />
            </View>




            <View style={{ marginHorizontal: 32 }}>
              <Text style={stylesA.header}>Connectez-vous !</Text>
              <View style={stylesA.separator} />


              <TextInput defaultValue={this.state.keptName} autoComplete="username" style={stylesA.textInput} placeholder="Nom d'utilisateur"
                //onPressIn={isolateTextInput}
                onChangeText={name => {
                  this.setState({ name })
                }}
                value={this.state.name}
              />


              <TextInput defaultValue={this.state.keptPassword} autoComplete="password" secureTextEntry={true} style={stylesA.textInput} placeholder="Mot de passe"
                onChangeText={pwd => {
                  this.setState({ pwd })
                }}
                value={this.state.pwd}
              />

              <CheckBox />
              <Text style={stylesA.checkboxLabel}>Se souvenir de moi</Text>




              <View style={{ alignItems: "flex-end", marginTop: 64 }}>
                <TouchableOpacity style={stylesA.continue} onPress={this.continue}>
                  <Ionicons name="arrow-forward-outline" size={24} color='#FFF' />
                </TouchableOpacity>
              </View>
            </View>


            <View style={stylesA.bottomContainer}>
              <View style={stylesA.bottomBox}>
                <Text style={stylesA.basicText}>Si vous avez oublié vos identifiants, rien de grave, réinitialisez-le directement via Atrium! JDO-Copilot ne stock aucunes données personnelles.</Text>
              </View>
            </View>
          </View>

        </KeyboardAvoidingView>
        </>
      );
    } else {
      return(
        <View style={stylesA.wait}>
        </View>
      );
    }
  }
}
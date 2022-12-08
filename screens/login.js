//import modules
import React, { useState } from 'react';
import { ToastAndroid, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Pressable, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { Dimensions } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { encrypt, decrypt } from "../util/crypto";
//import Loader from "../components/loader.js"; //<Loader />

import stylesA from "../stylesheets/login/purple"; //first theme
// import oceanLogin from "../stylesheets/login/ocean";

//import assets/utils

const logo = require('../assets/icon/logoRond.png')


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
    name: ""
  }

  continue = async () => {
    if ( this.state.name == "" || this.state.pwd == "") { this.props.navigation.navigate("Navigator", { name: this.state.name })}//return this.errorMessage("Les champs de connexion doivent être remplis !") } 
    const username = await encrypt(this.state.name); // On encrypte le nom d'utilisateur
    const password = await encrypt(this.state.pwd); // On encrypte le mot de passe
    try {
      const response = await fetch(`https://jdocopilot-api.herokuapp.com/?username=${username}=&password=${password}`); // On récupère les données de pronote
      const franck = await response.json(); // On récupère les données de pronote
      console.log(franck.params.periods);
      this.props.navigation.navigate("Navigator", { name: this.state.name })
      this.props.navigation.navigate("Home", { name: this.state.name }); // On redirige vers la page de chat
    } catch {
      return this.errorMessage("Identifiant ou mot de passe incorrect !") // Si l'identifiant ou le mot de passe est incorrect, on affiche un message d'erreur
    }

    
    //this.props.navigation.navigate("Navigator", { name: this.state.name }) //utile pendant les tests, sert a passer à une autre page
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


            <TextInput style={stylesA.textInput} placeholder="Nom d'utilisateur pronote"
              //onPressIn={isolateTextInput}
              onChangeText={name => {
                this.setState({ name })
              }}
              value={this.state.name}
            />


            <TextInput secureTextEntry={true} style={stylesA.textInput} placeholder="Mot de passe"
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
  }
}
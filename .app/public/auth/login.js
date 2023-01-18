//import modules
import {imports} from '../../private/imports.js';
import React, { useState } from 'react';
import { ToastAndroid, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Pressable, Keyboard } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import * as NavigationBar from 'expo-navigation-bar';
import { encrypt, decrypt } from "../util/crypto";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {defaultCSS} from "../stylesheets/_default/login"; //default theme

//import assets/utils
const logo = require('../assets/images/logoRond.png')
let dataReady = false;


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
    disabledButton: false
  }

  
  //verification des données
  continue = async () => {
    this.setState({ disabledButton: true})

    if ( this.state.name == "" || this.state.pwd == "" || this.state.name == undefined || this.state.pwd == undefined) { 
      if (await AsyncStorage.getItem("username") != "" || await AsyncStorage.getItem("username") != undefined || await AsyncStorage.getItem("password") != "" || await AsyncStorage.getItem("password")!= undefined) {
        this.state.name = decrypt(await AsyncStorage.getItem("username"));
        this.state.pwd = decrypt(await AsyncStorage.getItem("password"));
      }
      else return this.errorMessage("Merci de remplir tout les champs de connexion :)") 
    }
    let userN = this.state.name;
    userN = userN.slice(0, userN.indexOf('.'));
    console.log('\x1b[36m%s\x1b[0m', `>> connexion de ${userN}`);
    this.errorMessage(`Bonjour, ${userN}`);

    const username = encrypt(this.state.name); // On encrypte le nom d'utilisateur
    const password = encrypt(this.state.pwd); // On encrypte le mot de passe
    //console.log(username, password)
    
    const franck =  Object(JSON.parse(await AsyncStorage.getItem("franck")))
    const sessionDate = new Date(franck.session).getDay()
    const todayDate = new Date().getDay()

    
     if( sessionDate == todayDate && decrypt(username) == decrypt(await AsyncStorage.getItem("username")) && decrypt(password) == decrypt(await AsyncStorage.getItem("password"))) {
       await AsyncStorage.setItem("franck", JSON.stringify(franck));
       this.props.navigation.replace("Main"); // On navigue vers la page principale
       //console.log(await AsyncStorage.getItem("franck")); 
       console.log("Fast connection");
     } else {
      try {
        const response = await fetch(`https://jdocopilot-api-stable.herokuapp.com/?username=${username}=&password=${password}`); // On récupère les données de pronote
        const franck = await response.json(); // On récupère les données de pronote
        await AsyncStorage.setItem("franck", JSON.stringify(franck));

        await AsyncStorage.setItem("username", username);
        await AsyncStorage.setItem("password", password);

        //console.log(await AsyncStorage.getItem("franck")); 
        this.props.navigation.replace("Main"); // On navigue vers la page principale
        console.log("Slow connection");
      } catch {
        this.setState({ disabledButton: false })
        return this.errorMessage("Identifiant ou Mot de passe incorrect !"); // Si l'identifiant ou le mot de passe est incorrect, on affiche un message d'erreur
      }
    }
    
  }

  getID = async () => {
    if ( dataReady == false ){
      try {
        const keptName = decrypt(await AsyncStorage.getItem("username"));
        const keptPassword = decrypt(await AsyncStorage.getItem("password"));
        console.log( "Existing user: "+ keptName)
        this.setState({ keptName: keptName });
        this.setState({ keptPassword: keptPassword });
        dataReady = true;

      } catch {
        const keptName = "";
        const keptPassword = "";
        console.log( "No existing user: "+ keptName)
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
          style={[defaultCSS.checkboxBase, checked && defaultCSS.checkboxChecked]}
          onPress={onCheckmarkPress}>
          {checked && <Ionicons style={defaultCSS.check} name="checkmark" size={24} color="white" />}
        </Pressable>
      );
    }
    //checkbox 'Connexion rapide'
    function CheckBox2() {
      const [checked2, onChange2] = useState(false);

      function onCheckmarkPress2() {
        onChange2(!checked2);
      }

      return (
        <Pressable
          style={[defaultCSS.checkboxBase, checked2 && defaultCSS.checkboxChecked]}
          onPress={onCheckmarkPress2}>
          {checked2 && <Ionicons style={defaultCSS.check} name="checkmark" size={24} color="white" />}
        </Pressable>
      );
    }


    if (dataReady)  {
      return (
        <>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
          enabled={true} style={defaultCSS.container} >
          <View style={defaultCSS.container}>
            <View style={defaultCSS.circle} />
                   

            <View style={{ marginTop: 64 }}>
              <Image source={logo}
                style={{ width: 100, height: 100, alignSelf: "center" }} />
            </View>


            <View style={{ marginHorizontal: 32 }}>
              <Text style={defaultCSS.header}>Bonjour, </Text>
              <Text style={defaultCSS.underHeader}>connectez-vous pour acceder à nos services</Text>


              <TextInput defaultValue={this.state.keptName}
                         autoComplete="username"
                         style={defaultCSS.textInput}
                         placeholder="Nom d'utilisateur atrium"
                         placeholderTextColor={'#80786a'}
                onChangeText={name => {
                  this.setState({ name })
                }}
                value={this.state.name}
              />


              <TextInput defaultValue={this.state.keptPassword}
                         autoComplete="password"
                         secureTextEntry={true}
                         style={defaultCSS.textInput}
                         placeholder="Mot de passe atrium"
                         placeholderTextColor={'#80786a'}
                onChangeText={pwd => {
                  this.setState({ pwd })
                }}
                value={this.state.pwd}
              />

              {/* <CheckBox />
              <Text style={defaultCSS.checkboxLabel}>Se souvenir de moi</Text>
              <CheckBox2 />
              <Text style={defaultCSS.checkboxLabel}>Connexion rapide</Text> */}




              <View style={{ alignItems: "flex-end", marginTop: 64 }}>
                <TouchableOpacity disabled={this.state.disabledButton}
                                  activeOpacity={0.6}
                                  style={!this.state.disabledButton ? defaultCSS.continue : defaultCSS.continueDisabled}
                                  onPress={this.continue}>
                  <Ionicons name="arrow-forward-outline" size={24} color='#FFF' />
                </TouchableOpacity>
              </View>
            </View>


            <View style={defaultCSS.bottomContainer}>
              <View style={defaultCSS.bottomBox}>
                <Text style={defaultCSS.basicText}>Si vous avez oublié vos identifiants,
                 rien de grave, réinitialisez-les directement via Atrium!</Text>
              </View>
              <View style={defaultCSS.bottomBox}>
                <Text style={defaultCSS.basicText}>
                  JDO-Copilot ne garde pas de données personnelles.</Text>
              </View>
            </View>
          </View>

        </KeyboardAvoidingView>
        </>
      );
    } else {
      return(
        <View style={{backgroundColor: '#555555'}}>
        </View>
      );
    }
  }
}

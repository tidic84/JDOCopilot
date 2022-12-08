import React from "react"; // importe React
import { ToastAndroid, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Platform } from "react-native"; // Importe les composants de React Native
import { Ionicons } from '@expo/vector-icons'; // Importe les icones Ionicons depuis le package @expo/vector-icons
import { encrypt, decrypt } from "../util/crypto"; // Importe la fonction encrypt et decrypt du fichier crypto.js
import AsyncStorage from "@react-native-async-storage/async-storage";
let dataReady = false;

// Définition de la classe LoginScreen
export default class loginScreen extends React.Component {
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
  
  // Définition de la fonction continue qui permet de de récupérer les données de pronote et de passer à la page principale.
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
  render() {
    this.getID()
    if (dataReady)  {
      return(
        <View style={styles.container}>
            <View style={styles.circle} />
            <View style={{ marginTop: 64 }}>
              <Image source={require("../assets/favicon.png")}
                     style={{ width: 100, height: 100, alignSelf: "center" }} />
            </View>
            <View style={{ marginHorizontal: 32 }}>
              <Text style={styles.header}>Connectez-vous !</Text>
              <View style={{
                width: 255, height: 18, backgroundColor: '#ABEDD8', borderRadius: 38, marginTop: 8, alignSelf: "center"
              }} />
                <TextInput defaultValue={this.state.keptName} autoComplete="username" style={styles.inputName}  placeholder="Identifiant" 
                          onChangeText={name => {
                            this.setState({ name })
                          }}
                          value={this.state.name}
                />
                <TextInput defaultValue={this.state.keptPassword} autoComplete="password" secureTextEntry={true} style={styles.inputPwd} placeholder="Mot de passe" 
                          onChangeText={pwd => {
                            this.setState({ pwd })
                          }}
                            value={this.state.pwd}
                />
  
              <View style={{ alignItems: "flex-end", marginTop: 64 }}>
                <TouchableOpacity style={styles.continue} onPress={this.continue}>
                  <Ionicons name="arrow-forward-outline" size={24} color='#FFF' />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Si vous avez oublié vos identifiants, rien de grave.
                Vous devez aller voir l'intendant.
                Nous ne pouvons rien faire pour vous. JDO-copilot ne conserve aucune données personnelles.
              </Text>
            </View>
        </View>
      );
    }
    else{
      return(
        <View style={styles.wait}>
        </View>
      );
    }
  }
  
}

const styles = StyleSheet.create({
  wait: {
    flex: 1,
    backgroundColor: "#ABEDD8",
  },
  container: {
    flex: 1,
    backgroundColor: "#ABEDD8",
  },
  circle: {
    width: 500,
    height: 500,
    borderRadius: 500 / 2,
    backgroundColor: "#46CDCF",
    position: "absolute",
    left: -181,
    top: -103
  },
  header: {
    fontWeight: "400",
    fontSize: 30,
    color: "#48466D",
    marginTop: 32,

    //fontFamily: "MontserratRegular"
  },
  inputName: {
    marginTop: 32,
    height: 50,
    backgroundColor: "#93D4D4",
    borderRadius: 13,
    paddingHorizontal: 16,
    color: "#48466D",
    fontWeight: "600",
    left: -10
  },
  inputPwd: {
    marginTop: 32,
    height: 50,
    backgroundColor: "#93D4D4",
    borderRadius: 13,
    paddingHorizontal: 16,
    color: "#48466D",
    fontWeight: "600",
    left: -10
  },
  continue: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: "#46CDCF",
    alignItems: "center",
    justifyContent: "center",
    left: 2,
    top: -12
  },

  footer: {
    width: 328,
    height: 50,
    borderRadius: 13,
    backgroundColor: "#93D4D4",
    alignItems: "center",
    justifyContent: "center",
    left: 13,
    //top: "25%",
    //bottom: 0,
  },

  footerText: {
    color: '#000',
    fontSize: 10,
    fontWeight: "400",
    left: 2
  }

});
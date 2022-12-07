import React from "react"; // importe React
import { ToastAndroid, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Platform } from "react-native"; // Importe les composants de React Native
import { Ionicons } from '@expo/vector-icons'; // Importe les icones Ionicons depuis le package @expo/vector-icons
import { encrypt, decrypt } from "../util/crypto"; // Importe la fonction encrypt et decrypt du fichier crypto.js
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    name: ""
  }
  
  // Définition de la fonction continue qui permet de de récupérer les données de pronote et de passer à la page principale.
  continue = async () => {
    //if ( this.state.name == "" || this.state.pwd == "") { return this.errorMessage("Identifiant ou Mot de passe vide !") } 
    console.log("Connecté !!")

    //const username = await encrypt(this.state.name); // On encrypte le nom d'utilisateur
    //const password = await encrypt(this.state.pwd); // On encrypte le mot de passe
    
    const username = await encrypt("cedric.sephanh");
    const password = await encrypt("Nmis%1384#OSU");
    // try {
      /*const response = await fetch(`https://jdocopilot-api.herokuapp.com/?username=${username}=&password=${password}`); // On récupère les données de pronote
      const franck = await response.json(); // On récupère les données de pronote
      await AsyncStorage.setItem("franck", JSON.stringify(franck));
      console.log(await AsyncStorage.getItem("franck")); */
      this.props.navigation.navigate("Main"); // On navigue vers la page principale
      console.log("Switch page");
    // } catch {
    //   return this.errorMessage("Identifiant ou Mot de passe incorrect !"); // Si l'identifiant ou le mot de passe est incorrect, on affiche un message d'erreur
    // }
  }

  render() {
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
              <TextInput style={styles.inputName} placeholder="Nom d'utilisateur pronote" 
                        onChangeText={name => {
                          this.setState({ name })
                        }}
                          value={this.state.name}
              />
              <TextInput secureTextEntry={true} style={styles.inputPwd} placeholder="Mot de passe" 
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
  
}

const styles = StyleSheet.create({
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
import React from "react"
import { ToastAndroid, StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native"
import { Ionicons } from '@expo/vector-icons'
//import pronote from 'pronoteapi-atriumfix';

export default class loginScreen extends React.Component {
  
  errorMessage = (err) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(err, ToastAndroid.SHORT)
    } else {
      AlertIOS.alert(err);
    }
  }
  state = {
    name: ""
  }
  
  continue = () => {
    if ( this.state.name == "" || this.state.pwd == "") { return this.errorMessage("Identifiant ou Mot de passe vide !") } 
    try {
      //this.pronoteConnect()
    } catch {
      return this.errorMessage("Identifiant ou Mot de passe incorrect !")
    }
    
    //this.props.navigation.navigate("Chat", { name: this.state.name })
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
//import modules
import React, { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ToastAndroid,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
  Alert,
  Linking,
  Button,
  Dimensions,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import * as NavigationBar from "expo-navigation-bar";
import { encrypt, decrypt } from "../util/crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";

//import images


//import statusBar
import { StatusBar } from "expo-status-bar";

//import { withNavigation } from 'react-navigation';

const { width, height } = Dimensions.get("window");

import { defaultCSS } from "../stylesheets/_default/login"; //default theme
import { DEFAULT } from "../themes/variables";
import { ScrollView } from "react-native-gesture-handler";
//import assets/utils
const logo = require("../assets/images/logoRond.png");
const Franck1 = "http://jdocopilot.me/pps/Franck2.jpg";
let dataReady = false;

const appInfos = require('../../Infos.json')

const delay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

class Login extends React.Component {
  // Définition de la fonction pour les toasts
  toastMessage = (msg) => {
    if (Platform.OS === "android") {
      // Si l'OS est android
      ToastAndroid.show(msg, ToastAndroid.SHORT);
      // Affiche un message d'msgeur sur android
    }
  };

  state = {
    pwd: "",
    name: "",
    keptName: "",
    keptPassword: "",
    disabledButton: false,
    FastBoot: true,
    isKeptName: false,
    isKeptPassword: false,
    haveConnectionBeenTried: false,
    isFastCoEnabled: false,
    isLoading: false,
    isPasswordShown: false,
  };

  //Recherche de mise a jours :
  isThereAnUpdate = async () => {
    const response = await fetch(
      `http://jdocopilot.me/pps/isThereAnUpdate.json`
    );
    const data = await response.json();

    if (
      data.isUpdateAvailable === true &&
      data.slug != appInfos.slug &&
      data.isNeeded == false
    ) {
      Alert.alert(
        "Recherche de mise a jours...",
        `Une nouvelle version de l'app est disponnible : la ${data.version} ! C'est une mise a jour facultative, veuillez télécharger ici :`,
        [
          { text: "Plus tard", onPress: () => console.log("OK Pressed") },
          { text: "télécharger", onPress: () => Linking.openURL(data.ilink) },
        ],
        { cancelable: true }
      );
    } else if (
      data.isUpdateAvailable === true &&
      data.slug != appInfos.slug &&
      data.isNeeded == true
    ) {
      Alert.alert(
        "Recherche de mises à jour...",
        `Une nouvelle version majeure de l'app est disponnible ! C'est la ${data.version} et c'est une mise à jour necessaire.`,
        [{ text: "télécharger", onPress: () => Linking.openURL(data.ilink) }],
        { cancelable: false }
      );
    } else if (!data.isUpdateAvailable && data.messageFromAlbatross) {
      this.toastMessage(data.messageContent);
    } else if (!data.isUpdateAvailable) {
      this.toastMessage(
        `Vous utilisez la dernière version : ${appInfos.version}`
      );
    }
  };

  //login :

  continue = async () => {
    try {
      //set-up :
      this.setState({ disabledButton: true }); //on désactive le boutton pour éviter les bugs
      this.setState({ isLoading: true }); //on active la fonction loading

      //on vérifie que les champs ne sont pas vides
      if (
        this.state.name == "" ||
        this.state.pwd == "" ||
        this.state.name == undefined ||
        this.state.pwd == undefined ||
        this.state.name == null ||
        this.state.pwd == null
      ) {
        this.setState({ disabledButton: false }); //on réactive le boutton
        this.setState({ isLoading: false }); //on désactive la fonction loading
        return this.toastMessage(
          "Merci de remplir tout les champs de connexion :)"
        );
      } else if (!this.state.isFastCoEnabled) {
        //set-up :
        let userN = this.state.name;
        userN = userN.slice(0, userN.indexOf(".")); //on récupère le prénom de l'utilisateur

        //encryption des identifiants :
        const username = encrypt(this.state.name); // On encrypte le nom d'utilisateur
        const password = encrypt(this.state.pwd); // On encrypte le mot de passe

        
        this.setState({ haveConnectionBeenTried: true });
        await AsyncStorage.setItem("haveConnectionBeenTried", "true");

        try {
          console.log("\x1b[32m%s\x1b[0m", "Première connexion : try");

          const response = await fetch(
            `https://jdocopilot-api-stable.herokuapp.com/?username=${username}=&password=${password}`
          ); // On récupère les données de pronote //-stable pour le build

          const franck = await response.json(); // On les formate en JSON
          await AsyncStorage.setItem("franck", JSON.stringify(franck)); //on les mets dans l'AsyncStorage

          await AsyncStorage.setItem("username", username); //on garde en mémoire le nom d'utilisateur
          await AsyncStorage.setItem("password", password); //on garde en mémoire le mot de passe

          // console.log(franck);
          
          this.setState({ isLoading: false });
          this.props.navigation.replace("Main"); // On navigue vers la page principale
          this.toastMessage(`Bonjour, ${userN}`);
        } catch (err) {
          console.log("\x1b[32m%s\x1b[0m", "Première connexion : catch" + err);
          this.setState({ disabledButton: false }); //on réactive le boutton
          this.setState({ isLoading: false }); //on désactive la fonction loading
          return this.toastMessage(
            "Une erreur est survenue :/ Merci de vérifier votre identifiant, votre mot de passe et votre connexion wifi !"
          ); // Si l'identifiant, le mot de passe ou le wifi est incorrect, on affiche un message d'erreur
        }
      } else if (this.state.isFastCoEnabled) {
        if (!this.state.haveConnectionBeenTried) {
          this.setState({ disabledButton: false }); //on réactive le boutton
          this.setState({ isLoading: false }); //on désactive la fonction loading
          return this.toastMessage(
            "Merci de vous connecter une première fois pour activer le mode hors ligne !"
          );
        } else if (this.state.haveConnectionBeenTried) {
          //set-up :
          let userN = this.state.name;
          userN = userN.slice(0, userN.indexOf(".")); //on récupère le prénom de l'utilisateur

          //encryption des identifiants :
          const username = encrypt(this.state.name); // On encrypte le nom d'utilisateur
          const password = encrypt(this.state.pwd); // On encrypte le mot de passe

          const franck = Object(
            JSON.parse(await AsyncStorage.getItem("franck"))
          );

          if (
            decrypt(username) == decrypt(await AsyncStorage.getItem("username"))
          ) {
            if (
              decrypt(password) ==
              decrypt(await AsyncStorage.getItem("password"))
            ) {
              console.log("\x1b[32m%s\x1b[0m", "Session non périmée");
              await AsyncStorage.setItem("franck", JSON.stringify(franck));
              this.props.navigation.replace("Main"); // On navigue vers la page principale
              this.toastMessage(`Re-bonjour, ${userN}`);
            } else {
              this.setState({ disabledButton: false }); //on réactive le boutton
              this.setState({ isLoading: false }); //on désactive la fonction loading
              return this.toastMessage("Mauvais mot de passe !");
            }
          } else {
            this.setState({ disabledButton: false }); //on réactive le boutton
            this.setState({ isLoading: false }); //on désactive la fonction loading
            return this.toastMessage("Mauvais nom d'utilisateur !");
          }
        }
      }
    } catch (error) {
      console.log("\x1b[32m%s\x1b[0m", "Première connexion : catch" + error);
      this.setState({ disabledButton: false }); //on réactive le boutton
      this.setState({ isLoading: false }); //on désactive la fonction loading
      return this.toastMessage("Une erreur est survenue :/ vérifiez votre connexion wifi !");
    }
  };

  //recupération des id :
  getID = async () => {
    if (dataReady == false) {
      //si c'est pas prêt
      try {
        const keptName = decrypt(await AsyncStorage.getItem("username"));
        const keptPassword = decrypt(await AsyncStorage.getItem("password"));
        //console.log('\x1b[32m%s\x1b[0m', `Existing user : ${keptName} \n Paswword : ${keptPassword}` )
        this.setState({ keptName: keptName });
        this.setState({ keptPassword: keptPassword });
        this.setState({ isKeptName: true });
        this.setState({ isKeptPassword: true });

        this.setState({ name: keptName });
        this.setState({ pwd: keptPassword });
        dataReady = true;
        console.log(this.state.isKeptName, this.state.isKeptPassword);
      } catch {
        const keptName = "";
        const keptPassword = "";
        console.log("\x1b[30m%s\x1b[0m", "No existing user ! ");
        this.setState({ keptName: keptName });
        this.setState({ keptPassword: keptPassword });
        this.setState({ isKeptName: false });
        this.setState({ isKeptPassword: false });
        dataReady = true;
      }
    }
  };

  //asyncStorage wipe :
  wipe = async () => {
    await AsyncStorage.clear(); //on efface tout
    await AsyncStorage.setItem("hasShownOnboarding", "true"); //sauf l'intro

    console.log("\x1b[31m%s\x1b[0m", "AsyncStorage wiped !");
  };

  checkBoxHandler = async () => {
    if ((await AsyncStorage.getItem("isFastCoEnabled")) === "true") {
      await AsyncStorage.setItem("isFastCoEnabled", "false");
      this.setState({ isFastCoEnabled: false });
    } else {
      await AsyncStorage.setItem("isFastCoEnabled", "true");
      this.setState({ isFastCoEnabled: true });
    }

    console.log(
      "FastCoEnabled : ",
      await AsyncStorage.getItem("isFastCoEnabled")
    );
  };
  checkBoxHandler2 = async () => {
    if ((await AsyncStorage.getItem("isPasswordShown")) === "false") {
      await AsyncStorage.setItem("isPasswordShown", "true");
      this.setState({ isPasswordShown: true });
    } else {
      await AsyncStorage.setItem("isPasswordShown", "false");
      this.setState({ isPasswordShown: false });
    }

    console.log(
      "isPasswordShown : ",
      await AsyncStorage.getItem("isPasswordShown")
    );
  };

  checkboxFirstHandler = async () => {
    const franck = Object(JSON.parse(await AsyncStorage.getItem("franck")));
    const sessionDate = new Date(franck.session).getDay(); //on définit la date de la dernière session
    const todayDate = new Date().getDay(); //on définit la date d'aujourd'hui

    await AsyncStorage.setItem("isPasswordShown", "false");
    this.setState({ isPasswordShown: false });
    if (sessionDate == todayDate) {
      if ((await AsyncStorage.getItem("haveConnectionBeenTried")) === null) {
        await AsyncStorage.setItem("haveConnectionBeenTried", "false");
        this.setState({ haveConnectionBeenTried: false });
      } else if (
        (await AsyncStorage.getItem("haveConnectionBeenTried")) === "true"
      ) {
        this.setState({ haveConnectionBeenTried: true });
      } else if (
        (await AsyncStorage.getItem("haveConnectionBeenTried")) === "false"
      ) {
        this.setState({ haveConnectionBeenTried: false });
      }
    } else if (sessionDate != todayDate) {
      await AsyncStorage.setItem("haveConnectionBeenTried", "false");
      this.setState({ haveConnectionBeenTried: false });
    }

    console.log(
      "FastCoEnabled : ",
      await AsyncStorage.getItem("isFastCoEnabled"),
      this.state.isFastCoEnabled,
      "\nhaveConnectionBeenTried : ",
      await AsyncStorage.getItem("haveConnectionBeenTried"),
      this.state.haveConnectionBeenTried
    );
  };

  //les fonctions qu'on appelle qu'une fois au chargement de la page :
  componentDidMount() {
    this.checkboxFirstHandler();
    this.isThereAnUpdate();
  }

  //les fonctions qu'on appelle en boucle
  render() {
    this.getID();
    //this.autoCo()

    let loadingTips = [
      "Chargement des données...",
      "Franck est parti chercher tes données, il risque d'être un peu long donc pense à activer la connexion rapide la prochaine fois :)",
      "Franck est en train de se préparer un café, il revient tout de suite !",
      "Connexion en cours...",
      "Préparation d'un space cake...",
      "Pour votre santé, mangez 5 fruits et légumes par jour",
      "Soutenez nous en notant notre application sur le playstore",
      "Franck s'est perdu dans les couloirs, il aurait dû installer JDO-Copilot !",
      "Franck est parti chercher ton emploi du temps à la vie scolaire...",
      "Franck fini juste sa partie d'échecs et il arrive",
      "Franck prépare la prochaine mise à jour, il arrive dans 2 secondes",
      "Fait avec amour par Albatross !!",
      "Pas mal non? C'est français.",
      "Rien ne semblait déplacé, sauf la machine à laver au milieu du bar...",
      "8% de 25 est égal à 25% de 8 et l'un des deux est beaucoup plus facile à calculer de tête.",
      "Il avait la vague impression que les arbres avaient donné naissance aux dinosaures.",
      "Never Gonna Give You Up, Never Gonna Let You Down",
      "'Life is too short to unmount'",
      "DO A BARREL ROLL !",
      "Pensez à nous faire des retours ;)",
    ];

    function getRandomInt() {
      return Math.floor(Math.random() * loadingTips.length);
    }

    if (this.state.isLoading) {
      return (
        <>
          <StatusBar barStyle="light-content" />
          <StatusBar backgroundColor={DEFAULT.primary} />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: DEFAULT.primary,
            }}
          >
            <Image
              source={require("../assets/images/Franck2-removebg-preview.png")}
              style={{ width: 100, height: 100, alignSelf: "center" }}
            />
            <Text
              style={{
                color: "white",
                fontSize: 15,
                textAlign: "center",
                marginHorizontal: 20,
                marginTop: 20,
              }}
            >
              {loadingTips[getRandomInt()]}
            </Text>
            <ActivityIndicator
              size="large"
              color="white"
              style={{ margin: 15 }}
            />
          </View>
        </>
      );
    } else if (dataReady) {
      return (
        <>
          <StatusBar barStyle="light-content" />
          <StatusBar backgroundColor={DEFAULT.secondary} />

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
            enabled={true}
            style={defaultCSS.container}
          >
            <ScrollView style={defaultCSS.container}>
              <View style={defaultCSS.circle} />

              <View style={{ marginTop: 64 }}>
                <Image
                  source={logo}
                  style={{ width: 100, height: 100, alignSelf: "center" }}
                />
              </View>

              <View style={{ marginHorizontal: 32 }}>
                <Text style={defaultCSS.header}>Bonjour, </Text>
                <Text style={defaultCSS.underHeader}>
                  connectez-vous pour acceder à nos services
                </Text>


                <TextInput
                  autoComplete="username"
                  style={defaultCSS.textInput}
                  placeholder="Nom d'utilisateur atrium"
                  placeholderTextColor={"#80786a"}
                  onChangeText={(name) => {
                    this.setState({ name });
                  }}
                  defaultValue={this.state.isKeptName ? this.state.keptName : console.log('nope')}
                />

                <TextInput
                  autoComplete="password"
                  secureTextEntry={this.state.isPasswordShown ? false : true}
                  style={defaultCSS.textInput}
                  placeholder="Mot de passe atrium"
                  placeholderTextColor={"#80786a"}
                  onChangeText={(pwd) => {
                    this.setState({ pwd });
                  }}
                  defaultValue={this.state.isKeptPassword ? this.state.keptPassword : ""}
                />
                <Checkbox
                  disabled={this.state.disabledButton}
                  color={
                    this.state.isPasswordShown
                      ? DEFAULT.textfields
                      : DEFAULT.textSecondary
                  }
                  value={this.state.isPasswordShown}
                  onValueChange={this.checkBoxHandler2}
                  style={{
                    marginTop: -35,
                    marginLeft: width - 95,
                    borderRadius: 15,
                    borderColor: DEFAULT.textSecondary,
                    borderWidth: 1,
                  }}
                />

                <Checkbox
                  disabled={this.state.disabledButton}
                  color={
                    this.state.isFastCoEnabled
                      ? DEFAULT.primary
                      : DEFAULT.textSecondary
                  }
                  value={this.state.isFastCoEnabled}
                  onValueChange={this.checkBoxHandler}
                  style={{
                    marginTop: 20,
                    marginLeft: 10,
                    borderRadius: 15,
                    borderColor: DEFAULT.textSecondary,
                    borderWidth: 1,
                  }}
                />
                <Text
                  style={{
                    marginTop: -20,
                    color: DEFAULT.textSecondary,
                    marginLeft: 34,
                  }}
                >
                  Continuer hors-connexion
                </Text>

                <View style={{ alignItems: "flex-end", marginTop: 90 }}>
                  <TouchableOpacity
                    disabled={this.state.disabledButton}
                    activeOpacity={0.6}
                    style={
                      !this.state.disabledButton
                        ? defaultCSS.continue
                        : defaultCSS.continueDisabled
                    }
                    onPress={this.continue}
                  >
                    <Ionicons
                      name="arrow-forward-outline"
                      size={24}
                      color="#FFF"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
          <View style={defaultCSS.bottomContainer}>
            <TouchableOpacity
              style={
                !this.state.disabledButton
                  ? defaultCSS.bottomBox
                  : defaultCSS.bottomBoxDisabled
              }
              disabled={this.state.disabledButton}
              activeOpacity={0.6}
              onPress={() =>
                this.toastMessage('Rien à voir par ici !')
              }
            >
              
                <Text style={defaultCSS.basicText}>
                  JDO-Copilot ne conserve pas vos données personnelles et est
                  complêtement open-source.
                </Text>
              
            </TouchableOpacity>
          </View>
        </>
      );
    }
  }
}

export default Login;

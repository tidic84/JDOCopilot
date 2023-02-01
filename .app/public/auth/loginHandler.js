import * as React from React;
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ToastAndroid, Platform, AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { render } from 'react-dom';

const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
}

export default class loginHandler extends React.Component {

// Définition de la fonction pour les toasts
    toastMessage = (msg) => {
        if (Platform.OS === 'android') { // Si l'OS est android
        ToastAndroid.show(msg, ToastAndroid.SHORT);
        // Affiche un message d'msgeur sur android
        } else if (Platform.OS === "ios") { // Sinon si l'OS est iOS
        alert(msg); // Affiche une alerte sur iOS
        } else {
        alert(msg); // Sinon affiche une alerte
        }
    }

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
        isAutoCoEnabled: "",
        isLoading: false,
      }
    
    
    
      
    //connexion auto oui/non :
      enableAutoCo = async () => {
        this.setState({ isAutoCoEnabled : true})
        await AsyncStorage.setItem("isAutoCoEnabled", 'true');
        console.log("AutoCoEnabled : ", await AsyncStorage.getItem("isAutoCoEnabled"))
      }
      disableAutoCo = async () => {
        this.setState({ isAutoCoEnabled : false})
        await AsyncStorage.setItem("isAutoCoEnabled", 'false');
        console.log("AutoCoDisabled : ", await AsyncStorage.getItem("isAutoCoEnabled"))
      }
    
    
    //Recherche de mise a jours :
      isThereAnUpdate = async () => {
            const response = await fetch(`http://jdocopilot.me/pps/isThereAnUpdate.json`);
            const data = await response.json();
    
            if (data.isUpdateAvailable === true && data.slug != appInfos.slug && data.isNeeded == false){
                Alert.alert(
                'Recherche de mise a jours...',
                `Une nouvelle version de l'app est disponnible : la ${data.version} ! C'est une mise a jour facultative, veuillez télécharger ici :`,
                [
                    {text: 'Plus tard', onPress: () => console.log('OK Pressed')},
                    {text: 'télécharger', onPress: () => Linking.openURL(data.ilink)},
                ],
                { cancelable: true }
                )
            } else if (data.isUpdateAvailable === true && data.slug != appInfos.slug && data.isNeeded == true) {
                Alert.alert(
                'Recherche de mise a jours...',
                `Une nouvelle version majeure de l'app est disponnible : la ${data.version} ! C'est une mise a jour necessaire, veuillez la télécharger ici :`,
                [
                    {text: 'télécharger', onPress: () => Linking.openURL(data.ilink)},
                ],
                { cancelable: false }
                )
            } else if (!data.isUpdateAvailable && data.messageFromAlbatross){
                this.toastMessage(data.messageContent)
            } else if (!data.isUpdateAvailable){
                this.toastMessage(`Vous utilisez la dernière version : ${appInfos.version}`)
            }
        }
      
        
    //login :
    
        continueFast = async () => {
          const franck =  Object(JSON.parse(await AsyncStorage.getItem("franck")))
          let userN = this.state.name;
          userN = userN.slice(0, userN.indexOf('.'));
          //encryption des identifiants :
          const username = encrypt(this.state.name); // On encrypte le nom d'utilisateur
          const password = encrypt(this.state.pwd); // On encrypte le mot de passe
    
            if(decrypt(username) == decrypt(await AsyncStorage.getItem("username"))){
                if(decrypt(password) == decrypt(await AsyncStorage.getItem("password"))){
                    console.log('\x1b[32m%s\x1b[0m', 'Session non périmée')
                    await AsyncStorage.setItem("franck", JSON.stringify(franck));
                    this.props.navigation.replace('Main'); // On navigue vers la page principale
                    this.toastMessage(`Re-bonjour, ${userN}`);
                } else {
                    this.setState({ disabledButton: false }) //on réactive le boutton
                    return this.toastMessage("Mauvais mot de passe !");
                }
              } else {
                  this.setState({ disabledButton: false }) //on réactive le boutton
                  return this.toastMessage("Mauvais nom d'utilisateur !");
              }
        }
        
        continue = async () => {
            //set-up :
    
            this.setState({ disabledButton: true}) //on désactive le boutton pour éviter les bugs
            this.setState({ isLoading: true}) //on active la fonction loading
    
            //on vérifie que les champs ne sont pas vides
            if ( this.state.name == "" || this.state.pwd == "" || this.state.name == undefined || this.state.pwd == undefined || this.state.name == null || this.state.pwd == null) { 
              if (await AsyncStorage.getItem("username") != "" || await AsyncStorage.getItem("username") != undefined || await AsyncStorage.getItem("password") != "" || await AsyncStorage.getItem("password")!= undefined) {
                  this.state.name = decrypt(await AsyncStorage.getItem("username"));
                  this.state.pwd = decrypt(await AsyncStorage.getItem("password"));
              }
              else {
                  this.setState({ disabledButton: false }) //on réactive le boutton
                  this.setState({ isLoading: false}) //on désactive la fonction loading
                  return this.toastMessage("Merci de remplir tout les champs de connexion :)")
              }
            }
            let userN = this.state.name;
            userN = userN.slice(0, userN.indexOf('.')); //on récupère le prénom de l'utilisateur
    
            //encryption des identifiants :
            const username = encrypt(this.state.name); // On encrypte le nom d'utilisateur
            const password = encrypt(this.state.pwd); // On encrypte le mot de passe
    
            //on récupère les données de l'utilisateur dans Franck
            const franck =  Object(JSON.parse(await AsyncStorage.getItem("franck")))
            const sessionDate = new Date(franck.session).getDay() //on définit la date de la dernière session
            const todayDate = new Date().getDay() //on définit la date d'aujourd'hui
    
            //si la session est périmée ou si l'utilisateur n'a jamais été connecté :
            if (sessionDate != todayDate || sessionDate == undefined){
                try { //on essaie de se connecter avec les infos des champs
                    console.log('\x1b[32m%s\x1b[0m', 'Première connexion : try')
                    this.toastMessage(`On te connecte, ça peut prendre un moment : on télécharge tes données !`);
                
                    const response = await fetch(`https://jdocopilot-api-stable.herokuapp.com/?username=${username}=&password=${password}`); // On récupère les données de pronote //-stable pour le build
                    const franck = await response.json(); // On les formate en JSON
                    await AsyncStorage.setItem("franck", JSON.stringify(franck)); //on les mets dans l'AsyncStorage
                
                    await AsyncStorage.setItem("username", username); //on garde en mémoire le nom d'utilisateur
                    await AsyncStorage.setItem("password", password); //on garde en mémoire le mot de passe
                
                    //on fait une alerte pour demander à l'utilisateur s'il veut activer la connexion automatique
                    // Alert.alert(
                    // 'Archtung !',
                    // 'Veux-tu activer la connection automatique pour la journée ?',
                    // [
                    //     {text: 'Nope', onPress: () => this.disableAutoCo()}, //non, on ne l'active pas
                    //     {text: 'Oui', onPress: () => this.enableAutoCo()}, //oui, on active la connexion automatique
                    // ],
                    // )
            
                    this.props.navigation.replace('Main'); // On navigue vers la page principale
                    this.toastMessage(`Bonjour, ${userN}`);
                } catch {
                    console.log('\x1b[32m%s\x1b[0m', 'Première connexion : catch')
                    this.setState({ disabledButton: false }) //on réactive le boutton
                    this.setState({ isLoading: false}) //on désactive la fonction loading
                    return this.toastMessage("Une erreur est survenue :/ Vérifie les informations ou ta connexion internet !"); // Si l'identifiant, le mot de passe ou le wifi est incorrect, on affiche un message d'erreur
                }
                } //si la session n'est pas périmée :
                else if(sessionDate == todayDate) { 
                    this.continueFast()
                } 
            }
    
    
    //connexion auto :
        autoCo = async () => {
            const franck =  Object(JSON.parse(await AsyncStorage.getItem("franck")))
            const sessionDate = new Date(franck.session).getDay()
            const todayDate = new Date().getDay()
    
            if(this.state.isAutoCoEnabled == "true") {
                if(!this.state.haveConnectionBeenTried){
                if(sessionDate == todayDate) {
                    await delay(3000);
                    console.log(this.state.isKeptName + " " + this.state.isKeptPassword)
                    if(this.state.isKeptName && this.state.isKeptPassword) {
                    await AsyncStorage.setItem("franck", JSON.stringify(franck));
                    //this.toastMessage("Connexion plus rapide que la lumière !")
                    
                    this.props.navigation.replace('Main'); // On navigue vers la page principale
                    console.log("Auto connection");
                    this.state.haveConnectionBeenTried = true;
            
                    } else {
                    this.toastMessage("La connexion automatique a échoué, merci de vous reconnecter")
                    this.state.haveConnectionBeenTried = true
            
                    }
                } else {
                    this.toastMessage("Vous avez été déconnecté, merci de vous reconnecter")
                    this.state.haveConnectionBeenTried = true
                }
                }
            }
        }
    
    //recupération des id :
        getID = async () => {
            if ( dataReady == false ){ //si c'est pas prêt
            try {
                const keptName = decrypt(await AsyncStorage.getItem("username"));
                const keptPassword = decrypt(await AsyncStorage.getItem("password"));
                //console.log('\x1b[32m%s\x1b[0m', `Existing user : ${keptName} \n Paswword : ${keptPassword}` )
                this.setState({ keptName: keptName });
                this.setState({ keptPassword: keptPassword });
                this.setState({ isKeptName: true });
                this.setState({ isKeptPassword: true });
                dataReady = true;
                console.log(this.state.isKeptName, this.state.isKeptPassword)
        
            } catch {
                const keptName = "";
                const keptPassword = "";
                console.log('\x1b[30m%s\x1b[0m', "No existing user ! ")
                this.setState({ keptName: keptName });
                this.setState({ keptPassword: keptPassword });
                this.setState({ isKeptName: false });
                this.setState({ isKeptPassword: false });
                dataReady = true;
            }
            
            }
        }
    
    //asyncStorage wipe :
        wipe = async () => {
            await AsyncStorage.clear(); //on efface tout
            await AsyncStorage.setItem('hasShownOnboarding', 'true'); //sauf l'intro
            
            console.log('\x1b[31m%s\x1b[0m', 'AsyncStorage wiped !')
    
            this.continue()
        }
    
    //loading :
        loading = async () => {
            if(this.state.isLoading){
                return(
                    <View style={defaultCSS.loading}>
                        <Text>Loading Exemple</Text>
                    </View>
                )
            }
        }
    
    //setState for isAutocoEnabled :
        enableAutoCo = async () => {
          this.setState({ isAutoCoEnabled : await AsyncStorage.getItem("isAutoCoEnabled") })
        }
    //les fonctions qu'on appelle qu'une fois au chargement de la page :
      componentDidMount() {
        this.enableAutoCo()
        if(this.state.isAutoCoEnabled == "true"){
          this.toastMessage("connexion en cours...")
        } else {
          this.toastMessage('Connexion automatique désactivée')
        }
        this.autoCo()
        this.isThereAnUpdate()
      }
    
    }    
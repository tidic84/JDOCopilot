import React, { Component, useEffect } from "react";
import { Text, View, Modal, TouchableOpacity, Image, Alert } from "react-native";



import {defaultCSS} from "./style"
import * as NavigationBar from 'expo-navigation-bar';
import { useNavigation } from '@react-navigation/native';

//import Modal from 'react-native-modal';
// import Typewriter from 'react-native-animated-typewriter';
import {Audio} from 'expo-av';
import TypeWriter from 'react-native-typewriter'

import Login from "../../auth/login";


export default function OnboardingScreen1({ navigation }) {
    
    

   const [franck, setFranck] = React.useState("http://jdocopilot.me/pps/Franck2.jpg");
   const [id, setId] = React.useState(0);
   const [nextDone, setNextDone] = React.useState("Suivant");
    
    const navigateToLogin = React.useCallback(() => {
        navigation.replace('Login');
      }, [navigation]);

    //const [isModalVisible, setModalVisible] = React.useState(true);
    const [currentText, setCurrentText] = React.useState('* Salut ! Moi, c\'est Franck !');
    const [count, setCount] = React.useState(0);

    const texts = [
        '* C\'est moi qui récupère tes infos sur pronote !',
        '* Cette application est en phase de bêta test. Merci pour tes retours ! (la politesse est de mise, nous sommes humains malgré tout)',
        '* Vous pouvez faire vos retours sur le discord, le github dans la catégorie \'issues\' ou par mail !',
        '* Vous trouverez tout dans paramètres -> \'Nous contacter\'',
        '* Toute l\'équipe vous souhaite le meilleur avec nos applications, ',
        '* Love, @Albatross!! <3',
        ''
    ]

    
    
     
    useEffect(() => {
        if (count === texts.length - 1) {
            setNextDone("Terminer");
            setFranck("http://jdocopilot.me/pps/Franck1.jpg");
            setId(1);
        } else {
            setId(2);
        }
    }, [count]);

    
    const handleButtonPress = () => {
        if(id === 2){
            setCount(count + 1);
            setCurrentText(texts[count]);
            
        } else if(id === 1) {
            navigateToLogin();
            
        }
    }
    const handleSkipPress = () => {
        Alert.alert(
            //title
            ' ',
            //body
            "C'est probablement la dernière fois que tu verras ce message. Es-tu sûr de vouloir passer ?",
            [
                { text: 'Ah on le voit plus après ?', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Yep', onPress: () => navigateToLogin() },
            ],
            { cancelable: true }
        );
            
        
    }

    
        return (
          <View style={defaultCSS.container}>
            <Modal visible={true} style={defaultCSS.modal} transparent={true}>
              <Image 
                style={defaultCSS.franckImg}
                source={{
                    uri: franck,
                  }}
              />
              <View style={defaultCSS.modalContent}>
                <TypeWriter
                  typing={1}
                  minDelay={40}
                //   onTyped={() => playSound()}
                >
                  <Text style={defaultCSS.text}>{currentText}</Text>
                </TypeWriter>
                <TouchableOpacity
                  onPress={handleButtonPress}
                  style={defaultCSS.buttonNext}
                >
                  <Text style={defaultCSS.buttonNextText} >{nextDone}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSkipPress}
                  style={defaultCSS.buttonSkip}
                >
                  <Text style={defaultCSS.buttonSkipText} >Passer</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        );
}
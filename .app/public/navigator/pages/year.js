import React from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import {defaultCSS} from "../../stylesheets/_default/year"
import { timeDifference } from "../../util/relativeDays";
import AsyncStorage from "@react-native-async-storage/async-storage";
let dataReady = false
import * as Progress from 'react-native-progress';
import { DEFAULT } from "../../themes/variables";
import * as NavigationBar from 'expo-navigation-bar';

//setup
const j1 = new Date("2022-09-01").getTime();
const now = Date.now();

//calcul des jours passés
const elapsed = now - j1;
const conv = Math.round((elapsed/1000/60/60/24) * 100 ) / 100

//calcul du taux/%
const taux = Math.round((conv / 310) * 100) /100
const percent = Math.round((taux * 100) * 100) / 100



    


export default class Year extends React.Component {
    getHolidays = async () => {
        if (!dataReady) {
            const franck = Object(JSON.parse(await AsyncStorage.getItem("franck"))); // get the timetable from the storage
            this.setState({ franck: franck.holidays });
            dataReady = true;
        }


    }

    

    render() {
        this.getHolidays();
    
        NavigationBar.setVisibilityAsync("hidden");
        NavigationBar.setBehaviorAsync('overlay-swipe');
        NavigationBar.setButtonStyleAsync("light");
        NavigationBar.setBackgroundColorAsync(DEFAULT.secondary);
        
        
        if(dataReady){
            return (
                
                <View style={defaultCSS.container}>
                    <View style={defaultCSS.content}>
                        <View style={defaultCSS.text}>
                            <Text style={defaultCSS.text1}>Les prochaines vacances </Text>
                            <Text style={defaultCSS.text2}>sont {timeDifference(Date.now() + 3600000, new Date(this.state.franck[0].dateStart).getTime())}, </Text>
                            <Text style={defaultCSS.text3}>courage :</Text>
                            <Text style={defaultCSS.text4}>Déjà <Text style={defaultCSS.num}>{percent}</Text>% de l'année écoulée !</Text>
                        </View>
                    
                    <Progress.Circle progress={taux} size={250} color={DEFAULT.accent} style={{ top: -50, alignSelf: 'center'}}/>
                    <Image source={require("../.././assets/images/logoRond.png")} style={{width: 190, height: 190, top: -270, alignSelf: 'center'}} />
                    </View>
                </View>
            );
        } else {
            return (
                <View style={defaultCSS.container}>
                </View>
            );
        }
    }
}

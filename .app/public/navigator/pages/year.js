import React from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import {defaultCSS} from "../../stylesheets/_default/year"
import { timeDifference } from "../../util/relativeDays";
import AsyncStorage from "@react-native-async-storage/async-storage";
let dataReady = false
import * as Progress from 'react-native-progress';

const now = new Date();
// console.log(Date.parse(now));
var j1 = '2022-10-01T00:56:00.000Z'
j1 = new Date(j1).getTime();
var j2 = Date.now();
j2 = new Date(j2).getTime();
// console.log(j2);
// console.log(j1);

    var difference = j2 - j1;
    
    // console.log(difference);
    var daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24

    // console.log(daysDifference);

    var yearPercentage = daysDifference / 365;
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
        
        
        
        if(dataReady){
            return (
                <View style={defaultCSS.container}>
                    <Text style={defaultCSS.text}>Les prochaines vacances </Text>
                    <Text style={defaultCSS.text}>sont {timeDifference(Date.now() + 3600000, new Date(this.state.franck[0].dateStart).getTime())}</Text>
                    <Text style={defaultCSS.text}>courage pour tenir jusqu'aux {this.state.franck[0].title} !</Text>
                    <Progress.Circle progress={yearPercentage} size={250} color={'#FFF'}/>
                    <Image source={require("../.././assets/images/logoRond.png")} style={{width: 190, height: 190, top: -220}} />
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
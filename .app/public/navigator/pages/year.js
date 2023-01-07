import React from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import {defaultCSS} from "../../stylesheets/_default/year"
import { timeDifference } from "../../util/relativeDays";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Year extends React.Component {

    state = {
        holidays: ""
      }
    getFranck = async () => {
        const franck = Object(JSON.parse(await AsyncStorage.getItem("franck"))) // get the timetable from the storage
        this.setState({ holidays: franck.holidays})

    
    }

    render() {
        this.getFranck();
        if(this.state.holidays != ""){
            return (
                <View style={defaultCSS.container}>
                    <Text style={defaultCSS.text}>Vacances</Text>
                    <Text style={defaultCSS.text}>{this.state.holidays[0].title}</Text>
                    <Text style={defaultCSS.text}>{timeDifference(Date.now() + 3600000, new Date(this.state.holidays[0].dateStart).getTime())}</Text>
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
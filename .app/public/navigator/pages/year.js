import React from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import {defaultCSS} from "../../stylesheets/_default/year"
import { timeDifference } from "../../util/relativeDays";
let dataReady = false

export default class Year extends React.Component {
    getHolidays = async () => {
        if (!dataReady) {
            const holidays = await (await fetch("https://jdocopilot-api.herokuapp.com/holidays")).json();
            this.setState({ holidays: holidays });
            dataReady = true;
        }

    }
    render() {
        this.getHolidays();
        if(dataReady){
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
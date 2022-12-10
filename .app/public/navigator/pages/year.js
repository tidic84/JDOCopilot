import React from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import {defaultCSS} from "../../stylesheets/_default/year"

export default class Year extends React.Component {
    render() {
        return (
            <View style={defaultCSS.container}>
                <Text style={defaultCSS.text}>Year</Text>
            </View>
        );
    }
}
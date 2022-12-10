import React from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import {defaultCSS} from "../../stylesheets/_default/param"

export default class Param extends React.Component {
    render() {
        return (
            <View style={defaultCSS.container}>
                <Text style={defaultCSS.text}>Param</Text>
            </View>
        );
    }
}
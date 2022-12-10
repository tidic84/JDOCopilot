import React from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import {defaultCSS} from "../../stylesheets/_default/chat.js"

export default class Chat extends React.Component {
    render() {
        return (
            <View style={defaultCSS.container}>
                <Text style={defaultCSS.text}>Chat</Text>
            </View>
        );
    }
}
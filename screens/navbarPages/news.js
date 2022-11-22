import React from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import stylesA from "../../stylesheets/Home/purple.js"

export default class News extends React.Component {
    render() {
        return (
            <View style={stylesA.container}>
                <Text style={stylesA.text}>News</Text>
            </View>
        );
    }
}
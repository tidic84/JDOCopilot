import React from "react";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import {defaultCSS} from "../../stylesheets/_default/news"

export default class News extends React.Component {
    render() {
        return (
            <View style={defaultCSS.container}>
                <Text style={defaultCSS.text}>News</Text>
            </View>
        );
    }
}
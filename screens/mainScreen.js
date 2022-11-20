import React from "react"; // importe React
import { ToastAndroid, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Platform } from "react-native";
import { Button } from "react-native-web";
import { colors } from "../util/colors";


export default class loginScreen extends React.Component {
render() {
    return(
      <View style={styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
    },

});
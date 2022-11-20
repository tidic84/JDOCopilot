import React from "react"; // importe React
import { ToastAndroid, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Platform } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { Button } from "react-native-web";
import { colors } from "../util/colors";

export default function HomeScreen() {
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Home Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
    },
    title: {
      fontSize: 30,
      color: colors.primary,
      textAlign: "center",
      marginTop: 50,
      marginBottom: 50,
    },

});
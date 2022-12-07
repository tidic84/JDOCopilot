import React, { useEffect } from "react"; // importe React
import { ToastAndroid, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Platform } from "react-native";
import { Button } from "react-native-web";
import { colors } from "../util/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default class loginScreen extends React.Component {
  state = {
    franck: ""
  }

  constructor(props) {
    super(props)
  }

  getFranck = async () => {
    const franck = Object(JSON.parse(await AsyncStorage.getItem("franck")))
    this.setState({ franck: franck.timetable})
    //console.log(this.state.franck)
  }

  render() {
    this.getFranck()
    if (this.state.franck != "") {
      return(
        <View style={styles.container}>
          <Text>Cours : {JSON.stringify(this.state.franck[0].subject)}</Text>
          <Text>Classe : {JSON.stringify(this.state.franck[0].room)}</Text>
          <Text>Room : {JSON.stringify(Date.parse(this.state.franck[0].from + Date.now()))}</Text>
        </View>
      );
    }
    if (this.state.franck == "") {
      return(
        <View style={styles.container}>
          <Text>Wait...</Text>
        </View>
      );
    }
    
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
    },

});
import React, { useEffect } from "react"; // importe React
import { ToastAndroid, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Platform } from "react-native";
import { Button } from "react-native-web";
import { colors } from "../util/colors";
import { timeDifference } from "../util/relativeDays";
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
    //console.log(this.state.franck[0].from)
    //console.log(Date.now())
  }

  render() {
    this.getFranck()
    if (this.state.franck != "") {
      return(
        <View style={styles.container}>
          <Text style={styles.text}>Cours: {this.state.franck[0].subject}</Text>
          <Text style={styles.text}>Classe: {this.state.franck[0].room}</Text>
          <Text style={styles.text}>{timeDifference(Date.now() + 3600000, Date.parse(this.state.franck[0].from))}</Text>
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
      paddingTop: 30,
      flex: 1,
      backgroundColor: colors.bg,
    },
    text: {
      marginLeft: 20,
      marginTop: 25,
    },

});
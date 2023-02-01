// import modules
import { imports } from "../../../private/imports";
import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { defaultCSS } from "../../stylesheets/_default/map";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT } from "../../themes/variables.js";


export default class Edt extends React.Component {
  // on vide le sac de franck
  state = {
    franck: "",
  };

  // on lui demande de recupérer les données de l'utilisateur
  getFranck = async () => {
    const franck = Object(JSON.parse(await AsyncStorage.getItem("franck"))); // get the timetable from the storage
    this.setState({ franck: franck.timetable });
    //console.log(this.state.franck);
  };

  render() {
    this.getFranck();
    
    
    if (this.state.franck != "") {

      return (
        <>
          <View style={defaultCSS.container}>
            
          </View>
        </>
      );

    } else if (this.state.franck == "") {
      return (
        <SafeAreaView style={defaultCSS.container}>
          <Text style={defaultCSS.waitTextT}>
            Franck est parti chercher tes données,
          </Text>
          <Text style={defaultCSS.waitTextB}>
             attends nous un instant !
          </Text>
          <ActivityIndicator
            size="large"
            color={DEFAULT.accent}
            style={defaultCSS.wait}
          />
        </SafeAreaView>
      );
    }
  }
}

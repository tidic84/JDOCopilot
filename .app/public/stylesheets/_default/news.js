import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const colors = {
    primary: "#8F5FC7",
    secondary: "#4C3575",
    textfields: "#7858A6",
    links: "#5B4B8A",
}

export const defaultCSS = StyleSheet.create({ //purpleLogin
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  text: {
    marginTop: 25,
  },

});
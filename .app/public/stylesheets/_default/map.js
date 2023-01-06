import { reduce } from "d3";
import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import { DEFAULT } from "../../themes/variables";

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
    backgroundColor: DEFAULT.primary,
    alignItems: 'center',
    justifyContent: "center",
  },
  text: {
    marginTop: 25,
  },
  rect: {
    fill: "#000FFF",
  },
  svg: {
    fill: "#000FFF",
    color: "#000FFF",
  },
  lyceeplan: {
    color: "#000FFF",
    alignItems: 'center',
  },

});
import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
import { DEFAULT } from "../../themes/variables";

export const defaultCSS = StyleSheet.create({ //purpleLogin
  container: {
    flex: 1,
    backgroundColor: DEFAULT.primary,
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: DEFAULT.secondary,
    alignItems: "center",
    height: 50,
    width: width / 1.2,
    borderRadius: 20,
    alignSelf: "center",

  },
  text: {
    color: DEFAULT.primary,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Roboto",
    fontWeight: "bold",
    top: 20,

  },
});
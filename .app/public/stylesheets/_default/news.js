import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
import { DEFAULT } from "../../themes/variables";

export const defaultCSS = StyleSheet.create({ //purpleLogin
  container: {
    flex: 1,
    backgroundColor: DEFAULT.primary,
    alignItems: "center",
    height: height,
    width: width,
  },
  button: {
    color: "#FFF",
    fontWeight: "bold",
    justifyContent: "space-between",
  },
  footer: {
    position: 'absolute',
    padding: 40,
    flex: 2,
    justifyContent: "flex-end",
    //alignItems: "center",
    //marginBottom: 20,
    backgroundColor: DEFAULT.accent,
    width: width,
    height: 100,
  },
});
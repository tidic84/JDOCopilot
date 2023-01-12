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
  content: {
    flex: 1,
    backgroundColor: DEFAULT.primary,
    alignItems: "center",
    width: width / 1.2,
    alignSelf: "center",
  },
  text: {
    color: DEFAULT.text,
    textAlign: "center",
    top: 370,
  },
  text1: {
    color: DEFAULT.text,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  text2: {
    color: DEFAULT.text,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "regular",
  },
  text3: {
    color: DEFAULT.text,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "regular",
  },
  text4: {
    color: DEFAULT.text,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "regular",
  },
  num: {
    color: DEFAULT.accent,
    fontWeight: "bold",
  },
});
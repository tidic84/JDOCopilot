import { reduce } from "d3";
import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import { DEFAULT } from "../../themes/variables";

const { width, height } = Dimensions.get('window');

export const defaultCSS = StyleSheet.create({ //purpleLogin
  container: {
    flex: 1,
    backgroundColor: DEFAULT.primary,
    alignItems: "center",
  },
   wait: {
    position: "absolute",
    alignSelf: "center",
    marginVertical: 300,

  },
  waitTextT: {
    color: "white",
    fontSize: 16,
    marginTop: 250,
  },
  waitTextB: {
    color: "white",
    fontSize: 16,
    marginTop: 88,
  },
});

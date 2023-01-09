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
});

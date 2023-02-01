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
  
  bodyTextIcon: {
    flex: 1,
    position: "absolute",
    alignSelf: 'center',
    top: 20,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  


  bodyContainer:{
    width: width - 60,
    height: height / 1.5,
    backgroundColor: DEFAULT.secondary,
    borderRadius: 15,
    alignSelf: "center",
    marginTop: height / 9.5,
  },

  bodyList: {
    position: "relative",
    width: width - 60,
    height: height / 1.6,
    alignSelf: "center",
    marginVertical: 5,
    paddingVertical: 5,
    borderRadius: 15,
    top: -10,
  },
  separatorComponent: {
    width: width - 60,
    height: 3,
    backgroundColor: DEFAULT.primary,
  },
  bodySubject: {
    color: "white",
    fontSize: 17,
    paddingLeft: 10
  },
  bodyDesc:{
    color: DEFAULT.textSecondary,
    fontSize: 13,
    paddingLeft: 15,
  },
  bodyFor: {
    color: DEFAULT.textSecondary,
    fontSize: 13,
    paddingLeft: 10,
  },
  num:{
    color: DEFAULT.accent,
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
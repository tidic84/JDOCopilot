import { StyleSheet, Platform } from "react-native";
import { Dimensions } from 'react-native';
import { DEFAULT } from "../../themes/variables";
const { width, height } = Dimensions.get('window');



export const defaultCSS = StyleSheet.create({ //default login stylesheet
  
  container: {
    flex: 1,
    backgroundColor: DEFAULT.primary,
  },
  circle: {
    width: 500,
    height: 500,
    borderRadius: 500 / 2,
    backgroundColor: DEFAULT.secondary,
    position: "absolute",
    left: -181,
    top: -103
  },
  header: {
    fontWeight: "400",
    fontSize: 30,
    color: "#FFFFFF",
    marginTop: 32,
    alignSelf: "center",
  },
  underHeader:{
    fontWeight: "400",
    fontSize: 15,
    color: "#FFFFFF",
    marginTop: 5,
    alignSelf: "center",
    textAlign: "center",
  },
  textInput: {
    marginTop: 32,
    height: 50,
    backgroundColor: DEFAULT.textfields,
    borderRadius: 16,
    paddingHorizontal: 16,
    color: DEFAULT.text,
    fontWeight: "600",
  },
  textInputContainer:{
    marginTop: 50,
  },
  basicText: {
    color: "rgba(255,255,255,0.5)",
  },
  checkboxBase: {
    top: 10,
    left: 15,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'rgb(255, 255, 255)',
    backgroundColor: 'transparent',
  },

  checkboxChecked: {
    borderColor: '#C87327',
    backgroundColor: '',
  },
  check: {
    position: 'absolute',
    alignSelf: 'center',
    left: -2,
    top: -7,
    color: '#C87327'
  },
  checkboxLabel: {
    left: 40,
    top: -10,
    color: 'rgb(255, 255, 255)'
  },

  continue: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: DEFAULT.links,
    alignItems: "center",
    justifyContent: "center",
    left: 2,
    top: -50
  },
  continueDisabled: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: DEFAULT.links,
    alignItems: "center",
    justifyContent: "center",
    left: 2,
    top: -50,
    opacity: 0.3,
  },

  bottomContainer: {
    //flex: 1,
    position: 'relative',
    justifyContent: 'flex-end',
    marginBottom: 0,
    backgroundColor: DEFAULT.primary,
  },
  bottomBox: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: DEFAULT.links,
    borderRadius: 15,
    width: width - 40,
    alignItems: 'center',
    textAlignVertical: 'center',
    marginHorizontal: width - (width - 7),
    marginVertical: 7,
    paddingVertical: 5,
    height: 50,
    textAlign: 'center',
  },
  bottomBoxDisabled: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: DEFAULT.links,
    borderRadius: 15,
    width: width - 40,
    alignItems: 'center',
    textAlignVertical: 'center',
    marginHorizontal: width - (width - 7),
    marginVertical: 7,
    paddingVertical: 5,
    opacity: 0.3,
    height: 50,
    textAlign: 'center',
  },

  isolateTextInput: {
    marginTop: 32,
    height: 50,
    backgroundColor: "red",
    borderRadius: 13,
    paddingHorizontal: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    left: -10
  },
  

});
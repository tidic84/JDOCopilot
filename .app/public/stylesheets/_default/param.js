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
  body: {
    width: width - 60,
    height: height / 1.25,
    backgroundColor: DEFAULT.secondary,
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 50,
  },
  bodyList: {
    position: "relative",
    width: width - 60,
    height: height / 1.37,
    alignSelf: "center",
    marginVertical: 5,
    paddingVertical: 5,
    

  },
  bodyTitleContainer: {
    width: width - 60,
    height: 20,
    top: 0,
    backgroundColor: DEFAULT.secondary,
    alignSelf: "center",
    marginTop: 20,
  },
  bodyTitle: {
    zIndex: 10,
    position: "absolute",
    alignSelf: "center",
    top: 0,
    color: DEFAULT.text,
    height: 100,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  bodySubject: {
    color: "white",
    fontSize: 17,
    paddingLeft: 10
  },
  bodyRoom: {
    color: DEFAULT.accent,
    fontSize: 17,
    paddingLeft: 10,

  },
  bodyTime: {
    color: DEFAULT.accent,
    fontSize: 13,
    paddingLeft: width - 100,
    textAlign: "right",
    transform: [{ translateY: -35 }, { translateX: -10 }],
  },
  separatorComponent: {
    width: width - 60,
    height: 3,
    backgroundColor: DEFAULT.primary,
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
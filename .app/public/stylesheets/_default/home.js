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
  header: {
    width: width - 60,
    height: 70,
    backgroundColor: DEFAULT.secondary,
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 40,
  },
  fancyLeft: {
    width: 10,
    height: 40,
    backgroundColor: DEFAULT.accent,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    position: "absolute",
    left: 0,
    top: 15,
  },
  headerIcon: {
    position: "absolute",
    left: 20,
    top: 23,
  },
  headerTitle: {
    position: "absolute",
    left: 55,
    top: 15,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerSubject: {
    position: "absolute",
    left: 52,
    top: 37,
    color: "white",
    fontSize: 13,
  },
  headerRoom: {  
    fontSize: 13,
    color: DEFAULT.accent,
    // alignSelf: "flex-end",
    // alignItems: 'flex-end',
    // justifyContent: "flex-end",
    
  },
  headerTime: {
    position: "absolute",
    right: 20,
    top: 19,
    color: DEFAULT.accent,
    fontSize: 13,
  },
  body: {
    width: width - 60,
    height: 530,
    backgroundColor: DEFAULT.secondary,
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 20,
  },
  bodyList: {
    position: "relative",
    width: width - 60,
    height: 540,
    alignSelf: "center",
    //marginVertical: 40,
    paddingVertical: 20,
    

  },
  bodyTitle: {
    position: "absolute",
    alignSelf: "center",
    top: 10,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  bodySubject: {
    color: "white",
    fontSize: 17,
    paddingLeft: 10
  },
  bodyRoom: {
    color: DEFAULT.accent,
    fontSize: 13,
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
  headerDynamicText: {
    position: "relative",
    width: (width - 60) / 2,
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
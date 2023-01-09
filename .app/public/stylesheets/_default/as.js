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
    height: 95,
    backgroundColor: DEFAULT.secondary,
    borderRadius: 15,
    alignSelf: "center",
    marginTop: 40,
  },
  fancyLeft: {
    width: 10,
    height: 68,
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
    right: 20,
    top: 35,
  },
  headerTitle: {
    position: "absolute",
    left: 30,
    top: 8,
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  headerSubject: {
    position: "relative",
    //paddingTop: 35,
    left: 26,
    top: 47,
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
  headerDynamicText: {
    position: "relative",
  },
  headerTime: {
    position: "absolute",
    right: 20,
    top: 19,
    color: DEFAULT.accent,
    fontSize: 13,
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
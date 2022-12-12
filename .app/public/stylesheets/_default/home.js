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
    left: 55,
    top: 37,
    color: "white",
    fontSize: 13,
  },
  headerRoom: {
    position: "absolute",
    left: 120,
    top: 37,
    fontSize: 13,
    color: DEFAULT.accent,
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
    width: width - 60,
    height: 530,
    alignSelf: "center",
    marginVertical: 40,
    paddingVertical: 10,

  },
  bodyTitle: {
    position: "absolute",
    alignSelf: "center",
    top: 10,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  bodyCours: {
    position: "absolute",
    left: 20,
    marginTop: 50,
    paddingVertical: 10,
    color: "white",
    fontSize: 13,
  },
  bodySubject: {
    position: "absolute",
    left: 0,
    top: 5,
    color: "white",
    fontSize: 17,
  },
  bodyRoom: {
    position: "absolute",
    left: 90,
    top: 5,
    color: DEFAULT.accent,
    fontSize: 17,
  },
  bodyTime: {
    position: "absolute",
    right: -300,
    color: DEFAULT.accent,
    fontSize: 13,
  },
  bodyCours1: {
    position: "absolute",
    left: 20,
    marginTop: 50,
    paddingVertical: 10,
    color: "white",
    fontSize: 13,
  },
  bodyCours2: {
    position: "absolute",
    left: 20,
    marginTop: 100,
    paddingVertical: 10,
    color: "white",
    fontSize: 13,
  },
  bodyCours3: {
    position: "absolute",
    left: 20,
    marginTop: 150,
    paddingVertical: 10,
    color: "white",
    fontSize: 13,
  },
  bodyCours4: {
    position: "absolute",
    left: 20,
    marginTop: 200,
    paddingVertical: 10,
    color: "white",
    fontSize: 13,
  },
  bodyCours5: {
    position: "absolute",
    left: 20,
    marginTop: 250,
    paddingVertical: 10,
    color: "white",
    fontSize: 13,
  },
  bodyCours6: {
    position: "absolute",
    left: 20,
    marginTop: 300,
    paddingVertical: 10,
    color: "white",
    fontSize: 13,
  },
  bodyCours7: {
    position: "absolute",
    left: 20,
    marginTop: 350,
    paddingVertical: 10,
    color: "white",
    fontSize: 13,
  },
  bodyCours8: {
    position: "absolute",
    left: 20,
    marginTop: 400,
    paddingVertical: 10,
    color: "white",
    fontSize: 13,
  },
  wait: {
    position: "absolute",
    alignSelf: "center",
    marginVertical: 300,

  },
  waitText: {
    color: "white",
    fontSize: 16,
    marginTop: 250,
  },





});
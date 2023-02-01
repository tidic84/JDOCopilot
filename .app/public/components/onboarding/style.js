import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
import { DEFAULT } from "../../themes/variables";

export const defaultCSS = StyleSheet.create({ //purpleLogin
  container: {
    // flex: 1,
    backgroundColor: 'black',
    alignItems: "flex-end",
    justifyContent: "center",
    height: height,
    width: width,
  },
  modalContent: {
    width: width - 60,
    height: 120,
    borderColor: DEFAULT.text,
    borderRadius: 0,
    borderWidth: 3,
    alignSelf: "center",
    
    bottom: -(height - 250 ),
    padding: 20,
  },
  text: {
    padding: 20,
    top: 5,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonNext:{
    position: "absolute",
    bottom: -50,
    right: 0,
    width: 100,
    height: 40,
    borderColor: '#E4E36E',
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",

  },
  buttonNextText:{
    color: '#E4E36E',
  },
  buttonSkip:{
    position: "absolute",
    bottom: -50,
    left: 0,
    width: 100,
    height: 40,
    borderColor: '#E3813E',
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSkipText:{
    color: '#E3813E',
  },
  franckImg:{
    position: "absolute",
    alignSelf: "center",
    top: height /2 - 200,
    width: 200,
    height: 200,
    resizeMode: "cover",

  }
});
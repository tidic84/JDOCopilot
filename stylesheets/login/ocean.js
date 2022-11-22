import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const colors = {
    primary: "#046582",
    secondary: "#46C9C6",
    textfields: "#6D8299",
    links: "#00394A",
}

export default //styles
oceanLogin = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  circle: {
    width: 500,
    height: 500,
    borderRadius: 500 / 2,
    backgroundColor: colors.secondary,
    position: "absolute",
    left: -181,
    top: -103
  },
  header: {
    fontWeight: "400",
    fontSize: 30,
    color: "#FFFFFF",
    marginTop: 32,
  },
  textInput: {
    marginTop: 32,
    height: 50,
    backgroundColor: colors.textfields,
    borderRadius: 13,
    paddingHorizontal: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    left: -10
  },
  checkboxBase: {
    top: 20,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'transparent',
  },

  checkboxChecked: {
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: '#5B4B8A',
  },
  check: {
    position: 'absolute',
    alignSelf: 'center',
    left: -2,
  },
  checkboxLabel: {
    left: 25,
    color: 'rgba(255, 255, 255, 0.5)'
  },

  continue: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: colors.links,
    alignItems: "center",
    justifyContent: "center",
    left: 2,
    top: -12
  },

  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomBox: {
    backgroundColor: colors.links,
    borderRadius: 7,
    width: width - 15,
    alignItems: 'center',
    textAlignVertical: 'center',
    marginHorizontal: width - (width - 7),
    marginVertical: 10,
    paddingVertical: 5,
  },

  themeSelector: {
    position: 'absolute',
    top: 35,
    right: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  isolateTextInput: {
    marginTop: 15,
    height: 50,
    backgroundColor: "red",
    borderRadius: 13,
    paddingHorizontal: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    left: -10
  },
  separator: {
    width: 255,
    height: 18,
    backgroundColor: colors.primary,
    borderRadius: 38,
    marginTop: 8,
    alignSelf: "center"
  }

});
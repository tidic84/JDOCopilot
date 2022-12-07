import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import loginScreen from "./screens/loginScreen";
import mainScreen from "./screens/homeScreen";
//import chatScreen from "./screens/chatScreen";

const AppNavigator = createStackNavigator(
  {
    Login: loginScreen,
    Main: mainScreen,
  },

  {
    headerMode: "none"
  }
);

export default createAppContainer(AppNavigator);
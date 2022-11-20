import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import loginScreen from "./screens/loginScreen";
import mainScreen from "./screens/mainScreen";
//import chatScreen from "./screens/chatScreen";

const AppNavigator = createStackNavigator(
  {
    Main: mainScreen,
    //Login: loginScreen,
  },

  {
    headerMode: "none"
  }
);

export default createAppContainer(AppNavigator);
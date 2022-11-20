import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import loginScreen from "./screens/loginScreen";
//import chatScreen from "./screens/chatScreen";

const AppNavigator = createStackNavigator(
  {
    Login: loginScreen,
  },

  {
    headerMode: "none"
  }
);

export default createAppContainer(AppNavigator);
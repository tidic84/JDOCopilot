// import modules
import { imports } from "../../../private/imports";
import * as React from "react";
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  Animated,
  Platform,
} from "react-native";
import { defaultCSS } from "../../stylesheets/_default/as.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEFAULT } from "../../themes/variables.js";
import { Ionicons } from "@expo/vector-icons";
import switchNames from "../../../private/subject.js";
import { FlashList } from "@shopify/flash-list";
import * as NavigationBar from "expo-navigation-bar";
import { timeDifference } from "../../util/relativeDaysWidget.js";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class Edt extends React.Component {
  // on vide le sac de franck
  state = {
    franck: "",
    hideDevs: false,
  };

  // on lui demande de recupérer les données de l'utilisateur
  getFranck = async () => {
    const franck = Object(JSON.parse(await AsyncStorage.getItem("franck"))); // get the timetable from the storage
    this.setState({ franck: franck }); //on recup spécialement les devoirs
    //console.log(this.state.franck);
  };

  _states = async () => {
    if ((await AsyncStorage.getItem("hideDevoirs")) == null) {
      this.setState({ hideDevs: false });
    } else if ((await AsyncStorage.getItem("hideDevoirs")) == "true") {
      this.setState({ hideDevs: true });
    } else if ((await AsyncStorage.getItem("hideDevoirs")) == "false") {
      this.setState({ hideDevs: false });
    }

    console.log("_States called");
  };

  componentDidMount() {
    this._states();
  }

  render() {
    this.getFranck();

    NavigationBar.setBackgroundColorAsync(DEFAULT.secondary),
      NavigationBar.setButtonStyleAsync("light");

    if (this.state.franck != "") {
      //récupération des devoirs
      let franck = this.state.franck.homeworks;
      //let evaluations = this.state.franck.evals
      let devoirs = [];
      let sujet = [];
      let compteurA = 0;

      do {
        switchNames(franck[compteurA].subject, sujet);

        //console.log(sujet)
        let dico = {
          sujet: sujet[compteurA],
          description: franck[compteurA].description,
          pour: new Date(franck[compteurA].for).getTime(),
          givenAt: new Date(franck[compteurA].givenAt).getTime(),
          fait: franck[compteurA].done,
        };

        //console.log(dico)
        devoirs.push(dico);
        compteurA++;
      } while (compteurA < franck.length);

      const updatedData = devoirs.filter((_devsData) => {
        if (_devsData.fait) {
          return false;
        } else {
          return true;
        }
      });

      return (
        <>
          <View style={defaultCSS.container}>
            {/**header**/}

            {/**body**/}
            <View style={defaultCSS.bodyTitle}>
              <Text style={defaultCSS.bodyTextIcon}>Devoirs :</Text>
              {/**<Ionicons 
                name="funnel-outline"
                size={24}
                color="white"
                style={defaultCSS.bodyTitleIcon}
              />**/}
            </View>

            <View style={defaultCSS.bodyContainer}>
              <Pressable
                onPress={() => this._states() + console.log("refreshed")}
                style={{
                  right: 5,
                  top: 5,
                  opacity: 1,
                  zIndex: 1,
                  position: "absolute",
                }}
              >
                <Ionicons
                  name="refresh-outline"
                  size={22}
                  color={DEFAULT.accent}
                />
              </Pressable>
              <FlashList
                data={this.state.hideDevs ? updatedData : devoirs}
                renderItem={({ item }) => (
                  <View
                    style={{
                      opacity: !this.state.hideDevs ? (item.fait ? 0.5 : 1) : 1,
                    }}
                  >
                    <Text> </Text>
                    <Text> </Text>
                    <Text style={defaultCSS.bodySubject}>{item.sujet}</Text>
                    <Text style={defaultCSS.bodyDesc}>{item.description}</Text>
                    <Text style={defaultCSS.bodyFor}>
                      Pour{" "}
                      <Text style={defaultCSS.num}>
                        {timeDifference(Date.now() + 3600000, item.pour)}
                      </Text>
                    </Text>
                    <Text> </Text>
                    <Text> </Text>
                  </View>
                )}
                estimatedItemSize={200}
                ItemSeparatorComponent={() => (
                  <View style={defaultCSS.separatorComponent} />
                )}
                containerComponentStyle={defaultCSS.bodyList}
              />
            </View>
          </View>
        </>
      );
    } else if (this.state.franck == "") {
      return (
        <SafeAreaView style={defaultCSS.container}>
          <Text style={defaultCSS.waitTextT}>
            Franck est parti chercher tes données,
          </Text>
          <Text style={defaultCSS.waitTextB}>attends nous un instant !</Text>
          <ActivityIndicator
            size="large"
            color={DEFAULT.accent}
            style={defaultCSS.wait}
          />
        </SafeAreaView>
      );
    } else if (this.state.franck == []) {
      return (
        <SafeAreaView style={defaultCSS.container}>
          <Text style={defaultCSS.waitTextT}>Pas de cours avant piouuuuu</Text>
        </SafeAreaView>
      );
    }
  }
}

// import modules

import React from "react";
import {
  Alert,
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Button,
  Image,
  Dimensions,
} from "react-native";
import { defaultCSS } from "../../stylesheets/_default/home.js";
import { timeDifference } from "../../util/relativeDaysWidget";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { DEFAULT } from "../../themes/variables.js";
import { FlashList } from "@shopify/flash-list";
import switchNames from "../../../private/subject.js";
import switchRooms from "../../../private/room.js";
import prettierNums from "../../../private/duration";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { Audio } from "expo-av";

import Modal from "react-native-modal";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable.js";

const { width, height } = Dimensions.get("window");
export default class Edt extends React.Component {
  // on vide le sac de franck
  constructor(props) {
    super(props);
    this.state = {
      franck: "",
      edt1: true,
      visibleModal: null,
      sujet: "",
      prof: "",
      etat: "",
      salle: "",
    };
  }
  // on lui demande de recupérer les données de l'utilisateur
  getFranck = async () => {
    const franck = Object(JSON.parse(await AsyncStorage.getItem("franck"))); // get the timetable from the storage
    this.setState({ franck: franck.timetable });
    //console.log(this.state.franck);
  };

  _renderButton = (text) => (
    // <Button
    //   onPress={() => this.setState({ visibleModal: null })}
    //   title={text}
    // >

    // </Button>
    <Pressable onPress={() => this.setState({ visibleModal: null })}>
      <View
        style={{
          backgroundColor: "lightblue",
          padding: 12,
          margin: 16,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4,
          borderColor: "rgba(0, 0, 0, 0.1)",
        }}
      >
        <Text>{text}</Text>
      </View>
    </Pressable>
  );

  _renderModalContent = (item) => (
    <View
      style={{
        backgroundColor: "white",
        padding: 22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <Text>
        Prof : {this.state.prof} {"\n"}Etat : {this.state.etat}
      </Text>
      {this._renderButton("Fermer")}
    </View>
  );

  _states = (item) => {
    this.setState({ visibleModal: 4 });

    this.setState({ prof: item.prof });
    this.setState({ etat: item.status });
  };

  _statesX = async () => {
    if ((await AsyncStorage.getItem("hideLessons")) == null) {
      this.setState({ hideLessons: false });
    } else if ((await AsyncStorage.getItem("hideLessons")) == "true") {
      this.setState({ hideLessons: true });
    } else if ((await AsyncStorage.getItem("hideLessons")) == "false") {
      this.setState({ hideLessons: false });
    }

    console.log("_States called");
  };

  componentDidMount() {
    this._statesX();
  }

  render() {
    //this.threeOptionAlertHandler()
    this.getFranck();

    NavigationBar.setBackgroundColorAsync(DEFAULT.secondary),
      NavigationBar.setButtonStyleAsync("light");

    function actionOnRow(item) {}

    if (this.state.franck != "") {
      // recuperation du nombre de cours
      const franck = this.state.franck;

      //...création d'une liste affichable :
      let DATA = []; //initialisation de la liste des cours
      let X = 0; //initialisation du compteur
      let LESSONS = []; //initialisation de la liste des noms de cours (header)
      let ROOMS = []; //initialisation de la liste des noms de salles (header)

      do {
        //...séparation heure/minute des horraires :
        var f = new Date(franck[X].from);
        var t = new Date(franck[X].to);

        //...définition des vrais horraires :
        let tH = null;
        let tM = null;

        if (t - f == 7200000) {
          tM = new Date(f.getTime() + 110 * 60000).getUTCMinutes();
          tH = new Date(f.getTime() + 110 * 60000).getUTCHours();
        } else if (t - f == 3600000) {
          tM = new Date(f.getTime() + 55 * 60000).getUTCMinutes();
          tH = new Date(f.getTime() + 55 * 60000).getUTCHours();
        }

        //...on rend les nombres jolis
        let _endH = [];
        let _endM = [];
        let _fromHour = [];
        let _fromMin = [];

        prettierNums(tH, _endH);
        prettierNums(tM, _endM);
        prettierNums(f.getUTCHours(), _fromHour);
        prettierNums(f.getUTCMinutes(), _fromMin);

        //...on rend les mots jolis
        let sujet = [];
        let salles = [];

        switchNames(franck[X].subject, sujet);
        switchRooms(franck[X].room, salles);

        switchNames(franck[X].subject, LESSONS);
        switchRooms(franck[X].room, ROOMS);

        let status = [];
        if (franck[X].isCancelled == true) {
          status.push("Annulé, (changement de salle ?)");
        } else if (franck[X].isAway == true) {
          status.push("Prof. absent");
        } else if (franck[X].remoteLesson == true) {
          status.push("À distance");
        } else if (franck[X].isDetention == true) {
          status.push("Retenue ?");
        } else if (franck[X].hasDuplicate == true) {
          status.push("Déplacé...");
        } else {
          status.push("Maintenu !");
        }

        //...cours sous forme de dictionnaire :
        let _down = [];
        if (
          franck[X].isCancelled ||
          franck[X].isAway ||
          franck[X].remoteLesson ||
          franck[X].isDetention
        ) {
          _down.push(true);
        } else {
          _down.push(false);
        }

        let _cours = {
          from: new Date(franck[X].from),
          to: new Date(franck[X].to),
          subject: sujet[0],
          room: salles[0],
          fromHour: _fromHour[0],
          fromMin: _fromMin[0],
          endM: _endM[0],
          endH: _endH[0],
          prof: franck[X].teacher,
          status: status[0],
          isCancelled: franck[X].isCancelled,
          isAway: franck[X].isAway,
          remoteLesson: franck[X].remoteLesson,
          isDetention: franck[X].isDetention,
          hasDuplicate: franck[X].hasDuplicate,
          color: franck[X].color,
          down: _down[0],
        };

        //...on push dans la liste
        DATA.push(_cours);

        X++;
      } while (X < franck.length);

      const updatedData = DATA.filter((_coursData) => {
        if (
          _coursData.isCancelled ||
          _coursData.isAway ||
          _coursData.remoteLesson ||
          _coursData.isDetention
        ) {
          return false;
        } else {
          return true;
        }
      });

      let __EDT1 = [];
      let __EDT2 = [];
      let __EDT3 = [];
      let poubelle = [];
      let compteur = 0;
      let professeurZebi = 0;

      do {
        let _x = new Date(updatedData[compteur].from);
        let _y = new Date(updatedData[0].from);
        _x = _x.getDay();
        _y = _y.getDay();

        if (_x > _y) {
          __EDT2.push(updatedData[compteur]);
        } else {
          __EDT1.push(updatedData[compteur]);
        }
        compteur++;
      } while (compteur < updatedData.length);

      // console.log('checkpoint 1');

      if(__EDT2.length > 0) {
        do {
          let _o = new Date(__EDT2[professeurZebi].from);
          let _l = new Date(__EDT2[0].from);
          _o = _o.getDay();
          _l = _l.getDay();
  
          if (_o > _l) {
            poubelle.push(__EDT2[professeurZebi]);
          } else {
            __EDT3.push(__EDT2[professeurZebi]);
          }
          professeurZebi++;
        } while (professeurZebi < __EDT2.length);
  
        let xXROYALkillXx = 0;
        let now = new Date();
  
        if (now > __EDT1[xXROYALkillXx].from) {
          //console.log('check 1')
          do {
            xXROYALkillXx++;
          } while (__EDT1[xXROYALkillXx].from < now);
        }
      }
      

      // console.log('checkpoint 2');

      //console.log(DATA);

      if (__EDT1.length == 0 || __EDT2.length == 0) {
        return (
          <View
            style={defaultCSS.no_lessons}
          >
            <Text style={defaultCSS.nlText}>
              Pas de cours tout de suite, profitez-en !
            </Text>
            <Image 
                style={defaultCSS.franckImg}
                source={{
                    uri: "http://jdocopilot.me/pps/Franck1.jpg",
                  }}
              />
          </View>
        );
      }
      else {
        return (
          <>
            <Modal
              isVisible={this.state.visibleModal === 4}
              backdropColor={DEFAULT.secondary}
              backdropOpacity={0.8}
              animationIn="zoomIn"
              animationOut="zoomOut"
              animationInTiming={500}
              animationOutTiming={500}
              backdropTransitionInTiming={1000}
              backdropTransitionOutTiming={1000}
              //onShow={() => {playSound()}}
              onBackdropPress={() => this.setState({ visibleModal: null })}
              //style={{  height: 100, width: width - 60, borderRadius: 10, alignSelf: "center", justifyContent: "center", alignItems: "center"}}
            >
              {this._renderModalContent()}
            </Modal>

            <View style={defaultCSS.container}>
              <StatusBar
                style="light"
                hidden={false}
                backgroundColor={DEFAULT.secondary}
              />

              {/* prochain cour */}
              <View style={defaultCSS.header}>
                {/* recatangle orange sur la gauche */}
                <View
                  style={{
                    width: 5,
                    height: 40,
                    backgroundColor: __EDT1[xXROYALkillXx].color,
                    borderTopRightRadius: 15,
                    borderBottomRightRadius: 15,
                    borderBottomLeftRadius: 10,
                    borderTopLeftRadius: 10,
                    position: "absolute",
                    left: 0,
                    top: 15,
                  }}
                ></View>
                {/* icone */}
                <Ionicons
                  name="md-calendar"
                  size={24}
                  color="white"
                  style={defaultCSS.headerIcon}
                />
                {/* titre, cour, salle, time left */}
                <Text style={defaultCSS.headerTitle}>Prochain cours</Text>
                <View style={defaultCSS.headerDynamicText}>
                  <Text style={defaultCSS.headerSubject}>
                    {" "}
                    {__EDT1[xXROYALkillXx].subject}
                    <Text style={defaultCSS.headerRoom}>
                      {" "}
                      {__EDT1[xXROYALkillXx].room}
                    </Text>
                  </Text>
                </View>
                <Text style={defaultCSS.headerTime}>
                  {timeDifference(
                    Date.now() + 3600000,
                    Date.parse(__EDT1[xXROYALkillXx].from)
                  )}{" "}
                </Text>
              </View>
              {/* emploi du temps complet de la journée */}
              <View style={defaultCSS.body}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ edt1: !this.state.edt1 });
                  }}
                  style={defaultCSS.bodyTitleContainer}
                >
                  <Text style={defaultCSS.bodyTitle}>
                    {this.state.edt1 ? "Dans la même journée" : "Le lendemain"}
                  </Text>
                  <Ionicons
                    name={
                      this.state.edt1
                        ? "arrow-forward-circle-outline"
                        : "arrow-back-circle-outline"
                    }
                    size={22}
                    color="white"
                    style={defaultCSS.bodyTitleArrow}
                  />
                </TouchableOpacity>

                {/* liste des prochains cours */}
                <View style={defaultCSS.bodyList}>
                  <FlashList
                    data={this.state.edt1 ? __EDT1 : __EDT3}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => this._states(item)}
                        style={{ opacity: 1 }}
                      >
                        <Text> </Text>
                        <View
                          style={{
                            width: 10,
                            height: 10,
                            backgroundColor: item.color,
                            borderRadius: 50,
                            marginLeft: 10,
                            transform: [{ translateY: 25 }],
                          }}
                        ></View>
                        <Text style={defaultCSS.bodySubject}>
                          {item.subject}, {"\n"}
                          <Text style={defaultCSS.bodyRoom}>{item.room}</Text>
                        </Text>

                        <Text style={defaultCSS.bodyTime}>
                          {item.fromHour} : {item.fromMin}
                        </Text>
                        <Text style={defaultCSS.bodyTime}>
                          {item.endH} : {item.endM}
                        </Text>
                      </TouchableOpacity>
                    )}
                    estimatedItemSize={200}
                    ItemSeparatorComponent={() => (
                      <View style={defaultCSS.separatorComponent} />
                    )}
                    containerComponentStyle={defaultCSS.bodyList}
                  />
                </View>
              </View>
            </View>
          </>
        );
      }
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

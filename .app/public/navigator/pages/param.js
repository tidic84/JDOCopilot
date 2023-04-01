// import modules
import React from "react";
import { Alert, View, Text, Platform, ToastAndroid } from "react-native";
import { defaultCSS } from "../../stylesheets/_default/param";
import { DEFAULT } from "../../themes/variables.js";
import { FlashList } from "@shopify/flash-list";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as NavigationBar from "expo-navigation-bar";
import * as Linking from "expo-linking";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Modal from "react-native-modal";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable.js";

import LoginWithoutFastCo from "../../auth/loginwofc.js";

const delay = (delayInms) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};

export default class Param extends React.Component {
  // on vide le sac de franck
  constructor(props) {
    super(props);
    this.state = {
      franck: "",
      visibleModal: null,
      content: "",
      button: "",
      button2: "",
      button3: "",
      hideDevoirs: false,
      hideLessons: false,
    };
  }

  // Définition de la fonction pour les toasts
  toastMessage = (msg) => {
    if (Platform.OS === "android") {
      // Si l'OS est android
      ToastAndroid.show(msg, ToastAndroid.SHORT);
      // Affiche un message d'msgeur sur android
    }
  };

  _showDevoirs = async () => {
    console.log("showDevoirs called");
    this.setState({ hideDevoirs: false });
    await delay(500);
    await AsyncStorage.setItem("hideDevoirs", "false");
    this.toastMessage("Les devoirs seront affichés même s'ils sont faits.");
    this.setState({ visibleModal: null });
  };
  _hideDevoirs = async () => {
    console.log("hideDevoirs called");
    this.setState({ hideDevoirs: true });
    await delay(500);
    await AsyncStorage.setItem("hideDevoirs", "true");
    this.toastMessage("Les devoirs ne seront pas affichés s'ils sont faits.");
    this.setState({ visibleModal: null });
  };

  _renderButton = (text) => (
    <Pressable onPress={() => this._showDevoirs()}>
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
  _renderButton1 = (text) => (
    <Pressable onPress={() => this._hideDevoirs()}>
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
  _renderButton6 = (text) => (
    <Pressable onPress={() => Linking.openURL('mailto:contact-albatrossteam@gmail.com')}>
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
  _renderButton61 = (text) => (
    <Pressable onPress={() => Linking.openURL('https://discord.gg/4ZXzzVpjPq')}>
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
  
  _renderButton4 = (text) => (
    <Pressable onPress={() => Linking.openURL('http://jdocopilot.me/src/cgus/cgus')}>
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
  _renderButton5 = (text) => (
    <Pressable onPress={() => Linking.openURL('http://jdocopilot.me')}>
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

  _renderModalContent1 = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 22,
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <Text>{this.state.content} </Text>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <View style={{}}>{this._renderButton(this.state.button)}</View>
        <View style={{}}>{this._renderButton1(this.state.button2)}</View>
      </View>
    </View>
  );
  _renderModalContent6 = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 22,
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <Text>{this.state.content} </Text>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <View style={{}}>{this._renderButton6(this.state.button)}</View>
        <View style={{}}>{this._renderButton6(this.state.button2)}</View>
      </View>
    </View>
  );
  _renderModalContent4 = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 22,
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <Text>{this.state.content} </Text>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <View style={{}}>{this._renderButton4(this.state.button)}</View>
      </View>
    </View>
  );
  _renderModalContent5 = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 22,
        justifyContent: "space-evenly",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <Text>{this.state.content} </Text>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <View style={{}}>{this._renderButton5(this.state.button)}</View>
      </View>
    </View>
  );

  _states = (item) => {
    if (item.maintenance == true) {
      this.toastMessage("Cette fonctionnalité est en cours de développement !");
    } else if(item.dlink){
      Linking.openURL(item.link);
    }
    else {
      this.setState({ visibleModal: item.id });

      this.setState({ content: item.content });
      this.setState({ button: item.button });
      this.setState({ button2: item.button2 });
    }
  };

  render() {
    async function wipe() {
      await AsyncStorage.clear(); //on efface tout
      await AsyncStorage.setItem("hasShownOnboarding", "true"); //sauf l'intro

      console.log("\x1b[31m%s\x1b[0m", "AsyncStorage wiped !");
    }

    //this.threeOptionAlertHandler()

    //this.goOn(); <= ici ça marche
    const randomClosePopupsText = [
      "OK",
      "Ok.",
      "Super !",
      "Chouette",
      "Cool !",
      "Génial !",
      "Parfait !",
      "Sympa !",
      "Bien reçu !",
    ];

    

    NavigationBar.setBackgroundColorAsync(DEFAULT.secondary);
    NavigationBar.setButtonStyleAsync("light");

    let DATA = [
      {
        id: 1,
        title: "Affichage des devoirs faits",
        content: "Comment afficher les devoirs faits ?",
        accent: " ",
        infos: " ",
        maintenance: false,
        button: "Grisés",
        button2: "Pas dutout",
        dlink: false,
      },
      {
        id: 4,
        title: "CGUs",
        accent: " ",
        infos: " ",
        maintenance: false,
        content:"C'est aussi relou a faire qu'à lire...",
        button: "Et c'est par là",
        dlink: true,
        link: "https://jdocopilot.me/src/cgus/cgus.html",
      },
      {
        id: 6,
        title: "Nous contacter",
        accent: " ",
        content: "Deux moyens de nous contacter :",
        maintenance: false,
        button: "Par mail",
        button2: "Sur Discord",
        dlink: false,
      },
      {
        id: 5,
        title: "Made with Love by ",
        accent: "Albatross!!",
        content:
          "Front-End : Claire, Olivier\nBack-End : Cedric, Thomas\n@Albatross, NSI cross-team",
        maintenance: false,
        button: "Albatross ?",
        dlink: true,
        link: "https://jdocopilot.me",
      },
    ];

    return (
      <>
        <Modal
          isVisible={this.state.visibleModal === 1}
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
          {this._renderModalContent1()}
        </Modal>
        <Modal
          isVisible={this.state.visibleModal === 6}
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
          {this._renderModalContent6()}
        </Modal>
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
          {this._renderModalContent4()}
        </Modal>
        <Modal
          isVisible={this.state.visibleModal === 5}
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
          {this._renderModalContent5()}
        </Modal>

        <View style={defaultCSS.container}>
          <View style={defaultCSS.body}>
            <View style={defaultCSS.bodyTitleContainer}>
              <Text style={defaultCSS.bodyTitle}>
                Paramètres et infos utiles :
              </Text>
            </View>

            {/* liste des prochains cours */}
            <View style={defaultCSS.bodyList}>
              <FlashList
                data={DATA}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => this._states(item)}>
                    <Text></Text>
                    <Text></Text>
                    <Text style={defaultCSS.bodySubject}>
                      {item.title}{" "}
                      <Text style={defaultCSS.bodyRoom}>{item.accent}</Text>{" "}
                    </Text>
                    <Text></Text>
                    <Text></Text>
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
}

// import modules
import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { defaultCSS } from "../../stylesheets/_default/as.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEFAULT } from "../../themes/variables.js";
import { Ionicons } from "@expo/vector-icons";

export default class Edt extends React.Component {
  // on vide le sac de franck
  state = {
    franck: "",
  };

  // on lui demande de recupérer les données de l'utilisateur
  getFranck = async () => {
    const franck = Object(JSON.parse(await AsyncStorage.getItem("franck"))); // get the timetable from the storage
    this.setState({ franck: franck.homeworks }); //on recup spécialement les devoirs
    //console.log(this.state.franck);
  };

  render() {
    this.getFranck();
    
    if (this.state.franck != "") {
      return (
        <>
          <View style={defaultCSS.container}>
            {/**header**/}
            <View style={defaultCSS.header}>
              
              {/* recatangle orange sur la gauche */}
              <View style={defaultCSS.fancyLeft}></View>
              {/* icone */}
              <Ionicons
                name="md-calendar"
                size={24}
                color="white"
                style={defaultCSS.headerIcon}
              />
              {/* titre, cour, salle, time left */}
              <Text style={defaultCSS.headerTitle}>Prochaines évals</Text>
              <View style={defaultCSS.headerDynamicText}>
                <Text style={defaultCSS.headerSubject}> 1
                  <Text style={defaultCSS.headerRoom}>  2</Text>
                </Text>
                <Text style={defaultCSS.headerSubject}> 3
                  <Text style={defaultCSS.headerRoom}>  4</Text>
                </Text>
                
                
              </View>           
              
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
          <Text style={defaultCSS.waitTextB}>
             attends nous un instant !
          </Text>
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
          <Text style={defaultCSS.waitTextT}>
            Pas de cours avant piouuuuu
          </Text>
          
        </SafeAreaView>
      );
    }
  }
}


//let devSubjects = []
//     // do {
        
//        if (typeof franckBackPack[compteurA] === 'undefined') {
//          devoirs.push(" ")
//        } else {
//          switchNames(franckBackPack[compteurC].subject, devSubjects);
//          devDico = {
//            sujet: devSubjects,
//            desc: franckBackPack[compteurC].description,
//            for: new Date(franckBackPack[compteurC].for).getDate(),
//          }

//          devoirs.push(devDico)
//        }
                
//        compteurC ++
//      } while (compteurC < franckBackPack.length)
      //console.log(devoirs)

//      let ew = [{"desc": "Ex 13 et 12 feuille", "for": 10, "sujet": ["Maths", "Histoire-Géographie", "Français"]}, {"desc": "Connaiître  l'essentiel du document de géographie : ( 2. Comment s'organise l'espace à l'intérieur des métropoles françaises a, b, c). Pensez à présenter en quelques minutes la métropole choisie ( sur atrium, site, classe, documents) car seuls deux élèves l'ont réalisé.", "for": 10, "sujet": ["Maths", "Histoire-Géographie", "Français"]}, {"desc": "Travail à faire avant : introduction à un commentaire pour l'extrait de la LL2 ATTENTION : 3 élèves seront interrogés à l’oral pour la lecture de ce texte", "for": 12, "sujet": ["Maths", "Histoire-Géographie", "Français"]}]

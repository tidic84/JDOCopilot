// import modules
import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { defaultCSS } from "../../stylesheets/_default/home.js";
import { timeDifference, duration } from "../../util/relativeDaysWidget";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import { cours } from "../../components/cours";
import Refresh from "../../components/refresh.js";
import { DEFAULT } from "../../themes/variables.js";
import { Button } from "react-native-web";
import { FlashList } from "@shopify/flash-list";
import switchNames from "../../../private/subject.js";
import Duration from "../../../private/duration.js";

export default class Edt extends React.Component {
  // on vide le sac de franck
  state = {
    franck: "",
  };

  // on lui demande de recupérer les données de l'utilisateur
  getFranck = async () => {
    const franck = Object(JSON.parse(await AsyncStorage.getItem("franck"))); // get the timetable from the storage
    this.setState({ franck: franck.timetable });
  };

  render() {
    this.getFranck();
    if (this.state.franck != "") {
      // recuperation du nombre de cours
      const franck = this.state.franck;
      const nbCours = franck.length;

      //set-up des compteurs
      var compteurA = 0;
      var compteurB = 0;
      // recuperation et remplacement des noms des cours
      var cours = []; // cet Array va contenir les nouveaux noms
       // cet Array va contenir les nouvelles salles
      let DATA = []; // cet Array va contenir le dictionnaire final

      do {
        //switchNames(franck[compteurA].subject, cours); // on appelle la fonction qui va remplacer les noms
        switchNames(franck[compteurA].subject, cours)
        
        compteurA++; // on incremente le compteur
      } while (compteurA < nbCours);

      // on met tout dans un dictionnaire pour pouvoir tout afficher
      do {
        var salle = franck[compteurB].room
        var f = new Date(franck[compteurB].from);
        var t = new Date(franck[compteurB].to)
        if (salle != null) {
          salle = salle
        } else if (salle == null) {
          salle = "dehors :)"
        }
        let dico = {
          subject: cours[compteurB],
          room: salle, //remplacer par salles[compteurB] quand la fonction sera faite
          fromH: f.getUTCHours(),
          fromM: f.getUTCMinutes(),
          toH: t.getUTCHours(),
          toM: t.getUTCMinutes(),
        };
        DATA.push(dico);
        compteurB++;
      } while (compteurB < nbCours);

      //console.log(DATA);



      return (
        <>
          <View style={defaultCSS.container}>
            
            {/* prochain cour */}
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
              <Text style={defaultCSS.headerTitle}>Prochain cours</Text>
              <View style={defaultCSS.headerDynamicText}>
                <Text style={defaultCSS.headerSubject}> {cours[0]}
                  <Text style={defaultCSS.headerRoom}>  {this.state.franck[0].room}</Text>
                </Text>
                
              </View>
              <Text style={defaultCSS.headerTime}>{timeDifference(Date.now() + 3600000, Date.parse(this.state.franck[0].from))} </Text>
              
              
            </View>
            {/* emploi du temps complet de la journée */}
            <View style={defaultCSS.body}>
              
              {/* titre */}
              <Text style={defaultCSS.bodyTitle}>Emploi du Temps</Text>
              {/* liste des prochains cours */}
              <View style={defaultCSS.bodyList}>
                <FlashList
                  data={DATA}
                  renderItem={({ item }) => (<View>
                                                    <Text >  </Text>
                                                    <Text >   </Text>
                                                    <Text style={defaultCSS.bodySubject}>{item.subject}, </Text>
                                                    <Text style={defaultCSS.bodyRoom}>{item.room}</Text>
                                                    <Text style={defaultCSS.bodyTime}>{item.fromH} : {item.fromM}</Text>
                                                    <Text style={defaultCSS.bodyTime}>{item.toH} : {item.toM}</Text>
                                                    
                                            </View>)}
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
    } else if (this.state.franck != "") {
      return (
        <SafeAreaView style={defaultCSS.container}>
          <Text style={defaultCSS.waitText}>
            On va chercher tes données, attends nous un instant !
          </Text>
          <ActivityIndicator
            size="large"
            color={DEFAULT.accent}
            style={defaultCSS.wait}
          />
        </SafeAreaView>
      );
    }
  }
}

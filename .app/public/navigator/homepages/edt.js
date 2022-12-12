//import modules
import * as React from 'react';
import { View, Text, ScrollView, ActivityIndicator, SafeAreaView } from "react-native";
import { defaultCSS } from "../../stylesheets/_default/home.js"
import { timeDifference, duration } from "../../util/relativeDaysWidget";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from 'react-native-progress';
import { cours } from "../../components/cours"
import Refresh from '../../components/refresh.js';
import { DEFAULT } from '../../themes/variables.js';
import { Button } from 'react-native-web';
import { FlatList } from 'react-native-gesture-handler';
export default class Edt extends React.Component {
  //on vide le sac de franck
  state = {
    franck: ""
  }

  //on lui demande de recupérer les données de l'utilisateur
  getFranck = async () => {
    const franck = Object(JSON.parse(await AsyncStorage.getItem("franck"))) // get the timetable from the storage
    this.setState({ franck: franck.timetable })
  }

render() {
    this.getFranck()
    if (this.state.franck != "") {

      
      //on braque franck
      const Item = ({ subject, room, to, from }) => (
        <View style={defaultCSS.item}>
          <Text style={defaultCSS.bodySubject}>{subject}</Text>
          <Text style={defaultCSS.bodyRoom}>{room}</Text>
          <Text style={defaultCSS.bodyTime}>Wait</Text>
        </View>
      );

      //on verif le nb de cours
      


      //on remplace les noms des cours pour l'esthetique
      if (Item.subject == "NUMERIQUE SC.INFORM.") {
        Item.subject = "N.S.I. "
      } else if (Item.subject == "MATHS") {
        Item.subject = "Maths"
      } else if (Item.subject == "PHYSIQUE-CHIMIE") {
        Item.subject = "Physique-Chimie"
      } else if (Item.subject == "HISTOIRE-GEOGRAPHIE") {
        Item.subject = "Histoire-Géographie"
      } else if (Item.subject == "ED.PHYSIQUE & SPORT.") {
        Item.subject = "E.P.S."
      } else if (Item.subject == "ITALIEN LV2") {
        Item.subject = "Italien"
      } else if (Item.subject == "ANGLAIS LV1") {
        Item.subject = "Anglais"
      } else if (Item.subject == "ESPAGNOL LV2") {
        Item.subject = "Espagnol"
      } else if (Item.subject == "ALLEMAND LV2") {
        Item.subject = "Allemand"
      } else if (Item.subject == "ENSEIGNEMENT SCIENTIFIQUE") {
        Item.subject = "E.S."
      } else if (Item.subject == "AP FRANCAIS") {
        Item.subject = "Français"
      } else if (Item.subject == "ARTS-PLASTIQUES OPTION") {
        Item.subject = "Arts-Plastiques (O)"
      } else if (Item.subject == "ENS. MORAL & CIVIQUE") {
        Item.subject = "E.M.C."
      } else if (Item.subject == "ARTS PLASTIQUES") {
        Item.subject = "Arts-Plastiques (s)"
      } else if (Item.subject == "LITT. ANGLAIS") {
        Item.subject = "L.L.C.E."
      } else if (Item.subject == "LLC ANGL.MOND.CONT.") {
        Item.subject = "A.M.C."
      } else if (Item.subject == "HIST.GEO.GEOPOL.S.P") {
        Item.subject = "H.G.G.S.P."
      }

      

      if (Item.room == "S103 INFORMATIQUE") {
        Item.room = "S103"
      } else if (Item.room == "SALLE EPS") {
        Item.room = "Gymnase"
      }



      return (
        <>
          <View style={defaultCSS.container}>
            {/* prochain cour */}
            <View style={defaultCSS.header}>
              {/* recatangle orange sur la gauche */}
              <View style={defaultCSS.fancyLeft}></View>
              {/* icone */}
              <Ionicons name="md-calendar" size={24} color="white" style={defaultCSS.headerIcon} />
              {/* titre, cour, salle, time left */}
              <Text style={defaultCSS.headerTitle}>Prochain cours</Text>
              <Text style={defaultCSS.headerSubject}>tqt</Text>
              <Text style={defaultCSS.headerRoom}>tqt</Text>
              <Text style={defaultCSS.headerTime}>{timeDifference(Date.now() + 3600000, Date.parse(this.state.franck[0].from))}</Text>
            </View>

            {/* emploi du temps complet de la journée */}
            <View style={defaultCSS.body}>
              {/* titre */}
              <Text style={defaultCSS.bodyTitle}>Emploi du Temps</Text>
              {/* liste des prochains cours */}
              <View style={defaultCSS.bodyList}>
                <View style={defaultCSS.bodyCours}>
                  <FlatList 
                    data={this.state.franck}
                    renderItem={({ item }) => <Item subject={item.subject} room={item.room} time={item.time}/>}
                    keyExtractor={item => item.id}
                  />
                </View>
              </View>

            </View>

          </View>
        </>
      );
    } else if (this.state.franck != "") {
      return (
        <SafeAreaView style={defaultCSS.container}>
        <Text style={defaultCSS.waitText}>On va chercher tes données, attends nous un instant !</Text>
        <ActivityIndicator size="large" color={DEFAULT.accent} style={defaultCSS.wait}/>
    </SafeAreaView>
      );
    }
  }
}
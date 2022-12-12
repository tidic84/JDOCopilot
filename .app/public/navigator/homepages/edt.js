//import modules
import * as React from 'react';
import { View, Text, ScrollView, ActivityIndicator, SafeAreaView } from "react-native";
import { defaultCSS } from "../../stylesheets/_default/home.js"
import { timeDifference } from "../../util/relativeDaysWidget";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from 'react-native-progress';
import { cours } from "../../components/cours"
import Refresh from '../../components/refresh.js';
import { DEFAULT } from '../../themes/variables.js';
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
      let cours = this.state.franck[0].subject
      let salle = this.state.franck[0].room
      // let daySesh1 = this.state.franck[0].timetable.length
      // let daySesh2 = this.state.franck[0].timetable.length
      // let daySesh3 = this.state.franck[0].timetable.length
      // let daySesh4 = this.state.franck[0].timetable[3].subject
      // let daySesh5 = this.state.franck[0].timetable[4].subject
      // let daySesh6 = this.state.franck[0].timetable[5].subject
      // let daySesh7 = this.state.franck[0].timetable[6].subject
      // let daySesh8 = this.state.franck[0].timetable[7].subject
      // let daySesh9 = this.state.franck[0].timetable[8].subject
      //on remplace les noms des cours pour l'esthetique
      if (cours == "NUMERIQUE SC.INFORM.") {
        cours = "N.S.I. "
      } else if (cours == "MATHS") {
        cours = "Maths"
      } else if (cours == "PHYSIQUE-CHIMIE") {
        cours = "Physique-Chimie"
      } else if (cours == "HISTOIRE-GEOGRAPHIE") {
        cours = "Histoire-Géographie"
      } else if (cours == "ED.PHYSIQUE & SPORT.") {
        cours = "E.P.S."
      } else if (cours == "ITALIEN LV2") {
        cours = "Italien"
      } else if (cours == "ANGLAIS LV1") {
        cours = "Anglais"
      } else if (cours == "ESPAGNOL LV2") {
        cours = "Espagnol"
      } else if (cours == "ALLEMAND LV2") {
        cours = "Allemand"
      } else if (cours == "ENSEIGNEMENT SCIENTIFIQUE") {
        cours = "E.S."
      } else if (cours == "AP FRANCAIS") {
        cours = "Français"
      } else if (cours == "ARTS-PLASTIQUES OPTION") {
        cours = "Arts-Plastiques (O)"
      } else if (cours == "ENS. MORAL & CIVIQUE") {
        cours = "E.M.C."
      } else if (cours == "ARTS PLASTIQUES") {
        cours = "Arts-Plastiques (s)"
      } else if (cours == "LITT. ANGLAIS") {
        cours = "L.L.C.E."
      } else if (cours == "LLC ANGL.MOND.CONT.") {
        cours = "A.M.C."
      } else if (cours == "HIST.GEO.GEOPOL.S.P") {
        cours = "H.G.G.S.P."
      }

      // if (daySesh1 == "NUMERIQUE SC.INFORM.") {
      //   daySesh1 = "N.S.I. "
      // } else if (daySesh1 == "MATHS") {
      //   daySesh1 = "Maths"
      // } else if (daySesh1 == "PHYSIQUE-CHIMIE") {
      //   daySesh1 = "Physique-Chimie"
      // } else if (daySesh1 == "HISTOIRE-GEOGRAPHIE") {
      //   daySesh1 = "Histoire-Géographie"
      // } else if (daySesh1 == "ED.PHYSIQUE & SPORT.") {
      //   daySesh1 = "E.P.S."
      // } else if (daySesh1 == "ITALIEN LV2") {
      //   daySesh1 = "Italien"
      // } else if (daySesh1 == "ANGLAIS LV1") {
      //   daySesh1 = "Anglais"
      // } else if (daySesh1 == "ESPAGNOL LV2") {
      //   daySesh1 = "Espagnol"
      // } else if (daySesh1 == "ALLEMAND LV2") {
      //   daySesh1 = "Allemand"
      // } else if (daySesh1 == "ENSEIGNEMENT SCIENTIFIQUE") {
      //   daySesh1 = "E.S."
      // } else if (daySesh1 == "AP FRANCAIS") {
      //   daySesh1 = "Français"
      // } else if (daySesh1 == "ARTS-PLASTIQUES OPTION") {
      //   daySesh1 = "Arts-Plastiques (O)"
      // } else if (daySesh1 == "ENS. MORAL & CIVIQUE") {
      //   daySesh1 = "E.M.C."
      // } else if (daySesh1 == "ARTS PLASTIQUES") {
      //   daySesh1 = "Arts-Plastiques (s)"
      // } else if (daySesh1 == "LITT. ANGLAIS") {
      //   daySesh1 = "L.L.C.E."
      // } else if (daySesh1 == "LLC ANGL.MOND.CONT.") {
      //   daySesh1 = "A.M.C."
      // } else if (daySesh1 == "HIST.GEO.GEOPOL.S.P") {
      //   daySesh1 = "H.G.S.P."
      // }

      // if (daySesh2 == "NUMERIQUE SC.INFORM.") {
      //   daySesh2 = "N.S.I. "
      // } else if (daySesh2 == "MATHS") {
      //   daySesh2 = "Maths"
      // } else if (daySesh2 == "PHYSIQUE-CHIMIE") {
      //   daySesh2 = "Physique-Chimie"
      // } else if (daySesh2 == "HISTOIRE-GEOGRAPHIE") {
      //   daySesh2 = "Histoire-Géographie"
      // } else if (daySesh2 == "ED.PHYSIQUE & SPORT.") {
      //   daySesh2 = "E.P.S."
      // } else if (daySesh2 == "ITALIEN LV2") {
      //   daySesh2 = "Italien"
      // } else if (daySesh2 == "ANGLAIS LV2") {
      //   daySesh2 = "Anglais"
      // } else if (daySesh2 == "ESPAGNOL LV2") {
      //   daySesh2 = "Espagnol"
      // } else if (daySesh2 == "ALLEMAND LV2") {
      //   daySesh2 = "Allemand"
      // } else if (daySesh2 == "ENSEIGNEMENT SCIENTIFIQUE") {
      //   daySesh2 = "E.S."
      // } else if (daySesh2 == "AP FRANCAIS") {
      //   daySesh2 = "Français"
      // } else if (daySesh2 == "ARTS-PLASTIQUES OPTION") {
      //   daySesh2 = "Arts-Plastiques (O)"
      // } else if (daySesh2 == "ENS. MORAL & CIVIQUE") {
      //   daySesh2 = "E.M.C."
      // } else if (daySesh2 == "ARTS PLASTIQUES") {
      //   daySesh2 = "Arts-Plastiques (s)"
      // } else if (daySesh2 == "LITT. ANGLAIS") {
      //   daySesh2 = "L.L.C.E."
      // } else if (daySesh2 == "LLC ANGL.MOND.CONT.") {
      //   daySesh2 = "A.M.C."
      // } else if (daySesh2 == "HIST.GEO.GEOPOL.S.P") {
      //   daySesh2 = "H.G.S.P."
      // }

      // if (daySesh3 == "NUMERIQUE SC.INFORM.") {
      //   daySesh3 = "N.S.I. "
      // } else if (daySesh3 == "MATHS") {
      //   daySesh3 = "Maths"
      // } else if (daySesh3 == "PHYSIQUE-CHIMIE") {
      //   daySesh3 = "Physique-Chimie"
      // } else if (daySesh3 == "HISTOIRE-GEOGRAPHIE") {
      //   daySesh3 = "Histoire-Géographie"
      // } else if (daySesh3 == "ED.PHYSIQUE & SPORT.") {
      //   daySesh3 = "E.P.S."
      // } else if (daySesh3 == "ITALIEN LV2") {
      //   daySesh3 = "Italien"
      // } else if (daySesh3 == "ANGLAIS LV2") {
      //   daySesh3 = "Anglais"
      // } else if (daySesh3 == "ESPAGNOL LV2") {
      //   daySesh3 = "Espagnol"
      // } else if (daySesh3 == "ALLEMAND LV2") {
      //   daySesh3 = "Allemand"
      // } else if (daySesh3 == "ENSEIGNEMENT SCIENTIFIQUE") {
      //   daySesh3 = "E.S."
      // } else if (daySesh3 == "AP FRANCAIS") {
      //   daySesh3 = "Français"
      // } else if (daySesh3 == "ARTS-PLASTIQUES OPTION") {
      //   daySesh3 = "Arts-Plastiques (O)"
      // } else if (daySesh3 == "ENS. MORAL & CIVIQUE") {
      //   daySesh3 = "E.M.C."
      // } else if (daySesh3 == "ARTS PLASTIQUES") {
      //   daySesh3 = "Arts-Plastiques (s)"
      // } else if (daySesh3 == "LITT. ANGLAIS") {
      //   daySesh3 = "L.L.C.E."
      // } else if (daySesh3 == "LLC ANGL.MOND.CONT.") {
      //   daySesh3 = "A.M.C."
      // } else if (daySesh3 == "HIST.GEO.GEOPOL.S.P") {
      //   daySesh3 = "H.G.S.P."
      // }

      // if (daySesh4 == "NUMERIQUE SC.INFORM.") {
      //   daySesh4 = "N.S.I. "
      // } else if (daySesh4 == "MATHS") {
      //   daySesh4 = "Maths"
      // } else if (daySesh4 == "PHYSIQUE-CHIMIE") {
      //   daySesh4 = "Physique-Chimie"
      // } else if (daySesh4 == "HISTOIRE-GEOGRAPHIE") {
      //   daySesh4 = "Histoire-Géographie"
      // } else if (daySesh4 == "ED.PHYSIQUE & SPORT.") {
      //   daySesh4 = "E.P.S."
      // } else if (daySesh4 == "ITALIEN LV2") {
      //   daySesh4 = "Italien"
      // } else if (daySesh4 == "ANGLAIS LV2") {
      //   daySesh4 = "Anglais"
      // } else if (daySesh4 == "ESPAGNOL LV2") {
      //   daySesh4 = "Espagnol"
      // } else if (daySesh4 == "ALLEMAND LV2") {
      //   daySesh4 = "Allemand"
      // } else if (daySesh4 == "ENSEIGNEMENT SCIENTIFIQUE") {
      //   daySesh4 = "E.S."
      // } else if (daySesh4 == "AP FRANCAIS") {
      //   daySesh4 = "Français"
      // } else if (daySesh4 == "ARTS-PLASTIQUES OPTION") {
      //   daySesh4 = "Arts-Plastiques (O)"
      // } else if (daySesh4 == "ENS. MORAL & CIVIQUE") {
      //   daySesh4 = "E.M.C."
      // } else if (daySesh4 == "ARTS PLASTIQUES") {
      //   daySesh4 = "Arts-Plastiques (s)"
      // } else if (daySesh4 == "LITT. ANGLAIS") {
      //   daySesh4 = "L.L.C.E."
      // } else if (daySesh4 == "LLC ANGL.MOND.CONT.") {
      //   daySesh4 = "A.M.C."
      // } else if (daySesh4 == "HIST.GEO.GEOPOL.S.P") {
      //   daySesh4 = "H.G.S.P."
      // }

      // if (daySesh5 == "NUMERIQUE SC.INFORM.") {
      //   daySesh5 = "N.S.I. "
      // } else if (daySesh5 == "MATHS") {
      //   daySesh5 = "Maths"
      // } else if (daySesh5 == "PHYSIQUE-CHIMIE") {
      //   daySesh5 = "Physique-Chimie"
      // } else if (daySesh5 == "HISTOIRE-GEOGRAPHIE") {
      //   daySesh5 = "Histoire-Géographie"
      // } else if (daySesh5 == "ED.PHYSIQUE & SPORT.") {
      //   daySesh5 = "E.P.S."
      // } else if (daySesh5 == "ITALIEN LV2") {
      //   daySesh5 = "Italien"
      // } else if (daySesh5 == "ANGLAIS LV2") {
      //   daySesh5 = "Anglais"
      // } else if (daySesh5 == "ESPAGNOL LV2") {
      //   daySesh5 = "Espagnol"
      // } else if (daySesh5 == "ALLEMAND LV2") {
      //   daySesh5 = "Allemand"
      // } else if (daySesh5 == "ENSEIGNEMENT SCIENTIFIQUE") {
      //   daySesh5 = "E.S."
      // } else if (daySesh5 == "AP FRANCAIS") {
      //   daySesh5 = "Français"
      // } else if (daySesh5 == "ARTS-PLASTIQUES OPTION") {
      //   daySesh5 = "Arts-Plastiques (O)"
      // } else if (daySesh5 == "ENS. MORAL & CIVIQUE") {
      //   daySesh5 = "E.M.C."
      // } else if (daySesh5 == "ARTS PLASTIQUES") {
      //   daySesh5 = "Arts-Plastiques (s)"
      // } else if (daySesh5 == "LITT. ANGLAIS") {
      //   daySesh5 = "L.L.C.E."
      // } else if (daySesh5 == "LLC ANGL.MOND.CONT.") {
      //   daySesh5 = "A.M.C."
      // } else if (daySesh5 == "HIST.GEO.GEOPOL.S.P") {
      //   daySesh5 = "H.G.S.P."
      // }

      // if (daySesh6 == "NUMERIQUE SC.INFORM.") {
      //   daySesh6 = "N.S.I. "
      // } else if (daySesh6 == "MATHS") {
      //   daySesh6 = "Maths"
      // } else if (daySesh6 == "PHYSIQUE-CHIMIE") {
      //   daySesh6 = "Physique-Chimie"
      // } else if (daySesh6 == "HISTOIRE-GEOGRAPHIE") {
      //   daySesh6 = "Histoire-Géographie"
      // } else if (daySesh6 == "ED.PHYSIQUE & SPORT.") {
      //   daySesh6 = "E.P.S."
      // } else if (daySesh6 == "ITALIEN LV2") {
      //   daySesh6 = "Italien"
      // } else if (daySesh6 == "ANGLAIS LV2") {
      //   daySesh6 = "Anglais"
      // } else if (daySesh6 == "ESPAGNOL LV2") {
      //   daySesh6 = "Espagnol"
      // } else if (daySesh6 == "ALLEMAND LV2") {
      //   daySesh6 = "Allemand"
      // } else if (daySesh6 == "ENSEIGNEMENT SCIENTIFIQUE") {
      //   daySesh6 = "E.S."
      // } else if (daySesh6 == "AP FRANCAIS") {
      //   daySesh6 = "Français"
      // } else if (daySesh6 == "ARTS-PLASTIQUES OPTION") {
      //   daySesh6 = "Arts-Plastiques (O)"
      // } else if (daySesh6 == "ENS. MORAL & CIVIQUE") {
      //   daySesh6 = "E.M.C."
      // } else if (daySesh6 == "ARTS PLASTIQUES") {
      //   daySesh6 = "Arts-Plastiques (s)"
      // } else if (daySesh6 == "LITT. ANGLAIS") {
      //   daySesh6 = "L.L.C.E."
      // } else if (daySesh6 == "LLC ANGL.MOND.CONT.") {
      //   daySesh6 = "A.M.C."
      // } else if (daySesh6 == "HIST.GEO.GEOPOL.S.P") {
      //   daySesh6 = "H.G.S.P."
      // }

      // if (daySesh7 == "NUMERIQUE SC.INFORM.") {
      //   daySesh7 = "N.S.I. "
      // } else if (daySesh7 == "MATHS") {
      //   daySesh7 = "Maths"
      // } else if (daySesh7 == "PHYSIQUE-CHIMIE") {
      //   daySesh7 = "Physique-Chimie"
      // } else if (daySesh7 == "HISTOIRE-GEOGRAPHIE") {
      //   daySesh7 = "Histoire-Géographie"
      // } else if (daySesh7 == "ED.PHYSIQUE & SPORT.") {
      //   daySesh7 = "E.P.S."
      // } else if (daySesh7 == "ITALIEN LV2") {
      //   daySesh7 = "Italien"
      // } else if (daySesh7 == "ANGLAIS LV2") {
      //   daySesh7 = "Anglais"
      // } else if (daySesh7 == "ESPAGNOL LV2") {
      //   daySesh7 = "Espagnol"
      // } else if (daySesh7 == "ALLEMAND LV2") {
      //   daySesh7 = "Allemand"
      // } else if (daySesh7 == "ENSEIGNEMENT SCIENTIFIQUE") {
      //   daySesh7 = "E.S."
      // } else if (daySesh7 == "AP FRANCAIS") {
      //   daySesh7 = "Français"
      // } else if (daySesh7 == "ARTS-PLASTIQUES OPTION") {
      //   daySesh7 = "Arts-Plastiques (O)"
      // } else if (daySesh7 == "ENS. MORAL & CIVIQUE") {
      //   daySesh7 = "E.M.C."
      // } else if (daySesh7 == "ARTS PLASTIQUES") {
      //   daySesh7 = "Arts-Plastiques (s)"
      // } else if (daySesh7 == "LITT. ANGLAIS") {
      //   daySesh7 = "L.L.C.E."
      // } else if (daySesh7 == "LLC ANGL.MOND.CONT.") {
      //   daySesh7 = "A.M.C."
      // } else if (daySesh7 == "HIST.GEO.GEOPOL.S.P") {
      //   daySesh7 = "H.G.S.P."
      // }

      // if (daySesh8 == "NUMERIQUE SC.INFORM.") {
      //   daySesh8 = "N.S.I. "
      // } else if (daySesh8 == "MATHS") {
      //   daySesh8 = "Maths"
      // } else if (daySesh8 == "PHYSIQUE-CHIMIE") {
      //   daySesh8 = "Physique-Chimie"
      // } else if (daySesh8 == "HISTOIRE-GEOGRAPHIE") {
      //   daySesh8 = "Histoire-Géographie"
      // } else if (daySesh8 == "ED.PHYSIQUE & SPORT.") {
      //   daySesh8 = "E.P.S."
      // } else if (daySesh8 == "ITALIEN LV2") {
      //   daySesh8 = "Italien"
      // } else if (daySesh8 == "ANGLAIS LV2") {
      //   daySesh8 = "Anglais"
      // } else if (daySesh8 == "ESPAGNOL LV2") {
      //   daySesh8 = "Espagnol"
      // } else if (daySesh8 == "ALLEMAND LV2") {
      //   daySesh8 = "Allemand"
      // } else if (daySesh8 == "ENSEIGNEMENT SCIENTIFIQUE") {
      //   daySesh8 = "E.S."
      // } else if (daySesh8 == "AP FRANCAIS") {
      //   daySesh8 = "Français"
      // } else if (daySesh8 == "ARTS-PLASTIQUES OPTION") {
      //   daySesh8 = "Arts-Plastiques (O)"
      // } else if (daySesh8 == "ENS. MORAL & CIVIQUE") {
      //   daySesh8 = "E.M.C."
      // } else if (daySesh8 == "ARTS PLASTIQUES") {
      //   daySesh8 = "Arts-Plastiques (s)"
      // } else if (daySesh8 == "LITT. ANGLAIS") {
      //   daySesh8 = "L.L.C.E."
      // } else if (daySesh8 == "LLC ANGL.MOND.CONT.") {
      //   daySesh8 = "A.M.C."
      // } else if (daySesh8 == "HIST.GEO.GEOPOL.S.P") {
      //   daySesh8 = "H.G.S.P."
      // }

      // if (daySesh9 == "NUMERIQUE SC.INFORM.") {
      //   daySesh9 = "N.S.I. "
      // } else if (daySesh9 == "MATHS") {
      //   daySesh9 = "Maths"
      // } else if (daySesh9 == "PHYSIQUE-CHIMIE") {
      //   daySesh9 = "Physique-Chimie"
      // } else if (daySesh9 == "HISTOIRE-GEOGRAPHIE") {
      //   daySesh9 = "Histoire-Géographie"
      // } else if (daySesh9 == "ED.PHYSIQUE & SPORT.") {
      //   daySesh9 = "E.P.S."
      // } else if (daySesh9 == "ITALIEN LV2") {
      //   daySesh9 = "Italien"
      // } else if (daySesh9 == "ANGLAIS LV2") {
      //   daySesh9 = "Anglais"
      // } else if (daySesh9 == "ESPAGNOL LV2") {
      //   daySesh9 = "Espagnol"
      // } else if (daySesh9 == "ALLEMAND LV2") {
      //   daySesh9 = "Allemand"
      // } else if (daySesh9 == "ENSEIGNEMENT SCIENTIFIQUE") {
      //   daySesh9 = "E.S."
      // } else if (daySesh9 == "AP FRANCAIS") {
      //   daySesh9 = "Français"
      // } else if (daySesh9 == "ARTS-PLASTIQUES OPTION") {
      //   daySesh9 = "Arts-Plastiques (O)"
      // } else if (daySesh9 == "ENS. MORAL & CIVIQUE") {
      //   daySesh9 = "E.M.C."
      // } else if (daySesh9 == "ARTS PLASTIQUES") {
      //   daySesh9 = "Arts-Plastiques (s)"
      // } else if (daySesh9 == "LITT. ANGLAIS") {
      //   daySesh9 = "L.L.C.E."
      // } else if (daySesh9 == "LLC ANGL.MOND.CONT.") {
      //   daySesh9 = "A.M.C."
      // } else if (daySesh9 == "HIST.GEO.GEOPOL.S.P") {
      //   daySesh9 = "H.G.S.P."
      // }

      if (salle == "S103 INFORMATIQUE") {
        salle = "S103"
      } else if (salle == "SALLE EPS") {
        salle = "Gymnase"
      }



      return (
        <>
          <ScrollView contentContainerStyle={defaultCSS.container}>
            {/* prochain cour */}
            <View style={defaultCSS.header}>
              {/* recatangle orange sur la gauche */}
              <View style={defaultCSS.fancyLeft}></View>
              {/* icone */}
              <Ionicons name="md-calendar" size={24} color="white" style={defaultCSS.headerIcon} />
              {/* titre, cour, salle, time left */}
              <Text style={defaultCSS.headerTitle}>Prochain cours</Text>
              <Text style={defaultCSS.headerSubject}>{cours}</Text>
              <Text style={defaultCSS.headerRoom}>{salle}</Text>
              <Text style={defaultCSS.headerTime}>{timeDifference(Date.now() + 3600000, Date.parse(this.state.franck[0].from))}</Text>
            </View>

            {/* emploi du temps complet de la journée */}
            <View style={defaultCSS.body}>
              {/* titre */}
              <Text style={defaultCSS.bodyTitle}>Emploi du Temps</Text>
              {/* liste des prochains cours */}
              <View style={defaultCSS.bodyList}>
                <View style={defaultCSS.bodyCours}>
                  <Text style={defaultCSS.bodySubject} >{cours}</Text>
                  <Text style={defaultCSS.bodyRoom}>{salle}</Text>
                  <Text style={defaultCSS.bodyTime}>{timeDifference(Date.now() + 3600000, Date.parse(this.state.franck[0].from))}</Text>
                </View>
                {/* <View style={defaultCSS.bodySeparator}></View> */}
                <View style={defaultCSS.bodyCours1}>
                  <Text style={defaultCSS.bodySubject} >{cours}</Text>
                  <Text style={defaultCSS.bodyRoom}>{salle}</Text>
                  <Text style={defaultCSS.bodyTime}>{timeDifference(Date.now() + 3600000, Date.parse(this.state.franck[0].from))}</Text>
                </View>
                {/* <View style={defaultCSS.bodySeparator}></View> */}
                <View style={defaultCSS.bodyCours2}>
                  <Text style={defaultCSS.bodySubject} >{cours}</Text>
                  <Text style={defaultCSS.bodyRoom}>{salle}</Text>
                  <Text style={defaultCSS.bodyTime}>{timeDifference(Date.now() + 3600000, Date.parse(this.state.franck[0].from))}</Text>
                </View>
                {/* <View style={defaultCSS.bodySeparator}></View> */}
                <View style={defaultCSS.bodyCours3}>
                  <Text style={defaultCSS.bodySubject} >{cours}</Text>
                  <Text style={defaultCSS.bodyRoom}>{salle}</Text>
                  <Text style={defaultCSS.bodyTime}>{timeDifference(Date.now() + 3600000, Date.parse(this.state.franck[0].from))}</Text>
                </View>
                {/* <View style={defaultCSS.bodySeparator}></View> */}
                <View style={defaultCSS.bodyCours4}>
                  <Text style={defaultCSS.bodySubject} >{cours}</Text>
                  <Text style={defaultCSS.bodyRoom}>{salle}</Text>
                  <Text style={defaultCSS.bodyTime}>{timeDifference(Date.now() + 3600000, Date.parse(this.state.franck[0].from))}</Text>
                </View>
                {/* <View style={defaultCSS.bodySeparator}></View> */}
                <View style={defaultCSS.bodyCours5}>
                  <Text style={defaultCSS.bodySubject} >{cours}</Text>
                  <Text style={defaultCSS.bodyRoom}>{salle}</Text>
                  <Text style={defaultCSS.bodyTime}>{timeDifference(Date.now() + 3600000, Date.parse(this.state.franck[0].from))}</Text>
                </View>
                {/* <View style={defaultCSS.bodySeparator}></View> */}
                <View style={defaultCSS.bodyCours6}>
                  <Text style={defaultCSS.bodySubject} >{cours}</Text>
                  <Text style={defaultCSS.bodyRoom}>{salle}</Text>
                  <Text style={defaultCSS.bodyTime}>{timeDifference(Date.now() + 3600000, Date.parse(this.state.franck[0].from))}</Text>
                </View>
                {/* <View style={defaultCSS.bodySeparator}></View> */}
                <View style={defaultCSS.bodyCours7}>
                  <Text style={defaultCSS.bodySubject} >{cours}</Text>
                  <Text style={defaultCSS.bodyRoom}>{salle}</Text>
                  <Text style={defaultCSS.bodyTime}>{timeDifference(Date.now() + 3600000, Date.parse(this.state.franck[0].from))}</Text>
                </View>
                {/* <View style={defaultCSS.bodySeparator}></View> */}
                <View style={defaultCSS.bodyCours8}>
                  <Text style={defaultCSS.bodySubject} >{cours}</Text>
                  <Text style={defaultCSS.bodyRoom}>{salle}</Text>
                  <Text style={defaultCSS.bodyTime}>{timeDifference(Date.now() + 3600000, Date.parse(this.state.franck[0].from))}</Text>
                </View>
              </View>

            </View>

          </ScrollView>
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
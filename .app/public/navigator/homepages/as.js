// import modules
import * as React from "react";
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { defaultCSS } from "../../stylesheets/_default/as.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEFAULT } from "../../themes/variables.js";
import { Ionicons } from "@expo/vector-icons";
import switchNames from "../../../private/subject.js";
import { FlashList } from "@shopify/flash-list";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as NavigationBar from 'expo-navigation-bar';
import { timeDifference } from "../../util/relativeDaysWidget.js";

export default class Edt extends React.Component {
  // on vide le sac de franck
  state = {
    franck: "",
  };

  // on lui demande de recupérer les données de l'utilisateur
  getFranck = async () => {
    const franck = Object(JSON.parse(await AsyncStorage.getItem("franck"))); // get the timetable from the storage
    this.setState({ franck: franck }); //on recup spécialement les devoirs
    //console.log(this.state.franck);
  };

  render() {
    this.getFranck();
    
    function hideThisFuckingBar(){ 
      NavigationBar.setVisibilityAsync("hidden");
      NavigationBar.setBehaviorAsync('overlay-swipe');
      NavigationBar.setButtonStyleAsync("light");
    }

    function actionOnRow(item) {
      let state = undefined
      if(item.fait === false) {
        state = 'non ;-;'
      } else if (item.fait === true) {
        state = 'oui !'
      } else {
        state = 'quelle est cette sorcellerie ????'
      }
      let givenAt = timeDifference(new Date(), item.givenAt)
      Alert.alert(
        //title
        item.sujet,
        //body
        '\nDonné ' + givenAt + '\nFait : ' + state,
        [
          { text: 'Chouette', onPress: () => hideThisFuckingBar() },
        ],
        { cancelable: true }
      );
    }

    if (this.state.franck != "") {

      //récupération des devoirs
      let franck = this.state.franck.homeworks
      //let evaluations = this.state.franck.evals
      let devoirs = []
      let sujet = []
      let compteurA = 0

      do {
        switchNames(franck[compteurA].subject, sujet)

        //console.log(sujet)
        let dico = {
          sujet: sujet[compteurA],
          description: franck[compteurA].description,
          pour: new Date(franck[compteurA].for).getTime(),
          givenAt: new Date(franck[compteurA].givenAt).getTime(),
          fait: franck[compteurA].done,
        }

        //console.log(dico)
        devoirs.push(dico)
        compteurA ++
      } while (compteurA < franck.length)

      //console.log(devoirs)

      //récupération des 2 prochaines évals:
      /**let evals = []
      let mat = []
      let compteurB = 0

      if(evaluations === []){
        evals.push( `Pas d'évaluations en vue, capitaîne`)
      } else {
        do {
          
          compteurB ++
        } while (compteurB < 2)
      }**/
      



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
                <Text style={defaultCSS.headerSubject}> 
                  <Text style={defaultCSS.headerRoom}>Pas d'évaluations prévues</Text>
                </Text>
                <Text style={defaultCSS.headerSubject}> Ok j'ai triché, ça marche pas encore
                  <Text style={defaultCSS.headerRoom}>  </Text>
                </Text>
              </View>           
            </View>

            {/**body**/}
            <View style={defaultCSS.bodyTitle}>
              <Text style={defaultCSS.bodyTextIcon} >Devoirs :</Text>
              {/**<Ionicons 
                name="funnel-outline"
                size={24}
                color="white"
                style={defaultCSS.bodyTitleIcon}
              />**/}
            </View>
            <View style={defaultCSS.bodyContainer}>
            <FlashList
                  data={devoirs}
                  renderItem={({ item }) => (<TouchableOpacity onPress={() => actionOnRow(item)}>
                                                    <Text >  </Text>
                                                    <Text >  </Text>
                                                    <Text style={defaultCSS.bodySubject}>{item.sujet} : </Text>
                                                    <Text style={defaultCSS.bodyDesc}>{item.description}</Text>
                                                    <Text style={defaultCSS.bodyFor}>Pour <Text style={defaultCSS.num}>{timeDifference(Date.now() + 3600000, item.pour)}</Text></Text>
                                                    <Text >  </Text>
                                                    <Text >  </Text>
                                                    
                                            </TouchableOpacity>)}
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
//      do {
        
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

let ew = [
    {
        "description": "Ex 13 et 12 feuille",
        "fait": true,
        "givenAt": 1672963200000,
        "pour": 1673308800000,
        "sujet": "Maths"
    }, {
        "description": "Connaiître  l'essentiel du document de géographie : ( 2. Comment s'organise l'espace à l'intérieur des métropoles françaises a, b, c). Pensez à présenter en quelques minutes la métropole choisie ( sur atrium, site, classe, documents) car seuls deux élèves l'ont réalisé.",
        "fait": true,
        "givenAt": 1673049600000,
        "pour": 1673308800000,
        "sujet": "Histoire-Géographie"
    }, {
        "description": "Travail à faire avant : introduction à un commentaire pour l’extrait de la LL2 ATTENTION : 3 élèves seront interrogés à l’oral pour la lecture de ce texte",
        "fait": false,
        "givenAt": 1673222400000,
        "pour": 1673481600000,
        "sujet": "Français"
    }
]

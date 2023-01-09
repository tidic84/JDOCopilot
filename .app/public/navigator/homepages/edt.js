// import modules
import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { defaultCSS } from "../../stylesheets/_default/home.js";
import { timeDifference } from "../../util/relativeDaysWidget";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { DEFAULT } from "../../themes/variables.js";
import { FlashList } from "@shopify/flash-list";
import switchNames from "../../../private/subject.js";
import switchRooms from '../../../private/room.js';
import prettierNums from '../../../private/duration';

export default class Edt extends React.Component {
  // on vide le sac de franck
   constructor(props) {
     super(props);
  this.state = {
    franck: "",
    
  };


}
  // on lui demande de recupérer les données de l'utilisateur
  getFranck = async () => {
    const franck = Object(JSON.parse(await AsyncStorage.getItem("franck"))); // get the timetable from the storage
    this.setState({ franck: franck.timetable });
    //console.log(this.state.franck);
  };


  
  render() {


    this.getFranck();
   

    if (this.state.franck != "") {
      // recuperation du nombre de cours
      const franck = this.state.franck;
      const nbCours = franck.length;

      let datesToTest = []
      let j1 = []
      let j2 = []

      //modif chiantes pr la date
      let m = 0
      do {
        datesToTest.push(new Date(franck[m].from).getDate())
        m++
      } while (m < nbCours)
      //const sesh = new Date(franck.session).getDate()
      
      //console.log( datesToTest)
      
      let j=0
      do {
        if(new Date(franck[j].from).getDate() == datesToTest[0]) {
          j1.push(franck[j])
        } else if (new Date(franck[j].from).getDate() > datesToTest[0]) {
          j2.push(franck[j])
        }
        
        j++
      } while (j < nbCours)
      
      //console.log('j1 : ', j1)
      //console.log('j2 : ', j2)

      //set-up des compteurs
      var compteurA = 0;
      var compteurB = 0;
      var compteurC = 0;
      var compteurD = 0;
      // recuperation et remplacement des noms des cours
      var cours = []; // cet Array va contenir les nouveaux noms
      var salles = []; // cet Array va contenir les nouvelles salles
      let DATA = []; // cet Array va contenir le dictionnaire final pour le jour meme
      let DATA1 = []; // cet Array va contenir le dictionnaire final pour le jour suivant
      
      let fromH = []
      let fromM = []
      let toH = []
      let toM = []

      do {
        
        var f = new Date(j1[compteurA].from);
        var t = new Date(j1[compteurA].to)

        


        //switchNames(franck[compteurA].subject, cours); // on appelle la fonction qui va remplacer les noms
        switchNames(j1[compteurA].subject, cours)
        switchRooms(j1[compteurA].room, salles)
        prettierNums(f.getUTCHours(), fromH)
        prettierNums(f.getUTCMinutes(), fromM)
        prettierNums(t.getUTCHours(), toH)
        prettierNums(t.getUTCMinutes(), toM)
        //console.log(j1[compteurA].subject)
        compteurA++; // on incremente le compteur
      } while (compteurA < j1.length);
      
      do {
        //switchNames(franck[compteurA].subject, cours); // on appelle la fonction qui va remplacer les noms
        switchNames(j2[compteurD].subject, cours)
        switchRooms(j2[compteurD].room, salles)
        //console.log(j1[compteurD].subject)
        compteurD++; // on incremente le compteur
      } while (compteurD < j2.length);
      
      // console.log(j1.length)
      //console.log(cours)
      // on met tout dans un dictionnaire pour pouvoir tout afficher
      let endM = []
      let endH = []

      do {
        var x = new Date(j1[compteurB].from);
        var z = new Date(j1[compteurB].to)
        
        prettierNums(y, endM)
        prettierNums(o, endH)

        if((z - x) == 7200000) {
          let y = new Date(x.getTime() + 110 * 60000).getUTCMinutes()
          let o =  new Date(x.getTime() + 110 * 60000).getUTCHours()
        } else if ((z-x) == 3600000) {
          let y = new Date(x.getTime() + 55 * 60000).getUTCMinutes()
          let o =  new Date(x.getTime() + 55 * 60000).getUTCHours()
        }


        // if (salle != null) {
        //   salle = salle
        // } else if (salle == null) {
        //   salle = "dehors :)"
        // }
        let dico1h = {
          subject: cours[compteurB],
          room: salles[compteurB], //remplacer par salles[compteurB] quand la fonction sera faite
          fromHour: fromH[compteurB],
          fromMin: fromM[compteurB],
          toHour: toH[compteurB],
          toMin: toM[compteurB],
          endM: endM[compteurB],
          endH: endH[compteurB]
        };
        let dico2h = {
          subject: cours[compteurB],
          room: salles[compteurB], //remplacer par salles[compteurB] quand la fonction sera faite
          fromHour: fromH[compteurB],
          fromMin: fromM[compteurB],
          toHour: toH[compteurB],
          toMin: toM[compteurB],
          endM: new Date(x.getTime() + 110 * 60000).getUTCMinutes(),
          endH: new Date(x.getTime() + 110 * 60000).getUTCHours()
        };

        if((z - x) == 7200000) {
          DATA.push(dico2h)
        } else if ((z-x) == 3600000) {
          DATA.push(dico1h)
        }
        
        compteurB++;
      } while (compteurB < j1.length );

      

      //pour pouvoir switch:
      
      
      
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
                  <Text style={defaultCSS.headerRoom}>  {salles[0]}</Text>
                </Text>
                
              </View>
              <Text style={defaultCSS.headerTime}>{timeDifference(Date.now() + 3600000, Date.parse(this.state.franck[0].from))} </Text>
              
              
            </View>
            {/* emploi du temps complet de la journée */}
            <View style={defaultCSS.body}>
              
              {/* titre */}
            {/* <Hook render={({selectedItem, setSelectedItem}) => {
              return (
                <EdtDropDown 
                value={selectedItem}
                data={data}
                onSelect={onSelect}
              />
              )
            }} /> */}
            
            {/*<TouchableOpacity style={defaultCSS.bodyTitleContainer}
                              onPress={() => n = DATA1}
            >
              <Text style={defaultCSS.bodyTitle}>Aujourd'hui :</Text>
            </TouchableOpacity>*/}
              <View style={defaultCSS.bodyTitleContainer}>
                <Text style={defaultCSS.bodyTitle}>Aujourd'hui :</Text>
              </View>
              
              {/* liste des prochains cours */}
              <View style={defaultCSS.bodyList}>
                <FlashList
                  data={DATA}
                  renderItem={({ item }) => (<View >
                                                    <Text >  </Text>
                                                    <Text >   </Text>
                                                    <Text style={defaultCSS.bodySubject}>{item.subject}, </Text>
                                                    <Text style={defaultCSS.bodyRoom}>{item.room}</Text>
                                                    <Text style={defaultCSS.bodyTime}>{item.fromHour} : {item.fromMin}</Text>
                                                    <Text style={defaultCSS.bodyTime}>{item.endH} : {item.endM}</Text>
                                                    
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

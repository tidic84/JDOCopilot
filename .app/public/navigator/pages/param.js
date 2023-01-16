// import modules
import React from "react";
import {
  Alert,
  View,
  Text,
} from "react-native";
import { defaultCSS } from "../../stylesheets/_default/param";
import { DEFAULT } from "../../themes/variables.js";
import { FlashList } from '@shopify/flash-list';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as NavigationBar from 'expo-navigation-bar';
import * as Linking from 'expo-linking'

export default class Param extends React.Component {
  // on vide le sac de franck
   constructor(props) {
     super(props);
  this.state = {
    franck: "",
    
  };


}




  render() {

    
    //this.threeOptionAlertHandler()
    
    //this.goOn(); <= ici ça marche
    const randomClosePopupsText = [
      'Ok.',
      'Super !',
      'Chouette',
      'Cool !',
      'Génial !',
      'Parfait !',
      'Sympa !',
      'Bien reçu !',
    ]

    function actionOnRow(item) {
      //console.log('Selected Item :', item);
        if (item.id == 5) {
            Alert.alert(
                //title
                ' ',
                //body
                item.infos,
                [
                  { text: randomClosePopupsText[Math.floor(Math.random() * (9 - 1 +1)) + 1] },
                ],
                { cancelable: true }
              );
        } else if(item.id == 6) {
          Alert.alert(
            //title
            ' ',
            //body
            item.infos,
            [
              { text: 'Faire une suggestion', onPress: () => Linking.openURL('https://github.com/tidic84/JDOCopilot/issues') },
              { text: 'Signaler un bug', onPress: () => Linking.openURL('https://github.com/tidic84/JDOCopilot/issues') },
              { text: 'Notre Mail', onPress: () => Linking.openURL('mailto://contact.albatrossteam@gmail.com') },
            ],
            { cancelable: true }
          );
        } else if(item.id == 4) {
          Linking.openURL('https://github.com/tidic84/JDOCopilot/blob/main/CGUs.md')
         } else if(item.maintenance == true) {
          Alert.alert(
            //title
            ' ',
            //body
            "Cette fonctionnalité est en cours de développement, elle sera disponible prochainement !",
            [
              { text: randomClosePopupsText[Math.floor(Math.random() * (9 - 1 +1)) + 1] },
            ],
            { cancelable: true }
          );
        }
    }

    NavigationBar.setBackgroundColorAsync(DEFAULT.secondary);
    NavigationBar.setButtonStyleAsync("light");
           

        let DATA = [
            {
                id: 1,
                title: "Re-télécharger les données",
                accent: ' ',
                infos: 'Sûr ?',
                maintenance: true,
            },
            {
                id: 2,
                title: "Thème",
                accent: ' ',
                infos: ' ',
                maintenance: true,
            },
            {
                id: 3,
                title: "Changer de Compte (Déconnexion)",
                accent: ' ',
                infos: ' ',
                maintenance: true,
            },
            {
                id: 4,
                title: "CGUs",
                accent: ' ',
                infos: ' ',
                maintenance: false,
            },
            {
              id: 6,
              title: "Nous contacter",
              accent: " ",
              infos: "Nous faisons cette application dans le but d'aider de façon bénévole : restez cordial svp ;)",
              maintenance: false,
            },
            {
                id: 5,
                title: "Made with Love by ",
                accent: "Albatross!!",
                infos: 'Front-End : Claire, Olivier\nBack-End : Cedric, Thomas\n@Albatross, NSI cross-team',
                maintenance: false,
            },
            
        ]


      return (
        <>
        
          <View style={defaultCSS.container}>
            <View style={defaultCSS.body}>
              
              
              <View style={defaultCSS.bodyTitleContainer}>
                <Text style={defaultCSS.bodyTitle}>Paramètres et infos utiles :</Text>
              </View>
              
              {/* liste des prochains cours */}
              <View style={defaultCSS.bodyList}>
                <FlashList
                  data={DATA}
                  renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => actionOnRow(item)}> 
                                                    <Text></Text>
                                                    <Text></Text>
                                                    <Text style={defaultCSS.bodySubject}>{item.title} <Text style={defaultCSS.bodyRoom}>{item.accent}</Text> </Text>
                                                    <Text></Text>
                                                    <Text></Text>
                                            </TouchableOpacity>)}
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




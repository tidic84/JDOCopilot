// import modules
import * as React from 'react';
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    SafeAreaView
} from "react-native";
import {defaultCSS} from "../../stylesheets/_default/home.js"
import {timeDifference, duration} from "../../util/relativeDaysWidget";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Ionicons} from "@expo/vector-icons";
import * as Progress from 'react-native-progress';
import {cours} from "../../components/cours"
import Refresh from '../../components/refresh.js';
import {DEFAULT} from '../../themes/variables.js';
import {Button} from 'react-native-web';
import {FlashList} from "@shopify/flash-list";
import switchNames from '../../../private/subject.js'
import switchRooms from '../../../private/rooms'


export default class Edt extends React.Component { // on vide le sac de franck
    state = {
        franck: ""
    }

    // on lui demande de recupérer les données de l'utilisateur
    getFranck = async () => {
        const franck = Object(JSON.parse(await AsyncStorage.getItem("franck"))) // get the timetable from the storage
        this.setState({franck: franck.timetable})
    }

    render() {
        this.getFranck()
        if (this.state.franck != "") { // recuperation du nombre de cours
            const franck = this.state.franck;
            const nbCours = franck.length;
            // console.log(nbCours, 'cours');
            // recuperation et remplacement des noms des cours
            var p = 0;
            // console.log('test 1')
            var coursName = [];
            // console.log('test 2')
            do {
                switchNames(franck[p].subject, coursName);
                p++;
            } while (p < nbCours);
            // on verif ce qu'on a recup
            // console.log("Anciens noms", franck);
            // console.log("Nouveaux noms", coursName);


            // pareil avec les salles
            var p = 0;
            var salles = []
            do {
                switchRooms(franck[p].room, salles);
                p++;
            } while (p < nbCours);


            let DATA = []

            let i = 0
            do {
                let data = {
                    'subject': cours[i],
                    'room': salles[i]
                }
                DATA.push(data)
                i++
            } while (i < nbCours)


            return (<>
                <View style={
                    defaultCSS.container
                }> {/* prochain cour */}
                    <View style={
                        defaultCSS.header
                    }> {/* recatangle orange sur la gauche */}
                        <View style={
                            defaultCSS.fancyLeft
                        }></View>
                        {/* icone */}
                        <Ionicons name="md-calendar"
                            size={24}
                            color="white"
                            style={
                                defaultCSS.headerIcon
                            }/> {/* titre, cour, salle, time left */}
                        <Text style={
                            defaultCSS.headerTitle
                        }>Prochain cours</Text>
                        <Text style={
                            defaultCSS.headerSubject
                        }>tqt</Text>
                        <Text style={
                            defaultCSS.headerRoom
                        }>tqt</Text>
                        <Text style={
                            defaultCSS.headerTime
                        }> {
                            timeDifference(Date.now() + 3600000, Date.parse(this.state.franck[0].from))
                        } </Text>
                    </View>

                    {/* emploi du temps complet de la journée */}
                    <View style={
                        defaultCSS.body
                    }> {/* titre */}
                        <Text style={
                            defaultCSS.bodyTitle
                        }>Emploi du Temps</Text>
                        {/* liste des prochains cours */}
                        <View style={
                            defaultCSS.bodyList
                        }>
                            <FlashList data={DATA}
                                renderItem={
                                    ({item}) => (<Text style={
                                        defaultCSS.bodySubject
                                    }> {
                                        item.subject
                                    }
                                        {
                                        item.room
                                    } </Text>)
                                }
                                estimatedItemSize={200}
                                ItemSeparatorComponent={
                                    () => (<View style={
                                        defaultCSS.separatorComponent
                                    }/>)
                                }
                                containerComponentStyle={
                                    defaultCSS.bodyList
                                }/>
                        </View>
            </View>
        </View>
    </>);
        } else if (this.state.franck != "") {
            return (<SafeAreaView style={
                defaultCSS.container
            }>
                <Text style={
                    defaultCSS.waitText
                }>On va chercher tes données, attends nous un instant !</Text>
                <ActivityIndicator size="large"
                    color={
                        DEFAULT.accent
                    }
                    style={
                        defaultCSS.wait
                    }/>
            </SafeAreaView>);
        }
    }
}

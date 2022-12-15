//import modules
import * as React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function cours() {
    //on vide le sac de franck
    state = {
        franck: ""
    }

    //on lui demande de recupérer les données de l'utilisateur
    getFranck = async () => {
        const franck = Object(JSON.parse(await AsyncStorage.getItem("franck"))) // get the timetable from the storage
        this.setState({ franck: franck.timetable })
    }

    this.getFranck()
    if (this.state.franck != "") {
        let cours = this.state.franck[0].subject
        let salle = this.state.franck[0].room

        //on remplace les noms des cours pour l'esthetique
        if (cours == "NUMERIQUE SC.INFORM.") {
            cours = "N. S. I. "
        }
        return (
            cours
        );
    }
}

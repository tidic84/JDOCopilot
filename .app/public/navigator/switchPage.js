import React from "react";

class reloadData {
    goOn = () => {
        // Définition de la fonction errorMessage qui renvoie un message d'erreur sur android ou sur iOS
  errorMessage = (err) => {
    if (Platform.OS === 'android') { // Si l'OS est android
      ToastAndroid.show(err, ToastAndroid.SHORT) // Affiche un message d'erreur sur android
    } else if (Platform.OS === "ios") { // Sinon si l'OS est iOS
      AlertIOS.alert(err); // Affiche une alerte sur iOS
    } else {
      alert(err); // Sinon affiche une alerte
    }
  }

  state = {
    keptName: "",
    keptPassword: "",
    disabledButton: false
  }

  
  //verification des données
  saidLetGo = async () => {
    

    this.errorMessage("C'est parti !") 
    
    this.props.navigation.navigate("LoginWithoutFastCo"); // On navigue vers la page principale
       
    
  } 
    }
  }


const reloadD = new reloadData();
export default reloadD;
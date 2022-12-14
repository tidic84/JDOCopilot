function switchNames(from, to) {
  //console.log('switchName called')
  if (from == "SALLE EPS") {
    to.push(" ");
  } else if (from == "S103 INFORMATIQUE") {
    to.push("S103");
  }  else if (from == "S115 INFORMATIQUE") {
    to.push("S115");
  }  else if (from == "S101 ARTS PLASTIQUES") {
    to.push("S101");
  }  else if (from == "S001 SALLE DE DEVOIR") {
    to.push("S001");
  }  else if (from == "") {
    to.push("");
  }  else if (from == "") {
    to.push("");
  }  else if (from == "") {
    to.push("");
  }  else if (from == "") {
    to.push("");
  }  else if (from == "") {
    to.push("");
  }  else if (from == "") {
    to.push("");
  } 
}

export default switchRooms;
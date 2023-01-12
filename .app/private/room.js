function switchRooms(from, to) {
    //console.log('switchName called')
    if (from == "S103 INFORMATIQUE") {
      to.push("S103");
    } else if (from == "S101 ARTS PLASTIQUES") {
      to.push("S101");
    } else {
      to.push(from);
    }
  }
  
  export default switchRooms;
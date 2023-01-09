function switchNames(from, to) {
  //console.log('switchName called')
  if (from == "NUMERIQUE SC.INFORM.") {
    to.push("N.S.I. ");
  } else if (from == "ARTS-PLASTIQUES OPTIONS") {
    to.push("Arts-Plastiques (O)");
  } else if (from == "MATHS") {
    to.push("Maths");
  } else if (from == "PHYSIQUE-CHIMIE") {
    to.push("Physique-Chimie");
  } else if (from == "HISTOIRE-GEOGRAPHIE") {
    to.push("Histoire-Géographie");
  } else if (from == "ED.PHYSIQUE & SPORT.") {
    to.push("E.P.S.");
  } else if (from == "ITALIEN LV2") {
    to.push("Italien");
  } else if (from == "ANGLAIS LV1") {
    to.push("Anglais");
  } else if (from == "ESPAGNOL LV2") {
    to.push("Espagnol");
  } else if (from == "ALLEMAND LV2") {
    to.push("Allemand");
  } else if (from == "ENSEIGNEMENT SCIENTIFIQUE") {
    to.push("E.S.");
  } else if (from == "AP FRANCAIS") {
    to.push("Français");
  } else if (from == "ENS. MORAL & CIVIQUE") {
    to.push("E.M.C.");
  } else if (from == "ARTS PLASTIQUES") {
    to.push("Arts-Plastiques (s)");
  } else if (from == "LITT. ANGLAIS") {
    to.push("L.L.C.E.");
  } else if (from == "LLC ANGL.MOND.CONT.") {
    to.push("A.M.C.");
  } else if (from == "HIST.GEO.GEOPOL.S.P") {
    to.push("H.G.G.S.P.");
  } else if (from == "MATHEMATIQUES") {
    to.push("Maths")
  } else if (from == "DNL CHIMIE ANGLAIS") {
    to.push("Euro Anglais")
  } else if (from == "JAPONAIS LV3"){
    to.push("Japonais")
  } else if (from == 'REPAS DE NOEL') {
    to.push("repas de noël")
  } else if (from == 'AP FRANCAIS') {
    to.push("Français (ap)")
  } 
}

export default switchNames;
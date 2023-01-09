function prettierNums(from, to) {

    if (parseInt(from) <= 9) {
      //console.log(from + " --> " + `0${String(from)}`)
      to.push(`0${String(from)}`);
    }
    else {
      to.push(String(from));
    }
  }
  
  export default prettierNums;
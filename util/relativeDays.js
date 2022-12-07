export function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed > 0){
        if (elapsed < msPerMinute) {
            return Math.floor(elapsed/1000) + ' seconds ago';   
       }
   
       else if (elapsed < msPerHour) {
            return Math.floor(elapsed/msPerMinute) + ' minutes ago';   
       }
   
       else if (elapsed < msPerDay ) {
            return Math.floor(elapsed/msPerHour ) + ' hours ago';   
       }
   
       else if (elapsed < msPerMonth) {
           return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
       }
   
       else if (elapsed < msPerYear) {
           return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
       }
   
       else {
           return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
       }
    }
    if (elapsed < 0){
        const timeleft = -elapsed;
        const timeleft_h = Math.floor(timeleft/msPerHour)
        const timeleft_m = Math.floor(timeleft/msPerMinute)
        const timeleft_s = Math.floor(timeleft/1000)
        //console.log(timeleft)
        if (timeleft < msPerMinute) {
            return 'In ' + timeleft_s + ' seconds';   
       }
   
       else if (timeleft < msPerHour) {
            return 'In ' + timeleft_m + ' minutes';   
       }
   
       else if (timeleft < msPerDay ) {
            return 'In ' + timeleft_h + ' hours, ' + (timeleft_m-timeleft_h*60) + ' minutes, ' + ((timeleft_s - timeleft_m*60)) + ' seconds';   
       }
   
       else if (timeleft < msPerMonth) {
           return 'approximately in ' + Math.round(timeleft/msPerDay) + ' days';   
       }
   
       else if (timeleft < msPerYear) {
           return 'approximately in' + Math.round(timeleft/msPerMonth) + ' months';   
       }
   
       else {
           return 'approximately in' + Math.round(timeleft/msPerYear ) + ' years';   
       }
    }
    else {
        return "Now"
    }
    
}
export function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed > 0) {
        if (elapsed < msPerMinute) {
        return 'Il y a ' + Math.floor(elapsed / 1000) + ' secondes';
        }

        else if (elapsed < msPerHour) {
            if (Math.floor(elapsed / msPerMinute) == 1) return 'Il y a ' + Math.floor(elapsed / msPerMinute) + ' minute';
            return 'Il y a ' + Math.floor(elapsed / msPerMinute) + ' minutes';
        }

        else if (elapsed < msPerDay) {
            if ( Math.floor(elapsed / msPerHour) == 1 ) return 'Il y a ' + Math.floor(elapsed / msPerHour) + ' heure';
            return 'Il y a ' + Math.floor(elapsed / msPerHour) + ' heures';
        }

        else if (elapsed < msPerMonth) {
            if (Math.round(elapsed / msPerDay) == 1) return 'Il y a ' + Math.floor(elapsed / msPerDay) + ' jour, ' + Math.floor(elapsed / msPerHour) + ' heures';
            return 'Il y a ' + Math.floor(elapsed / msPerDay) + ' jours,' + Math.floor(elapsed / msPerHour) + ' heures';
        }

        else if (elapsed < msPerYear) {
            return 'Il y a ' + Math.floor(elapsed / msPerMonth) + ' mois';
        }

        else {
            return 'Il y a ' + Math.round(elapsed / msPerYear) + ' années';
        }
    }
    if (elapsed < 0) {
        const timeleft = -elapsed;
        const timeleft_h = Math.floor(timeleft / msPerHour)
        const timeleft_m = Math.floor(timeleft / msPerMinute)
        const timeleft_s = Math.floor(timeleft / 1000)
        //console.log(timeleft)
        if (timeleft < msPerMinute) {
            return 'Dans ' + timeleft_s + ' seconds'  + ((timeleft - timeleft_s * 1000)) + ' ms';
        }

        else if (timeleft < msPerHour) {
            return 'Dans ' + timeleft_m + ' minutes, ' + ((timeleft_s - timeleft_m * 60)) + ' seconds ';
        }

        else if (timeleft < msPerDay) {
            return 'Dans ' + timeleft_h + ' hours, ' + (timeleft_m - timeleft_h * 60) + ' minutes';
        }

        else if (timeleft < msPerMonth) {
            console.log(timeleft / msPerDay)
            if (Math.floor(timeleft / msPerDay) == 1 ) return 'Dans ' + Math.floor(timeleft / msPerDay) + ' jour, ' + Math.floor((timeleft_h - (timeleft / msPerDay))) + ' hours';
            return 'Dans ' + Math.floor(timeleft / msPerDay) + ' jours, ' + Math.floor((timeleft_h - (timeleft / msPerDay))) + ' hours, ';
        }

        else if (timeleft < msPerYear) {
            return 'Dans ' + Math.floor(timeleft / msPerMonth) + ' mois';
        }

        else {
            return 'Dans ' + Math.round(timeleft / msPerYear) + ' années';
        }
    }
    else {
        return "trop tard"
    }

}

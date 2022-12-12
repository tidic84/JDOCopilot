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
        return 'Il y a ' + Math.floor(elapsed / msPerMinute) + ' minutes';
        }

        else if (elapsed < msPerDay) {
        return 'Il y a ' + Math.floor(elapsed / msPerHour) + ' heures';
        }

        else if (elapsed < msPerMonth) {
        return 'Il y a ' + Math.round(elapsed / msPerDay) + ' jours';
        }

        else if (elapsed < msPerYear) {
        return 'Il y a ' + Math.round(elapsed / msPerMonth) + ' mois';
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
        return 'Dans ' + timeleft_s + ' secondes, bouge toi';
        }

        else if (timeleft < msPerHour) {
        return 'Dans ' + timeleft_m + 'min \net ' + ((timeleft_s - timeleft_m * 60)) + 's ';
        }

        else if (timeleft < msPerDay) {
        return 'Dans ' + timeleft_h + 'h \net ' + (timeleft_m - timeleft_h * 60) + 'min';
        }

        else if (timeleft < msPerMonth) {
        return 'Dans ' + Math.round(timeleft / msPerDay) + ' jour(s)';
        }

        else if (timeleft < msPerYear) {
        return 'Dans ' + Math.round(timeleft / msPerMonth) + ' mois';
        }

        else {
        return 'Dans ' + Math.round(timeleft / msPerYear) + ' an(s)';
        }
    }
    else {
        return "MAINTENANT"
    }

}

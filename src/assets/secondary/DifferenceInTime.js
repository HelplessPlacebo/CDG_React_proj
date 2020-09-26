export const DifferenceInTime = (TimesArr = []) => {
    let firstDate = TimesArr[0];
    let secondDate = TimesArr[1];
    let getDate = (string) => new Date(0, 0, 0, string.split(':')[0], string.split(':')[1]);
    let different = (getDate(secondDate) - getDate(firstDate));
    let differentRes, hours, minuts;
    if (different > 0) {
        differentRes = different;
        hours = Math.floor((differentRes % 86400000) / 3600000);
        minuts = Math.round(((differentRes % 86400000) % 3600000) / 60000);
    } else {
        differentRes = Math.abs((getDate(firstDate) - getDate(secondDate)));
        hours = Math.floor(24 - (differentRes % 86400000) / 3600000);
        minuts = Math.round(60 - ((differentRes % 86400000) % 3600000) / 60000);
    }
    if(minuts < 10 ){
        minuts =  minuts + "0"
    }
    if (hours < 10) {
        return "0" + hours + ':' + minuts + ":00";
    } else {
        return hours + ':' + minuts + ":00";
    }
}

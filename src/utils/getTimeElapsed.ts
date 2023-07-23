import moment from "moment";

export const getTimeElapsed = (timestamp: string): string => {
    const startDate = moment(parseInt(timestamp) * 1000);
    const endDate = moment();
    const duration = moment.duration(endDate.diff(startDate));
    const years = duration.years();
    const months = duration.months();
    const days = duration.days();
    let result = "";
    if(days > 0) {
        result = `${days} day(s) ago.`;
    } 
    if(months > 0) {
        result = `${months} month(s) ago.`;
    } 
    if(years > 0) {
        result = `${years} year(s) ago.`;
    } 
    if(result == "") {
        result = "today.";
    }
    result = "Steam created " + result;
    return result;
}
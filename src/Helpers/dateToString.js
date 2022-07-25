function addNull(datePart, isIncrement = false){
    datePart = isIncrement? ++datePart: datePart;
    let strMonth = datePart.toString();

    if (datePart / 10 < 1)
        return "0" + strMonth;
    else
        return strMonth;
}

const dateToDateString = (date) => {
    return [addNull(date.getDate()), addNull(date.getMonth(), true), addNull(date.getFullYear())].join(".")
}
const timeToTimeString = (date) =>{
    return [addNull(date.getHours()), addNull(date.getMinutes()), addNull(date.getSeconds())].join(":")
}

const dateToString = (date) =>{
    if (date === undefined || date === "") return "";

    const objDate = new Date(date);
    return [dateToDateString(objDate), timeToTimeString(objDate)]
}


export default dateToString;
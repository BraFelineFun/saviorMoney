interface DateTimeStrings {
    date: string;
    time: string;
}

function addNull(datePart: number, isIncrement: boolean = false): string {
    datePart = isIncrement ? ++datePart : datePart;
    let strMonth = datePart.toString();

    if (datePart / 10 < 1)
        return "0" + strMonth;
    else
        return strMonth;
}

const dateToDateString = (date: Date) : string => {
    return [addNull(date.getDate()), addNull(date.getMonth(), true), addNull(date.getFullYear())].join(".")
}
const timeToTimeString = (date: Date) : string => {
    return [addNull(date.getHours()), addNull(date.getMinutes()), addNull(date.getSeconds())].join(":")
}

const dateToString = (date) : DateTimeStrings => {
    if (date === undefined || date === "") return {date: '', time: ''};

    const objDate = new Date(date);
    return {
        date: dateToDateString(objDate),
        time: timeToTimeString(objDate)
    }
}


export default dateToString;
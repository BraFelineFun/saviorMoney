export default function stringToDate (stringDate: string): Date {
    const newDate = new Date(stringDate);
    if (newDate.toString() !== "Invalid Date" && !isNaN(newDate.valueOf())){
        return newDate;
    }
    else {
        throw new Error('Not Valid Date');
    }
}
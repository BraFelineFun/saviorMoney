function cashNumberToString (cash){
    if (cash === undefined || cash === "") return "";
    return cash.toFixed(2).toString().replace(".", ",");
}
export default cashNumberToString;
function cashNumberToString(cash: number): string {

    return cash.toFixed(2)
        .toString()
        .replace(".", ",");
}

export default cashNumberToString;
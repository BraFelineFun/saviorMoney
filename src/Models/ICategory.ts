import IExpense from "./IExpense";

// category is a name, type of string, it's unique
interface ICategory {
    name: string,
    summaryMoney: number,
    color: string,
    expenses: IExpense[]
}

export default ICategory;
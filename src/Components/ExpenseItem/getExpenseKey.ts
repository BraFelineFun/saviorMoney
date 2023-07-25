import IExpense from "../../Models/IExpense";

const getExpenseKey = (expense: IExpense): number => +(new Date(expense.date));
export default getExpenseKey;
import IExpense from "./IExpense";

export interface IExpenseWithCategory extends IExpense{
    category: string;
    color?: string;
}
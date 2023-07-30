import IExpense from "./IExpense";

export interface IExpenseWithCategory extends IExpense{
    categoryName: string;
    color?: string;
}
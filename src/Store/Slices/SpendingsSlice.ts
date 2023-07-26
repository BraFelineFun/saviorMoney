import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import ICategory from "../../Models/ICategory";
import getExpenseKey from "../../Components/ExpenseItem/getExpenseKey";
import {IExpenseWithCategory} from "../../Models/IExpenseWithCategory";

const initialState :ICategory[] = [
    {
        category: "products",
        summaryMoney: 30,
        color: "#ff3c3c",
        expenses:[
            {description: "dsfs", money: 10, date: new Date(2008, 0, 1, 0, 0, 35).toString()},
            {description: "fdsa", money: 20, date: new Date(2011, 0, 1, 0, 3, 0).toString()}
        ]
    },
    {
        category: "movies",
        summaryMoney: 30,
        color: "#3cd2ff",
        expenses:[
            {description: "dsfs", money: 10, date: new Date(2011, 0, 1, 0, 23, 0).toString()},
            {description: "fdsa", money: 20, date: new Date(2015, 5, 1, 0, 0, 0).toString()}
        ]
    },
    {
        category: "fastFood",
        summaryMoney: 30,
        color: "#ff3cbb",
        expenses:[
            {description: "dsfs", money: 10, date: new Date(2012, 0, 1, 0, 5, 0).toString()},
            {description: "fdsa", money: 20, date: new Date(2011, 0, 5, 0, 0, 0).toString()}
        ]
    },
    {
        category: "transport",
        summaryMoney: 30,
        color: "#84ff3c",
        expenses:[
            {description: "dsfs", money: 10, date: new Date(2011, 0, 1, 1, 0, 56).toString()},
            {description: "fdsa", money: 20, date: new Date(2021, 1, 1, 0, 0, 0).toString()}
        ]
    }
]

export const spendingSlice = createSlice({
    name: 'spendings',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<ICategory>) => { // object in payload is expected
            state.push(action.payload)
        },
        addExpense: (state, action: PayloadAction<IExpenseWithCategory>) =>{
            const index = state.findIndex(obj => obj.category === action.payload.category);
            state[index].summaryMoney += action.payload.money;
            state[index].expenses.push({description: action.payload.description,
                money: action.payload.money, date: new Date().toString()})
        },
        removeCategory: (state, action: PayloadAction<{ category: string }>) =>{
            return state.filter((spending) => spending.category !== action.payload.category)
        },
        removeExpanse: (state, action:PayloadAction<{category: string, key: number}>) =>{
            const index = state.findIndex(obj => obj.category === action.payload.category);
            const expensesCopy = state[index].expenses;
            const elementToSubtract = expensesCopy.find((expense) =>
                getExpenseKey(expense) === action.payload.key)
            if (!elementToSubtract) {
                console.error('WARNING, UNEXPECTED BEHAVIOR');
                return;
            }


            const filteredCopy = expensesCopy.filter((expense) =>
                getExpenseKey(expense) !== action.payload.key)

            // Set list without exact expense as a new state
            state[index].expenses = filteredCopy;

            // Subtract amount of expense money from summary money
            state[index].summaryMoney -= elementToSubtract.money;
        },
        editCategory: (state, action: PayloadAction<{oldCategoryName: string, newCategory: ICategory}>) => {
            console.log(action.payload)
            //search element in state by old category's name
            const index = state.findIndex(obj => obj.category === action.payload.oldCategoryName);
            state[index] = action.payload.newCategory;
            return state;
        }
    }

})
export const {addCategory, addExpense, removeCategory, removeExpanse, editCategory} = spendingSlice.actions;
export const spendingReducer = spendingSlice.reducer;
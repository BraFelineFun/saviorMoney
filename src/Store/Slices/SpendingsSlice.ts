import {createSlice} from "@reduxjs/toolkit";

interface IExpense {
    description: string,
    money: number,
    date: string,
}

interface ICategory {
    category: string,
    summaryMoney: number,
    color: string,
    expenses: IExpense[]
}


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
        addCategory: (state, action) => { // object in payload is expected
            state.push(action.payload)
        },
        addExpense: (state, action) =>{
            const index = state.findIndex(obj => obj.category === action.payload.chosenCategory);
            state[index].summaryMoney += action.payload.spentSumNum;
            state[index].expenses.push({description: action.payload.description,
                money: action.payload.spentSumNum, date: new Date().toString()})
        },
        removeCategory: (state, action) =>{
            return state.filter((spending) => spending.category !== action.payload.category)
        },
        removeExpanse: (state, action) =>{
            const index = state.findIndex(obj => obj.category === action.payload.category);
            const expensesCopy = state[index].expenses;
            const elementToSubtract = expensesCopy.find((expense) =>
                +(new Date(expense.date)) === action.payload.key)
            const filteredCopy = expensesCopy.filter((expense) =>
                +(new Date(expense.date)) !== action.payload.key)

            // Set list without exact expense as a new state
            state[index].expenses = filteredCopy;

            // Subtract amount of expense money from summary money
            state[index].summaryMoney -= elementToSubtract.money;
        },
        editCategory: (state, action) => {
            //search element in state by old category's name
            const index = state.findIndex(obj => obj.category === action.payload.oldCategory);
            let elementToChange = state[index];

            //set new category parameters
            elementToChange = {...elementToChange, category: action.payload.category, color: action.payload.color};
            state[index] = elementToChange;
            return state;
        }
    }

})
export const {addCategory, addExpense, removeCategory, removeExpanse, editCategory} = spendingSlice.actions;
export default spendingSlice.reducer;
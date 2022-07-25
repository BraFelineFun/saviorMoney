import {createSlice} from "@reduxjs/toolkit";


const initialState = [
    {
        category: "products",
        summaryMoney: 30,
        color: "#ff3c3c",
        expenses:[
            {description: "dsfs", money: 10, date: new Date(2008, 0, 1, 0, 0, 35).toString()},
            {description: "fdsa", money: 20, date: new Date(2011, 0, 1, 0, 0, 0).toString()}
        ]
    },
    {
        category: "movies",
        summaryMoney: 30,
        color: "#3cd2ff",
        expenses:[
            {description: "dsfs", money: 10, date: new Date(2011, 0, 1, 0, 23, 0).toString()},
            {description: "fdsa", money: 20, date: new Date(2011, 0, 1, 0, 0, 0).toString()}
        ]
    },
    {
        category: "fastFood",
        summaryMoney: 30,
        color: "#ff3cbb",
        expenses:[
            {description: "dsfs", money: 10, date: new Date(2011, 0, 1, 0, 5, 0).toString()},
            {description: "fdsa", money: 20, date: new Date(2011, 0, 5, 0, 0, 0).toString()}
        ]
    },
    {
        category: "transport",
        summaryMoney: 30,
        color: "#84ff3c",
        expenses:[
            {description: "dsfs", money: 10, date: new Date(2011, 0, 1, 1, 0, 0).toString()},
            {description: "fdsa", money: 20, date: new Date(2011, 1, 1, 0, 0, 0).toString()}
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
            state[index].expenses.push({description: action.payload.description, money: action.payload.spentSumNum, date: new Date().toString()})
        }
    }

})
export const {addCategory, addExpense} = spendingSlice.actions;
export default spendingSlice.reducer;
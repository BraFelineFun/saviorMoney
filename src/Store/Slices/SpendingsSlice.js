import {createSlice} from "@reduxjs/toolkit";


const initialState = [
    {
        category: "products",
        summaryMoney: 30,
        color: "#ff3c3c",
        expenses:[
            {description: "dsfs", money: 10},
            {description: "fdsa", money: 20}
        ]
    },
    {
        category: "movies",
        summaryMoney: 30,
        color: "#3cd2ff",
        expenses:[
            {description: "dsfs", money: 10},
            {description: "fdsa", money: 20}
        ]
    },
    {
        category: "fastFood",
        summaryMoney: 30,
        color: "#ff3cbb",
        expenses:[
            {description: "dsfs", money: 10},
            {description: "fdsa", money: 20}
        ]
    },
    {
        category: "transport",
        summaryMoney: 30,
        color: "#84ff3c",
        expenses:[
            {description: "dsfs", money: 10},
            {description: "fdsa", money: 20}
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
            state[index].expenses.push({description: action.payload.description, money: action.payload.spentSumNum})
        }
    }

})
export const {addCategory, addExpense} = spendingSlice.actions;
export default spendingSlice.reducer;
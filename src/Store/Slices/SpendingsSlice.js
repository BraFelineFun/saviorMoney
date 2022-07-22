import {createSlice} from "@reduxjs/toolkit";

const initialState = [
    {
        category: "products",
        money: 100,
        color: "#ff3c3c"
    },
    {
        category: "movies",
        money: 340,
        color: "#3cd2ff"
    },
    {
        category: "fastFood",
        money: 180,
        color: "#ff3cbb"
    },
    {
        category: "transport",
        money: 1000,
        color: "#84ff3c"
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
            state[index].money += Number(action.payload.spentSum);
        }
    }

})
export const {addCategory, addExpense} = spendingSlice.actions;
export default spendingSlice.reducer;
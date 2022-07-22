import { configureStore } from '@reduxjs/toolkit'
import spendingReducer from "./Slices/SpendingsSlice";

export const store = configureStore({
    reducer: {
        spendings: spendingReducer,
    },
})
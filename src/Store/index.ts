import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {spendingReducer} from "./Slices/SpendingsSlice";

const rootReducer = combineReducers({
    spendings: spendingReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}


export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
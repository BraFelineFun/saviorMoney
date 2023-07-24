import { configureStore } from '@reduxjs/toolkit'
import spendingReducer from "./Slices/SpendingsSlice";

export const store = configureStore({
    reducer: {
        spendings: spendingReducer,
    },
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
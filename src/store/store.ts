import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import dataReducer from "./slices/dataSlice";

const store = configureStore({
    reducer: {
        data: dataReducer,
        // more TBD
    },
});

export default store;

// https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types
// Using these types within the rest of the app (instead of default ones) accounts for additional middlewares.
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// https://redux.js.org/usage/usage-with-typescript#type-checking-redux-thunks
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

// https://redux.js.org/usage/usage-with-typescript#define-typed-hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

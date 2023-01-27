import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import dataReducer from "./slices/dataSlice";
import mapLayersReducer from "./slices/mapLayersSlice";
import mapReducer from "./slices/mapSlice";
import userOptionsReducer from "./slices/userOptionsSlice";

const store = configureStore({
    reducer: {
        data: dataReducer,
        mapLayers: mapLayersReducer,
        map: mapReducer,
        userOptions: userOptionsReducer,
    },
});
export default store;

// https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// https://redux.js.org/usage/usage-with-typescript#type-checking-redux-thunks
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

// https://redux.js.org/usage/usage-with-typescript#define-typed-hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

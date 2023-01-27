import { createSlice } from "@reduxjs/toolkit";

type UserOptionsState = {
    [key: string]: unknown;
};

const initialState: UserOptionsState = {};

const userOptionsSlice = createSlice({
    name: "userOptions",
    initialState,
    reducers: {},
});

const userOptionsReducer = userOptionsSlice.reducer;
export default userOptionsReducer;

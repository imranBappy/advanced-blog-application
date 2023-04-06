import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    accessToken: undefined,
    user: undefined,
    isAuthintication:false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoggedIn(state, action) {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.data;
            state.isAuthintication = action.payload.isAuthintication;
        },
        userLoggedOut(state) {
            state.accessToken = undefined;
            state.user = undefined;
        },
    },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
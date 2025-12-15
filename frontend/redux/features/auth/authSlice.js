import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        checkUser: (state, action) => {
            state.user = action.payload;
        },


        deleteUser: (state) => {
            state.user = null;
        }



    }
});

export const { checkUser, deleteUser } = authSlice.actions;
export default authSlice.reducer;
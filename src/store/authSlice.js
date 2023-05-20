import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";



const authSlice = createSlice({
    name:"auth",
    initialState : {isLoggin: false, name:'Heba Gamal'},
    reducers:{
        LogInOut:(state) => {
            state.isLoggin = !state.isLoggin;
        }
    }
}) 

export const {LogInOut} = authSlice.actions
export default authSlice.reducer
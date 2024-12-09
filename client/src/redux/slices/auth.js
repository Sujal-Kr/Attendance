import { createSlice } from "@reduxjs/toolkit";
const initialState={
    user:null,
    isAdmin:false,
    loader:true,
    sheet:1454
}
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        userExists:(state,action)=>{
            state.user = action.payload;
            state.loader=false
        },
        userNotExists:(state)=>{
            state.user = null,
            state.loader=false
        },
        setSheetId:(state,action)=>{
            console.log(action)
            state.sheet = action.payload
        }
    }
})

export const { userExists, userNotExists,setSheetId } = authSlice.actions;
export default authSlice.reducer;
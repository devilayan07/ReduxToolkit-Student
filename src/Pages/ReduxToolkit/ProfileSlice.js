import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Component/Helper/Helper";

export const fetchProfile=createAsyncThunk("/user/dashboard",async()=>{
    const response=await axiosInstance.get("/user/dashboard")
    console.log(response?.data?.data)
    return response?.data?.data
})
const ProfileSlice=createSlice({
    name:"profile",
    initialState:{
        isLoading:false,
        profile:[],
        error:null
    },

    extraReducers:(builder)=>{
        builder.addCase(fetchProfile.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(fetchProfile.fulfilled,(state,action)=>{
            state.isLoading=false
            state.profile=action?.payload
            state.error=null
        })
        builder.addCase(fetchProfile.rejected,(state,action)=>{
            state.isLoading=false
            state.profile=[]
            state.error=action.error?.message
        })
    }
})
export default ProfileSlice.reducer

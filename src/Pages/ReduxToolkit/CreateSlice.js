import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Component/Helper/Helper";
import { toast } from "react-toastify";

export const fetchcreate=createAsyncThunk("/create/product",async(formdata)=>{
    const response=await axiosInstance.post("/create/product",formdata)
    return response?.data
})
const CreateSlice=createSlice({
    name:"create",
    initialState:{
        status:"idle"
    },

    extraReducers:(builder)=>{
        builder.addCase(fetchcreate.pending,(state)=>{
            state.status="loading"
        })
        builder.addCase(fetchcreate.fulfilled,(state,action)=>{
            state.status="idle"
            if(action.payload?.status===true){
                toast.success(action.payload?.message)
            }
        })
        builder.addCase(fetchcreate.rejected,(state)=>{
            state.status="idle"
        })


    }
})

export default CreateSlice.reducer
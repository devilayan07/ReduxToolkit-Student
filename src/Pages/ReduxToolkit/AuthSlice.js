import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Component/Helper/Helper";
import { toast } from "react-toastify";


export const fetchregister=createAsyncThunk("/register",async(formdata)=>{
    const response=await axiosInstance.post("/register",formdata)
    return response?.data
})

export const fetchlogin=createAsyncThunk("/login",async(data)=>{
    const response=await axiosInstance.post("/login",data)
    return response?.data
})

export const fetchforgot=createAsyncThunk("/forget-password",async(data1)=>{
    const response=await axiosInstance.post("/forget-password",data1)
    return response?.data
})

export const fetchupdatepass=createAsyncThunk("/update-password",async(data1)=>{
    const response=await axiosInstance.post("/update-password",data1)
    return response?.data
})

const AuthSlice=createSlice({
    name:"registration",
    initialState:{
      status:"idle",
      isloggedIn:false,
      redirectTo:null  
    },
    reducers:{
        reset_redirectTo:(state,{payload})=>{
          state.redirectTo=payload
        },

     handleLoggedout:(state)=>{
        localStorage.removeItem("token")
        localStorage.removeItem("user_id")
        state.isloggedIn=false
        toast("Logout successfull")
     },
     check_token:(state)=>{
        let token=localStorage.getItem("token")
        if(token!==null && token!==undefined){
            state.isloggedIn=true
        }
     }
    },

    extraReducers:(builder)=>{
        builder.addCase(fetchregister.pending,(state)=>{
            state.status="loading"
        })
        builder.addCase(fetchregister.fulfilled,(state,action)=>{
            state.status="idle"
            if(action.payload?.status===true){
                toast.success(action.payload?.message)
            }
        })
        builder.addCase(fetchregister.rejected,(state)=>{
            state.status="idle"
        })

        builder.addCase(fetchlogin.pending,(state)=>{
            state.status="loading"
        })
        builder.addCase(fetchlogin.fulfilled,(state,action)=>{
            state.status="idle"
            if(action.payload?.status===true){
                state.redirectTo="/"
                toast.success(action.payload?.message)
                localStorage.setItem("token",action.payload?.token)
                localStorage.setItem("user_id",action.payload?.user?._id)
                state.isloggedIn=true
            }
        })
        builder.addCase(fetchlogin.rejected,(state)=>{
            state.status="idle"
        })
        builder.addCase(fetchforgot.pending,(state)=>{
            state.status="loading"
        })
        builder.addCase(fetchforgot.fulfilled,(state,action)=>{
            state.status="idle"
            if(action.payload?.status===true){
                toast.success(action.payload?.message)
            }
        })
        builder.addCase(fetchforgot.rejected,(state)=>{
            state.status="idle"
        })
        builder.addCase(fetchupdatepass.pending,(state,action)=>{
            state.status="idle"
            if(action.payload?.success===true){
                toast.success(action.payload?.msg)
            }
        })
        builder.addCase(fetchupdatepass.rejected,(state)=>{
            state.status="idle"
        })



    }
})
 export const {handleLoggedout,check_token,reset_redirectTo}=AuthSlice.actions
export default AuthSlice.reducer
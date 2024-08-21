import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Component/Helper/Helper"
import { toast } from "react-toastify"


export const fetchproduct=createAsyncThunk("/product",async()=>{
    const response=await axiosInstance.get("/product")
    console.log(response?.data)
    return response?.data
})

export const fetchdetail=createAsyncThunk("edit/product",async(id)=>{
    const response=await axiosInstance.get(`/edit/product/${id}`)
    console.log(response.data?.data)
    return response?.data?.data
})

export const fetchupdate=createAsyncThunk("/update/product",async({id,formdata})=>{
    const response=await axiosInstance.post(`/update/product/${id}`,formdata)
    return response?.data
})

export const fetchdelete=createAsyncThunk("/delete/product",async(id)=>{
    const response=await axiosInstance.delete(`/delete/product/${id}`)
    return response?.data
})
const ProductSlice=createSlice({
    name:"product",
    initialState:{
        isLoading:false,
        product:[],
        detail:[],
        error:null,
        status:"idle"
    },
    
    extraReducers:(builder)=>{
        builder.addCase(fetchproduct.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(fetchproduct.fulfilled,(state,action)=>{
            state.isLoading=false
            state.product=action?.payload
            state.error=null
        })
        builder.addCase(fetchproduct.rejected,(state,action)=>{
            state.isLoading=false
            state.product=[]
            state.error=action.error?.message
        })
        builder.addCase(fetchdetail.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(fetchdetail.fulfilled,(state,action)=>{
            state.isLoading=false
            state.detail=action?.payload
            state.error=null
        })
        builder.addCase(fetchdetail.rejected,(state,action)=>{
            state.isLoading=false
            state.detail=[]
            state.error=action.error?.message

        })
        builder.addCase(fetchupdate.pending,(state)=>{
         state.status="loading"
        })
        builder.addCase(fetchupdate.fulfilled,(state,action)=>{
            state.status="idle"
            if(action.payload?.status===true){
                toast.success(action.payload?.message)
            }
        })
        builder.addCase(fetchupdate.rejected,(state)=>{
            state.status="idle"
        })
        builder.addCase(fetchdelete.pending,(state)=>{
            state.status="loading"
        })
        builder.addCase(fetchdelete.fulfilled,(state,action)=>{
            state.status="idle"
            if(action.payload?.status===true){
                toast.success(action.payload?.message)
            }
        })
        builder.addCase(fetchdelete.rejected,(state)=>{
            state.status="idle"
        })


    }
})

export default ProductSlice.reducer
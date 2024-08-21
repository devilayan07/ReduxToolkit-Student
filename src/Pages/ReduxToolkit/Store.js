import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import CreateSlice from "./CreateSlice";
import ProductSlice from "./ProductSlice";
import ProfileSlice from "./ProfileSlice";


export const store=configureStore({
    reducer:{
        AUTH:AuthSlice,
        Create:CreateSlice,
        Product:ProductSlice,
        Profile:ProfileSlice

    }
})
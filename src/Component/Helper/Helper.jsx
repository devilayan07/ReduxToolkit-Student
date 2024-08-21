import axios from "axios";
let adminUrl="https://webskitters-student.onrender.com"
export const baseURL=adminUrl;
let axiosInstance=axios.create({
    baseURL,
});
export {adminUrl};

export const image=(media)=>{
    return `https://webskitters-student.onrender.com/uploads/profile_pic/${media}`;
};

axiosInstance.interceptors.request.use(
    async function(config){
        const token=localStorage.getItem("token") || sessionStorage.getItem("token")
        if(token!==null || token!==undefined){
            config.headers["x-access-token"] = token;

        }
        return config;

    },
    function(err){
        return Promise.reject(err)
    }
)
export default axiosInstance;

import axios from "axios";

const authApi = axios.create({
    baseURL:`${import.meta.env.VITE_API_URL}/api/auth`,
});


export const signupUser = async (data) =>{
    return await authApi.post("/signup",data)
}

export const loginUser = async (data) =>{
    return await authApi.post("/login",data)    
}

export const googleLogin = async (data)=>{
    return await authApi.post("/google",data)
}
export default authApi;